import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { createChatSession, getUserChatSessions } from "@/lib/chat-storage"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const sessions = getUserChatSessions(user.id)
    return NextResponse.json({ sessions })
  } catch (error) {
    console.error("[v0] Get sessions error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title } = await request.json()
    const session = createChatSession(user.id, title || "New Chat")

    return NextResponse.json({ session }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
