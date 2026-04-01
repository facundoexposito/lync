# LYNC — Updates

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
