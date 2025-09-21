"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageSquare, MapPin, Clock, Mail, Globe, Loader2, AlertTriangle } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import type { EmergencyContact, CampusResource } from "@/lib/emergency-storage"

export function EmergencySupport() {
  const { user } = useAuth()
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])
  const [campusResources, setCampusResources] = useState<CampusResource[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadEmergencyData()
  }, [])

  const loadEmergencyData = async () => {
    setIsLoading(true)
    try {
      const [contactsRes, resourcesRes] = await Promise.all([
        fetch("/api/emergency/contacts"),
        fetch("/api/emergency/resources"),
      ])

      if (contactsRes.ok && resourcesRes.ok) {
        const contactsData = await contactsRes.json()
        const resourcesData = await resourcesRes.json()

        setEmergencyContacts(contactsData.contacts || [])
        setCampusResources(resourcesData.resources || [])
      }
    } catch (error) {
      console.error("[v0] Failed to load emergency data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const logEmergencyContact = async (contactId: string, contactType: "call" | "text" | "chat") => {
    if (!user) return

    try {
      await fetch("/api/emergency/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactId, contactType }),
      })
    } catch (error) {
      console.error("[v0] Failed to log emergency contact:", error)
    }
  }

  const handleContactClick = async (contact: EmergencyContact) => {
    if (user) {
      await logEmergencyContact(contact.id, contact.type)
    }

    if (contact.type === "call") {
      const phoneNumber = contact.number.replace(/\D/g, "")
      window.location.href = `tel:${phoneNumber}`
    } else if (contact.type === "text") {
      // For text lines, show instructions
      alert(`To text ${contact.name}:\n\nSend a message to ${contact.number}\n\n${contact.description}`)
    } else if (contact.type === "chat") {
      // Open chat in new window
      window.open("https://suicidepreventionlifeline.org/chat/", "_blank")
    }
  }

  const handleResourceClick = async (resource: CampusResource) => {
    if (user) {
      await logEmergencyContact(resource.id, "call")
    }

    const phoneNumber = resource.phone.replace(/\D/g, "")
    window.location.href = `tel:${phoneNumber}`
  }

  const crisisContacts = emergencyContacts.filter((contact) => contact.category === "crisis")
  const otherContacts = emergencyContacts.filter((contact) => contact.category !== "crisis")

  if (isLoading) {
    return (
      <section id="emergency" className="scroll-mt-20">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      </section>
    )
  }

  return (
    <section id="emergency" className="scroll-mt-20">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold text-red-600">Emergency Support</h2>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          If you're in crisis or need immediate help, these resources are available 24/7. You're not alone.
        </p>
      </div>

      {/* Crisis Hotlines - Priority Section */}
      <Card className="border-red-200 bg-red-50/50 max-w-4xl mx-auto mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-700">
            <Phone className="w-5 h-5" />
            Immediate Crisis Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisContacts.map((contact) => (
              <div key={contact.id} className="p-4 bg-white rounded-lg border border-red-200">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{contact.name}</h3>
                  <div className="flex items-center gap-2">
                    {contact.available24_7 && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        24/7
                      </Badge>
                    )}
                    {contact.type === "call" ? (
                      <Phone className="w-4 h-4 text-red-600" />
                    ) : contact.type === "text" ? (
                      <MessageSquare className="w-4 h-4 text-red-600" />
                    ) : (
                      <Globe className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                <p className="font-mono text-lg text-red-700 mb-2">{contact.number}</p>
                <p className="text-xs text-muted-foreground mb-3">{contact.description}</p>
                <Button
                  size="sm"
                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => handleContactClick(contact)}
                >
                  {contact.type === "call" ? "Call Now" : contact.type === "text" ? "Text Instructions" : "Chat Now"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-12">
        {/* Other Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-primary" />
              Additional Support Lines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {otherContacts.map((contact) => (
              <div key={contact.id} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-sm">{contact.name}</h3>
                  <div className="flex items-center gap-2">
                    {contact.available24_7 && (
                      <Badge variant="secondary" className="text-xs">
                        24/7
                      </Badge>
                    )}
                    {contact.type === "call" ? (
                      <Phone className="w-4 h-4 text-primary" />
                    ) : (
                      <MessageSquare className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </div>
                <p className="font-mono text-lg text-primary mb-2">{contact.number}</p>
                <p className="text-xs text-muted-foreground mb-3">{contact.description}</p>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleContactClick(contact)}
                >
                  {contact.type === "call" ? "Call Now" : "Get Instructions"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Campus Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Campus Resources
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {campusResources.map((resource) => (
              <div key={resource.id} className="p-4 bg-card rounded-lg border">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{resource.name}</h3>
                  {resource.walkInAvailable && (
                    <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                      Walk-in
                    </Badge>
                  )}
                </div>
                <div className="space-y-1 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    {resource.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    {resource.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    {resource.phone}
                  </div>
                  {resource.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3" />
                      {resource.email}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.services.slice(0, 3).map((service, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {resource.services.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{resource.services.length - 3} more
                    </Badge>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => handleResourceClick(resource)}
                >
                  Call Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <Card className="max-w-4xl mx-auto bg-red-50/50 border-red-200">
        <CardContent className="p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Remember: You Are Not Alone</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Seeking help is a sign of strength, not weakness. These resources are here for you whenever you need them.
            If you're having thoughts of self-harm or suicide, please reach out immediately.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                if (user) logEmergencyContact("contact-1", "call")
                window.location.href = "tel:988"
              }}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call 988 Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                if (user) logEmergencyContact("contact-2", "text")
                alert("To text Crisis Text Line:\n\nSend 'HOME' to 741741\n\nFree, 24/7 support via text message")
              }}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Text HOME to 741741
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
