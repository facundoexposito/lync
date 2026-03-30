# LYNC — Updates

## March 30, 2026

### Evening — Design Overhaul v1
- Complete visual redesign of homepage, quiz, event cards, navbar, footer
- Tailwind v4 CSS-based theme (@theme block in globals.css, removed tailwind.config.ts)
- Brand colors: lync-blue, navy, cream, gold + light variants (blue-light, cream-dark, gold-light, rose, sage, lavender)
- Transparent navbar with scroll-triggered solid state
- Hero: gradient bg with floating decorative elements, flag social proof row
- How It Works: 4 colored cards (lavender, blue-light, gold-light, rose) with step numbers
- Why LYNC: border-left accent cards
- Testimonials: glassmorphism on navy background
- Event cards: category dots, spots badge overlay, hover states
- Quiz: card-based answer options with check indicators, auto-advance on single select, gradient progress bar, lead capture form
- FAQ: interactive accordion component
- Footer: social icons, WhatsApp floating button (linked to real number 13107411846)
- Custom animations: fade-up, fade-in, scale-in, slide-up, float, pulse-soft
- Build passing, deployed to Vercel (lync-orcin.vercel.app)
- Boss assessment: "functional but needs visual polish" — taking over design locally

### Afternoon — Initial Scaffold
- Project scaffolded with Next.js 15, Tailwind CSS 4, TypeScript
- All pages created: Home, About, Events, Quiz (7-step), Study Abroad, Blog
- Quiz funnel: 5 questions + lead form + personalized results
- Data files: events (6), testimonials (3), FAQ (5 with original site copy), quiz questions (5)
- Components: navbar, footer, section, button, event-card, quiz-container/step/results, faq
- Docs: branding.md, memory.md, decisions.md, updates.md, roadmap.md, research PDF
- Repo created: github.com/facundoexposito/lync
- Deployed: lync-orcin.vercel.app

### Morning — Site Audit & Research
- Full site audit of lyncevents.com (7 pages screenshotted via Playwright)
- 225 unique images cataloged from WordPress uploads
- Brand assets extracted: Logo variants (Layer_1.png, Layer_1-1.png), favicon
- Fonts identified: Mogena (display), Avenir (body)
- Colors extracted: Primary blue #007AFF, CSS variables mapped
- Branding guide created (docs/branding.md)
- Rebecca's Drive folder accessed (not downloaded): 10 subfolders of content assets
- Industry research PDF (19 pages) reviewed and incorporated
