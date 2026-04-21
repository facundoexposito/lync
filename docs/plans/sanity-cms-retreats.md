# Sanity CMS Integration — Retreats

## Context

All retreat content is hardcoded in `src/data/retreats.ts` (346 lines). Any change requires a code deploy. We're adding Sanity CMS so the client can manage retreats directly. Scoped to retreats only — other content types (blog, testimonials, FAQ) stay as-is for now.

The detail page must be **fully adaptive** — retreats may have different numbers of days, images, pricing tiers, and per-retreat copy. The layout structure stays the same but adapts to whatever content the client provides.

## Audit Summary

A full codebase audit identified every file that touches retreat data, plus 7 rigidity issues where the current page assumes Solstice-specific content.

### Files that import/use retreat data
| File | What it uses | Action |
|------|-------------|--------|
| `src/data/retreats.ts` | Source of truth (all 22 fields) | Replaced by Sanity |
| `src/components/retreats/retreat-card.tsx` | `Retreat` type via props | No change needed |
| `src/components/retreats/retreat-card-extended.tsx` | `Retreat` type via props | No change needed |
| `src/components/retreats/sticky-cta-bar.tsx` | Props: bookingUrl, brochurePath, price | No change needed |
| `src/components/retreats/image-slideshow.tsx` | Props: `{ src, alt }[]` | No change needed |
| `src/app/retreats/page.tsx` | Imports `retreats` array | Swap to Sanity fetcher |
| `src/app/retreats/[slug]/page.tsx` | Imports `retreats`, `getRetreat` | Swap to Sanity fetcher + adaptive layout |
| `src/app/sitemap.ts` | Missing individual retreat routes | Add dynamic retreat slugs |
| `src/lib/acuity.ts` | Hardcoded `'solstice'` keyword | Remove hardcoded name |

### The 4 data gaps (addressed in steps below)
1. **Hardcoded hero image on listing page** — `retreats/page.tsx` hardcodes `/brand/RETREATS/solstice-sunset-group.webp`. Will pull from first retreat.
2. **Hardcoded `'solstice'` in Acuity filter** — `acuity.ts` has `['retreat', 'getaway', 'solstice']`. Will remove `'solstice'`.
3. **Sitemap missing individual slugs** — Only lists `/retreats`, not `/retreats/solstice`. Will fetch dynamically.
4. **Brochure PDF not CMS-managed** — `public/solstice-brochure.pdf` is a local file. Schema will use Sanity `file` type.

### The 7 rigidity issues (addressed in step 8)

| # | Location | Problem | Fix |
|---|----------|---------|-----|
| 1 | Bento grid (lines 159-203) | Hardcoded to exactly 4 images — accesses `bento[0]` through `bento[3]` directly. Fewer images = crash/blank. | Adaptive grid: 1 img = full width, 2 = side-by-side, 3 = 1 tall + 2 stacked, 4 = current bento. Skip section if 0. |
| 2 | Programme (lines 251-345) | Title says "Seven Days of Becoming". Renders in hardcoded slices: `slice(0,3)`, `slice(3,6)`, `length > 6`. Breaks for non-7-day retreats. | New `programmeTitle` + `programmeSubtitle` fields. Single `.map()` in a responsive `grid-cols-3` grid that flows naturally for any count. |
| 3 | Intro copy (lines 106-115) | Two paragraphs hardcoded: "This is not a holiday…" — specific to Solstice. | New `introText` field (plain text, multi-paragraph). Client writes per-retreat intro. |
| 4 | Founder story title (line 353) | Says "How Costa Rica Changed My Life" — specific to Costa Rica. | New `founderStoryTitle` field. |
| 5 | Pricing grid (line 424) | Always `md:grid-cols-2`. Looks lopsided with 1 tier, awkward with 3. | Dynamic columns: 1 = centered max-w-md, 2 = grid-cols-2, 3 = lg:grid-cols-3. |
| 6 | Daily schedule subtitle (lines 215-218) | Hardcoded: "No two days are exactly the same…" | New `dailyScheduleSubtitle` field (optional). |
| 7 | Empty sections | If a retreat has no founderStory, no dailySchedule, or no inclusions, empty shells render. | Wrap every optional section in `{data && data.length > 0 && ( ... )}` conditionals. |

---

## Steps

### 1. Install dependencies

```bash
npm install next-sanity @sanity/image-url sanity @sanity/vision
```

