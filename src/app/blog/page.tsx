import { Section } from '@/components/layout/section'
import { Button } from '@/components/ui/button'
import { BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | LYNC',
  description: 'Tips, stories, and inspiration for your Madrid adventure.',
}

export default function BlogPage() {
  return (
    <>
      <Section background="cream" className="min-h-[60vh] flex items-center justify-center text-center">
        <div className="max-w-2xl">
          <div className="w-20 h-20 bg-lync-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen size={40} className="text-lync-blue" />
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            Coming Soon
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Tips, stories, and inspiration for your Madrid adventure. We're currently building this section — check back soon!
          </p>
          <div className="bg-white rounded-2xl p-8 max-w-md mx-auto">
            <h3 className="font-display text-2xl font-bold mb-4">Stay in the Loop</h3>
            <p className="text-gray-600 mb-6">
              Want to be the first to know when we launch the blog? Drop your email below.
            </p>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-lync-blue focus:outline-none transition-colors"
              />
              <Button size="lg" className="w-full">
                Notify Me
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  )
}
