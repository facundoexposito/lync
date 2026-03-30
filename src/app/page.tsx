import Link from 'next/link'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { testimonials } from '@/data/testimonials'
import { faqs } from '@/data/faq'
import { ArrowRight, Star } from 'lucide-react'
import { FAQ } from '@/components/ui/faq'
import { HeroSection } from '@/components/home/hero'
import { StatsSection } from '@/components/home/stats'
import SpotlightCard from '@/components/ui/spotlight-card'

export default function Home() {
  return (
    <>
      <HeroSection />

      {/* How It Works */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">How It Works</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-20 max-w-lg">
            From quiz to<br />friend group in<br /><span className="italic">four steps.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
            {[
              { num: '01', title: 'Take the Quiz', desc: 'Tell us who you are and what kind of experiences you love.', emoji: '✨' },
              { num: '02', title: 'Get Matched', desc: 'We find events and people that match your vibe.', emoji: '🎯' },
              { num: '03', title: 'Join an Event', desc: 'RSVP, show up, and let us handle the rest.', emoji: '📅' },
              { num: '04', title: 'Make Friends', desc: 'Real connections that last way beyond the event.', emoji: '💛' },
            ].map((step) => (
              <div key={step.num} className="bg-white p-8 md:p-10">
                <span className="text-5xl mb-6 block">{step.emoji}</span>
                <span className="text-xs font-mono text-muted tracking-wider">{step.num}</span>
                <h3 className="font-display text-xl font-bold mt-1 mb-3">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LYNC — Bento-style */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-16">
            <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">Why LYNC</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Not just events.<br /><span className="italic">Real friendships.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Large card */}
            <SpotlightCard className="rounded-3xl border border-border bg-white p-10 md:row-span-2">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <span className="text-4xl mb-6 block">🛡️</span>
                  <h3 className="font-display text-3xl font-bold mb-4">Safe, girl-only community</h3>
                  <p className="text-muted leading-relaxed text-lg">
                    A space where you can be fully yourself. No judgement, no pressure — just genuine warmth and good energy. Every event is a safe space designed for real connection.
                  </p>
                </div>
                <div className="mt-8 flex -space-x-2">
                  {['🇺🇸', '🇬🇧', '🇫🇷', '🇧🇷', '🇩🇪', '🇮🇹', '🇯🇵', '🇪🇸'].map((f, i) => (
                    <span key={i} className="w-8 h-8 rounded-full bg-surface border-2 border-white flex items-center justify-center text-sm">{f}</span>
                  ))}
                  <span className="w-8 h-8 rounded-full bg-lync text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">80+</span>
                </div>
              </div>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-border bg-white p-10">
              <span className="text-4xl mb-4 block">⚡</span>
              <h3 className="font-display text-2xl font-bold mb-3">Make friends fast</h3>
              <p className="text-muted leading-relaxed">No more months of awkward small talk. Show up, connect, leave with numbers saved and plans made.</p>
            </SpotlightCard>

            <SpotlightCard className="rounded-3xl border border-border bg-white p-10">
              <span className="text-4xl mb-4 block">🗓️</span>
              <h3 className="font-display text-2xl font-bold mb-3">Weekly curated events</h3>
              <p className="text-muted leading-relaxed">Sunset yoga, tapas crawls, pottery, hiking. Always something happening, always thoughtfully planned.</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 md:py-32 border-b border-border">
        <div className="mx-auto max-w-6xl px-5">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">Upcoming</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold">This month at LYNC</h2>
            </div>
            <Link href="/events" className="hidden md:inline-flex items-center gap-2 text-lync font-semibold text-sm hover:gap-3 transition-all">
              All events <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <Link href="/events" className="md:hidden inline-flex items-center gap-2 text-lync font-semibold text-sm mt-8 hover:gap-3 transition-all">
            View all events <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-dark text-white">
        <div className="mx-auto max-w-6xl px-5">
          <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-16">
            Don&apos;t take our word for it.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-colors">
                <div className="flex gap-0.5 mb-6">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={14} className="fill-lync text-lync" />
                  ))}
                </div>
                <p className="text-white/80 leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-lync/20 flex items-center justify-center text-xs font-bold text-lync">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white/60 text-sm font-medium">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* FAQ */}
      <section className="py-24 md:py-32 bg-surface">
        <div className="mx-auto max-w-2xl px-5">
          <div className="text-center mb-16">
            <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">FAQ</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold">Questions? Answered.</h2>
          </div>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FAQ key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32 border-t border-border">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
            Ready to find<br /><span className="italic text-lync">your people?</span>
          </h2>
          <p className="text-muted text-lg mb-10 max-w-md mx-auto">
            Take a 2-minute quiz and get matched to events that fit your vibe.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-lync text-white font-semibold px-10 py-4 rounded-full text-lg hover:bg-lync-dark transition-colors"
          >
            Take the Quiz <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
