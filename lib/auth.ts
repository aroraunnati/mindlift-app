import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthTokenPayload {
  userId: string
  email: string
  name: string
  exp: number
}

// In-memory user storage (replace with database in production)
const users: Map<string, User & { password: string }> = new Map()

export async function createToken(payload: Omit<AuthTokenPayload, "exp">) {
  return await new SignJWT({ ...payload }).setProtectedHeader({ alg: "HS256" }).setExpirationTime("24h").sign(secret)
}

export async function verifyToken(token: string): Promise<AuthTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as AuthTokenPayload
  } catch {
    return null
  }
}

export async function hashPassword(password: string): Promise<string> {
  // Simple hash for demo - use bcrypt in production
  return Buffer.from(password).toString("base64")
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return Buffer.from(password).toString("base64") === hash
}

export function createUser(email: string, password: string, name: string): User {
  const id = Math.random().toString(36).substring(2, 15)
  const user = {
    id,
    email,
    name,
    password,
    createdAt: new Date().toISOString(),
  }
  users.set(id, user)
  return { id, email, name, createdAt: user.createdAt }
}

export function findUserByEmail(email: string): (User & { password: string }) | null {
  for (const user of users.values()) {
    if (user.email === email) {
      return user
    }
  }
  return null
}

export function findUserById(id: string): User | null {
  const user = users.get(id)
  if (!user) return null
  return { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt }
}

export async function getAuthUser(): Promise<User | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")?.value

  if (!token) return null

  const payload = await verifyToken(token)
  if (!payload) return null

  return findUserById(payload.userId)
}
