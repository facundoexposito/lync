'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CtaMotionA } from '@/components/ui/cta-hover'
import { usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Footer() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <>
      <CtaMotionA
        href="https://wa.me/13107411846?text=Hi!%20I%E2%80%99m%20interested%20in%20joining%20a%20Lync%20event%20%F0%9F%98%8A"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#25D366] p-3.5 text-white shadow-lg transition-shadow duration-200 hover:shadow-xl"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </CtaMotionA>

      <footer
        className={cn(
          'text-white',
          isHome ? 'bg-lync' : 'bg-dark',
        )}
      >
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="flex flex-col items-start">
              <Link
                href="/"
                className="relative mb-6 inline-block h-9 shrink-0 md:h-10"
                aria-label="LYNC — Home"
              >
                <Image
                  src="/brand/LOGO_WHITETEXT_NOBG.png"
                  alt=""
                  width={640}
                  height={200}
                  className="block h-9 w-auto max-w-[min(100%,10.5rem)] object-contain object-left md:h-10 md:max-w-[min(100%,12rem)]"
                  sizes="(max-width: 768px) 168px, 192px"
                />
              </Link>
              <p className="max-w-xs font-nav text-sm leading-relaxed text-white/55">
                Making meaningful friendships in Madrid,
                <br />
                one event at a time.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-nav text-xs font-semibold uppercase tracking-widest text-white/45">
                Navigate
              </h4>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/events', label: 'Events' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/about', label: 'About' },
                  { href: '/quiz', label: 'Take the Quiz' },
                  { href: '/study-abroad', label: 'Study Abroad' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-nav text-xs font-semibold uppercase tracking-widest text-white/45">
                Social
              </h4>
              <ul className="space-y-2.5">
                {['Instagram', 'TikTok', 'YouTube'].map((name) => (
                  <li key={name}>
                    <a
                      href="#"
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={cn(
              'mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:mt-14 md:flex-row',
              isHome ? 'border-white/15' : 'border-white/10',
            )}
          >
            <p className="text-xs text-white/35">© 2026 LYNC Events. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-white/35">
              <a href="#" className="transition-colors hover:text-white/55">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white/55">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
