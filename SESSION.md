# Session Memory

> Last updated: 2026-04-01

## Project Overview
LYNC is a community platform website for women (girl-only) in Madrid, connecting internationals and students through curated events (dinners, wellness, adventures, etc.). Built with Next.js 15 (App Router), Tailwind CSS v4, Framer Motion (`motion/react`), and deployed on Vercel. Uses Feature Deck as display font and Plus Jakarta Sans as body font.

## Architecture & Key Patterns
- **Pages:** `/` (homepage), `/about`, `/events`, `/blog`, `/quiz`, `/study-abroad`, `/retreats`, `/guides`, `/accommodations`
- **Homepage sections** (in order): Hero (video), TrustBanner, TrustBento (stats pills), ThisMonth (fan cards), WhyLync (pillar cards), EventsShowcase (dinners/wellness/adventures), ValueProps (2-col with photo), Testimonials (photo band + cards), BlogSection (3 cards), QuizSection, CtaSection, FaqSection
- **Shared UI:** `CtaMotionLink`/`CtaHoverWrap`/`CtaMotionButton` in `src/components/ui/cta-hover.tsx` for spring-animated CTAs; `HighlightStroke` in `src/components/ui/highlight-stroke.tsx` for animated blue underline on headings
- **Images:** Community event photos stored at `public/brand/COMMUNITY/` (33 images, renamed descriptively). Brand assets in `public/brand/`
- **Data files:** `src/data/why-lync.ts`, `src/data/faq.ts`, `src/data/testimonials.ts`
- **Layout helper:** `PAGE_SHELL` from `src/lib/page-shell.ts` for consistent max-width/padding
- **Colors:** `--color-lync: #3679F1`, `--color-cream: #F3EFE7`, `--color-dark: #0a0a0a`

## Last Session — What Was Done

### Image Pipeline
- Resized 33 community photos from `/Downloads/LYNC-WEBSITE-IMAGES/` (were too large for analysis) using ffmpeg
- Analyzed all 33 images visually, cataloged by event type (vision board, run club, sushi making, craft night, pumpkin painting, wellness/yoga, watch party, bar/cocktail socials, fitness, workshop)
- Renamed all with descriptive filenames and stored in `public/brand/COMMUNITY/`

### Image Placements (community photos placed across homepage)
- **ThisMonth fan cards** (`this-month.tsx`): 7 cards now show community photos with pill labels instead of solid colors
- **WhyLync pillars** (`why-lync.tsx`): 4 pillar cards now have photos (cocktails, sushi group, craft night, run club panorama). Cards made smaller (h-[21rem]/h-[22rem]) with tighter padding
- **EventsShowcase** (`events-showcase.tsx`): 3 category cards (Dinners, Wellness, Adventures) now have photos behind the 3D illustrations
- **Testimonials band** (`testimonials.tsx`): Replaced placeholder with `craft-night-group-table.webp` (landscape, 2658x1772, high-res)
- **BlogSection** (`blog-section.tsx`): 3 blog cards now have cover photos
- **ValueProps** (`value-props.tsx`): Portrait photo of two girls at restaurant

### UI Refinements
- **TrustBento stats pills** (`trust-bento.tsx`): Changed from solid colored pills to white/outlined pills with colored hover state. Added more spacing between heading and bubbles
- **HighlightStroke underline**: Extracted from trust-bento into shared `src/components/ui/highlight-stroke.tsx`. Applied to all white-bg section headings: "Our Community", "Why girls love LYNC", "Explore our events", "From the blog". Moved underline lower (`-bottom-3`)
- **CTA Section** (`cta-section.tsx`): Replaced gradient blue overlay with flat `bg-black/50` for better text readability. Improved text distribution with `text-balance`, `text-pretty`, `&nbsp;` entities, and strategic `<br>`. Removed motion animation from the two CTA buttons (now plain `Link` elements)

### Navbar (from plan, completed earlier)
- Compacted to fit 7 links: Events, Retreats, Blog, About, Study Abroad, Guides, Accommodations
- CTA renamed "Take the Quiz" to "Get Started" pointing to `/quiz`

### New Pages Created (from plan, completed earlier)
- `/retreats` — retreat cards with placeholder destination images (awaiting real photos)
- `/guides` — city guide cards with "Coming Soon" badges
- `/accommodations` — housing types with icon cards

## Open Tasks & Next Steps

- [ ] Source higher-res originals for 6 low-quality images (900x1350, likely Instagram exports): `watch-party-four-girls-autumn`, `social-bar-lounge-large-group`, `social-four-girls-cocktails`, `social-five-girls-restaurant-booth`, `social-two-girls-portrait-restaurant`, `social-four-girls-venue-pose`
- [ ] Add destination photos to retreat cards (Costa Brava, Algarve, Mallorca) — user hasn't provided yet
- [ ] Add real event-specific images to `/events` page grid cards (currently using emoji placeholders)
- [ ] Continue placing community images on other pages as directed by user
- [ ] Clean up orphaned `/calendar` route (removed from nav but page still exists)

## Blockers & Open Questions

- 6 community photos are low resolution (900x1350). User aware — needs to source higher-res originals. Upscaling won't meaningfully help.
- Retreat destination photos not yet provided by user

## Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-01 | Store community images in `public/brand/COMMUNITY/` | Keeps brand assets organized under one directory. Descriptive filenames for easy reference |
| 2026-04-01 | Use outlined/stroke style for TrustBento stat pills with color on hover | Multicolor pills felt overwhelming on white bg. Outlined style is cleaner, hover adds interactive delight |
| 2026-04-01 | Extract HighlightStroke to shared component | Reused across 4 section headings on white backgrounds for visual consistency |
| 2026-04-01 | Flat black overlay on CTA section instead of gradient blue | Better text readability and contrast over the background photo |
| 2026-04-01 | No motion animation on CTA section buttons | The asymmetric scaleX/scaleY spring animation looked awkward on these specific buttons. Plain CSS hover transitions are sufficient |
| 2026-04-01 | Don't upscale low-res images | AI upscaling adds file size without recovering real detail. Better to source originals |

## Lessons Learned

- `sips` on macOS can't handle `.webp` files — use `ffmpeg` for resizing/converting webp images
- Images over ~2000px cause "dimension limit" errors when trying to read multiple images at once — resize to ~1200px first for analysis
- When placing portrait images in landscape containers, use `object-top` or `object-center` to keep faces visible
- `text-balance` and `&nbsp;` entities are effective for preventing orphaned words in headlines
