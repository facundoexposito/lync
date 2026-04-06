'use client'

import { useEffect, useRef } from 'react'

interface AcuityEmbedProps {
  ownerKey?: string
  className?: string
}

export function AcuityEmbed({
  ownerKey = '62219b14',
  className,
}: AcuityEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Acuity's embed.js for auto-resize after iframe mounts
    const script = document.createElement('script')
    script.src = 'https://embed.acuityscheduling.com/js/embed.js'
    script.async = true
    containerRef.current?.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      <iframe
        src={`https://app.acuityscheduling.com/schedule.php?owner=34535783&ownerKey=${ownerKey}&color=%233679F1`}
        title="Schedule Appointment"
        width="100%"
        height="800"
        frameBorder="0"
      />
    </div>
  )
}
