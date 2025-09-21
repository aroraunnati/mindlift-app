"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Activity, BookOpen, Phone } from "lucide-react";

export default function LearnPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 space-y-16">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">About MindLift</h1>
        <p className="text-lg max-w-3xl mx-auto">
          MindLift is a safe, private, and confidential mental health platform designed to provide mental health awareness, AI-powered support, mood tracking, and learning resources to help you on your journey to wellness.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <MessageSquare className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold text-xl">AI Chat</h3>
              <p>Anonymous support and conversation with compassionate AI.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Activity className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Mood Tracker</h3>
              <p>Daily and weekly mood logs and insights to help you understand your mental health.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <BookOpen className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Learning Resources</h3>
              <p>Articles, guides, and videos on stress, anxiety, mindfulness, and more.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <Phone className="w-8 h-8 text-primary" />
            <div>
              <h3 className="font-semibold text-xl">Emergency Help</h3>
              <p>Quick links to hotlines and urgent care resources for immediate support.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">How It Works</h2>
        <ol className="list-decimal list-inside space-y-4 text-lg max-w-3xl mx-auto">
          <li>Sign up or log in to your MindLift account.</li>
          <li>Track your mood daily and use the AI chat for support.</li>
          <li>Get personalized insights and access educational resources.</li>
        </ol>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-6">Privacy & Safety</h2>
        <p className="max-w-3xl mx-auto text-lg">
          Your data is secure with us. We use encryption and never share your personal information. MindLift is committed to maintaining your privacy and confidentiality.
        </p>
      </section>

      <section className="text-center space-x-4">
        <Button size="lg" onClick={() => window.location.href = "/signin"}>Get Started</Button>
        <Button size="lg" variant="outline" onClick={() => window.location.href = "/signin"}>Sign Up Free</Button>
        <Button size="lg" variant="secondary" onClick={() => window.location.href = "/signin"}>Try AI Chat Now</Button>
      </section>
    </main>
  );
}
