# LYNC — Project Memory

## Project Context
- Client: Rebecca Nolan — LYNC Events (lyncevents.com)
- Scope: Rebuild WordPress + Elementor site as Next.js 15
- Phase 1: Frontend + Quiz (no backend integrations)
- Colleague Alejandro handles: Pipedrive, Acuity, Shopify integrations (future phases)
- Built under Boss's accounts: facundoexposito GitHub, personal Vercel

## Key People
- **Rebecca Nolan** (21, LA) — co-founder, handles content/social, main client contact
- **Cordelia** (21, London) — co-founder, creative
- **Alejandro** — Boss's colleague, handles backend integrations
- **Facundo (Boss)** — frontend, design, architecture

## Key Dates
- March 29, 2026: Industry research PDF delivered (9 sections, 19 pages)
- March 30, 2026: Site audit (screenshots + content extraction + branding analysis)
- March 30, 2026: Project scaffolded, pushed to GitHub, deployed to Vercel
- March 30, 2026: Design overhaul v1 (brand system, quiz polish, homepage redesign)

## Current State
- **Repo:** github.com/facundoexposito/lync (main branch)
- **Live:** lync-orcin.vercel.app
- **Stack:** Next.js 15 (16.2.1) + Tailwind CSS 4 + TypeScript
- **Pages:** Home, Quiz (7-step), Events, About, Study Abroad, Blog (shell)
- **Design status:** Functional but needs visual polish — Boss taking over locally

## Content Sources
- **Current site audit:** Screenshots in `Projects/LYNC/site-audit/` (7 pages captured)
- **Rebecca's Drive folder:** https://drive.google.com/drive/folders/1LSM7YGJdhG4wnRCjJUB8cRmK3Pmb4xdc
  - EVENT PICTURES, EVENT VIDEOS, MARKETING PICTURES, PHOTOS FOR SOCIALS
  - MASTER CONTENT CALENDAR, SOCIAL MEDIA CREATION SOP
  - intro page video, SPONSOR PHOTOS, story samples
  - NOT downloaded yet — waiting for Boss to curate which photos to use
- **Brand assets downloaded:** Logo (white + blue variants), favicon → `Projects/LYNC/brand-assets/`

## Branding
- Primary Blue: #007AFF
- Navy: #1a1a2e
- Cream: #F5F0E8
- Gold: #D4A853
- Display font: Mogena (using Playfair Display as placeholder)
- Body font: Avenir (using Inter as placeholder)
- Full brand guide: `docs/branding.md`

## Architecture Decisions
- No Supabase in Phase 1 (frontend only)
- Keep Acuity + Shopify for now, webhook into Supabase later
- Quiz data client-side only until Phase 2
- Tailwind v4 CSS-based config (@theme in globals.css, no tailwind.config.ts)
- Clean folder structure for future integrations (api/webhooks/ ready)

## What Needs Work
- Design quality — Boss taking over for visual polish
- Real photos from Rebecca's Drive folder
- Swap placeholder fonts for Mogena + Avenir
- Mobile responsiveness pass
- About page + Study Abroad page need same design treatment as homepage
- SEO metadata for all pages
- Original site copy preservation (FAQ done, About page needs real copy from WP)

## External Tools (Current Site)
- Acuity Scheduling — event booking (siloed)
- Shopify — guides store (lync-events.myshopify.com)
- Pipedrive — CRM (form signups only)
- HubSpot — possibly active email/CRM
- WhatsApp — community chat, phone: 13107411846
- GoDaddy — hosting
- Credentials needed from Rebecca: Acuity, Shopify, GoDaddy logins
