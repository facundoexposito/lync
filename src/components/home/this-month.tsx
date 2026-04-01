'use client'

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'motion/react'
import { useRef, useState, useEffect, useCallback } from 'react'
import {
  Wine,
  Dumbbell,
  UtensilsCrossed,
  Music,
  Palette,
  Camera,
  Bike,
  BookOpen,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { CtaHoverWrap } from '@/components/ui/cta-hover'
import { PAGE_SHELL } from '@/lib/page-shell'

const icons: LucideIcon[] = [Wine, Dumbbell, UtensilsCrossed, Music, Palette, Camera, Bike, BookOpen]

const cardData = [
  { alt: 'Tapas night',        img: '/brand/COMMUNITY/sushi-chef-plating.webp' },
  { alt: 'Rooftop drinks',     img: '/brand/COMMUNITY/social-bar-lounge-large-group.webp' },
  { alt: 'Yoga in the park',   img: '/brand/COMMUNITY/yoga-class-tree-pose.webp' },
  { alt: 'Wine tasting',       img: '/brand/COMMUNITY/craft-night-cards-wine-closeup.webp' },
  { alt: 'Brunch club',        img: '/brand/COMMUNITY/social-five-girls-restaurant-booth.webp' },
  { alt: 'Art & paint night',  img: '/brand/COMMUNITY/vision-board-three-girls-showing.webp' },
  { alt: 'Picnic at Retiro',   img: '/brand/COMMUNITY/run-club-viewpoint-arms-raised.webp' },
]

const CARD_COUNT = cardData.length
const MID = Math.floor(CARD_COUNT / 2)

const DESKTOP = { rotationStep: 5, xSpread: 120, yDrop: 40 }
const MOBILE  = { rotationStep: 3, xSpread: 50,  yDrop: 20 }

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  const check = useCallback(() => setMobile(window.innerWidth < 768), [])

  useEffect(() => {
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [check])

  return mobile
}

function RotatingIcon() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % icons.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const Icon = icons[index]

  return (
    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-muted"
        >
          <Icon size={32} strokeWidth={1.5} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function FanCard({
  card,
  index,
  isMobile,
  progress,
  hoveredId,
  setHoveredId,
}: {
  card: (typeof cardData)[number]
  index: number
  isMobile: boolean
  progress: ReturnType<typeof useTransform<number, number>>
  hoveredId: number | null
  setHoveredId: (id: number | null) => void
}) {
  const distFromCenter = index - MID
  const absFromCenter = Math.abs(distFromCenter)
  const cfg = isMobile ? MOBILE : DESKTOP

  const targetRotation = distFromCenter * cfg.rotationStep
  const targetX = distFromCenter * cfg.xSpread
  const targetY = absFromCenter * cfg.yDrop
  const zBase = CARD_COUNT - absFromCenter

  const rotation = useTransform(progress, [0, 1], [0, targetRotation])
  const x = useTransform(progress, [0, 1], [0, targetX])
  const y = useTransform(progress, [0, 1], [0, targetY])

  const isHovered = hoveredId === index
  const dimmed = hoveredId !== null && !isHovered

  let scale = 1
  if (isHovered) scale = 1.08
  else if (dimmed) scale = 0.95

  return (
    <motion.div
      className="absolute w-[130px] cursor-pointer overflow-hidden rounded-xl shadow-xl min-[400px]:w-[150px] sm:w-[180px] md:w-[230px] lg:w-[260px]"
      style={{
        aspectRatio: '9 / 16',
        transformOrigin: 'bottom center',
        zIndex: isHovered ? 40 : zBase,
        rotate: rotation,
        x,
        y,
      }}
      animate={{ scale, opacity: dimmed ? 0.5 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      whileHover={{ zIndex: 40 }}
      onMouseEnter={() => setHoveredId(index)}
      onMouseLeave={() => setHoveredId(null)}
    >
      <Image
        src={card.img}
        alt={card.alt}
        fill
        className="object-cover"
        sizes="(max-width: 400px) 130px, (max-width: 640px) 150px, (max-width: 768px) 180px, (max-width: 1024px) 230px, 260px"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-2 sm:p-3">
        <span className="rounded-full bg-white/90 px-2 py-1 text-[9px] font-semibold text-dark backdrop-blur-sm min-[400px]:px-3 min-[400px]:py-1.5 min-[400px]:text-[10px] sm:text-xs md:text-sm">
          {card.alt}
        </span>
      </div>
    </motion.div>
  )
}

export function ThisMonth() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [hasRevealed, setHasRevealed] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.85', 'start 0.4'],
  })

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(progress, 'change', (v) => {
    if (v >= 1 && !hasRevealed) setHasRevealed(true)
  })

  return (
    <section
      ref={sectionRef}
      className="bg-cream pb-16 pt-14 md:pb-20 md:pt-24"
    >
      <div className={PAGE_SHELL}>
      <RotatingIcon />

      <motion.h2
        className="mb-5 text-center font-display text-2xl font-semibold uppercase tracking-normal text-dark sm:text-3xl md:mb-6 md:text-4xl"
        initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-40px 0px' }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        This Month at <span className="text-lync">LYNC</span>
      </motion.h2>

      <div className="relative mx-auto mt-4 flex h-[340px] items-start justify-center overflow-hidden pt-4 min-[400px]:h-[380px] sm:h-[480px] sm:overflow-visible sm:pt-6 md:h-[600px] md:pt-8 lg:h-[680px]">
        {cardData.map((card, i) => (
          <FanCard
            key={card.alt}
            card={card}
            index={i}
            isMobile={isMobile}
            progress={progress}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
          />
        ))}
      </div>

      <div className="relative z-20 mt-8 flex justify-center sm:mt-0 sm:-mt-10 md:-mt-12 lg:-mt-14">
        <CtaHoverWrap>
          <Link
            href="/events"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-dark transition-colors hover:bg-white/90 md:px-8 md:text-lg"
          >
            View all events
          </Link>
        </CtaHoverWrap>
      </div>
      </div>
    </section>
  )
}
