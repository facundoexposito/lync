'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CtaMotionA } from '@/components/ui/cta-hover'
import { MessageCircle } from 'lucide-react'

export function Footer() {
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

      <footer className="bg-lync text-white">
        <div className="mx-auto max-w-6xl px-5 py-10 md:py-12">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
            {/* Logo + tagline */}
            <div className="text-center md:text-left">
              <Link href="/" className="relative mb-3 inline-block h-8 md:h-9" aria-label="LYNC — Home">
                <Image
                  src="/brand/LOGO_WHITETEXT_NOBG.png"
                  alt=""
                  width={640}
                  height={200}
                  className="block h-8 w-auto max-w-[9rem] object-contain md:h-9 md:max-w-[10rem]"
                  sizes="160px"
                />
              </Link>
              <p className="max-w-xs text-sm leading-relaxed text-white/55">
                Making meaningful friendships in Madrid, one event at a time.
              </p>
            </div>

            {/* Links */}
            <nav className="flex gap-10 text-center md:gap-14 md:text-left">
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
                  Explore
                </h4>
                <ul className="space-y-2">
                  {[
                    { href: '/events', label: 'Events' },
                    { href: '/retreats', label: 'Retreats' },
                    { href: '/blog', label: 'Blog' },
                    { href: '/about', label: 'About' },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/45">
                  Connect
                </h4>
                <ul className="space-y-2">
                  {[
                    { href: '/quiz', label: 'Take the Quiz' },
                    { href: 'https://instagram.com', label: 'Instagram', external: true },
                    { href: 'https://tiktok.com', label: 'TikTok', external: true },
                  ].map((link) => (
                    <li key={link.label}>
                      {'external' in link ? (
                        <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 transition-colors hover:text-white">
                          {link.label}
                        </a>
                      ) : (
                        <Link href={link.href} className="text-sm text-white/60 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/35 md:flex-row">
            <p>&copy; 2026 LYNC Events. All rights reserved.</p>
            <div className="flex gap-5">
              <a href="#" className="transition-colors hover:text-white/55">Privacy</a>
              <a href="#" className="transition-colors hover:text-white/55">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
