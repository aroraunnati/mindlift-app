import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getChatSession, deleteChatSession, updateSessionTitle } from "@/lib/chat-storage"

export async function GET(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const session = getChatSession(params.sessionId)
    if (!session || session.userId !== user.id) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({ session })
  } catch (error) {
    console.error("[v0] Get session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title } = await request.json()
    const session = getChatSession(params.sessionId)

    if (!session || session.userId !== user.id) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    updateSessionTitle(params.sessionId, title)
    const updatedSession = getChatSession(params.sessionId)

    return NextResponse.json({ session: updatedSession })
  } catch (error) {
    console.error("[v0] Update session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { sessionId: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const success = deleteChatSession(params.sessionId, user.id)
    if (!success) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Session deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete session error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
