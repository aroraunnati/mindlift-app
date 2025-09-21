import { Heart, Shield, Lock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/30 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-full">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MindLift</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {
                "A safe, private space for students to access AI-powered mental health support, mood tracking, and educational resources."
              }
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Shield className="w-4 h-4" />
                Secure
              </div>
              <div className="flex items-center gap-1">
                <Lock className="w-4 h-4" />
                Private
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                Caring
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Mental Health Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Coping Strategies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Wellness Tips
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Crisis Resources
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 MindLift. Made with ❤️ for student mental health.</p>
          <p className="mt-2">
            {"If you're in crisis, call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line)"}
          </p>
        </div>
      </div>
    </footer>
  )
}
