# LYNC — Project Memory

## Project Context
- Client: Rebecca Nolan — LYNC Events (lyncevents.com)
- Scope: Rebuild WordPress + Elementor site as Next.js 15
- Phase 1: Frontend + Quiz (no backend integrations)
- Colleague Alejandro handles: Pipedrive, Acuity, Shopify integrations (future)
- Built under Boss's accounts: facundoexposito GitHub, personal Vercel

## Key People
- **Rebecca Nolan** (21, LA) — co-founder, content/social, main client contact
- **Cordelia** (21, London) — co-founder, creative
- **Alejandro** — Boss's colleague, backend integrations
- **Facundo (Boss)** — frontend, design, architecture

## Current State
- **Repo:** github.com/facundoexposito/lync (main branch)
- **Live:** lync-orcin.vercel.app
- **Stack:** Next.js 16.2.1 + Tailwind CSS 4 + TypeScript + motion (for animations)
- **Design system (code):** `--color-lync` #3679F1, `--color-cream` #F3EFE7, `--color-dark` #0a0a0a, lync-light, borders/surface tokens in `src/app/globals.css`; layout padding helper `PAGE_SHELL` in `src/lib/page-shell.ts`
- **Fonts:** Mona Sans (`font-nav`) for nav, section/page titles, and default headings; Playfair Display (`font-display`) **homepage hero H1 only**; Inter (`font-body`) for body (placeholders until Mogena/Avenir files land)

## Page Status
| Page | Design Status | Notes |
|------|--------------|-------|
| Home | ✅ v3 polished | Full-bleed hero, TrustBento (auto-cycling on mobile), ThisMonth (infinite swipe carousel on mobile / scroll-fan on desktop), WhyLync, Testimonials (mobile carousel), CTA (responsive aspect ratios) |
| Quiz | ✅ v2 done | Full-width progress bar, card answers, auto-advance, lead form |
| Events | ✅ done | Acuity scheduler embed (live events), sticky sidebar, hero + CTA |
| Retreats | ✅ done | Placeholder cards (no real retreats on Acuity yet), sticky sidebar |
| About | ✅ done | Founders photo + story, responsive grid |
| Accommodations | ✅ done | Hero, features grid, room types, communal spaces, lifestyle banner |
| Study Abroad | ✅ done | Tabs (Services/Resources/Consultation), fan cards on desktop |
| Blog | ✅ done | Blog list + individual articles, 3-column grid |
| Guides | ✅ done | Alternating image/content layout |

## ReactBits Components (custom-built, in src/components/ui/)
- `count-up.tsx` — spring-animated number counter, scroll-triggered
- `spotlight-card.tsx` — mouse-follow radial gradient glow
- `shiny-text.tsx` — text shimmer sweep animation
- `faq.tsx` — plus/minus accordion
- `acuity-embed.tsx` — Acuity Scheduling iframe + auto-resize script

## Content Sources
- Current site audit: `Projects/LYNC/site-audit/` (7 page screenshots)
- Rebecca's Drive: https://drive.google.com/drive/folders/1LSM7YGJdhG4wnRCjJUB8cRmK3Pmb4xdc
- Brand assets: `Projects/LYNC/brand-assets/` (logo variants, favicon)
- Research PDF: `docs/LYNC-Industry-Research.pdf` (19 pages)

## Architecture
- Tailwind v4: CSS-based config via @theme in globals.css (NO tailwind.config.ts)
- No Supabase in Phase 1
- Quiz data: client-side state only
- Future webhooks folder: src/app/api/webhooks/.gitkeep
- Data files in src/data/ (events, testimonials, FAQ, quiz questions)

## Key Lessons
- Don't delegate creative/design work to subagents — do it yourself
- Use ReactBits-style components for visual interest, not just Tailwind classes
- Keep color palette tight: one brand color + white + black + one gray
- Boss has high design taste — generic templates won't cut it
