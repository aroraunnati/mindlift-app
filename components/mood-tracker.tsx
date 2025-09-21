"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { BarChart3, TrendingUp, TrendingDown, Minus, Calendar, Loader2 } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import type { MoodEntry, MoodStats } from "@/lib/mood-storage"

const moodOptions = [
  { emoji: "😢", label: "Very Sad", value: 1, color: "bg-red-500" },
  { emoji: "😔", label: "Sad", value: 2, color: "bg-orange-500" },
  { emoji: "😐", label: "Neutral", value: 3, color: "bg-yellow-500" },
  { emoji: "🙂", label: "Good", value: 4, color: "bg-green-500" },
  { emoji: "😊", label: "Great", value: 5, color: "bg-emerald-500" },
]

export function MoodTracker() {
  const { user } = useAuth()
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [note, setNote] = useState("")
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([])
  const [stats, setStats] = useState<MoodStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (user) {
      loadMoodData()
    }
  }, [user])

  const loadMoodData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/mood?limit=14&stats=true")
      if (response.ok) {
        const data = await response.json()
        setMoodHistory(data.entries || [])
        setStats(data.stats || null)
      }
    } catch (error) {
      console.error("[v0] Failed to load mood data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMoodSubmit = async () => {
    if (!selectedMood || isSubmitting) return

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/mood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: selectedMood,
          note: note.trim() || undefined,
        }),
      })

      if (response.ok) {
        setSelectedMood(null)
        setNote("")
        await loadMoodData() // Refresh data
      } else {
        const error = await response.json()
        console.error("[v0] Failed to save mood:", error)
      }
    } catch (error) {
      console.error("[v0] Failed to save mood:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <section id="mood" className="scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Mood Tracking</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Track your daily emotions to better understand patterns and celebrate your progress over time.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="text-center py-12">
            <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sign in to track your mood</h3>
            <p className="text-muted-foreground mb-6">
              Create an account to start tracking your daily emotions and see your progress over time.
            </p>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">Get Started</Button>
          </CardContent>
        </Card>
      </section>
    )
  }

  const getTrendIcon = () => {
    if (!stats) return <Minus className="w-4 h-4 text-gray-500" />

    switch (stats.weeklyTrend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-500" />
      default:
        return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getTrendMessage = () => {
    if (!stats) return "Start tracking to see trends"

    switch (stats.weeklyTrend) {
      case "improving":
        return "Your mood has been improving this week!"
      case "declining":
        return "Your mood has been declining this week. Consider reaching out for support."
      default:
        return "Your mood has been stable this week."
    }
  }

  return (
    <section id="mood" className="scroll-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Mood Tracking</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Track your daily emotions to better understand patterns and celebrate your progress over time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              How are you feeling today?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4 mb-6">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                    selectedMood === mood.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-border hover:border-amber-300"
                  }`}
                  disabled={isSubmitting}
                >
                  <div className="text-3xl mb-2">{mood.emoji}</div>
                  <div className="text-xs font-medium">{mood.label}</div>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <Textarea
                placeholder="Add a note about your mood (optional)..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="resize-none focus:ring-amber-500 focus:border-amber-500"
                rows={3}
                disabled={isSubmitting}
              />
            </div>

            <Button
              onClick={handleMoodSubmit}
              disabled={!selectedMood || isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Log Mood"
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Your Mood Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {stats && (
                  <div className="mb-6 p-4 bg-sage-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Average Mood:</span>
                        <div className="font-semibold">{stats.averageMood}/5</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Streak:</span>
                        <div className="font-semibold">{stats.streak} days</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3 mb-6">
                  {moodHistory.length > 0 ? (
                    moodHistory.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(entry.date).toLocaleDateString()}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-3 h-3 rounded-full ${level <= entry.mood ? "bg-amber-500" : "bg-muted"}`}
                              />
                            ))}
                          </div>
                          <span className="text-sm">{moodOptions.find((m) => m.value === entry.mood)?.emoji}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No mood entries yet.</p>
                      <p className="text-sm">Start tracking your mood to see trends!</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {getTrendIcon()}
                  {getTrendMessage()}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
