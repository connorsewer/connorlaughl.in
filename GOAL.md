# GOAL — connorlaughl.in design overhaul, locked 2026-05-14

## The one-sentence frame

Take a competent editorial portfolio with no real motion and turn it into a living museum of governed systems: GT Sectra display, WebGL signature moments, scroll-driven everywhere, schematic plates that actually say something, and a case-study page that scans in 30 seconds instead of 5 minutes.

## North star

A CEO or CRO who lands on the homepage knows three things inside ten seconds:
1. Connor builds revenue systems (not just decks).
2. The system in front of them is the proof.
3. He has executive judgment plus the technical depth.

Sloppy editorial = generic portfolio. Bold editorial + serious motion + honest schematics = the asset.

## What's in scope this session

All of P0, P1, and most of P2 from the 2026-05-14 critique. Motion budget is maximum, not minimum. WebGL is a yes. View Transitions, Lenis, SplitText, magnetic cursor, scroll-driven everything: yes. The brief is "diversify the visual language and the type of motion."

### P0 (blocking)
- Hero replaced with a WebGL signature plate plus a kinetic SplitText H1.
- All dither plates fixed: 6 hand-built SVG schematics per signature system, plus subject-specific artifact plates (the same orange field on 22 webps is gone).
- Case-study detail page collapses from 699 lines and 14 stacked sections to roughly 350 lines with a sticky TOC, a real density toggle, and a "Full walk-through" jump that hides the deep sections behind a click.
- Impact ledger renders as a typeset table with one anchor metric per row, stagger-revealed on scroll. No more spreadsheet.
- Motion budget: Lenis smooth-scroll, view transitions, WebGL hero, WebGL dither-distortion on case cards, WebGL shader for redaction reveals, SplitText on every H1/H2, magnetic cursor on CTAs, scroll-driven section dividers, marquee of figure numbers somewhere, dot/glyph that walks each section.

### P1 (high-leverage)
- Type system: GT Sectra Fine (Black, Bold, Medium, Regular, Book, plus italics) replaces Instrument Serif everywhere. Geist Sans stays for body. Geist Mono stays for system voice. Geist Pixel stays for retro accents (one per screen).
- Header redesigns to surface Resume, Tools, Now, plus a live availability pill from Hire Signal.
- Signature-systems grid gets card-shape variance (3 shapes minimum) plus per-system schematic plates.
- Three duplicate text-puddle sections on the homepage collapse to one.
- Hire Signal moves into the header pill. Now feed moves to /now with a 3-item footer preview.
- 5-stat hero strip becomes 4 anchor stats plus a moving ticker for the supporting numbers.
- Reading Path jump pills become a real density toggle (one client component, three visibility states, SEO-safe via `hidden`).

### P2 (polish)
- Long-form renderer: table support, body width cap at 68ch, ✅ emoji replaced with editorial glyph.
- Planner output cells animate with spring + CountUp.
- Strategy memo: light copy refresh, no structural rewrite, frame stays.
- Light mode audit, axe pass, Lighthouse.
- Replace at least 18 of the 22 webps with either Midjourney re-renders or hand-built SVG schematics.
- /resume.pdf static asset alongside the printable route.

## What stays out

- /uses, /talks, alternate route additions beyond /now.
- Calendly, Plausible, Vercel Analytics, newsletter capture.
- Sanity comes back.
- Bespoke 404.
- Print stylesheet beyond what already exists.
- /about narrative content (layout-only changes are fine).

## Type system (locked)

| Family | Role | Weights wired |
|---|---|---|
| GT Sectra Fine | Display (page titles, hero, pull quotes, drop caps) | Black, Bold, Medium, Regular, Book, plus italics for each |
| Geist Sans | Body, paragraph copy | Variable |
| Geist Mono | System voice (mono labels, fig numbers, nav, status) | Regular, Medium |
| Geist Pixel (Square) | Retro accent (status pills, hover labels, badges) | Single weight |

`--font-display` switches from Instrument Serif to GT Sectra Fine. Everything else stays.

