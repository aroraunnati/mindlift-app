import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getMoodStats } from "@/lib/mood-storage"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const stats = getMoodStats(user.id)

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("[v0] Get mood stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
