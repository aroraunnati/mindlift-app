// In-memory content storage (replace with database in production)
export interface Article {
  id: string
  title: string
  description: string
  content: string
  category: string
  readTime: string
  image: string
  author: string
  publishedAt: string
  tags: string[]
  featured: boolean
}

export interface UserProgress {
  userId: string
  articleId: string
  completed: boolean
  completedAt?: string
  bookmarked: boolean
  readingProgress: number // 0-100
}

const articles: Map<string, Article> = new Map()
const userProgress: Map<string, UserProgress> = new Map()

// Initialize with sample articles
const sampleArticles: Omit<Article, "id">[] = [
  {
    title: "Understanding Anxiety in College",
    description: "Learn about common anxiety triggers for students and practical coping strategies.",
    content: `# Understanding Anxiety in College

College can be an exciting time, but it also brings unique challenges that can trigger anxiety. Understanding these triggers and learning effective coping strategies is crucial for your mental health and academic success.

## Common Anxiety Triggers for Students

### Academic Pressure
- Heavy workloads and tight deadlines
- Fear of failure or not meeting expectations
- Imposter syndrome and self-doubt

### Social Challenges
- Making new friends and fitting in
- Peer pressure and social comparison
- Relationship difficulties

### Life Transitions
- Living away from home for the first time
- Financial stress and independence
- Uncertainty about the future

## Practical Coping Strategies

### 1. Deep Breathing Exercises
Practice the 4-7-8 technique:
- Inhale for 4 counts
- Hold for 7 counts
- Exhale for 8 counts

### 2. Time Management
- Use a planner or digital calendar
- Break large tasks into smaller steps
- Set realistic goals and deadlines

### 3. Build a Support Network
- Join clubs or organizations
- Attend campus events
- Don't hesitate to reach out to counseling services

### 4. Maintain Healthy Habits
- Regular exercise and movement
- Balanced nutrition
- Adequate sleep (7-9 hours)

## When to Seek Help

If anxiety is interfering with your daily life, academic performance, or relationships, it's time to seek professional help. Campus counseling centers offer confidential support and resources.

Remember: Seeking help is a sign of strength, not weakness.`,
    readTime: "5 min read",
    category: "Anxiety",
    image: "/calm-student-reading-in-library.jpg",
    author: "Dr. Sarah Johnson",
    publishedAt: "2024-01-15T10:00:00Z",
    tags: ["anxiety", "coping", "college", "mental health"],
    featured: true,
  },
  {
    title: "Building Healthy Sleep Habits",
    description: "Discover how proper sleep hygiene can significantly improve your mental health.",
    content: `# Building Healthy Sleep Habits

Quality sleep is fundamental to mental health, academic performance, and overall well-being. Yet many students struggle with sleep issues due to irregular schedules, stress, and poor sleep hygiene.

## Why Sleep Matters for Mental Health

### Cognitive Function
- Improved memory consolidation
- Better focus and concentration
- Enhanced problem-solving abilities

### Emotional Regulation
- Better mood stability
- Reduced irritability and anxiety
- Improved stress management

### Physical Health
- Stronger immune system
- Better metabolism
- Reduced inflammation

## Creating Your Sleep Sanctuary

### Optimize Your Environment
- Keep your room cool (65-68°F)
- Use blackout curtains or eye masks
- Minimize noise with earplugs or white noise

### Establish a Bedtime Routine
1. Set a consistent sleep schedule
2. Create a 30-minute wind-down routine
3. Avoid screens 1 hour before bed
4. Try relaxing activities like reading or meditation

## Common Sleep Disruptors

### Technology
- Blue light from screens disrupts melatonin production
- Social media can increase anxiety and FOMO
- Late-night studying on devices

### Caffeine and Substances
- Avoid caffeine 6 hours before bedtime
- Limit alcohol consumption
- Be mindful of energy drinks and sodas

### Stress and Anxiety
- Practice relaxation techniques
- Keep a worry journal
- Try progressive muscle relaxation

## Sleep Hygiene Tips

1. **Stick to a schedule** - Go to bed and wake up at the same time daily
2. **Create a ritual** - Develop calming pre-sleep activities
3. **Watch your diet** - Avoid large meals close to bedtime
4. **Get sunlight** - Expose yourself to natural light during the day
5. **Exercise regularly** - But not within 3 hours of bedtime

## When to Seek Help

If you continue to have sleep problems despite good sleep hygiene, consider talking to a healthcare provider. You might have an underlying sleep disorder that requires professional treatment.`,
    readTime: "7 min read",
    category: "Wellness",
    image: "/peaceful-bedroom-with-soft-lighting.jpg",
    author: "Dr. Michael Chen",
    publishedAt: "2024-01-12T14:30:00Z",
    tags: ["sleep", "wellness", "habits", "mental health"],
    featured: true,
  },
  {
    title: "Managing Academic Stress",
    description: "Effective techniques for handling exam pressure and academic expectations.",
    content: `# Managing Academic Stress

Academic stress is a common experience for students, but when left unmanaged, it can negatively impact both mental health and academic performance. Learning effective stress management techniques is essential for success.

## Understanding Academic Stress

### Common Sources
- Exam anxiety and test pressure
- Heavy course loads and deadlines
- Competition with peers
- Fear of disappointing parents or teachers
- Uncertainty about career paths

### Physical Symptoms
- Headaches and muscle tension
- Fatigue and sleep problems
- Changes in appetite
- Frequent illness

### Emotional Symptoms
- Anxiety and worry
- Irritability and mood swings
- Feeling overwhelmed
- Loss of motivation

## Effective Stress Management Techniques

### 1. Time Management Strategies
- **Prioritize tasks** using the Eisenhower Matrix
- **Break large projects** into smaller, manageable steps
- **Use the Pomodoro Technique** for focused study sessions
- **Plan ahead** and avoid last-minute cramming

### 2. Study Techniques
- **Active learning** through summarizing and teaching others
- **Spaced repetition** for better retention
- **Practice testing** to reduce exam anxiety
- **Form study groups** for collaborative learning

### 3. Stress-Relief Activities
- **Regular exercise** to release tension
- **Mindfulness meditation** for mental clarity
- **Creative outlets** like art, music, or writing
- **Social connections** with friends and family

### 4. Healthy Lifestyle Choices
- **Balanced nutrition** to fuel your brain
- **Adequate sleep** for cognitive function
- **Limit caffeine** to avoid jitters
- **Stay hydrated** throughout the day

## Building Resilience

### Develop a Growth Mindset
- View challenges as opportunities to learn
- Embrace mistakes as part of the learning process
- Focus on effort rather than just outcomes

### Practice Self-Compassion
- Treat yourself with kindness during difficult times
- Recognize that struggle is part of the human experience
- Avoid harsh self-criticism

### Set Realistic Expectations
- Define success for yourself, not based on others
- Set achievable goals and celebrate small wins
- Remember that perfection is not the goal

## Campus Resources

Most colleges offer various support services:
- **Counseling centers** for mental health support
- **Academic support centers** for study skills
- **Tutoring services** for subject-specific help
- **Stress management workshops** and programs

## Emergency Strategies

When stress becomes overwhelming:
1. **Take a break** - Step away from studying
2. **Practice deep breathing** - Use the 4-7-8 technique
3. **Reach out** - Talk to a friend, family member, or counselor
4. **Reassess priorities** - What really needs to be done today?

Remember: Your worth is not determined by your grades or academic achievements.`,
    readTime: "6 min read",
    category: "Stress",
    image: "/student-studying-calmly-with-organized-desk.jpg",
    author: "Dr. Emily Rodriguez",
    publishedAt: "2024-01-10T09:15:00Z",
    tags: ["stress", "academics", "study tips", "time management"],
    featured: false,
  },
  {
    title: "The Power of Mindfulness",
    description: "Simple mindfulness exercises you can practice anywhere on campus.",
    content: `# The Power of Mindfulness

Mindfulness is the practice of being fully present and engaged in the current moment. For students, developing mindfulness skills can significantly improve focus, reduce stress, and enhance overall well-being.

## What is Mindfulness?

Mindfulness involves:
- **Present-moment awareness** - Focusing on what's happening now
- **Non-judgmental observation** - Noticing thoughts and feelings without criticism
- **Acceptance** - Acknowledging experiences without trying to change them immediately

## Benefits for Students

### Academic Benefits
- Improved concentration and focus
- Better memory and information retention
- Enhanced creativity and problem-solving
- Reduced test anxiety

### Mental Health Benefits
- Decreased stress and anxiety
- Better emotional regulation
- Improved self-awareness
- Greater resilience to challenges

### Physical Benefits
- Lower blood pressure
- Improved sleep quality
- Reduced muscle tension
- Stronger immune system

## Simple Mindfulness Exercises

### 1. Mindful Breathing (2-5 minutes)
1. Find a comfortable position
2. Close your eyes or soften your gaze
3. Focus on your natural breath
4. When your mind wanders, gently return to your breath

### 2. Body Scan (5-10 minutes)
1. Lie down or sit comfortably
2. Start at the top of your head
3. Slowly move your attention through each part of your body
4. Notice sensations without trying to change them

### 3. Mindful Walking (5-15 minutes)
1. Walk slower than usual
2. Focus on the sensation of your feet touching the ground
3. Notice your surroundings without judgment
4. Return attention to walking when mind wanders

### 4. 5-4-3-2-1 Grounding Technique
Notice:
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

## Mindfulness on Campus

### In the Classroom
- Take three mindful breaths before class begins
- Practice mindful listening during lectures
- Use mindful breathing during breaks

### While Studying
- Start study sessions with a brief mindfulness practice
- Take mindful breaks every 25-30 minutes
- Practice mindful reading by fully engaging with the material

### During Stressful Moments
- Use the STOP technique:
  - **S**top what you're doing
  - **T**ake a breath
  - **O**bserve your thoughts and feelings
  - **P**roceed with awareness

### In Social Situations
- Practice mindful listening in conversations
- Notice social anxiety without judgment
- Use breathing techniques before presentations

## Building a Daily Practice

### Start Small
- Begin with just 2-3 minutes daily
- Use apps or guided meditations
- Set a consistent time each day

### Be Patient
- Don't expect immediate results
- Notice when your mind wanders (this is normal!)
- Treat yourself with compassion

### Find What Works
- Try different techniques
- Adapt practices to your lifestyle
- Join mindfulness groups on campus

## Common Misconceptions

### "I Can't Meditate Because My Mind is Too Busy"
- A busy mind is normal and expected
- The goal isn't to stop thoughts, but to notice them
- Each time you notice your mind wandering, you're being mindful

### "I Don't Have Time"
- Even 2-3 minutes can be beneficial
- Mindfulness can be practiced during daily activities
- It's about quality, not quantity

### "It's Too Spiritual or Religious"
- Mindfulness is a secular practice
- It's based on scientific research
- You can adapt it to your beliefs and values

## Resources for Students

- Campus meditation groups
- Mindfulness apps (Headspace, Calm, Insight Timer)
- Online guided meditations
- Mindfulness-based stress reduction (MBSR) courses

Remember: Mindfulness is a skill that develops with practice. Be patient with yourself as you learn.`,
    readTime: "4 min read",
    category: "Mindfulness",
    image: "/peaceful-nature-scene-for-meditation.jpg",
    author: "Dr. Lisa Park",
    publishedAt: "2024-01-08T16:45:00Z",
    tags: ["mindfulness", "meditation", "stress relief", "focus"],
    featured: true,
  },
]

