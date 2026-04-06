import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, Star, Ticket, Users, Globe } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { CtaMotionA } from '@/components/ui/cta-hover'
import { AcuityEmbed } from '@/components/ui/acuity-embed'
import { ACUITY_BOOKING_URL } from '@/data/events'

export const metadata: Metadata = {
  title: 'Upcoming Events',
  description:
    'Browse and book upcoming LYNC events in Madrid — from yoga sessions to rooftop cocktails. Meet amazing women and build real friendships.',
  openGraph: {
    images: [{ url: '/brand/COMMUNITY/social-bar-chic-wide-shot.webp', width: 1200, height: 630, alt: 'LYNC community event in Madrid' }],
  },
}

export default function EventsPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────── */}
      <section className="relative flex h-[45vh] min-h-[340px] items-end">
        <Image
          src="/brand/COMMUNITY/social-bar-chic-wide-shot.webp"
          alt="LYNC community event"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/92 via-dark/50 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8 md:pb-16">
          <ScrollReveal>
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-white/70">
              This Month at LYNC
            </p>
            <h1 className="mb-3 font-display text-5xl font-semibold uppercase tracking-normal text-white md:text-7xl">
              Upcoming{' '}
              <span className="relative inline-block">
                Events
                <HighlightStroke
                  className="absolute -bottom-1 left-0 w-full"
                  strokeWidth={5}
                />
              </span>
            </h1>
            <p className="max-w-xl text-lg text-white/80 md:text-xl">
              From yoga sessions to rooftop cocktails — find your next
              adventure and make friends along the way.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Main content: sticky sidebar + Acuity scheduler ── */}
      <section className="bg-cream py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
            {/* Left — Sticky booking panel */}
            <div className="lg:w-[320px] lg:shrink-0">
              <div className="lg:sticky lg:top-28">
                <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lync/10">
                      <Ticket size={20} className="text-lync" />
                    </div>
                    <h2 className="font-display text-xl font-semibold uppercase tracking-normal">
                      Book Your Spot
                    </h2>
                  </div>

                  <p className="mb-5 text-sm leading-relaxed text-muted">
                    Browse our upcoming events and secure your place.
                    Spots are limited — book early to avoid missing out.
                  </p>

                  <div className="mb-6 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                        <Star size={14} className="text-amber-500" />
                      </span>
                      4.9 average event rating
                    </div>
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                        <Users size={14} className="text-lync" />
                      </span>
                      2,300+ women connected
                    </div>
                    <div className="flex items-center gap-3 text-sm text-dark">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-surface">
                        <Globe size={14} className="text-emerald-600" />
                      </span>
                      40+ nationalities
                    </div>
                  </div>

                  <div className="mb-4 rounded-xl bg-surface p-4">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted">
                      Price range
                    </p>
                    <p className="text-lg font-bold text-dark">
                      €15 – €45{' '}
                      <span className="text-sm font-normal text-muted">
                        per event
                      </span>
                    </p>
                  </div>

                  <CtaMotionA
                    href={ACUITY_BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-shadow hover:shadow-md"
                  >
                    Reserve Now <ArrowRight size={18} />
                  </CtaMotionA>
                </div>
              </div>
            </div>

            {/* Right — Acuity Scheduler */}
            <div className="flex-1">
              <AcuityEmbed className="overflow-hidden rounded-2xl bg-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="bg-dark py-16 text-center text-white md:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ScrollReveal>
            <h2 className="mb-6 font-display text-4xl font-semibold uppercase tracking-normal md:text-5xl">
              Don&apos;t See Your Vibe?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/70">
              New events drop every month. Take the quiz so we can match
              you with experiences that fit your energy.
            </p>
            <CtaMotionA
              href="/quiz"
              className="inline-flex items-center gap-2 rounded-full bg-lync px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-lync-dark"
            >
              Find Your Experience <ArrowRight size={20} />
            </CtaMotionA>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
