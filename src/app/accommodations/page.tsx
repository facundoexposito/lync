import { CtaMotionLink } from '@/components/ui/cta-hover'
import { Search, FileCheck, Home, Users, Building, Calendar, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Accommodations | LYNC',
  description: 'Find your home in Madrid, from shared apartments to student residences. We help you find the perfect place.',
}

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Browse',
    description: 'Explore vetted listings across Madrid\'s best neighborhoods, filtered by budget and lifestyle.',
  },
  {
    icon: FileCheck,
    step: '02',
    title: 'Apply',
    description: 'We guide you through the application process and handle the paperwork so you don\'t have to.',
  },
  {
    icon: Home,
    step: '03',
    title: 'Move In',
    description: 'Arrive to a home that\'s ready for you, with a community of new friends just around the corner.',
  },
]

const accommodationTypes = [
  {
    icon: Users,
    title: 'Shared Apartments',
    description: 'Live with other international women in curated flat-shares across Madrid\'s top barrios.',
    features: ['Furnished rooms', 'Vetted flatmates', 'Central locations'],
  },
  {
    icon: Building,
    title: 'Student Residences',
    description: 'Modern residences with built-in community, common areas, and all-inclusive pricing.',
    features: ['All bills included', 'Social events', 'Study spaces'],
  },
  {
    icon: Calendar,
    title: 'Short-Term Stays',
    description: 'Need a place while you search? We have flexible short-term options to get you started.',
    features: ['Flexible terms', 'Move-in ready', 'No long commitment'],
  },
]

export default function AccommodationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-6 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Accommodations
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Find your home in Madrid. We connect you with trusted housing options so you can settle in stress-free.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-16 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, i) => (
              <div
                key={i}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-16 h-16 bg-lync rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon size={32} className="text-white" />
                </div>
                <span className="text-sm font-semibold text-lync uppercase tracking-wider">Step {item.step}</span>
                <h3 className="mt-2 mb-3 font-display text-2xl font-semibold uppercase tracking-normal">{item.title}</h3>
                <p className="text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accommodation Types */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-16 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Accommodation Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {accommodationTypes.map((type, i) => (
              <div
                key={i}
                className="bg-white/10 border border-white/10 p-6 rounded-2xl animate-fade-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 bg-lync/20 rounded-full flex items-center justify-center mb-4">
                  <type.icon size={24} className="text-lync" />
                </div>
                <h3 className="mb-3 font-display text-xl font-semibold uppercase tracking-normal">{type.title}</h3>
                <p className="text-white/70 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1.5 h-1.5 bg-lync rounded-full shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-lync text-white text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Ready to Find Your Home?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Let us help you find the perfect place in Madrid. No stress, no scams, just a home that feels right.
          </p>
          <CtaMotionLink
            href="/quiz"
            className="inline-flex items-center gap-2 bg-white text-dark font-semibold px-8 py-4 rounded-full text-lg hover:bg-cream transition-colors"
          >
            Find Your Home <ArrowRight size={20} />
          </CtaMotionLink>
        </div>
      </section>
    </>
  )
}
