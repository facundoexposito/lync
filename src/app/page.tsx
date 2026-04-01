import { HeroSection } from '@/components/home/hero'
import { TrustBento } from '@/components/home/trust-bento'
import { ThisMonth } from '@/components/home/this-month'
import { WhyLync } from '@/components/home/why-lync'
import { QuizSection } from '@/components/home/quiz-section'
import { EventsShowcase } from '@/components/home/events-showcase'
import { Testimonials } from '@/components/home/testimonials'
import { FaqSection } from '@/components/home/faq-section'
import { BrandStripMarquee } from '@/components/home/brand-strip-marquee'
import { BlogSection } from '@/components/home/blog-section'
import { CtaSection } from '@/components/home/cta-section'

export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandStripMarquee />
      <TrustBento />
      <ThisMonth />
      <WhyLync />
      <QuizSection />
      <EventsShowcase />
      <Testimonials />
      <FaqSection />
      <BrandStripMarquee />
      <BlogSection />
      <CtaSection />
    </>
  )
}
