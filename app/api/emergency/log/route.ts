import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { logEmergencyContact, getUserEmergencyLogs } from "@/lib/emergency-storage"

export async function GET() {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const logs = getUserEmergencyLogs(user.id)
    return NextResponse.json({ logs })
  } catch (error) {
    console.error("[v0] Get emergency logs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { contactId, contactType } = await request.json()

    if (!contactId || !contactType) {
      return NextResponse.json({ error: "Contact ID and type are required" }, { status: 400 })
    }

    if (!["call", "text", "chat"].includes(contactType)) {
      return NextResponse.json({ error: "Invalid contact type" }, { status: 400 })
    }

    const log = logEmergencyContact(user.id, contactId, contactType)

    return NextResponse.json({ log }, { status: 201 })
  } catch (error) {
    console.error("[v0] Log emergency contact error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
