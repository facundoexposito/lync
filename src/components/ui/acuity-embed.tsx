'use client'

import Script from 'next/script'

interface AcuityEmbedProps {
  ownerKey?: string
  className?: string
}

export function AcuityEmbed({
  ownerKey = '62219b14',
  className,
}: AcuityEmbedProps) {
  return (
    <div className={className}>
      <iframe
        src={`https://app.acuityscheduling.com/schedule.php?owner=34535783&ownerKey=${ownerKey}`}
        title="Schedule Appointment"
        width="100%"
        height="800"
        frameBorder="0"
      />
      <Script
        src="https://embed.acuityscheduling.com/js/embed.js"
        strategy="afterInteractive"
      />
    </div>
  )
}
