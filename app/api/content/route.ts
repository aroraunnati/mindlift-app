import { NextResponse } from "next/server"
import {
  getAllArticles,
  getFeaturedArticles,
  getArticlesByCategory,
  searchArticles,
  getCategories,
} from "@/lib/content-storage"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const search = searchParams.get("search")
    const categories = searchParams.get("categories")

    if (categories === "true") {
      const categoryList = getCategories()
      return NextResponse.json({ categories: categoryList })
    }

    if (search) {
      const articles = searchArticles(search)
      return NextResponse.json({ articles })
    }

    if (featured === "true") {
      const articles = getFeaturedArticles()
      return NextResponse.json({ articles })
    }

    if (category) {
      const articles = getArticlesByCategory(category)
      return NextResponse.json({ articles })
    }

    const articles = getAllArticles()
    return NextResponse.json({ articles })
  } catch (error) {
    console.error("[v0] Get articles error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