// Initialize articles
sampleArticles.forEach((article, index) => {
  const id = `article-${index + 1}`
  articles.set(id, { ...article, id })
})

export function getAllArticles(): Article[] {
  return Array.from(articles.values()).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
}

export function getFeaturedArticles(): Article[] {
  return getAllArticles().filter((article) => article.featured)
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter((article) => article.category.toLowerCase() === category.toLowerCase())
}

export function getArticleById(id: string): Article | null {
  return articles.get(id) || null
}

export function searchArticles(query: string): Article[] {
  const searchTerm = query.toLowerCase()
  return getAllArticles().filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.description.toLowerCase().includes(searchTerm) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
      article.category.toLowerCase().includes(searchTerm),
  )
}

export function getUserProgress(userId: string, articleId: string): UserProgress | null {
  const key = `${userId}-${articleId}`
  return userProgress.get(key) || null
}

export function updateUserProgress(userId: string, articleId: string, progress: Partial<UserProgress>): UserProgress {
  const key = `${userId}-${articleId}`
  const existing = userProgress.get(key) || {
    userId,
    articleId,
    completed: false,
    bookmarked: false,
    readingProgress: 0,
  }

  const updated = { ...existing, ...progress }

  if (progress.completed && !existing.completed) {
    updated.completedAt = new Date().toISOString()
  }

  userProgress.set(key, updated)
  return updated
}

export function getUserBookmarks(userId: string): Article[] {
  const bookmarkedIds = Array.from(userProgress.values())
    .filter((progress) => progress.userId === userId && progress.bookmarked)
    .map((progress) => progress.articleId)

  return bookmarkedIds.map((id) => articles.get(id)).filter(Boolean) as Article[]
}

export function getUserCompletedArticles(userId: string): Article[] {
  const completedIds = Array.from(userProgress.values())
    .filter((progress) => progress.userId === userId && progress.completed)
    .map((progress) => progress.articleId)

  return completedIds.map((id) => articles.get(id)).filter(Boolean) as Article[]
}

export function getCategories(): string[] {
  const categories = new Set(getAllArticles().map((article) => article.category))
  return Array.from(categories).sort()
}
