"use client";

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Shield, Heart, Users, BookOpen } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth/auth-provider"

export function HeroSection() {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center px-4 py-2 bg-card rounded-full text-sm text-card-foreground mb-6">
            <Shield className="w-4 h-4 mr-2 text-primary" />
            {"Safe, Private, and Confidential"}
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold text-balance mb-6">Your Mental Health Journey Starts Here</h1>

          <p className="text-xl text-muted-foreground text-pretty mb-8 max-w-2xl mx-auto">
            {
              "MindLift provides AI-powered support, mood tracking, and educational resources in a safe space where seeking help feels normal."
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {!user && (
              <Button size="lg" className="text-lg px-8" onClick={() => router.push('/signin')}>
                Start Your Journey
              </Button>
            )}
            <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" onClick={() => router.push('/learn')}>
              Learn More
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 text-center">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">AI That Cares</h3>
              <p className="text-sm text-muted-foreground">{"Compassionate AI chat that listens without judgment"}</p>
            </Card>

            <Card className="p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Student-Focused</h3>
              <p className="text-sm text-muted-foreground">{"Designed specifically for student mental health needs"}</p>
            </Card>

            <Card className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Learn & Grow</h3>
              <p className="text-sm text-muted-foreground">
                {"Educational resources to build mental health awareness"}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
