"use client"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Lock, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AIChat() {
  const { user } = useAuth()
  const [inputValue, setInputValue] = useState("")
  const router = useRouter()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  // Adjust isLoading check to use status values that exist in ChatStatus type
  // Based on observed status values: "error", "submitted", "ready"
  const isLoading = status === "submitted"

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return

    const latestUserMessage = inputValue.trim()

    // Map all previous messages except the latest user message to "conversation" array
    // (Assuming latest user message is not yet in messages array)
    const conversation = messages.map((msg) => ({
      role: msg.role,
      content: msg.parts.map((part) => (part.type === "text" ? part.text : "")).join(""),
    }))

    const payload = {
      message: latestUserMessage,
      conversation,
    }

    setInputValue("")
    try {
      // Send message using fetch with new format
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      // Append AI response to messages state using sendMessage from useChat hook
      sendMessage({ text: latestUserMessage })
      if (data?.message) {
        sendMessage({ text: data.message, role: "assistant" })
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      // Optionally, handle error UI feedback here
    }
  }

  if (!user) {
    return (
      <section id="chat" className="scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">AI Chat Support</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Start a conversation with our AI companion that listens with empathy and provides thoughtful support.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="text-center py-12">
            <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sign in to start chatting</h3>
            <p className="text-muted-foreground mb-6">
              Create an account or sign in to begin your private conversation with MindLift AI.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => router.push('/signin')}>
              Get Started
            </Button>
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section id="chat" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">AI Chat Support</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Start a conversation with our AI companion that listens with empathy and provides thoughtful support.
        </p>
      </div>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Chat with MindLift AI
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lock className="w-4 h-4" />
            This conversation is private and confidential
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === "assistant"
                      ? "bg-sage-50 text-sage-800 border border-sage-200"
                      : "bg-amber-600 text-white"
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <p key={index} className="text-sm leading-relaxed">
                          {part.text}
                        </p>
                      )
                    }
                    return null
                  })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-sage-50 text-sage-800 border border-sage-200 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">MindLift AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Type your message here..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1 focus:ring-amber-500 focus:border-amber-500"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              disabled={isLoading || !inputValue.trim()}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
