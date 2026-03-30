import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function Footer() {
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/study-abroad', label: 'Study Abroad' },
  ]

  const socialLinks = [
    { href: '#', label: 'Instagram' },
    { href: '#', label: 'YouTube' },
    { href: '#', label: 'Facebook' },
  ]

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href="#"
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      {/* Footer */}
      <footer className="bg-lync-navy text-white">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Tagline */}
            <div>
              <h3 className="font-display text-3xl font-bold mb-4">LYNC</h3>
              <p className="text-gray-300">
                Making meaningful friendships in Madrid, one event at a time.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm underline"
                    aria-label={social.label}
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 LYNC Events. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}
