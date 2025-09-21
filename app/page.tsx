import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { AIChat } from "@/components/ai-chat"
import { MoodTracker } from "@/components/mood-tracker"
import { EducationalContent } from "@/components/educational-content"
import { EmergencySupport } from "@/components/emergency-support"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <div className="container mx-auto px-4 py-16 space-y-16">
          <AIChat />
          <MoodTracker />
          <EducationalContent />
          <EmergencySupport />
        </div>
      </main>
      <Footer />
    </div>
  )
}
