'use client'

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  animate,
  AnimatePresence,
} from 'motion/react'
import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CtaHoverWrap } from '@/components/ui/cta-hover'
import { PAGE_SHELL } from '@/lib/page-shell'

const emojis = ['🍷', '💪', '🍽️', '🎵', '🎨', '📸', '🚴', '📖']

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
      setIndex((prev) => (prev + 1) % emojis.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.6, rotate: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-3xl"
        >
          {emojis[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function FanCard({
  card,
  index,
  progress,
  hoveredId,
  setHoveredId,
}: {
  card: (typeof cardData)[number]
  index: number
  progress: ReturnType<typeof useTransform<number, number>>
  hoveredId: number | null
  setHoveredId: (id: number | null) => void
}) {
  const distFromCenter = index - MID
  const absFromCenter = Math.abs(distFromCenter)

  const targetRotation = distFromCenter * DESKTOP.rotationStep
  const targetX = distFromCenter * DESKTOP.xSpread
  const targetY = absFromCenter * DESKTOP.yDrop
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
      className="absolute w-[230px] cursor-pointer overflow-hidden rounded-xl shadow-xl lg:w-[260px]"
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
        sizes="(max-width: 1024px) 230px, 260px"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end p-3">
        <span className="rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-dark backdrop-blur-sm">
          {card.alt}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Mobile Carousel ─────────────────────────────────────────── */

const CARD_W = 200
const GAP = 16
const STEP = CARD_W + GAP
const SET_W = CARD_COUNT * STEP
const AUTO_SPEED = 0.4 // px per frame

function MobileCarousel() {
  const x = useMotionValue(-SET_W)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const isPaused = useRef(false)
  const pauseTimer = useRef<ReturnType<typeof setTimeout>>(null)

  // Normalize x into the middle set after every animation so the loop is seamless
  const normalize = () => {
    const cur = x.get()
    const mod = ((cur % SET_W) + SET_W) % SET_W // always positive
    x.set(-SET_W + mod)
  }

  // Auto-slide via rAF — pauses during drag and briefly after release
  useEffect(() => {
    let raf: number
    const tick = () => {
      if (!isDragging.current && !isPaused.current) {
        const next = x.get() - AUTO_SPEED
        if (next <= -SET_W * 2) {
          x.set(next + SET_W)
        } else {
          x.set(next)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [x])

  const handleDragStart = () => {
    isDragging.current = true
    if (pauseTimer.current) clearTimeout(pauseTimer.current)
  }

  const handleDragEnd = (
    _: unknown,
    info: { velocity: { x: number }; offset: { x: number } },
  ) => {
    isDragging.current = false
    isPaused.current = true

    const cur = x.get()
    const projected = cur + info.velocity.x * 0.2
    const snapped = Math.round(projected / STEP) * STEP
    animate(x, snapped, {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      onComplete: () => {
        normalize()
        pauseTimer.current = setTimeout(() => {
          isPaused.current = false
        }, 2000)
      },
    })
  }

  // 3 copies for infinite illusion
  const tripled = [...cardData, ...cardData, ...cardData]

  return (
    <div
      ref={containerRef}
      className="relative mx-auto mt-4 h-[320px] overflow-hidden"
      style={{ touchAction: 'pan-y' }}
    >
      <motion.div
        className="flex cursor-grab items-start active:cursor-grabbing"
        style={{ x, gap: GAP }}
        drag="x"
        dragElastic={0.05}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {tripled.map((card, i) => (
          <div
            key={`${card.alt}-${i}`}
            className="relative shrink-0 overflow-hidden rounded-2xl shadow-lg"
            style={{ width: CARD_W, aspectRatio: '3 / 4' }}
          >
            <Image
              src={card.img}
              alt={card.alt}
              fill
              className="pointer-events-none object-cover"
              draggable={false}
              sizes="200px"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center p-3">
              <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-dark backdrop-blur-sm">
                {card.alt}
              </span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ── Section ─────────────────────────────────────────────────── */

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

      {!isMobile && (
        <div className="relative mx-auto mt-4 flex h-[600px] items-start justify-center overflow-visible pt-8 lg:h-[680px]">
          {cardData.map((card, i) => (
            <FanCard
              key={card.alt}
              card={card}
              index={i}
              progress={progress}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
            />
          ))}
        </div>
      )}

      {!isMobile && (
        <div className="relative z-20 -mt-12 flex justify-center lg:-mt-14">
          <CtaHoverWrap>
            <Link
              href="/events"
              className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-dark transition-colors hover:bg-white/90 md:px-8 md:text-lg"
            >
              View all events
            </Link>
          </CtaHoverWrap>
        </div>
      )}
      </div>

      {isMobile && (
        <>
          <MobileCarousel />
          <div className="-mt-6 flex justify-center">
            <CtaHoverWrap>
              <Link
                href="/events"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-base font-semibold text-dark transition-colors hover:bg-white/90"
              >
                View all events
              </Link>
            </CtaHoverWrap>
          </div>
        </>
      )}
    </section>
  )
}
