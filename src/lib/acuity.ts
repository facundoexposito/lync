import type { Event } from './types'

// ── Acuity API types ────────────────────────────────────────

interface AcuityClass {
  id: number
  appointmentTypeID: number
  name: string
  time: string // ISO 8601
  date: string
  location: string
  spots: number
  slotsAvailable: number
  calendar: string
  calendarID: number
}

interface AcuityAppointmentType {
  id: number
  name: string
  description: string
  price: string
  image: string
  schedulingUrl: string
  active: boolean
  private: boolean
  category: string
  type: string
}

// ── Category mapping ────────────────────────────────────────

type EventCategory = Event['category']

const CATEGORY_KEYWORDS: Record<EventCategory, string[]> = {
  Wellness: ['yoga', 'pilates', 'meditation', 'wellness', 'breathwork', 'sound bath', 'spa', 'massage', 'stretch', 'mindful'],
  Adventure: ['run', 'hike', 'adventure', 'climb', 'outdoor', 'kayak', 'surf', 'bike', 'walk', 'tour', 'explore'],
  Creative: ['craft', 'paint', 'art', 'pottery', 'workshop', 'create', 'vision board', 'sushi', 'cook', 'bake', 'flower'],
  Nightlife: ['nightlife', 'club', 'party', 'rooftop', 'cocktail', 'bar crawl', 'night out', 'dj'],
  Social: ['social', 'brunch', 'dinner', 'lunch', 'coffee', 'picnic', 'watch party', 'game night', 'meetup'],
}

function categorize(name: string, description: string): EventCategory {
  const text = `${name} ${description}`.toLowerCase()

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [EventCategory, string[]][]) {
    if (keywords.some((kw) => text.includes(kw))) return category
  }

  return 'Social'
}

// ── Fallback images (by category) ───────────────────────────

const FALLBACK_IMAGES: Record<EventCategory, string> = {
  Wellness: '/brand/COMMUNITY/yoga-class-tree-pose.webp',
  Social: '/brand/COMMUNITY/social-five-girls-restaurant-booth.webp',
  Adventure: '/brand/COMMUNITY/run-club-viewpoint-arms-raised.webp',
  Creative: '/brand/COMMUNITY/craft-night-group-table.webp',
  Nightlife: '/brand/COMMUNITY/social-bar-lounge-large-group.webp',
}

// ── Fetch helpers ───────────────────────────────────────────

const ACUITY_BASE = 'https://acuityscheduling.com/api/v1'

function authHeaders(): HeadersInit {
  const userId = process.env.ACUITY_USER_ID
  const apiKey = process.env.ACUITY_API_KEY

  if (!userId || !apiKey) {
    throw new Error('Missing ACUITY_USER_ID or ACUITY_API_KEY')
  }

  return {
    Authorization: `Basic ${Buffer.from(`${userId}:${apiKey}`).toString('base64')}`,
    Accept: 'application/json',
  }
}

async function fetchClasses(): Promise<AcuityClass[]> {
  const res = await fetch(`${ACUITY_BASE}/availability/classes`, {
    headers: authHeaders(),
    next: { revalidate: 300 }, // 5 minutes
  })

  if (!res.ok) throw new Error(`Acuity classes API ${res.status}`)
  return res.json()
}

async function fetchAppointmentTypes(): Promise<AcuityAppointmentType[]> {
  const res = await fetch(`${ACUITY_BASE}/appointment-types`, {
    headers: authHeaders(),
    next: { revalidate: 3600 }, // 1 hour
  })

  if (!res.ok) throw new Error(`Acuity appointment-types API ${res.status}`)
  return res.json()
}

// ── Retreat keywords ────────────────────────────────────────

const RETREAT_KEYWORDS = ['retreat', 'getaway', 'solstice']

// ── Main exports ────────────────────────────────────────────

export async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const [classes, types] = await Promise.all([
      fetchClasses(),
      fetchAppointmentTypes(),
    ])

    // Build a lookup of appointment types by ID
    const typeMap = new Map<number, AcuityAppointmentType>()
    for (const t of types) {
      if (t.active && !t.private) typeMap.set(t.id, t)
    }

    const now = new Date()

    const events: Event[] = classes
      .filter((c) => {
        const date = new Date(c.time)
        return date > now && typeMap.has(c.appointmentTypeID)
      })
      .map((c) => {
        const type = typeMap.get(c.appointmentTypeID)!
        const category = categorize(c.name, type.description || '')
        const image = type.image || FALLBACK_IMAGES[category]

        return {
          id: String(c.id),
          title: c.name,
          date: new Date(c.time),
          location: c.location || 'Madrid',
          category,
          spotsLeft: c.slotsAvailable,
          image,
          price: type.price === '0.00' ? 'Free' : `€${type.price}`,
          description: type.description || '',
          schedulingUrl: type.schedulingUrl,
        }
      })
      .sort((a, b) => a.date.getTime() - b.date.getTime())

    return events
  } catch (error) {
    console.error('[acuity] Failed to fetch events:', error)
    return []
  }
}

export async function getUpcomingRetreats(): Promise<Event[]> {
  try {
    const events = await getUpcomingEvents()

    return events.filter((e) => {
      const text = `${e.title} ${e.description}`.toLowerCase()
      return RETREAT_KEYWORDS.some((kw) => text.includes(kw))
    })
  } catch (error) {
    console.error('[acuity] Failed to fetch retreats:', error)
    return []
  }
}
