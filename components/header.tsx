"use client";

import { Button } from "@/components/ui/button"
import { Heart, Menu, User } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"

export function Header() {
  const { user } = useAuth()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MindLift</span>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="#chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            AI Chat
          </a>
          <a href="#mood" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Mood Tracker
          </a>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a
            href="#learn"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Learn
          </a>
          <a
            href="#emergency"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Emergency
          </a>
        </nav>

        <div className="flex items-center space-x-2">
          {!user ? (
            <>
              <Button variant="ghost" size="sm" className="hidden md:inline-flex" onClick={() => router.push('/signin')}>
                Sign In
              </Button>
              <Button size="sm" onClick={() => router.push('/signin')}>Get Started</Button>
            </>
          ) : (
            <Button variant="ghost" size="icon" className="md:inline-flex" title="User Profile">
              <User className="h-5 w-5 text-primary-foreground" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
