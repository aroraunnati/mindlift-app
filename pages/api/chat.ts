import { NextApiRequest, NextApiResponse } from "next"

const CRISIS_KEYWORDS = [
  "suicide",
  "kill myself",
  "i want to die",
  "hurt myself",
  "self harm",
  "cutting",
]

const CRISIS_REPLY =
  "I’m really sorry you’re feeling this way. If you’re in immediate danger, please call your local emergency services or reach out to a trusted person now."

async function callOpenAIModeration(message: string, apiKey: string) {
  console.log("[Moderation] Sending message to moderation API:", message)
  const response = await fetch("https://api.openai.com/v1/moderations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({ input: message, model: "omni-moderation-latest" }),
  })
  if (!response.ok) throw new Error("Moderation API error")
  const data = await response.json()
  console.log("[Moderation] Response:", data)
  return data.results?.[0]?.flagged ?? false
}

async function callOpenAIChat(
  conversation: { role: "user" | "assistant"; content: string }[],
  apiKey: string
) {
  const systemPrompt =
    "You are MindLift, a compassionate youth-friendly mental wellness assistant. Always respond empathetically. Never give medical/legal instructions. Encourage emergency help if needed."
  const messages = [{ role: "system", content: systemPrompt }, ...conversation]

  console.log("[Chat] Sending messages to OpenAI:", messages)

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages,
      max_tokens: 500,
      temperature: 0.6,
    }),
  })
  if (!response.ok) throw new Error("Chat API error")
  const data = await response.json()
  console.log("[Chat] OpenAI response:", data)
  return data.choices?.[0]?.message?.content ?? ""
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ error: "Method not allowed" })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return res.status(500).json({ error: "OpenAI API key not configured" })

  try {
    const { message, conversation } = req.body

    console.log("[API] /api/chat called with body:", req.body)

    if (!message || typeof message !== "string") {
      console.log("[API] Bad request body:", req.body)
      return res.status(400).json({ error: "Invalid message format" })
    }

    const safeConversation = Array.isArray(conversation) ? conversation : []

    // Local keyword check for crisis
    const lowerMessage = message.toLowerCase()
    if (CRISIS_KEYWORDS.some((keyword) => lowerMessage.includes(keyword))) {
      console.log("[API] Crisis keyword detected")
      return res.status(200).json({ type: "crisis", reply: CRISIS_REPLY })
    }

    // Call Moderation API
    const flagged = await callOpenAIModeration(message, apiKey)
    if (flagged) {
      console.log("[API] Moderation flagged message as crisis")
      return res.status(200).json({ type: "crisis", reply: CRISIS_REPLY })
    }

    // Call Chat API
    const chatReply = await callOpenAIChat([...safeConversation, { role: "user", content: message }], apiKey)

    console.log("[API] Sending AI reply back to frontend:", chatReply)
    return res.status(200).json({ type: "ok", reply: chatReply })
  } catch (error) {
    console.error("[API] Error in /api/chat:", error)
    return res.status(500).json({ error: "Internal server error" })
  }
}
