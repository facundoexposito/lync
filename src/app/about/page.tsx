import Link from 'next/link'
import { Heart, Users, Sparkles, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | LYNC',
  description: 'Meet the founders of LYNC and learn about our mission to help international women build meaningful friendships in Madrid.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-cream text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h1 className="mb-6 font-nav text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Our Story
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Building a community where every woman feels welcome, connected, and at home in Madrid.
          </p>
        </div>
      </section>

      {/* Founders Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="aspect-square bg-cream rounded-2xl flex items-center justify-center">
                <p className="text-dark/30 text-center px-4">
                  Photo: Rebecca &amp; Cordelia, LYNC founders
                </p>
              </div>
            </div>
            <div>
              <h2 className="mb-6 font-nav text-4xl font-semibold uppercase tracking-normal">
                Hey! We&apos;re Rebecca and Cordelia
              </h2>
              <div className="space-y-4 text-muted">
                <p>
                  We&apos;re the founders of LYNC, and we know exactly what it&apos;s like to be new in Madrid.
                </p>
                <p>
                  When we first moved here, we were searching for the same thing you probably are — genuine friendships with amazing women who get it. Women who understand what it&apos;s like to navigate a new city, build a life from scratch, and crave real connection.
                </p>
                <p>
                  We tried everything. Dating apps for friends (awkward). Random meetups (hit or miss). Hoping to click with coworkers (rarely happens). Nothing felt quite right.
                </p>
                <p>
                  So we decided to create the community we wished existed. A safe, welcoming space where making friends doesn&apos;t have to be so hard. Where you can show up solo and leave with a group. Where everyone is here for the same reason — to build real, lasting friendships.
                </p>
                <p className="font-semibold text-dark">
                  That&apos;s LYNC. And we&apos;re so glad you&apos;re here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 md:py-24 bg-dark text-white">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-16 text-center font-nav text-4xl font-semibold uppercase tracking-normal md:text-5xl">
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
              <div key={i} className="text-center animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-16 h-16 bg-lync/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-lync" />
                </div>
                <h3 className="mb-3 font-nav text-2xl font-semibold uppercase tracking-normal">{value.title}</h3>
                <p className="text-white/70">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 text-center">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-6 font-nav text-4xl font-semibold uppercase tracking-normal md:text-5xl">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
            Your Madrid friend group is waiting. Take the quiz and find your perfect events.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-lync text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-lync-dark transition-colors"
          >
            Take the Quiz <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  )
}
