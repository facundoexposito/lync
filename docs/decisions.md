# LYNC — Architectural Decisions

## ADR-001: Next.js 15 over WordPress
- **Date:** March 29, 2026
- **Decision:** Replace WordPress + Elementor with Next.js 15 (App Router)
- **Rationale:** Custom design, better performance, full control over data flow, Vercel deployment
- **Consequences:** Need to recreate all pages, but gain flexibility for quiz funnel + future integrations

## ADR-002: No Supabase in Phase 1
- **Date:** March 30, 2026
- **Decision:** Build frontend-only first, add Supabase later
- **Rationale:** Focus on visual rebuild + quiz UX before connecting backend
- **Consequences:** Quiz data stored client-side only for now, lead capture not functional until Phase 2

## ADR-003: Keep Acuity + Shopify (for now)
- **Date:** March 29, 2026
- **Decision:** Don't replace Acuity or Shopify yet — webhook into Supabase later
- **Rationale:** Working integrations, replacing them adds scope. Connect via webhooks first.
- **Consequences:** Events page will link to Acuity externally until Phase 3

## ADR-004: Placeholder fonts (Playfair Display + Inter)
- **Date:** March 30, 2026
- **Decision:** Use Playfair Display (display) and Inter (body) as placeholders for Mogena and Avenir
- **Rationale:** Mogena is a premium/custom font. Playfair Display captures similar editorial/serif energy. Boss can swap in Mogena when font files are available.