### 2. Create Sanity project

Run `npx sanity init` to get a project ID and dataset. Add env vars to `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<id>
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-04-20
SANITY_REVALIDATION_SECRET=<random-secret>
```

### 3. Create Sanity client + image helper

**New files:**
- `src/lib/sanity/client.ts` — `createClient` from `next-sanity`
- `src/lib/sanity/image.ts` — `urlFor()` helper using `@sanity/image-url`
- `src/lib/sanity/index.ts` — barrel export

### 4. Define the retreat schema

**New file:** `src/sanity/schemas/retreat.ts`

Maps to the `Retreat` interface, extended with 5 new CMS-editable fields for adaptability.

**Core fields:**
- `title` (string, required)
- `slug` (slug, auto-generated from title, required)
- `subtitle` (string)
- `shortDescription` (text)
- `location` (string)
- `venue` (string)
- `dates` (string)
- `duration` (string)
- `groupSize` (string)

**NEW — Per-retreat customizable copy:**
- `introText` (text, multiline) — replaces hardcoded intro paragraphs. Client writes per-retreat intro. Rendered via `.split('\n\n')` like founderStory.
- `programmeTitle` (string) — e.g. "Seven Days of Becoming" or "Four Days of Discovery"
- `programmeSubtitle` (text) — optional blurb below programme title
- `founderStoryTitle` (string) — e.g. "How Costa Rica Changed My Life"
- `dailyScheduleSubtitle` (string) — optional subtitle for schedule section

**Nested arrays (no min/max constraints — any count works):**
- `pricing[]` — { type, price, perks[] } (RoomOption)
- `itinerary[]` — { day, emoji, title, highlights[] } (ItineraryDay) — works for 3 days, 5 days, 7 days, 10 days
- `dailySchedule[]` — { time, title, description, emoji? } (ScheduleEntry) — any number of time slots
- `inclusions[]` — { emoji, title, description } (Inclusion) — any number
- `notIncluded[]` — string array — any number

**Images (Sanity `image` type with `hotspot: true`):**
- `images.hero` — hero banner (required)
- `images.intro` — intro section (optional — section hides if missing)
- `images.card` — listing card (optional — falls back to hero)
- `images.bento[]` — gallery grid (no max, adaptive layout: 1/2/3/4+ images)
- `images.slideshow[]` — carousel images with `alt` text field (any number)

**Text fields:**
- `founderStory` — plain `text` (NOT Portable Text — rendered via `.split('\n\n')`)
- `founderAttribution` (string)
- `depositNote` (string)

**Links:**
- `bookingUrl` (url)
- `brochure` — Sanity `file` type (client uploads PDFs directly)
- `contactEmail` (string)

**Supporting files:**
- `src/sanity/schemas/index.ts` — barrel export
- `src/sanity/schema.ts` — schema assembly
- `src/sanity/sanity.config.ts` — studio config (structureTool + visionTool)

### 5. Update the Retreat TypeScript interface

**Modify:** `src/data/retreats.ts` (interface only — kept as the shared type contract)

Add the 5 new optional fields to the `Retreat` interface:
```typescript
introText?: string              // per-retreat intro paragraphs
programmeTitle?: string         // e.g. "Seven Days of Becoming"
programmeSubtitle?: string      // optional blurb below title
founderStoryTitle?: string      // e.g. "How Costa Rica Changed My Life"
dailyScheduleSubtitle?: string  // optional schedule section subtitle
```

These are optional (`?`) so existing code and the Solstice data object don't break.

### 6. GROQ queries + data fetching layer

**New file:** `src/lib/sanity/queries.ts`
- `ALL_RETREATS_QUERY` — fetch all retreats, ordered by dates
- `RETREAT_BY_SLUG_QUERY` — fetch single retreat by slug (includes all new fields)
- `RETREAT_SLUGS_QUERY` — fetch all slugs (for `generateStaticParams`)

**New file:** `src/lib/sanity/fetchers.ts`
- `getAllRetreats()` → returns `Retreat[]`
- `getRetreatBySlug(slug)` → returns `Retreat | null`
- `getRetreatSlugs()` → returns `{ slug: string }[]`
- Internal `mapSanityRetreat()` transforms Sanity response → `Retreat` type (including new fields)
- `imageToUrl()` converts Sanity image refs to plain URL strings
- `fileToUrl()` converts Sanity file refs to download URLs (for brochure PDFs)

