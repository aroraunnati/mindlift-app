import { NextResponse } from "next/server"
import { getAllCampusResources, getWalkInResources } from "@/lib/emergency-storage"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const walkIn = searchParams.get("walkIn")

    if (walkIn === "true") {
      const resources = getWalkInResources()
      return NextResponse.json({ resources })
    }

    const resources = getAllCampusResources()
    return NextResponse.json({ resources })
  } catch (error) {
    console.error("[v0] Get campus resources error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
