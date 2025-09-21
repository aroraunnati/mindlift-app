"use client"

import React, { useState, useEffect, useRef } from "react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Send message handler
  const sendMessage = async () => {
    if (!inputValue.trim() || loading) return

    setError(null)
    setLoading(true)

    const userMessage: Message = { role: "user", content: inputValue.trim() }
    const conversation = messages.slice(-6) // last 6 messages as context

    // Optimistically add user message
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    console.log("Sending message:", inputValue)
    console.log("Conversation:", conversation)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, conversation }),
      })

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()

      if (data.type === "ok") {
        const aiMessage: Message = { role: "assistant", content: data.reply }
        setMessages((prev) => [...prev, aiMessage])
      } else if (data.type === "crisis") {
        const crisisMessage: Message = { role: "assistant", content: data.reply }
        setMessages((prev) => [...prev, crisisMessage])
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    } catch (err) {
      setError("Failed to send message. Please check your connection and try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle Enter key press in input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[600px] border rounded-lg shadow-lg bg-white">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[70%] px-4 py-2 rounded-lg shadow ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white text-right"
                : "mr-auto bg-amber-400 text-black text-left"
            }`}
          >
            {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="p-2 text-center text-red-600 bg-red-100 border border-red-400">
          {error}
        </div>
      )}

      <div className="flex p-4 border-t">
        <input
          type="text"
          className="flex-1 border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={loading}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !inputValue.trim()}
          className={`px-6 py-2 rounded-r-md text-white ${
            loading || !inputValue.trim()
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-amber-600 hover:bg-amber-700"
          }`}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  )
}
