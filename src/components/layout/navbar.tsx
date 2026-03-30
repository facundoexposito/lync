'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/study-abroad', label: 'Study Abroad' },
    { href: '/blog', label: 'Blog' },
  ]

  const navBg = scrolled || !isHome
    ? 'bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm'
    : 'bg-transparent'

  const textColor = scrolled || !isHome ? 'text-lync-navy' : 'text-white'
  const logoColor = scrolled || !isHome ? 'text-lync-navy' : 'text-white'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="container mx-auto px-5 md:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className={`font-display text-2xl md:text-3xl font-bold transition-colors ${logoColor}`}>
            LYNC
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-all duration-200 hover:opacity-100 ${textColor} ${
                  pathname === link.href ? 'opacity-100' : 'opacity-70'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              className="inline-flex items-center gap-2 bg-lync-gold text-lync-navy font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-lync-gold-light transition-all duration-200"
            >
              Take the Quiz
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 ${textColor}`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden bg-white rounded-2xl shadow-xl mx-0 mb-4 p-6 animate-scale-in">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-lync-navy font-medium py-3 px-4 rounded-xl transition-colors ${
                    pathname === link.href ? 'bg-lync-cream' : 'hover:bg-lync-cream/50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quiz"
                className="mt-3 flex items-center justify-center gap-2 bg-lync-gold text-lync-navy font-semibold py-3 rounded-full"
                onClick={() => setIsOpen(false)}
              >
                Take the Quiz
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
