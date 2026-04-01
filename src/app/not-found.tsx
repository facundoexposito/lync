import { CtaMotionLink } from '@/components/ui/cta-hover'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p className="text-lync font-semibold text-sm tracking-widest uppercase mb-4">404</p>
        <h1 className="mb-4 font-display text-5xl font-semibold uppercase tracking-normal text-dark md:text-6xl">
          Page not found
        </h1>
        <p className="text-muted mb-10">
          Looks like you&apos;ve wandered off the map. Let&apos;s get you back to making friends.
        </p>
        <CtaMotionLink
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-b from-[#5a96f5] to-lync-dark text-white font-semibold px-8 py-4 rounded-full shadow-sm transition-shadow hover:shadow-md"
        >
          <ArrowLeft size={18} /> Back to Home
        </CtaMotionLink>
      </div>
    </div>
  )
}
