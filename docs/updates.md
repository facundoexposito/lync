# LYNC — Updates

## April 8, 2026

### Session — Retreat page enhancements + mobile polish

**Retreat detail page (`/retreats/[slug]`):**
- Added sticky CTA bar (`src/components/retreats/sticky-cta-bar.tsx`) — frosted-glass bottom bar with "Brochure" + "Book Now" buttons + price hint. Shows after scrolling past hero, hides when pricing or bottom CTA section is in viewport. iPhone safe area padding included.
- Added `id="pricing"` and `id="bottom-cta"` section IDs for sticky bar visibility tracking
- Booking URL updated to full Acuity appointment path (`/schedule/.../appointment/.../calendar/...`)
- WhatsApp floating button now shifts up when sticky CTA bar is visible (MutationObserver on `data-sticky-cta` attribute)
- Navbar now shows white logo/links on retreat detail pages (added `/retreats/*` to `isHeroNav`)

**"A Day at Solstice" timeline redesign:**
- Replaced broken vertical timeline (times overlapping line) with horizontal card layout — tinted time strip on left with emoji + time, content on right
- Added emojis to each `ScheduleEntry` in data

**"Seven Days of Becoming" programme redesign:**
- Changed from paragraph descriptions to bullet-point highlights per day
- Added emojis to each `ItineraryDay` in data (new `emoji` + `highlights` fields, replaced `description`)
- Layout: 3-column grid — row 1 (days 1-3), row 2 (days 4-6), row 3 (day 7 left-aligned)

**"What's Included / Not Included":**
- Not Included items: stacked vertically on mobile, dot-separated inline on `sm+`

**Retreats listing page (`/retreats`):**
- Created extended retreat card (`src/components/retreats/retreat-card-extended.tsx`) — horizontal layout (55% image / 45% content on desktop), stacked on mobile. Location + price badges, dates, title, subtitle, description, stat row (duration, group size, venue), gradient CTA button. `reversed` prop for alternating layout.
- Replaced 3-column grid with single-column extended cards

**Events page (`/events`):**
- Reverted to `getUpcomingEvents()` only — retreats removed from events page
- Cleaned up `events-grid.tsx` back to events-only (removed `GridItem` union, `Retreat` imports, "Retreats" filter)
- Removed `getEventsWithRetreats()` from `acuity.ts`

**Mobile optimization (both pages):**
- Detail hero: reduced min-height (360px mobile), smaller title (text-5xl), tighter spacing
- Intro image: landscape aspect (4/3) on mobile, portrait (3/4) on sm+
- Bento grid: clean 2x2 on mobile (no row-span/col-span), bento layout only at md+
- Daily schedule: narrower time strip (w-20) on mobile with smaller text
- Pricing cards: reduced padding on mobile (p-5 vs p-8)
- Extended card: tighter padding, smaller text sizes, min-height on desktop image
- Listing hero: smaller title/subtitle on mobile

**Other:**
- Removed WhatsApp pre-filled message text (clean link)

---

## April 1, 2026

### Session — Acuity embed + mobile responsive polish

