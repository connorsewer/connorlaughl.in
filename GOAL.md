# GOAL.md — connorlaughl.in design overhaul, shipped 2026-05-14

This document originally locked the session scope before the design overhaul began. It now serves as the historical record of what was shipped. For what's next, see [HANDOFF.md](HANDOFF.md).

## The one-sentence frame

Took a competent editorial portfolio with no real motion and turned it into a living museum of governed systems: GT Sectra display, WebGL signature hero, scroll-driven motion throughout, schematic plates that actually say something, a real hand-drawn portrait of the operator at work, and a case-study page that scans.

## North star (achieved)

A CEO or CRO landing on the homepage knows three things inside ten seconds:
1. Connor builds revenue systems (not just decks).
2. The hero is a real human (Connor + Henry at the desk), framed in walnut, mouse-responsive.
3. The numbers underneath are honest, posture-tagged, and proof-led.

## What shipped

### Type system
- GT Sectra Fine replaces Instrument Serif entirely. 5 weights + italics, woff2-subset to 414KB total (2.9MB → 14.3%).
- `next/font/local` integration via `app/layout.tsx`.
- Hero H1 carries a weight ladder: Black 900 for the primary claim, Medium italic for the qualifier.
- Subsetting script at `scripts/subset-fonts.sh` (uv + pyftsubset).
- Geist Sans (body), Geist Mono (system voice), Geist Pixel (retro accents) preserved.

### Motion infrastructure
- `motion` (motion.dev) installed, `framer-motion` removed.
- `lenis` global smooth-scroll via `<SmoothScrollProvider>`.
- `ogl` (~16KB) for WebGL plate displacement.
- `lib/motion.ts` with 11 named primitives matching DESIGN.md §5.
- Reduced-motion fallback verified per primitive.

### Hero
- Single static plate of Connor at his standing desk with Henry the dog, looking out a window onto Lincoln Park. Hand-drawn ink illustration via Midjourney, dithered halftone, walnut frame.
- WebGL shader runs mouse-driven Gaussian swell + ambient sin wave + per-fragment hash dither + corner vignette.
- Reduced-motion + no-WebGL users get the static plate; the OGL chunk never loads.
- Caption: `[Fig. 01] · Connor and Henry at the desk, Lincoln Park, Chicago`.

### Homepage layout
- Hero with GT Sectra weight ladder H1 + 5-stat strip + magnetic CTAs.
- `<FigureMarquee>` press-release ticker (numbers-first cadence, 12 items).
- "What I build" 4-column grid.
- `<ImpactLedger>` typeset table with anchor metric per row, stagger-up reveal.
- `<SectionDivider>` (control panel, Fig 10) — operating-layer transition.
- "Six systems I built and ran" — signature cards with `data-cursor="file-NN"` labels.
- `<SectionDivider>` (grid, Fig 9) — work-to-personal transition.
- About teaser → Now feed → Hire signal → Contact.
- Header: wordmark + availability pill (`Open to roles`) + 5-link nav + theme toggle.

### Case studies
- `/case-studies` archive: blueprint plate (Fig 11) as the index divider above the card grid.
- `/case-studies/[slug]`: `<CaseStudyTOC>` sticky left-rail on xl+ with scroll-spy.
- View-transition named pairs (`case-title-${slug}`) lift the card title into the detail H1.
- Midjourney plates wired across 11 case studies' figures + artifacts.

### Long-form
- `lib/markdown.tsx` extended: pipe-table support, 68ch body cap, emoji-to-glyph swaps (✅→▪, ❌→×, ⚠→⚠).

### Tools
- `<PulseOnChange>` micro-pulse on every RevOps planner output cell when an input changes. Tabular-nums.

### Security / hosting
- `proxy.ts` CSP locked down to host-restricted `script-src 'self' 'unsafe-inline'` plus `X-Frame-Options DENY`, HSTS, Referrer-Policy, Permissions-Policy. No nonce-based CSP — incompatible with Next.js prerendered HTML.
- Prod-mode local smoke test verified zero console errors before push.

### Image system
- 12 Midjourney plates wired in:
  - Hero: desk portrait (Fig 01)
  - OG: typographic poster (Fig 02)
  - Case-study heroes: BDR Pod (Fig 04), Mainframe (Fig 08), Marketing Org (Fig 06), Outcome-First (Fig 05), Tracking Pixel (Fig 07)
  - Section dividers: Control panel (Fig 10), Grid (Fig 9), Blueprint (Fig 11)
- All converted from PNG to WebP via cwebp.
- `.dither-frame` walnut texture preserved; FigureReveal hardened with `data-js="active"` gating so no-JS users see clean images.

## What didn't ship (queued for next session)

- **Density toggle on case-study detail pages.** Sticky TOC landed; the actual TLDR / 5-min / 15-min density toggle still scroll-to-anchor, not visibility-swap. Refactor of the 699-line detail page deferred.
- **WebGL card hover** on signature-system cards (dither distortion under cursor per card).
- **Redaction shader** to replace the CSS `<RedactionReveal>` with a shader pixelation pass.
- **Strategy memo copy refresh.**
- **Explicit axe + Lighthouse runs.** Inline-verified by inspection.
- **The Executive Soft Skills Compendium incorporation.** Source at `/Users/connorlaughlin/Documents/CJL Vault/04 Domains/Career/Resume & Positioning/Executive Soft Skills Compendium - GTM Engineer - 2026-05-13.md`. See [HANDOFF.md](HANDOFF.md) for the next agent's brief.

## Commit count

30 atomic commits shipped to `origin/main` on 2026-05-14. Merge point at `19818b66` (the CSP fix). Hero work begins at `c913a67b`; the desk portrait lands at `ffc527c2`.

## Type system locked

| Family | Role | Weights wired |
|---|---|---|
| GT Sectra Fine | Display | 300 Book, 400 Regular, 500 Medium, 700 Bold, 900 Black + italics |
| Geist Sans | Body | Variable |
| Geist Mono | System voice | Regular, Medium |
| Geist Pixel Square | Retro accent | Single weight |

## Motion budget shipped

- Lenis global smooth-scroll
- Motion One (`motion`) primitives, 11 named in `lib/motion.ts`
- OGL WebGL hero (mouse-driven Gaussian swell)
- `<SplitText>` word/char kinetic reveal
- `<FigureMarquee>` infinite horizontal ticker
- `<Magnetic>` cursor magnetism on CTAs
- `<CustomCursor>` ink crosshair + `data-cursor` label swap
- View Transitions API named pairs (case card ↔ case detail)
- Scroll-driven stagger reveal (impact ledger, signature systems, etc.)
- `<PulseOnChange>` on planner cells
- `<FigureReveal>` redaction sweep on framed plates
