import { NextResponse } from "next/server"
import { getAllEmergencyContacts, getEmergencyContactsByCategory, getCrisisContacts } from "@/lib/emergency-storage"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const crisis = searchParams.get("crisis")

    if (crisis === "true") {
      const contacts = getCrisisContacts()
      return NextResponse.json({ contacts })
    }

    if (category) {
      const contacts = getEmergencyContactsByCategory(category)
      return NextResponse.json({ contacts })
    }

    const contacts = getAllEmergencyContacts()
    return NextResponse.json({ contacts })
  } catch (error) {
    console.error("[v0] Get emergency contacts error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
