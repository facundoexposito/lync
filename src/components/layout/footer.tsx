import Link from 'next/link'
import { MessageCircle, Globe, Heart } from 'lucide-react'

export function Footer() {
  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/13107411846?text=Hi!%20I%E2%80%99m%20interested%20in%20joining%20a%20Lync%20event%20%F0%9F%98%8A"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>

      <footer className="bg-lync-navy">
        <div className="container mx-auto px-5 md:px-8 max-w-7xl py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <h3 className="font-display text-3xl font-bold text-white mb-4">LYNC</h3>
              <p className="text-white/50 leading-relaxed max-w-sm">
                Making meaningful friendships in Madrid, one event at a time. Because everyone deserves a friend group that feels like home.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Navigate</h4>
              <ul className="space-y-3">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/events', label: 'Events' },
                  { href: '/about', label: 'About' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/study-abroad', label: 'Study Abroad' },
                  { href: '/quiz', label: 'Take the Quiz' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/50 hover:text-white transition-colors text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Connect</h4>
              <div className="flex gap-3">
                {[
                  { icon: Globe, href: '#', label: 'Instagram' },
                  { icon: Heart, href: '#', label: 'TikTok' },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/30 text-sm">© 2026 LYNC Events. All rights reserved.</p>
            <div className="flex gap-6 text-white/30 text-sm">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
