import Image from 'next/image'
import { CtaMotionLink } from '@/components/ui/cta-hover'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/scroll-reveal'

const props = [
  {
    emoji: '🤝',
    title: 'Genuine Connections',
    desc: 'Find friends who just get you.',
  },
  {
    emoji: '📍',
    title: 'Local and Like Minded',
    desc: 'See where attendees are from and meet people with shared experiences.',
  },
  {
    emoji: '🎉',
    title: 'Effortless and Fun',
    desc: 'Say goodbye to awkward introductions. Our events make breaking the ice easy.',
  },
]

export function ValuePropsSection() {
  return (
    <section className="py-24 md:py-32 bg-cream">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photo placeholder */}
          <ScrollReveal>
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl max-w-md mx-auto lg:mx-0">
              <Image
                src="/brand/COMMUNITY/social-two-girls-portrait-restaurant.webp"
                alt="Two friends at a LYNC event"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 28rem"
              />
            </div>
          </ScrollReveal>

          {/* Value props */}
          <div className="space-y-10">
            {props.map((prop, i) => (
              <ScrollReveal key={prop.title} delay={i * 0.1}>
                <div className="flex gap-5">
                  <span className="text-3xl flex-shrink-0 mt-1">{prop.emoji}</span>
                  <div>
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-normal mb-2">{prop.title}</h3>
                    <p className="text-muted leading-relaxed">{prop.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.3}>
              <CtaMotionLink
                href="/about"
                className="inline-flex items-center gap-2 bg-dark text-white font-semibold px-8 py-4 rounded-full hover:bg-lync transition-colors"
              >
                About LYNC <ArrowRight size={18} />
              </CtaMotionLink>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
