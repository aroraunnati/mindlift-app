import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { createMoodEntry, getUserMoodEntries, getMoodStats } from "@/lib/mood-storage"

export async function GET(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const includeStats = searchParams.get("stats") === "true"

    const entries = getUserMoodEntries(user.id, limit ? Number.parseInt(limit) : undefined)
    const stats = includeStats ? getMoodStats(user.id) : undefined

    return NextResponse.json({ entries, stats })
  } catch (error) {
    console.error("[v0] Get mood entries error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { mood, note, date } = await request.json()

    // Validate mood value
    if (!mood || mood < 1 || mood > 5 || !Number.isInteger(mood)) {
      return NextResponse.json({ error: "Mood must be an integer between 1 and 5" }, { status: 400 })
    }

    // Validate date if provided
    if (date && isNaN(Date.parse(date))) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 })
    }

    const entry = createMoodEntry(user.id, mood, note, date)

    return NextResponse.json({ entry }, { status: 201 })
  } catch (error) {
    console.error("[v0] Create mood entry error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
