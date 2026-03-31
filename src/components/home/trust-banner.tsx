import { Globe, Shield, Star, Heart } from 'lucide-react'

const stats = [
  { icon: Globe, text: '40+ nationalities' },
  { icon: Shield, text: 'Girl-only community' },
  { icon: Star, text: '4.9/5 event rating' },
  { icon: Heart, text: '2,300+ members' },
]

export function TrustBanner() {
  return (
    <section className="bg-lync-dark py-4">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-2 text-white text-sm font-medium py-2">
              <Icon size={16} className="text-white/70 flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
