// In-memory chat storage (replace with database in production)
interface ChatMessage {
  id: string
  userId: string
  role: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatSession {
  id: string
  userId: string
  title: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
}

const chatSessions: Map<string, ChatSession> = new Map()
const userSessions: Map<string, string[]> = new Map()

export function createChatSession(userId: string, title = "New Chat"): ChatSession {
  const sessionId = Math.random().toString(36).substring(2, 15)
  const session: ChatSession = {
    id: sessionId,
    userId,
    title,
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  chatSessions.set(sessionId, session)

  // Add to user's session list
  const userSessionList = userSessions.get(userId) || []
  userSessionList.unshift(sessionId)
  userSessions.set(userId, userSessionList)

  return session
}

export function getChatSession(sessionId: string): ChatSession | null {
  return chatSessions.get(sessionId) || null
}

export function getUserChatSessions(userId: string): ChatSession[] {
  const sessionIds = userSessions.get(userId) || []
  return sessionIds.map((id) => chatSessions.get(id)).filter(Boolean) as ChatSession[]
}

export function addMessageToSession(sessionId: string, message: Omit<ChatMessage, "id">): ChatMessage {
  const session = chatSessions.get(sessionId)
  if (!session) {
    throw new Error("Session not found")
  }

  const messageId = Math.random().toString(36).substring(2, 15)
  const fullMessage: ChatMessage = {
    id: messageId,
    ...message,
  }

  session.messages.push(fullMessage)
  session.updatedAt = new Date().toISOString()

  return fullMessage
}

export function updateSessionTitle(sessionId: string, title: string): void {
  const session = chatSessions.get(sessionId)
  if (session) {
    session.title = title
    session.updatedAt = new Date().toISOString()
  }
}

export function deleteChatSession(sessionId: string, userId: string): boolean {
  const session = chatSessions.get(sessionId)
  if (!session || session.userId !== userId) {
    return false
  }

  chatSessions.delete(sessionId)

  // Remove from user's session list
  const userSessionList = userSessions.get(userId) || []
  const updatedList = userSessionList.filter((id) => id !== sessionId)
  userSessions.set(userId, updatedList)

  return true
}