**Events page — Acuity scheduler embed:**
- Replaced hardcoded event cards with live Acuity Scheduling iframe (auto-syncs with client's real events)
- Created reusable `AcuityEmbed` client component (`src/components/ui/acuity-embed.tsx`) — uses `next/script` for auto-resize
- Page converted from `'use client'` to server component with `metadata` export for SEO
- Hero, sticky sidebar, and bottom CTA unchanged

**Mobile responsive fixes:**
- **TrustBento ("Our Community"):** Removed `min-h-[44svh]` that created excessive top spacing on mobile; desktop `min-h-[38svh]` preserved
- **ThisMonth ("This Month at LYNC"):** Replaced clipped fan-card stack on mobile with infinite swipeable carousel (touch drag, auto-scroll, seamless loop via 3x card duplication + modular normalization). Desktop fan animation unchanged.
- **Testimonials:** Fixed mobile card cutting off author info — removed `flex-1` from quote, added `mt-auto` on author to pin to bottom; image aspect changed from `4/3` → `3/2` for better proportions; stars enlarged to `h-10`
- **CTA Section:** Changed mobile aspect ratio from `1.35/1` (landscape) to `4/5` (portrait) so stacked buttons fit inside the rounded card; heading bumped from `text-lg` → `text-xl`

**Repo hygiene:**
- Deleted 4 orphaned UI components with zero imports: `blur-text.tsx`, `button.tsx`, `image-marquee.tsx`, `text-marquee.tsx`
- Updated all docs (updates.md, roadmap.md, memory.md)

---

## March 31, 2026

### Session — Homepage polish & typography system
- **Home structure:** Hero (full-bleed image + overlay) → **TrustBento** (“Our Community” bubble stats) → **ThisMonth** (rotating icon, scroll-driven fan of event placeholder cards, **View all events** → `/events`) → **WhyLync** (SpotlightCard pillars; fanned layout on large screens, stack on small).
- **Typography (ADR-005):** Mona Sans for nav and all marketing titles / default `h1–h6`; **Playfair Display only on the hero headline** (explicitly **not** uppercase/semibold on that line—normal title case, bold, tight tracking). Other titles: uppercase, semibold, **`tracking-normal`** (dropped `tracking-wide` after feedback).
- **CTAs:** Removed trailing arrow from **View all events**; **Upcoming Events** and **View all events** use **`text-dark`** on white pills (not blue body text).
- **Mobile:** Extra space between ThisMonth card fan and **View all events** (`mt-8` below `sm`, negative overlap preserved from `sm` up).

## March 30, 2026

### Late Night — Design v2 (ReactBits + Editorial)
- Complete visual redesign with clean editorial aesthetic
- Added ReactBits-inspired components (built from source, no dependency):
  - **BlurText**: word-by-word blur-to-sharp reveal animation on hero (motion/react)
  - **CountUp**: spring-physics animated stat counters, scroll-triggered
  - **SpotlightCard**: mouse-follow radial gradient glow on feature cards
  - **ShinyText**: shimmer sweep animation on CTA button text
- New color system: lync blue (#007AFF) + white + black (#0a0a0a) + surface (#fafafa) + border (#e5e7eb)
- Removed cream/navy/gold — crisp, high-contrast, modern
- Homepage sections: Hero (BlurText + grid bg + gradient orb) → How It Works (grid with emojis) → Why LYNC (bento with SpotlightCard) → Events → Testimonials (dark bg) → Stats (CountUp) → FAQ (plus/minus accordion) → CTA
- Quiz: full-width progress bar fixed under navbar, clean card answers with check indicators, auto-advance on single select, centered layout
- Navbar: transparent → solid on scroll, active page indicator
- Footer: minimal with proper hierarchy, WhatsApp linked to real number
- Added `motion` dependency for animations
- About page + Study Abroad page + Events page + Blog page still have old design — need same treatment
- Boss assessment: "much better, still work to do on other pages"

### Evening — Design v1 (Subagent)
- First design pass via subagent — too generic, Boss rejected
- Warm cream/navy/gold palette — felt like a template
- No interesting UI components or animations
- Lesson: don't delegate creative work to subagents

### Afternoon — Initial Scaffold
- Next.js 15 + Tailwind CSS 4 + TypeScript
- 6 pages: Home, Quiz (7-step), Events, About, Study Abroad, Blog
- Data files, docs folder, research PDF
- GitHub repo: facundoexposito/lync
- Vercel: lync-orcin.vercel.app

### Morning — Site Audit & Research
- 7 pages screenshotted, 225 images cataloged, branding extracted
- Brand assets downloaded (logos, favicon)
- branding.md created with full audit
- Rebecca's Drive folder accessed (not downloaded)