All fetches use `{ next: { tags: ['retreat'] } }` for tag-based revalidation.

### 7. Set up route groups (for embedded studio)

The root layout wraps everything with `<Navbar>` + `<Footer>`. The studio needs a bare layout. Solution: route groups.

**Restructure:**
```
src/app/
  layout.tsx              ← minimal: <html><body>{children}
  globals.css             ← stays here
  (site)/
    layout.tsx            ← move Navbar + Footer + JSON-LD here
    page.tsx              ← homepage (moved from src/app/page.tsx)
    about/                ← moved
    blog/                 ← moved
    retreats/             ← moved
    events/               ← moved
    quiz/                 ← moved
    study-abroad/         ← moved
    guides/               ← moved
    accommodations/       ← moved
  studio/
    [[...tool]]/
      page.tsx            ← 'use client' + <NextStudio>
  api/                    ← stays at app level
  sitemap.ts              ← stays at app level
  robots.ts               ← stays at app level
```

Route groups in `()` are invisible to URLs — all existing routes stay identical.

### 8. Embed Sanity Studio at `/studio`

**New file:** `src/app/studio/[[...tool]]/page.tsx`
- Client component rendering `<NextStudio config={config} />`
- Uses catch-all `[[...tool]]` for studio sub-routes
- Auth handled by Sanity (Google/GitHub login) — only invited project members can access

### 9. Swap retreat pages + make detail page adaptive

**Modify:** `src/app/(site)/retreats/page.tsx` (listing page)
- Replace `import { retreats } from '@/data/retreats'`
- With `import { getAllRetreats } from '@/lib/sanity/fetchers'`
- `const retreats = await getAllRetreats()` at top of component
- Replace hardcoded hero image with `retreats[0]?.images.hero` (with fallback)
- Replace hardcoded OG image in metadata similarly

**Modify:** `src/app/(site)/retreats/[slug]/page.tsx` (detail page)
- Replace `import { retreats, getRetreat } from '@/data/retreats'`
- With `import { getRetreatBySlug, getRetreatSlugs } from '@/lib/sanity/fetchers'`

**Detail page adaptive layout changes (all 7 rigidity fixes):**

**Section 2 — Intro:**
- Replace hardcoded paragraphs ("This is not a holiday…") with `retreat.introText`
- Render via `.split('\n\n').map(...)` like founderStory
- If `introText` is empty, fall back to just `shortDescription`

**Section 3 — Bento Grid:**
- Replace direct `bento[0]`–`bento[3]` access with adaptive rendering:
```
0 images → skip section entirely
1 image  → single full-width rounded image
2 images → two side-by-side columns
3 images → 1 tall left + 2 stacked right
4 images → current bento layout (tall-wide-tall-wide)
5+ images → 4-image bento + remainder flows into slideshow
```

**Section 4 — Daily Schedule:**
- Replace hardcoded subtitle with `retreat.dailyScheduleSubtitle`
- If no subtitle provided, use sensible default: "Every day is designed to be yours."
- Wrap entire section in `{retreat.dailySchedule.length > 0 && ( ... )}`

**Section 5 — Programme/Itinerary:**
- Replace "Seven Days of Becoming" with `retreat.programmeTitle`
- Replace hardcoded subtitle paragraph with `retreat.programmeSubtitle`
- If no title provided, generate default: `${retreat.duration} of Becoming`
- **Replace the 3-slice rendering** with a single responsive grid:
  ```tsx
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {retreat.itinerary.map((day, i) => ( ... ))}
  </div>
  ```
  This flows naturally for 3, 4, 5, 7, 10, or any number of days.
- Wrap entire section in `{retreat.itinerary.length > 0 && ( ... )}`

**Section 6 — Founder Story:**
- Replace "How Costa Rica Changed My Life" with `retreat.founderStoryTitle`
- If no title provided, use default: "The Story Behind {retreat.title}"
- Wrap entire section in `{retreat.founderStory && ( ... )}`

**Section 7 — Inclusions:**
- Already flexible (maps over array)
- Wrap entire section in `{retreat.inclusions.length > 0 && ( ... )}`
- Wrap "Not Included" sub-section in `{retreat.notIncluded.length > 0 && ( ... )}`

