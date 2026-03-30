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
- **Design system:** Blue (#007AFF) + white + black (#0a0a0a) + surface gray (#fafafa)
- **Fonts:** Playfair Display (display, placeholder for Mogena) + Inter (body, placeholder for Avenir)

## Page Status
| Page | Design Status | Notes |
|------|--------------|-------|
| Home | ✅ v2 done | BlurText hero, SpotlightCard features, CountUp stats, ShinyText CTA |
| Quiz | ✅ v2 done | Full-width progress bar, card answers, auto-advance, lead form |
| Events | ❌ needs redesign | Has event cards but styling is old v1 |
| About | ❌ needs redesign | Still v1 generic layout |
| Study Abroad | ❌ needs redesign | Still v1 accordion style |
| Blog | ❌ needs redesign | Still v1 coming soon shell |

## ReactBits Components (custom-built, in src/components/ui/)
- `blur-text.tsx` — word-by-word blur reveal, uses motion/react IntersectionObserver
- `count-up.tsx` — spring-animated number counter, scroll-triggered
- `spotlight-card.tsx` — mouse-follow radial gradient glow
- `shiny-text.tsx` — text shimmer sweep animation
- `faq.tsx` — plus/minus accordion

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
