import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getMoodEntry, deleteMoodEntry } from "@/lib/mood-storage"

export async function GET(request: Request, { params }: { params: { entryId: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entry = getMoodEntry(params.entryId)
    if (!entry || entry.userId !== user.id) {
      return NextResponse.json({ error: "Mood entry not found" }, { status: 404 })
    }

    return NextResponse.json({ entry })
  } catch (error) {
    console.error("[v0] Get mood entry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { entryId: string } }) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const success = deleteMoodEntry(params.entryId, user.id)
    if (!success) {
      return NextResponse.json({ error: "Mood entry not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Mood entry deleted successfully" })
  } catch (error) {
    console.error("[v0] Delete mood entry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