## Motion budget (locked, maximum)

- Lenis smooth-scroll globally, opt-out via `prefers-reduced-motion`.
- Motion One (motion.dev) as the primary motion library. Framer Motion gets removed.
- View Transitions API named pairs for hero→case detail and signature-system card→detail.
- WebGL via OGL (lighter than three.js) for: hero plate with mouse-driven dither displacement, case-card hover dither distortion, redaction-reveal pixelation shader.
- SplitText (custom or via GSAP SplitText if license is acquired) for every H1/H2 kinetic reveal.
- Magnetic cursor on every CTA and signature-system card title.
- Scroll-driven section dividers that draw on entry.
- Animated dot/glyph that walks each section's left rule on enter.
- Marquee of figure numbers (`Fig. 01 · Fig. 02 · Fig. 03 · …`) running under the hero ticker.
- CountUp on every stat, debounced.
- Spring + CountUp on planner outputs.
- Every animation has a `prefers-reduced-motion: reduce` fallback to instant.

## Image system update

Three layers, used in this order:

1. Hand-built SVG schematics: 6 signature systems (Ghost Pipeline exists, the other 5 need building). Use the symbol library at `https://github.com/sjgallagher2/SchematicSymbolsSVG` for primitives. Each schematic reads at thumbnail size, holds together at full page width, scales without dithering.
2. Midjourney-rendered artifact plates: replace at least 18 of the current 22 webps. New prompts target high-contrast subject specificity (a KPI dictionary actually shows a table, a BDR logbook shows a logbook).
3. Dithered photography (about page, hero portrait): stays. Higher contrast, less aggressive dither.

Frame CSS gets fixed so the underlying image content survives the walnut frame.

## Sequencing

Four blocks. Validate (lint, build, dev-server visual diff via Playwright) after every block. Atomic commits per task inside the block.

- Block A — foundation. GT Sectra wired. Motion primitives in place. Lenis active. Dither-frame CSS rewrite. No new features yet.
- Block B — hero plus homepage signature moments. WebGL hero, impact ledger restructure, header redesign, section consolidation.
- Block C — case-study restructure. Sticky TOC, real density toggle, view transitions, WebGL card hover, redaction shader.
- Block D — polish. Longform table support, planner motion, strategy memo refresh, light mode audit, axe, Lighthouse.

## Constraints

- No push, no deploy, no PR. Local commits only.
- Voice rules from voiceDNA.md are non-negotiable. No em dashes in body copy (figure labels excepted). No banned phrases.
- All claim postures preserved on every metric.
- WCAG 2.1 AA floor. Reduced-motion fallbacks first-class.
- Lint stays green, build stays green, after every block.

## What "done" looks like

- The homepage scans in 10 seconds: title, proof claim, 4 anchor metrics, signature systems with real schematics, one CTA. Heroic. Motion-rich. Not a brochure.
- Case-study detail reads in 90 seconds if you want the TLDR, 5 minutes if you want the case, 15 minutes if you want the full walk-through. The density toggle delivers.
- Six signature systems each carry a custom SVG schematic plate. Zero of them show the same orange field as a neighbor.
- The site has at least 6 distinct motion moments that a visitor will remember (hero plate, card hover, view transition, redaction reveal, SplitText kinetic title, marquee).
- GT Sectra carries a real weight ladder. Hierarchy is visible without reading the words.
- Light mode holds. Reduced-motion holds. Lighthouse holds.

## Open items still to confirm

- License posture for GT Sectra Fine in production. The user has the font files. Assumption: he has a license, deployment is OK.
- Hire Signal availability values: live or env-controlled. Default plan is env-controlled so the user can flip without a code push.
- /resume.pdf generation method: print to PDF and check in, or build-time generation. Default plan is print-to-PDF, check in, regenerate on resume edits.
- Whether the user wants the SchematicSymbolsSVG repo vendored into `public/symbols/` or treated as a source-of-truth-only reference for hand-built schematics.
