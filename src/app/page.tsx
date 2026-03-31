import { HeroSection } from '@/components/home/hero'
import { TrustBento } from '@/components/home/trust-bento'
import { ThisMonth } from '@/components/home/this-month'
import { WhyLync } from '@/components/home/why-lync'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBento />
      <ThisMonth />
      <WhyLync />
    </>
  )
}
