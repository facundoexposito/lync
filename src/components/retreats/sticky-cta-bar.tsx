'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Download } from 'lucide-react'

interface StickyCTABarProps {
  bookingUrl: string
  brochurePath: string
  startingPrice: string
}

export function StickyCTABar({ bookingUrl, brochurePath, startingPrice }: StickyCTABarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function update() {
      const scrollY = window.scrollY
      const pastHero = scrollY > 500

      // Hide when pricing or bottom CTA section is in viewport
      const pricing = document.getElementById('pricing')
      const bottomCta = document.getElementById('bottom-cta')

      let sectionVisible = false

      for (const el of [pricing, bottomCta]) {
        if (!el) continue
        const rect = el.getBoundingClientRect()
        // Consider visible if any part is within viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          sectionVisible = true
          break
        }
      }

      const show = pastHero && !sectionVisible
      setVisible(show)
      document.documentElement.setAttribute('data-sticky-cta', show ? '1' : '0')
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.documentElement.removeAttribute('data-sticky-cta')
    }
  }, [])

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-50 border-t border-border/50 bg-white/95 backdrop-blur-lg transition-transform duration-300 pb-[env(safe-area-inset-bottom)] ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-3 sm:px-8">
        {/* Price hint — hidden on very small screens */}
        <p className="hidden text-sm font-medium text-dark sm:block">
          From <span className="text-lg font-bold text-lync">{startingPrice}</span>
          <span className="text-muted"> / person</span>
        </p>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <a
            href={brochurePath}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold text-dark transition-all hover:border-lync/30 hover:shadow-sm sm:flex-initial sm:px-5"
          >
            Brochure <Download size={14} />
          </a>

          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-[#5a96f5] to-lync-dark px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-shadow hover:shadow-md sm:flex-initial sm:px-6"
          >
            Book Now <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
