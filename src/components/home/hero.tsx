'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BlurText from '@/components/ui/blur-text'
import ShinyText from '@/components/ui/shiny-text'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Blue gradient orb */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-lync/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 text-center pt-24">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 border border-border rounded-full px-4 py-2 mb-10 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-muted text-sm">500+ women connected in Madrid</span>
        </div>

        {/* Headline */}
        <BlurText
          text="Make Friends in Madrid"
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold justify-center leading-[0.95] mb-2"
          delay={80}
        />
        <BlurText
          text="in Minutes."
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold italic text-lync justify-center leading-[0.95] mb-8"
          delay={80}
        />

        {/* Subtext */}
        <p className="text-muted text-lg md:text-xl max-w-lg mx-auto mb-12 animate-fade-up delay-300 leading-relaxed">
          Join hundreds of international women building real friendships through curated events. No awkward apps — just real connection.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-400">
          <Link
            href="/quiz"
            className="group inline-flex items-center justify-center gap-2 bg-lync text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-lync-dark transition-all duration-200 hover:shadow-lg hover:shadow-lync/20"
          >
            <ShinyText text="Find Your Experience" color="#ffffff" shineColor="#a8d4ff" speed={4} />
            <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 border-2 border-border text-dark font-medium px-8 py-4 rounded-full text-lg hover:border-dark transition-colors"
          >
            Browse Events
          </Link>
        </div>

        {/* Social proof row */}
        <div className="flex items-center justify-center gap-5 mt-16 animate-fade-up delay-400">
          <div className="flex -space-x-2">
            {['🇺🇸', '🇬🇧', '🇫🇷', '🇧🇷', '🇮🇹'].map((flag, i) => (
              <span
                key={i}
                className="w-9 h-9 rounded-full bg-surface border-2 border-white flex items-center justify-center text-sm"
              >
                {flag}
              </span>
            ))}
          </div>
          <div className="text-sm text-muted">
            Women from <span className="font-semibold text-dark">80+ countries</span>
          </div>
        </div>
      </div>
    </section>
  )
}
