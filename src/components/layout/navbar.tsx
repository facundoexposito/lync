'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const links = [
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/study-abroad', label: 'Study Abroad' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="font-display text-2xl md:text-3xl font-bold text-lync-navy">
            LYNC
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-lync-navy hover:text-lync-blue transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/quiz">
              <Button size="md">Take the Quiz</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-lync-navy"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lync-navy hover:text-lync-blue transition-colors font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/quiz" onClick={() => setIsOpen(false)}>
                <Button size="md" className="w-full">
                  Take the Quiz
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
