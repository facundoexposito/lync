import Link from 'next/link'
import { EventCard } from '@/components/events/event-card'
import { events } from '@/data/events'
import { testimonials } from '@/data/testimonials'
import { faqs } from '@/data/faq'
import { Sparkles, Users, Calendar, Heart, Star, ChevronDown, ArrowRight, MapPin, Globe, Shield } from 'lucide-react'
import { FAQ } from '@/components/ui/faq'

export default function Home() {
  const upcomingEvents = events.slice(0, 3)

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-lync-navy via-lync-navy to-lync-blue" />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212,168,83,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0,122,255,0.2) 0%, transparent 50%)',
        }} />

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-lync-gold/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 left-[5%] w-48 h-48 rounded-full bg-lync-blue/10 blur-2xl animate-float delay-200" />

        <div className="relative z-10 container mx-auto px-5 md:px-8 max-w-7xl py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 animate-fade-up">
              <MapPin size={16} className="text-lync-gold" />
              <span className="text-white/90 text-sm font-medium">Madrid&apos;s #1 women&apos;s community</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.95] mb-6 animate-fade-up delay-100">
              Make Friends<br />
              <span className="italic text-lync-gold">in Minutes</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl mb-10 animate-fade-up delay-200 leading-relaxed">
              Join hundreds of international women building real friendships through curated events in Madrid. No awkward apps. Just real connection.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center gap-2 bg-lync-gold text-lync-navy font-semibold px-8 py-4 rounded-full text-lg hover:bg-lync-gold-light transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Find Your Experience
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-medium px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-all duration-200"
              >
                Browse Events
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-6 mt-12 animate-fade-up delay-400">
              <div className="flex -space-x-3">
                {['🇺🇸', '🇬🇧', '🇫🇷', '🇧🇷', '🇩🇪'].map((flag, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg border-2 border-lync-navy">
                    {flag}
                  </div>
                ))}
              </div>
              <div className="text-white/60 text-sm">
                <span className="text-white font-semibold">500+ women</span> from 80+ countries
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={28} className="text-white/30" />
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-5 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-lync-blue font-semibold text-sm tracking-widest uppercase mb-3 block">How It Works</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Four Steps to Your<br />New Friend Group
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {[
              { icon: Sparkles, title: 'Take the Quiz', desc: 'Tell us about yourself and what kind of experiences you love', color: 'bg-lync-lavender', iconColor: 'text-purple-600', num: '01' },
              { icon: Users, title: 'Get Matched', desc: 'We recommend events and groups that fit your vibe perfectly', color: 'bg-lync-blue-light', iconColor: 'text-lync-blue', num: '02' },
              { icon: Calendar, title: 'Join an Event', desc: 'RSVP and show up — we handle the rest', color: 'bg-lync-gold-light', iconColor: 'text-amber-600', num: '03' },
              { icon: Heart, title: 'Make Friends', desc: 'Build real connections that last way beyond the event', color: 'bg-lync-rose', iconColor: 'text-rose-500', num: '04' },
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className={`${step.color} rounded-3xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                  <span className="text-xs font-bold text-black/20 tracking-widest">{step.num}</span>
                  <div className="mt-4 mb-5">
                    <step.icon size={28} className={step.iconColor} />
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 z-10">
                    <ArrowRight size={16} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why LYNC */}
      <section className="py-20 md:py-28 bg-lync-cream">
        <div className="container mx-auto px-5 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-lync-gold font-semibold text-sm tracking-widest uppercase mb-3 block">Why LYNC</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Not Just Events.<br /><span className="italic">Real Friendships.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Heart, title: 'Make friends fast', desc: 'No more months of awkward small talk. Our events are designed so you leave with numbers saved and plans made.', accent: 'border-l-lync-gold' },
              { icon: Shield, title: 'Safe, girl-only community', desc: 'A space where you can be fully yourself. No judgement, no pressure — just genuine warmth and good energy.', accent: 'border-l-lync-blue' },
              { icon: Calendar, title: 'Weekly curated events', desc: 'From sunset yoga to tapas crawls, pottery to hiking. There\'s always something happening, and it\'s always thoughtfully planned.', accent: 'border-l-rose-400' },
              { icon: Globe, title: '80+ nationalities', desc: 'Meet women from all over the world who totally get what it\'s like to be new somewhere. The diversity is magic.', accent: 'border-l-purple-400' },
            ].map((feature, i) => (
              <div key={i} className={`bg-white rounded-2xl p-8 border-l-4 ${feature.accent} hover:shadow-md transition-all duration-300`}>
                <feature.icon size={24} className="text-lync-navy mb-4" />
                <h3 className="font-display text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Preview */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-5 md:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
            <div>
              <span className="text-lync-blue font-semibold text-sm tracking-widest uppercase mb-3 block">What&apos;s Coming Up</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold">This Month at LYNC</h2>
            </div>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-lync-blue font-semibold hover:gap-3 transition-all duration-200"
            >
              View all events <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-lync-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(212,168,83,0.4) 0%, transparent 50%)',
        }} />
        <div className="relative z-10 container mx-auto px-5 md:px-8 max-w-7xl">
          <div className="text-center mb-16">
            <span className="text-lync-gold font-semibold text-sm tracking-widest uppercase mb-3 block">Testimonials</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
              What Girls Are Saying
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/[0.07] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:bg-white/[0.12] transition-all duration-300">
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={18} className="fill-lync-gold text-lync-gold" />
                  ))}
                </div>
                <p className="text-white/90 mb-6 leading-relaxed italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-lync-gold/20 flex items-center justify-center text-sm font-bold text-lync-gold">
                    {t.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-lync-gold font-semibold">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 md:py-20 bg-lync-cream">
        <div className="container mx-auto px-5 md:px-8 max-w-5xl">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {[
              { number: '500+', label: 'Women Connected' },
              { number: '80+', label: 'Nationalities' },
              { number: '50+', label: 'Events Hosted' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-lync-blue mb-1">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-5 md:px-8 max-w-3xl">
          <div className="text-center mb-16">
            <span className="text-lync-blue font-semibold text-sm tracking-widest uppercase mb-3 block">FAQ</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Got Questions?
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQ key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-lync-navy to-lync-blue relative overflow-hidden">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 30% 70%, rgba(212,168,83,0.15) 0%, transparent 50%)',
        }} />
        <div className="relative z-10 container mx-auto px-5 md:px-8 max-w-3xl text-center">
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Find<br /><span className="italic text-lync-gold">Your People?</span>
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-xl mx-auto leading-relaxed">
            Take a 2-minute quiz and get matched to events that fit your vibe. Your Madrid friend group is waiting.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-lync-gold text-lync-navy font-semibold px-10 py-5 rounded-full text-lg hover:bg-lync-gold-light transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Take the Quiz Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
