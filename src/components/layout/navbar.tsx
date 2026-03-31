'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

import { PAGE_SHELL } from '@/lib/page-shell'

const ROW_H = 'min-h-[2.75rem] md:min-h-[3rem]'

/** Keep 1px border always so scroll state doesn’t reflow layout */
const navShellTransition =
  'transition-[background-color,backdrop-filter,box-shadow,border-color] duration-200 ease-out'

/** Desktop nav links: same tap/hit padding in hero + scrolled so nothing “shrinks” on scroll */
const DESKTOP_LINK_PAD =
  'rounded-full px-3.5 py-1.5 transition-[color,text-decoration-color] duration-150'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/study-abroad', label: 'Study Abroad' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <nav style={{ fontFamily: 'var(--font-nav)' }} className="pointer-events-auto pt-3">
        <div className={PAGE_SHELL}>
          <div
            className={`w-full rounded-full px-3 py-2 md:px-5 md:py-2.5 ${navShellTransition} ${
              scrolled
                ? 'border border-black/[0.08] bg-white/95 shadow-xl backdrop-blur-md'
                : 'border border-transparent bg-transparent shadow-none [backdrop-filter:none]'
            }`}
          >
            <div className={`hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-0 ${ROW_H}`}>
              <Link
                href="/"
                className="relative h-8 w-32 shrink-0 justify-self-start"
                aria-label="LYNC — Home"
              >
                <Image
                  src={scrolled ? '/brand/LOGO_BLUETEXT_NOBG.png' : '/brand/LOGO_WHITETEXT_NOBG.png'}
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="120px"
                  priority
                />
              </Link>

              <div className="flex items-center justify-center gap-1 lg:gap-2">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  let linkClass: string
                  if (scrolled) {
                    linkClass = isActive
                      ? 'text-black font-bold underline decoration-lync decoration-2 underline-offset-[6px]'
                      : 'text-black hover:text-black underline-offset-[6px] decoration-lync decoration-2 hover:underline'
                  } else {
                    linkClass = isActive ? 'text-white font-bold' : 'text-white'
                  }
                  const heroHover = scrolled
                    ? 'border border-transparent bg-transparent hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lync focus-visible:ring-offset-2'
                    : 'border border-transparent bg-transparent hover:border-border hover:bg-white hover:text-black hover:shadow-sm focus-visible:border-border focus-visible:bg-white focus-visible:text-black focus-visible:outline-none'
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`inline-flex items-center justify-center text-base font-semibold leading-none lg:text-lg ${DESKTOP_LINK_PAD} ${linkClass} ${heroHover}`}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </div>

              <div className="flex justify-self-end">
                <Link
                  href="/quiz"
                  className="inline-flex items-center gap-1.5 rounded-full bg-lync px-5 py-2 text-base font-semibold text-white transition-colors duration-150 hover:bg-lync-dark lg:px-6 lg:text-lg"
                >
                  Take the Quiz <ArrowRight size={16} strokeWidth={2.25} />
                </Link>
              </div>
            </div>

            <div className={`flex items-center md:hidden ${ROW_H} pl-0 pr-0`}>
              <Link href="/" className="relative h-8 w-28 shrink-0" aria-label="LYNC — Home">
                <Image
                  src={scrolled ? '/brand/LOGO_BLUETEXT_NOBG.png' : '/brand/LOGO_WHITETEXT_NOBG.png'}
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="128px"
                  priority
                />
              </Link>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`ml-auto p-1.5 transition-colors duration-150 ${scrolled ? 'text-black' : 'text-white'}`}
                aria-label="Menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className={`${PAGE_SHELL} mt-2 md:hidden`}>
            <div className="animate-scale-in rounded-2xl border border-border bg-white p-5 shadow-2xl">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-xl py-3 px-4 text-base font-semibold ${
                    pathname === link.href ? 'bg-lync-light text-lync' : 'text-dark hover:bg-surface'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                className="mt-3 flex items-center justify-center gap-2 rounded-full bg-lync py-3 text-base font-semibold text-white"
                onClick={() => setIsOpen(false)}
              >
                Take the Quiz <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
