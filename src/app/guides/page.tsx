import { CtaMotionLink } from '@/components/ui/cta-hover'
import { MapPin, UtensilsCrossed, Bus, Music, Mountain, Lightbulb, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'City Guides | LYNC',
  description: 'Insider tips and local knowledge to help you navigate Madrid like a local, from neighborhoods to nightlife.',
}

const guides = [
  {
    icon: MapPin,
    title: 'Neighborhoods',
    description: 'Discover the personality of each barrio, from trendy Malasaña to elegant Salamanca.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Food & Drink',
    description: 'The best tapas bars, brunch spots, rooftop terraces, and hidden gems locals love.',
  },
  {
    icon: Bus,
    title: 'Getting Around',
    description: 'Metro tips, bike routes, and everything you need to navigate the city with ease.',
  },
  {
    icon: Music,
    title: 'Nightlife',
    description: 'Where to go out, what to expect, and how to enjoy Madrid\'s legendary nightlife safely.',
  },
  {
    icon: Mountain,
    title: 'Day Trips',
    description: 'Escape the city for a day. Toledo, Segovia, Sierra de Guadarrama, and more.',
  },
  {
    icon: Lightbulb,
    title: 'Practical Tips',
    description: 'Banking, healthcare, phone plans, and the admin stuff nobody tells you about.',
  },
]

export default function GuidesPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-6 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            City Guides
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Insider tips and local knowledge to help you navigate Madrid like a pro.
          </p>
        </div>
      </section>

      {/* Guide Cards */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide, i) => (
              <div
                key={i}
                className="relative bg-white border-2 border-cream p-6 rounded-2xl animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="absolute top-4 right-4 bg-cream text-dark/60 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
                <div className="w-12 h-12 bg-lync/10 rounded-full flex items-center justify-center mb-4">
                  <guide.icon size={24} className="text-lync" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold uppercase tracking-normal">{guide.title}</h3>
                <p className="text-muted">{guide.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-lync text-white text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Have a Suggestion?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Know a hidden gem we should cover? We&apos;d love to hear from you.
          </p>
          <CtaMotionLink
            href="/about"
            className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors"
          >
            Get in Touch <ArrowRight size={20} />
          </CtaMotionLink>
        </div>
      </section>
    </>
  )
}
