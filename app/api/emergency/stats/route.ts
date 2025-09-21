import { NextResponse } from "next/server"
import { getEmergencyStats } from "@/lib/emergency-storage"

export async function GET() {
  try {
    const stats = getEmergencyStats()
    return NextResponse.json({ stats })
  } catch (error) {
    console.error("[v0] Get emergency stats error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
