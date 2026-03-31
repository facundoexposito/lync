'use client'

import CountUp from '@/components/ui/count-up'

const stats = [
  { to: 2300, suffix: '+', label: 'Girls Have Joined LYNC' },
  { to: 87, suffix: '', label: 'New Members This Week' },
  { to: 48, suffix: '', label: 'Hours to Sell Out Events' },
]

export function StatsSection() {
  return (
    <section className="py-20 md:py-24 border-b border-border">
      <div className="mx-auto max-w-4xl px-5">
        <div className="grid grid-cols-3 divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="text-center px-4">
              <div className="font-nav text-4xl sm:text-5xl md:text-6xl font-bold text-lync">
                <CountUp to={stat.to} suffix={stat.suffix} duration={2.5} />
              </div>
              <div className="mt-2 text-sm font-semibold uppercase tracking-normal text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
