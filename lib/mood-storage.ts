// In-memory mood storage (replace with database in production)
export interface MoodEntry {
  id: string
  userId: string
  mood: number // 1-5 scale
  note?: string
  date: string // ISO date string
  createdAt: string
}

export interface MoodStats {
  averageMood: number
  totalEntries: number
  streak: number
  weeklyTrend: "improving" | "declining" | "stable"
  moodDistribution: { [key: number]: number }
}

const moodEntries: Map<string, MoodEntry> = new Map()
const userMoodEntries: Map<string, string[]> = new Map()

export function createMoodEntry(userId: string, mood: number, note?: string, date?: string): MoodEntry {
  const entryId = Math.random().toString(36).substring(2, 15)
  const entryDate = date || new Date().toISOString().split("T")[0]

  const entry: MoodEntry = {
    id: entryId,
    userId,
    mood,
    note,
    date: entryDate,
    createdAt: new Date().toISOString(),
  }

  moodEntries.set(entryId, entry)

  // Add to user's entries list
  const userEntries = userMoodEntries.get(userId) || []

  // Remove any existing entry for the same date
  const existingEntryIndex = userEntries.findIndex((id) => {
    const existingEntry = moodEntries.get(id)
    return existingEntry?.date === entryDate
  })

  if (existingEntryIndex !== -1) {
    const oldEntryId = userEntries[existingEntryIndex]
    moodEntries.delete(oldEntryId)
    userEntries.splice(existingEntryIndex, 1)
  }

  userEntries.push(entryId)
  userEntries.sort((a, b) => {
    const entryA = moodEntries.get(a)
    const entryB = moodEntries.get(b)
    return new Date(entryB?.date || 0).getTime() - new Date(entryA?.date || 0).getTime()
  })

  userMoodEntries.set(userId, userEntries)

  return entry
}

export function getUserMoodEntries(userId: string, limit?: number): MoodEntry[] {
  const entryIds = userMoodEntries.get(userId) || []
  const entries = entryIds.map((id) => moodEntries.get(id)).filter(Boolean) as MoodEntry[]

  return limit ? entries.slice(0, limit) : entries
}

export function getMoodEntry(entryId: string): MoodEntry | null {
  return moodEntries.get(entryId) || null
}

export function deleteMoodEntry(entryId: string, userId: string): boolean {
  const entry = moodEntries.get(entryId)
  if (!entry || entry.userId !== userId) {
    return false
  }

  moodEntries.delete(entryId)

  // Remove from user's entries list
  const userEntries = userMoodEntries.get(userId) || []
  const updatedEntries = userEntries.filter((id) => id !== entryId)
  userMoodEntries.set(userId, updatedEntries)

  return true
}

export function getMoodStats(userId: string): MoodStats {
  const entries = getUserMoodEntries(userId)

  if (entries.length === 0) {
    return {
      averageMood: 0,
      totalEntries: 0,
      streak: 0,
      weeklyTrend: "stable",
      moodDistribution: {},
    }
  }

  // Calculate average mood
  const averageMood = entries.reduce((sum, entry) => sum + entry.mood, 0) / entries.length

  // Calculate mood distribution
  const moodDistribution: { [key: number]: number } = {}
  entries.forEach((entry) => {
    moodDistribution[entry.mood] = (moodDistribution[entry.mood] || 0) + 1
  })

  // Calculate streak (consecutive days with entries)
  let streak = 0
  const today = new Date()
  const currentDate = new Date(today)

  while (streak < 365) {
    // Max 365 days to prevent infinite loop
    const dateString = currentDate.toISOString().split("T")[0]
    const hasEntry = entries.some((entry) => entry.date === dateString)

    if (hasEntry) {
      streak++
      currentDate.setDate(currentDate.getDate() - 1)
    } else {
      break
    }
  }

  // Calculate weekly trend (last 7 days vs previous 7 days)
  const last7Days = entries.slice(0, 7)
  const previous7Days = entries.slice(7, 14)

  let weeklyTrend: "improving" | "declining" | "stable" = "stable"

  if (last7Days.length > 0 && previous7Days.length > 0) {
    const recentAvg = last7Days.reduce((sum, entry) => sum + entry.mood, 0) / last7Days.length
    const previousAvg = previous7Days.reduce((sum, entry) => sum + entry.mood, 0) / previous7Days.length

    if (recentAvg > previousAvg + 0.2) {
      weeklyTrend = "improving"
    } else if (recentAvg < previousAvg - 0.2) {
      weeklyTrend = "declining"
    }
  }

  return {
    averageMood: Math.round(averageMood * 10) / 10,
    totalEntries: entries.length,
    streak,
    weeklyTrend,
    moodDistribution,
  }
}
