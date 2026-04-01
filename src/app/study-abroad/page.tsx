import type { Metadata } from 'next'
import { HighlightStroke } from '@/components/ui/highlight-stroke'
import { StudyAbroadTabs, RotatingEmoji } from '@/components/study-abroad/study-abroad-tabs'

export const metadata: Metadata = {
  title: 'Study Abroad in Madrid | LYNC',
  description:
    'Expert guidance for studying abroad in Madrid. University selection, visa support, on-ground integration, and free resources for international students.',
  openGraph: {
    title: 'Study Abroad in Madrid | LYNC',
    description:
      'Expert guidance for studying abroad in Madrid. University selection, visa support, and community integration.',
    type: 'website',
  },
}

export default function StudyAbroadPage() {
  return (
    <>
      {/* White hero title */}
      <section className="bg-white pb-8 pt-22 md:pb-10 md:pt-26">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 text-center">
          <RotatingEmoji />
          <h1 className="mb-4 font-display text-5xl font-semibold uppercase tracking-normal md:text-6xl">
            Study{' '}
            <span className="relative inline-block">
              Abroad
              <HighlightStroke
                className="absolute -bottom-1 left-0 w-full"
                strokeWidth={5}
              />
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted md:text-xl">
            Expert guidance and community support to make your Madrid study
            abroad experience unforgettable.
          </p>
        </div>
      </section>

      {/* Cream content */}
      <section className="bg-cream pb-16 pt-10 md:pb-24 md:pt-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <StudyAbroadTabs />
        </div>
      </section>
    </>
  )
}
