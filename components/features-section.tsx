import { Card } from "@/components/ui/card"
import { MessageCircle, BarChart3, BookOpen, Phone, Shield, Clock } from "lucide-react"

const features = [
  {
    icon: MessageCircle,
    title: "AI-Powered Chat",
    description:
      "Talk to our compassionate AI that listens with care and provides thoughtful responses to support your mental health journey.",
  },
  {
    icon: BarChart3,
    title: "Mood Tracking",
    description:
      "Track your emotions and moods over time with intuitive tools that help you understand patterns and progress.",
  },
  {
    icon: BookOpen,
    title: "Educational Resources",
    description:
      "Access curated mental health content, coping strategies, and wellness tips designed specifically for students.",
  },
  {
    icon: Phone,
    title: "Emergency Support",
    description:
      "Quick access to crisis helplines and emergency mental health resources when you need immediate support.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your conversations and data are completely private and secure. We prioritize your confidentiality above all.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Get support whenever you need it. Our AI chat and resources are available around the clock.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Everything You Need for Mental Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {
              "Comprehensive tools and support designed to make mental health care accessible and stigma-free for students."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
