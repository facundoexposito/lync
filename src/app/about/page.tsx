import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Users, Sparkles } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | LYNC',
  description: 'Meet the founders of LYNC and learn about our mission to help international women build meaningful friendships in Madrid.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section background="cream" className="text-center">
        <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
          Our Story
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Building a community where every woman feels welcome, connected, and at home in Madrid.
        </p>
      </Section>

      {/* Founders Story */}
      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Placeholder for founders photo */}
            <div className="aspect-square bg-lync-cream rounded-2xl flex items-center justify-center">
              <p className="text-lync-navy/40 text-center px-4">
                Photo: Rebecca & Cordelia, LYNC founders
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-display text-4xl font-bold mb-6">
              Hey! We're Rebecca and Cordelia
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We're the founders of LYNC, and we know exactly what it's like to be new in Madrid.
              </p>
              <p>
                When we first moved here, we were searching for the same thing you probably are — genuine friendships with amazing women who get it. Women who understand what it's like to navigate a new city, build a life from scratch, and crave real connection.
              </p>
              <p>
                We tried everything. Dating apps for friends (awkward). Random meetups (hit or miss). Hoping to click with coworkers (rarely happens). Nothing felt quite right.
              </p>
              <p>
                So we decided to create the community we wished existed. A safe, welcoming space where making friends doesn't have to be so hard. Where you can show up solo and leave with a group. Where everyone is here for the same reason — to build real, lasting friendships.
              </p>
              <p className="font-semibold text-lync-navy">
                That's LYNC. And we're so glad you're here.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Mission & Values */}
      <Section background="navy">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center mb-16">
          What We Believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Heart,
              title: 'Connection Over Perfection',
              desc: 'We create spaces where you can be yourself, no pretending required.',
            },
            {
              icon: Users,
              title: 'Community First',
              desc: 'Every event is designed to help you build real, lasting friendships.',
            },
            {
              icon: Sparkles,
              title: 'Intentional Experiences',
              desc: 'We curate thoughtful events that bring out the best in everyone.',
            },
          ].map((value, i) => (
            <div key={i} className="text-center fade-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-16 h-16 bg-lync-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon size={32} className="text-lync-gold" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">{value.title}</h3>
              <p className="text-blue-100">{value.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section background="white" className="text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
          Ready to Join Us?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your Madrid friend group is waiting. Take the quiz and find your perfect events.
        </p>
        <Link href="/quiz">
          <Button size="lg">Take the Quiz</Button>
        </Link>
      </Section>
    </>
  )
}
