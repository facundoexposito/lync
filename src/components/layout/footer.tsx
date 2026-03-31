import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <>
      {/* WhatsApp */}
      <a
        href="https://wa.me/13107411846?text=Hi!%20I%E2%80%99m%20interested%20in%20joining%20a%20Lync%20event%20%F0%9F%98%8A"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white rounded-full p-3.5 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
        aria-label="WhatsApp"
      >
        <MessageCircle size={22} />
      </a>

      <footer className="bg-dark text-white">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <Link href="/" className="relative mb-6 block h-9 w-32 md:h-10 md:w-36" aria-label="LYNC — Home">
                <Image
                  src="/brand/LOGO_WHITETEXT_NOBG.png"
                  alt=""
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 128px, 144px"
                />
              </Link>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Making meaningful friendships in Madrid, one event at a time.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Navigate</h4>
              <ul className="space-y-2.5">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/events', label: 'Events' },
                  { href: '/about', label: 'About' },
                  { href: '/quiz', label: 'Take the Quiz' },
                  { href: '/study-abroad', label: 'Study Abroad' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">Social</h4>
              <ul className="space-y-2.5">
                {['Instagram', 'TikTok', 'YouTube'].map((name) => (
                  <li key={name}>
                    <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">{name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs">© 2026 LYNC Events. All rights reserved.</p>
            <div className="flex gap-6 text-white/20 text-xs">
              <a href="#" className="hover:text-white/40 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/40 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
