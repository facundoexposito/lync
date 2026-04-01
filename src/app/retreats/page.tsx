import type { Metadata } from 'next'
import Image from 'next/image'
import {
  ArrowRight,
  Star,
  Compass,
  Users,
  Globe,
  CalendarDays,
  MapPin,
  Clock,
} from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import SpotlightCard from '@/components/ui/spotlight-card'
import { CtaMotionA, CtaMotionLink } from '@/components/ui/cta-hover'
import {
  retreats,
  inclusions,
  RETREATS_BOOKING_URL,
} from '@/data/retreats'

export const metadata: Metadata = {
  title: 'Retreats — Curated Getaways | LYNC',
  description:
    'Curated group travel experiences designed to deepen friendships and explore stunning destinations across Spain and beyond.',
  openGraph: {
    title: 'Retreats — Curated Getaways | LYNC',
    description:
      'Curated group travel experiences designed to deepen friendships and explore stunning destinations.',
    type: 'website',
  },
}

export default function RetreatsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex h-[45vh] min-h-[340px] items-end">
        <Image
          src="/brand/COMMUNITY/run-club-viewpoint-arms-raised.webp"
          alt="LYNC retreat group at a viewpoint"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/50 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              Travel With Us
            </p>
            <h1 className="mb-3 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-7xl">
              LYNC{' '}
              <span className="relative inline-block">
                Retreats
                <HighlightStroke
                  className="absolute -bottom-1 left-0 w-full"
                  strokeWidth={5}
                />
              </span>
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              Curated getaway experiences designed to deepen friendships
              and explore stunning destinations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main content: sticky sidebar + retreats ──── */}
      <section className="bg-cream py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            {/* Left — Sticky booking panel */}
            <div className="lg:w-[320px] lg:shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lync/10">
                      <Compass size={20} className="text-lync" />
                    </div>
                    <h2 className="font-display text-xl font-semibold uppercase tracking-normal">
                      Join a Retreat
                    </h2>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted">
                    Spots are limited to keep the group intimate.
                    Reserve early to secure your place on the next
                    adventure.
                  </p>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                        <Star size={14} className="text-amber-500" />
                      </span>
                      4.9 average rating
                    </div>
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                        <Users size={14} className="text-lync" />
                      </span>
                      Small groups (12–16 women)
                    </div>
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                        <Globe size={14} className="text-emerald-600" />
                      </span>
                      Spain & Portugal
                    </div>
                  </div>

                  <div className="mb-4 rounded-xl bg-surface p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                      Starting from
                    </p>
                    <p className="text-lg font-bold text-dark">
                      €479{' '}
                      <span className="text-sm font-normal text-muted">
                        per person
                      </span>
                    </p>
                  </div>

                  <CtaMotionA
                    href={RETREATS_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    Reserve Your Spot <ArrowRight size={18} />
                  </CtaMotionA>
                </div>
              </div>
            </div>

            {/* Right — Retreat cards */}
            <div className="flex-1">
              <div className="flex flex-col gap-8">
                {retreats.map((retreat, i) => (
                  <ScrollReveal key={retreat.id} delay={i * 0.08}>
                    <div className="group overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-shadow hover:shadow-md">
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="relative aspect-[4/3] md:aspect-auto md:w-2/5">
                          <Image
                            src={retreat.image}
                            alt={retreat.destination}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>

                        {/* Content */}
                        <div className="flex flex-1 flex-col justify-between p-6 md:p-8">
                          <div>
                            <h3 className="mb-2 font-display text-2xl font-semibold uppercase tracking-normal">
                              {retreat.title}
                            </h3>

                            <div className="mb-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted">
                              <span className="flex items-center gap-1.5">
                                <MapPin size={13} className="shrink-0" />
                                {retreat.destination}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <CalendarDays size={13} className="shrink-0" />
                                {retreat.dates}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock size={13} className="shrink-0" />
                                {retreat.duration}
                              </span>
                            </div>

                            <p className="mb-5 text-sm leading-relaxed text-muted">
                              {retreat.description}
                            </p>

                            <ul className="mb-5 grid grid-cols-2 gap-2">
                              {retreat.highlights.map((h) => (
                                <li
                                  key={h}
                                  className="flex items-center gap-2 text-sm text-dark"
                                >
                                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-lync" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex items-center justify-between">
                            <p className="text-xl font-bold text-dark">
                              From {retreat.price}
                              <span className="ml-1 text-sm font-normal text-muted">
                                / person
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What's Included ───────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-14 text-center font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              What&apos;s Included
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {inclusions.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.06}>
                <SpotlightCard className="h-full rounded-2xl border border-border bg-white p-6">
                  <span className="mb-3 block text-3xl">{item.emoji}</span>
                  <h3 className="mb-2 font-display text-lg font-semibold uppercase tracking-normal">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                </SpotlightCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-dark py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Ready for Your Next Adventure?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-xl text-white/70">
              Spots are limited. Reserve your place and travel
              with an amazing group of&nbsp;women.
            </p>
            <CtaMotionLink
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-lync px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-lync-dark"
            >
              Find Your Experience <ArrowRight size={20} />
            </CtaMotionLink>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