**Section 8 — Pricing:**
- Dynamic grid columns based on count:
  ```tsx
  const pricingCols = retreat.pricing.length === 1
    ? 'max-w-md mx-auto'
    : retreat.pricing.length === 3
      ? 'md:grid-cols-3'
      : 'md:grid-cols-2'
  ```
- Wrap entire section in `{retreat.pricing.length > 0 && ( ... )}`

### 10. Add `cdn.sanity.io` to Next.js image config

**Modify:** `next.config.ts`
- Add `{ protocol: 'https', hostname: 'cdn.sanity.io' }` to `remotePatterns`

### 11. Fix hardcoded 'solstice' in Acuity filter

**Modify:** `src/lib/acuity.ts`
- Remove `'solstice'` from `RETREAT_KEYWORDS` array
- Keep generic keywords: `['retreat', 'getaway']`

### 12. Revalidation webhook

**New file:** `src/app/api/webhooks/sanity/route.ts`
- POST handler that verifies `SANITY_REVALIDATION_SECRET`
- Calls `revalidateTag('retreat')` when retreat docs change
- Configure in Sanity dashboard: `https://lyncevents.com/api/webhooks/sanity?secret=<SECRET>`

### 13. Add retreat slugs to sitemap

**Modify:** `src/app/sitemap.ts`
- Import `getRetreatSlugs` from Sanity fetchers
- Make function `async`
- Add retreat entries: `retreatSlugs.map(r => ({ url: '${SITE_URL}/retreats/${r.slug}', ... }))`

### 14. Migrate existing content into Sanity

**New file:** `scripts/migrate-to-sanity.ts`
- Reads solstice retreat data from `src/data/retreats.ts`
- Uploads local images (6 main + 11 slideshow) from `public/brand/RETREATS/` to Sanity assets
- Uploads brochure PDF (`public/solstice-brochure.pdf`) to Sanity files
- Creates the retreat document with all image/file references
- Populates the 5 new fields with Solstice defaults:
  - `introText`: "This is not a holiday. It is not a yoga retreat..."
  - `programmeTitle`: "Seven Days of Becoming"
  - `programmeSubtitle`: "This outline reflects the heart and intention..."
  - `founderStoryTitle`: "How Costa Rica Changed My Life"
  - `dailyScheduleSubtitle`: "No two days are exactly the same..."
- One-time script, run with `npx tsx scripts/migrate-to-sanity.ts`

---

## Files Summary

**New files (12):**
- `src/lib/sanity/client.ts`
- `src/lib/sanity/image.ts`
- `src/lib/sanity/queries.ts`
- `src/lib/sanity/fetchers.ts`
- `src/lib/sanity/index.ts`
- `src/sanity/schemas/retreat.ts`
- `src/sanity/schemas/index.ts`
- `src/sanity/schema.ts`
- `src/sanity/sanity.config.ts`
- `src/app/studio/[[...tool]]/page.tsx`
- `src/app/api/webhooks/sanity/route.ts`
- `scripts/migrate-to-sanity.ts`

**Modified files (7):**
- `next.config.ts` — add Sanity CDN to remotePatterns
- `src/app/layout.tsx` — strip to minimal shell
- `src/app/sitemap.ts` — add retreat entries from Sanity (async)
- `src/app/(site)/retreats/page.tsx` — swap data source + fix hardcoded hero image
- `src/app/(site)/retreats/[slug]/page.tsx` — swap data source + all 7 adaptive layout fixes
- `src/lib/acuity.ts` — remove hardcoded 'solstice' from RETREAT_KEYWORDS
- `src/data/retreats.ts` — add 5 new optional fields to Retreat interface

**Moved files (route group restructure):**
- All pages from `src/app/` → `src/app/(site)/`
- New `src/app/(site)/layout.tsx` with Navbar + Footer + JSON-LD

---

## Complete Retreat Field Coverage

