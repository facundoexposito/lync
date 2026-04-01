import { CtaMotionLink } from '@/components/ui/cta-hover'
import { Home, Compass, UtensilsCrossed, Users, ArrowRight, CalendarDays, MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Retreats | LYNC',
  description: 'Curated getaway experiences designed to deepen friendships and explore stunning destinations across Spain and beyond.',
}

const upcomingRetreats = [
  {
    destination: 'Costa Brava, Spain',
    dates: 'June 20 – 23, 2025',
    price: '€499',
    description: 'A four-day coastal escape with beach yoga, hiking, and sunset dinners overlooking the Mediterranean.',
  },
  {
    destination: 'Algarve, Portugal',
    dates: 'September 12 – 15, 2025',
    price: '€549',
    description: 'Explore dramatic cliffs, hidden beaches, and charming fishing villages with your LYNC crew.',
  },
  {
    destination: 'Mallorca, Spain',
    dates: 'November 7 – 10, 2025',
    price: '€479',
    description: 'Disconnect and recharge with mountain hikes, vineyard visits, and cozy group dinners.',
  },
]

const inclusions = [
  {
    icon: Home,
    title: 'Accommodation',
    desc: 'Beautiful shared villas and boutique stays, hand-picked for comfort and vibes.',
  },
  {
    icon: Compass,
    title: 'Curated Activities',
    desc: 'From yoga to city tours, every day is designed to be memorable and fun.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Meals & Drinks',
    desc: 'Group dinners, local food tours, and welcome drinks included.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Travel with an incredible group of women who become lifelong friends.',
  },
]

export default function RetreatsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-6 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Retreats
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Curated getaway experiences designed to deepen friendships and explore stunning destinations.
          </p>
        </div>
      </section>

      {/* Upcoming Retreats */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-12 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Upcoming Retreats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingRetreats.map((retreat, i) => (
              <div
                key={i}
                className="bg-white border-2 border-cream rounded-2xl overflow-hidden animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-[4/3] bg-cream flex items-center justify-center">
                  <p className="text-dark/30 text-center px-4">Photo: {retreat.destination}</p>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-display text-xl font-semibold uppercase tracking-normal">
                    {retreat.destination}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted mb-1">
                    <CalendarDays size={14} />
                    <span>{retreat.dates}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted mb-3">
                    <MapPin size={14} />
                    <span>From {retreat.price} per person</span>
                  </div>
                  <p className="text-muted">{retreat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-16 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            What&apos;s Included
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {inclusions.map((item, i) => (
              <div
                key={i}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-lync/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-lync" />
                </div>
                <h3 className="mb-3 font-display text-2xl font-semibold uppercase tracking-normal">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-lync text-white text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Spots are limited. Reserve your place and travel with an amazing group of women.
          </p>
          <CtaMotionLink
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors"
          >
            Join a Retreat <ArrowRight size={20} />
          </CtaMotionLink>
        </div>
      </section>
    </>
  )
}
