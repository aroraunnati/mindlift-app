import { NextResponse } from "next/server"
import { getArticleById } from "@/lib/content-storage"

export async function GET(request: Request, { params }: { params: { articleId: string } }) {
  try {
    const article = getArticleById(params.articleId)

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error("[v0] Get article error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