| Field | Sanity Type | Required | Adaptive Behavior |
|-------|------------|----------|-------------------|
| title | string | Yes | Used in all headings |
| slug | slug (auto from title) | Yes | URL routing |
| subtitle | string | No | Hero shows if present |
| shortDescription | text | No | Fallback if no introText |
| location | string | No | Hero badge, cards |
| venue | string | No | Intro pill |
| dates | string | No | Hero badge, cards |
| duration | string | No | Intro pill, default programme title |
| groupSize | string | No | Intro pill |
| **introText** | **text (new)** | **No** | **Per-retreat intro. Falls back to shortDescription if empty.** |
| **programmeTitle** | **string (new)** | **No** | **Falls back to "{duration} of Becoming"** |
| **programmeSubtitle** | **text (new)** | **No** | **Hidden if empty** |
| **founderStoryTitle** | **string (new)** | **No** | **Falls back to "The Story Behind {title}"** |
| **dailyScheduleSubtitle** | **string (new)** | **No** | **Falls back to default copy** |
| pricing[].type | string | — | Dynamic grid: 1=centered, 2=two-col, 3=three-col |
| pricing[].price | string | — | Sticky CTA, card badges |
| pricing[].perks[] | string[] | — | Pricing cards |
| depositNote | string | No | Hidden if empty |
| itinerary[].day | number | — | Single responsive grid for any count |
| itinerary[].emoji | string | — | Programme cards |
| itinerary[].title | string | — | Programme cards |
| itinerary[].highlights[] | string[] | — | Programme cards |
| dailySchedule[].time | string | — | Schedule strip |
| dailySchedule[].title | string | — | Schedule cards |
| dailySchedule[].description | string | — | Schedule cards |
| dailySchedule[].emoji | string | — | Schedule strip |
| inclusions[].emoji | string | — | Inclusion cards |
| inclusions[].title | string | — | Inclusion cards |
| inclusions[].description | string | — | Inclusion cards |
| notIncluded[] | string[] | — | Hidden if empty array |
| images.hero | image (hotspot) | Yes | Hero, OG image |
| images.intro | image (hotspot) | No | Intro section. Hidden if missing. |
| images.card | image (hotspot) | No | Falls back to hero on cards |
| images.bento[] | image[] (hotspot) | No | Adaptive: 0=skip, 1=full, 2=split, 3=asymmetric, 4=bento |
| images.slideshow[] | image[] (with alt) | No | Slideshow. Hidden if empty. |
| founderStory | text (plain) | No | Entire section hidden if empty |
| founderAttribution | string | No | Attribution line |
| bookingUrl | url | No | CTA buttons, sticky bar. Hidden if empty. |
| brochure | file (PDF upload) | No | Download button. Hidden if no file. |
| contactEmail | string | No | Contact link. Hidden if empty. |

---

## Section Visibility Rules

Every section on the detail page conditionally renders based on available data:

| Section | Shows when... | Hides when... |
|---------|--------------|---------------|
| 1. Hero | Always (title + hero image required) | Never |
| 2. Intro | Always (at minimum shows shortDescription) | Never |
| 3. Bento Grid | `images.bento.length > 0` | No bento images |
| 4. Daily Schedule | `dailySchedule.length > 0` | Empty array |
| 5. Programme | `itinerary.length > 0` | Empty array |
| 6. Founder Story | `founderStory` is non-empty | No story text |
| 7. What's Included | `inclusions.length > 0` | Empty array |
| 7b. Not Included | `notIncluded.length > 0` | Empty array |
| 8. Pricing | `pricing.length > 0` | No pricing tiers |
| 8b. Brochure button | `brochure` file exists | No file uploaded |
| 8c. Contact email | `contactEmail` is non-empty | No email |
| 9. More Retreats | Acuity returns retreat events | No Acuity retreats |
| 10. Bottom CTA | Always | Never |
| Sticky CTA Bar | `bookingUrl` is non-empty | No booking URL |

---

## Verification

1. `npm run dev` — site loads normally, all existing routes work
2. Visit `/studio` — Sanity Studio loads with retreat content type visible
3. Visit `/retreats` — listing page shows retreats from Sanity, hero image pulled from data
4. Visit `/retreats/solstice` — detail page renders identically to current version (all new fields populated with Solstice defaults from migration)
5. Check all 10 sections render correctly for Solstice
6. Verify brochure download works from Sanity file URL
7. Verify sitemap at `/sitemap.xml` includes `/retreats/solstice`
8. Edit retreat in Studio → verify revalidation updates the page
9. **Adaptability test:** Create a minimal test retreat in Studio with:
   - Only title, slug, hero image, 2 bento images, 1 pricing tier, 4-day itinerary, no founder story, no daily schedule
   - Verify: bento shows 2-image layout, programme shows 4 cards in responsive grid, pricing is single centered card, founder story section hidden, daily schedule hidden, sticky CTA hidden (no booking URL)
10. Verify Acuity "More Retreats" still works without `'solstice'` keyword
