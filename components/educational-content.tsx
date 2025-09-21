"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, ArrowRight, Search, Bookmark, BookmarkCheck, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import type { Article } from "@/lib/content-storage"

export function EducationalContent() {
  const { user } = useAuth()
  const [articles, setArticles] = useState<Article[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadContent()
    if (user) {
      loadUserBookmarks()
    }
  }, [user])

  useEffect(() => {
    filterArticles()
  }, [selectedCategory, searchQuery])

  const loadContent = async () => {
    setIsLoading(true)
    try {
      // Load articles and categories
      const [articlesRes, categoriesRes] = await Promise.all([
        fetch("/api/content"),
        fetch("/api/content?categories=true"),
      ])

      if (articlesRes.ok && categoriesRes.ok) {
        const articlesData = await articlesRes.json()
        const categoriesData = await categoriesRes.json()

        setArticles(articlesData.articles || [])
        setCategories(categoriesData.categories || [])
      }
    } catch (error) {
      console.error("[v0] Failed to load content:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadUserBookmarks = async () => {
    try {
      const response = await fetch("/api/content/progress?type=bookmarks")
      if (response.ok) {
        const data = await response.json()
        const bookmarkIds = new Set(data.bookmarks?.map((article: Article) => article.id) || [])
        setBookmarks(bookmarkIds)
      }
    } catch (error) {
      console.error("[v0] Failed to load bookmarks:", error)
    }
  }

  const filterArticles = async () => {
    try {
      let url = "/api/content"
      const params = new URLSearchParams()

      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim())
      } else if (selectedCategory !== "all") {
        params.append("category", selectedCategory)
      }

      if (params.toString()) {
        url += `?${params.toString()}`
      }

      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setArticles(data.articles || [])
      }
    } catch (error) {
      console.error("[v0] Failed to filter articles:", error)
    }
  }

  const toggleBookmark = async (articleId: string) => {
    if (!user) return

    const isBookmarked = bookmarks.has(articleId)

    try {
      const response = await fetch("/api/content/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          bookmarked: !isBookmarked,
        }),
      })

      if (response.ok) {
        const newBookmarks = new Set(bookmarks)
        if (isBookmarked) {
          newBookmarks.delete(articleId)
        } else {
          newBookmarks.add(articleId)
        }
        setBookmarks(newBookmarks)
      }
    } catch (error) {
      console.error("[v0] Failed to toggle bookmark:", error)
    }
  }

  return (
    <section id="learn" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Learn & Grow</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collection of mental health resources, tips, and strategies designed specifically for
          students.
        </p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 focus:ring-amber-500 focus:border-amber-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-amber-600 hover:bg-amber-700" : ""}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-amber-600 hover:bg-amber-700" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    {article.category}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                    {user && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(article.id)}
                        className="h-8 w-8 p-0"
                      >
                        {bookmarks.has(article.id) ? (
                          <BookmarkCheck className="w-4 h-4 text-amber-600" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">{article.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{article.description}</p>
                <Button variant="ghost" className="w-full justify-between group">
                  Read Article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {articles.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No articles found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? "Try adjusting your search terms" : "No articles available in this category"}
          </p>
        </div>
      )}

      <div className="text-center mt-12">
        <Button size="lg" variant="outline">
          <BookOpen className="w-4 h-4 mr-2" />
          View All Resources
        </Button>
      </div>
    </section>
  )
}
