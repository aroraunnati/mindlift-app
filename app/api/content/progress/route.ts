import { NextResponse } from "next/server"
import { getAuthUser } from "@/lib/auth"
import { getUserProgress, updateUserProgress, getUserBookmarks, getUserCompletedArticles } from "@/lib/content-storage"

export async function GET(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")
    const articleId = searchParams.get("articleId")

    if (articleId) {
      const progress = getUserProgress(user.id, articleId)
      return NextResponse.json({ progress })
    }

    if (type === "bookmarks") {
      const bookmarks = getUserBookmarks(user.id)
      return NextResponse.json({ bookmarks })
    }

    if (type === "completed") {
      const completed = getUserCompletedArticles(user.id)
      return NextResponse.json({ completed })
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  } catch (error) {
    console.error("[v0] Get progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { articleId, completed, bookmarked, readingProgress } = await request.json()

    if (!articleId) {
      return NextResponse.json({ error: "Article ID is required" }, { status: 400 })
    }

    const progress = updateUserProgress(user.id, articleId, {
      completed,
      bookmarked,
      readingProgress,
    })

    return NextResponse.json({ progress })
  } catch (error) {
    console.error("[v0] Update progress error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
