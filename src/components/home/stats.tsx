'use client'

import CountUp from '@/components/ui/count-up'

export function StatsSection() {
  return (
    <section className="py-20 md:py-24 border-b border-border">
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid grid-cols-3 divide-x divide-border">
          {[
            { to: 500, suffix: '+', label: 'Women Connected' },
            { to: 80, suffix: '+', label: 'Nationalities' },
            { to: 50, suffix: '+', label: 'Events Hosted' },
          ].map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-lync">
                <CountUp to={stat.to} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="text-muted text-sm mt-2 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
