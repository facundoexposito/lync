import { BookOpen, ArrowRight } from 'lucide-react'
import { CtaMotionButton } from '@/components/ui/cta-hover'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | LYNC',
  description: 'Tips, stories, and inspiration for your Madrid adventure.',
}

export default function BlogPage() {
  return (
    <section className="py-16 md:py-24 bg-cream min-h-[60vh] flex items-center justify-center text-center">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-lync/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-lync" />
          </div>
          <h1 className="mb-6 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Coming Soon
          </h1>
          <p className="text-xl text-muted mb-8">
            Tips, stories, and inspiration for your Madrid adventure. We&apos;re currently building this section. Check back soon!
          </p>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="mb-4 font-display text-2xl font-semibold uppercase tracking-normal">Stay in the Loop</h3>
            <p className="text-muted mb-6">
              Want to be the first to know when we launch the blog? Drop your email below.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-lync focus:outline-none transition-colors"
              />
              <CtaMotionButton
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-b from-[#5a96f5] to-lync-dark text-white font-semibold px-8 py-4 rounded-full text-lg shadow-sm transition-shadow hover:shadow-md"
              >
                Notify Me <ArrowRight size={18} />
              </CtaMotionButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
