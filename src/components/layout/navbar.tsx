'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/study-abroad', label: 'Study Abroad' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-display text-2xl font-bold text-dark">
            LYNC
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? 'text-lync' : 'text-muted hover:text-dark'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              className="inline-flex items-center gap-1.5 bg-lync text-white font-semibold px-5 py-2.5 rounded-full text-sm hover:bg-lync-dark transition-colors"
            >
              Take the Quiz <ArrowRight size={14} />
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-dark" aria-label="Menu">
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-2xl border border-border p-5 mb-4 animate-scale-in">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-3 px-4 rounded-xl text-sm font-medium ${
                  pathname === link.href ? 'bg-lync-light text-lync' : 'text-dark hover:bg-surface'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              className="mt-3 flex items-center justify-center gap-2 bg-lync text-white font-semibold py-3 rounded-full text-sm"
              onClick={() => setIsOpen(false)}
            >
              Take the Quiz <ArrowRight size={14} />
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
