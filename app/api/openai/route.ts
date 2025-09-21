import { NextRequest, NextResponse } from "next/server"

/**
 * Example API route to demonstrate secure usage of OpenAI API key from environment variables.
 * 
 * IMPORTANT:
 * - Do NOT expose your API key to the frontend.
 * - Use environment variables (e.g., process.env.OPENAI_API_KEY) only in server-side code.
 * - Restart the development server after modifying .env.local for changes to take effect.
 */

export async function POST(request: NextRequest) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY

  if (!OPENAI_API_KEY) {
    return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 })
  }

  // Example: Forward request to OpenAI API here using the API key securely
  // const body = await request.json()
  // const response = await fetch("https://api.openai.com/v1/...", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${OPENAI_API_KEY}`,
  //   },
  //   body: JSON.stringify(body),
  // })
  // const data = await response.json()

  // For now, just return a placeholder response
  return NextResponse.json({ message: "OpenAI API route is set up securely." })
}
