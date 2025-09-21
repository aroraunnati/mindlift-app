// In-memory emergency support storage (replace with database in production)
export interface EmergencyContact {
  id: string
  name: string
  number: string
  description: string
  type: "call" | "text" | "chat"
  category: "crisis" | "campus" | "national" | "local"
  available24_7: boolean
  priority: number
}

export interface CampusResource {
  id: string
  name: string
  location: string
  hours: string
  phone: string
  email?: string
  website?: string
  services: string[]
  walkInAvailable: boolean
  appointmentRequired: boolean
}

export interface EmergencyLog {
  id: string
  userId: string
  contactId: string
  contactType: "call" | "text" | "chat"
  timestamp: string
  resolved?: boolean
  notes?: string
}

const emergencyContacts: Map<string, EmergencyContact> = new Map()
const campusResources: Map<string, CampusResource> = new Map()
const emergencyLogs: Map<string, EmergencyLog> = new Map()

// Initialize with sample data
const sampleContacts: Omit<EmergencyContact, "id">[] = [
  {
    name: "National Suicide Prevention Lifeline",
    number: "988",
    description: "24/7 crisis support for anyone in emotional distress or suicidal crisis",
    type: "call",
    category: "crisis",
    available24_7: true,
    priority: 1,
  },
  {
    name: "Crisis Text Line",
    number: "741741",
    description: "Free, 24/7 support via text message. Text HOME to start",
    type: "text",
    category: "crisis",
    available24_7: true,
    priority: 2,
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-4357",
    description: "Treatment referral and information service for mental health and substance abuse",
    type: "call",
    category: "national",
    available24_7: true,
    priority: 3,
  },
  {
    name: "National Sexual Assault Hotline",
    number: "1-800-656-4673",
    description: "24/7 confidential support for survivors of sexual assault",
    type: "call",
    category: "crisis",
    available24_7: true,
    priority: 4,
  },
  {
    name: "National Domestic Violence Hotline",
    number: "1-800-799-7233",
    description: "24/7 confidential support for domestic violence survivors",
    type: "call",
    category: "crisis",
    available24_7: true,
    priority: 5,
  },
  {
    name: "Campus Counseling Center",
    number: "(555) 123-4567",
    description: "On-campus mental health services for students",
    type: "call",
    category: "campus",
    available24_7: false,
    priority: 6,
  },
  {
    name: "Campus Safety Emergency",
    number: "(555) 123-9999",
    description: "Campus security and emergency response",
    type: "call",
    category: "campus",
    available24_7: true,
    priority: 7,
  },
]

const sampleResources: Omit<CampusResource, "id">[] = [
  {
    name: "Student Health Center",
    location: "Building A, 2nd Floor",
    hours: "Mon-Fri: 8AM-5PM, Sat: 9AM-1PM",
    phone: "(555) 123-4568",
    email: "health@university.edu",
    website: "https://university.edu/health",
    services: ["Medical Care", "Mental Health Screening", "Crisis Intervention", "Referrals"],
    walkInAvailable: true,
    appointmentRequired: false,
  },
  {
    name: "Counseling & Psychological Services",
    location: "Student Union, Room 201",
    hours: "Mon-Fri: 9AM-4PM",
    phone: "(555) 123-4569",
    email: "counseling@university.edu",
    website: "https://university.edu/counseling",
    services: ["Individual Therapy", "Group Therapy", "Crisis Counseling", "Psychiatric Services"],
    walkInAvailable: true,
    appointmentRequired: true,
  },
  {
    name: "Peer Support Groups",
    location: "Wellness Center, Various Rooms",
    hours: "Various times - see schedule",
    phone: "(555) 123-4570",
    email: "peersupport@university.edu",
    services: ["Anxiety Support", "Depression Support", "LGBTQ+ Support", "Grief Support"],
    walkInAvailable: false,
    appointmentRequired: false,
  },
  {
    name: "Academic Success Center",
    location: "Library, 3rd Floor",
    hours: "Mon-Thu: 8AM-8PM, Fri: 8AM-5PM",
    phone: "(555) 123-4571",
    email: "success@university.edu",
    services: ["Academic Coaching", "Stress Management", "Time Management", "Study Skills"],
    walkInAvailable: true,
    appointmentRequired: false,
  },
  {
    name: "Campus Ministry",
    location: "Interfaith Center",
    hours: "Mon-Fri: 10AM-6PM",
    phone: "(555) 123-4572",
    email: "ministry@university.edu",
    services: ["Spiritual Counseling", "Meditation Groups", "Crisis Support", "Community Building"],
    walkInAvailable: true,
    appointmentRequired: false,
  },
]

// Initialize data
sampleContacts.forEach((contact, index) => {
  const id = `contact-${index + 1}`
  emergencyContacts.set(id, { ...contact, id })
})

sampleResources.forEach((resource, index) => {
  const id = `resource-${index + 1}`
  campusResources.set(id, { ...resource, id })
})

export function getAllEmergencyContacts(): EmergencyContact[] {
  return Array.from(emergencyContacts.values()).sort((a, b) => a.priority - b.priority)
}

export function getEmergencyContactsByCategory(category: string): EmergencyContact[] {
  return getAllEmergencyContacts().filter((contact) => contact.category === category)
}

export function getCrisisContacts(): EmergencyContact[] {
  return getEmergencyContactsByCategory("crisis")
}

export function getAllCampusResources(): CampusResource[] {
  return Array.from(campusResources.values()).sort((a, b) => a.name.localeCompare(b.name))
}

export function getWalkInResources(): CampusResource[] {
  return getAllCampusResources().filter((resource) => resource.walkInAvailable)
}

export function logEmergencyContact(
  userId: string,
  contactId: string,
  contactType: "call" | "text" | "chat",
): EmergencyLog {
  const logId = Math.random().toString(36).substring(2, 15)
  const log: EmergencyLog = {
    id: logId,
    userId,
    contactId,
    contactType,
    timestamp: new Date().toISOString(),
  }

  emergencyLogs.set(logId, log)
  return log
}

export function getUserEmergencyLogs(userId: string): EmergencyLog[] {
  return Array.from(emergencyLogs.values())
    .filter((log) => log.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
}

export function updateEmergencyLog(logId: string, updates: Partial<EmergencyLog>): EmergencyLog | null {
  const log = emergencyLogs.get(logId)
  if (!log) return null

  const updatedLog = { ...log, ...updates }
  emergencyLogs.set(logId, updatedLog)
  return updatedLog
}

export function getEmergencyStats(): {
  totalContacts: number
  crisisContacts: number
  campusResources: number
  available24_7: number
} {
  const contacts = getAllEmergencyContacts()
  const resources = getAllCampusResources()

  return {
    totalContacts: contacts.length,
    crisisContacts: getCrisisContacts().length,
    campusResources: resources.length,
    available24_7: contacts.filter((c) => c.available24_7).length,
  }
}
