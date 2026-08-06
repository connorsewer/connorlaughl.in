# connorlaughl.in

Connor J. Laughlin's portfolio, built as a reference manual. VP of Marketing and
GTM (acting CMO), GTM engineer. Every page is a chapter of one document: paper
ground, white sheets, isometric blueprint figures, running word counts.

The design language follows Dan Hollick's Making Software. The colophon footer
credits it by name.

## Stack

- **Framework**: Next.js 16.1 (Turbopack), React 19.2
- **Styling**: Tailwind v4 via `@theme inline` CSS variables. Light by default, with a cyanotype dark mode.
- **Typography**: GT Sectra Fine (display), Newsreader (body serif), Geist Sans / Mono / Pixel Square. All self-hosted.
- **Motion**: `motion` (motion.dev) and `lenis` for smooth scroll. No WebGL.
- **Theme**: `next-themes`, light default, system preference honored.
- **Content**: file-based, under `content/`. No CMS.
- **Hosting**: auto-deploys from `main` (Vercel via GitHub integration).

## Routes

| Route | What it is |
|---|---|
| `/` | Cover: masthead, drop-cap opening, cover figures, table of contents, stats block, FAQ, contact, colophon |
| `/case-studies` | Section 1 contents |
| `/case-studies/[slug]` | 11 case-study chapters |
| `/case-studies/strategy-memo` | Chapter, Section 1 |
| `/edge` | Section 2 as one scroll document with in-page chapter chrome |
| `/longform/[slug]` | Section 3, 4 long-form chapters |
| `/resume` | Section 4. Chrome-light standalone, built to scan in 30 seconds |
| `/about` | Appendix chapter |
| `/tools/revops-capacity-planner` | Appendix chapter. Interactive reverse-funnel calculator |
| `/proof` | Redirect to `/case-studies` |
| `not-found` | Manual-styled 404 |
| OG image routes, icons, `/sitemap.xml`, `/robots.txt` | Metadata surface |

## Run locally

```bash
npm install
npm run dev          # port 3000
```

## Build and verify

```bash
npm run lint
npm run build
npm run proof:guard  # claim gate: every rendered numeral resolves through content/proof-metrics.ts
npm run words        # build-time word counts
npm run start        # prod-mode local; the only real CSP check, since dev skips it
npm run voice:scan   # rendered-copy voice scan; must be empty in dev and prod
```

## Font subset

GT Sectra Fine ships as woff2 across 10 files (5 weights, roman and italic);
source TTFs are tracked alongside. Newsreader ships as 4 static instances pinned
from the variable source and subset to Latin-plus.

```bash
./scripts/subset-fonts.sh
```

Requires [uv](https://github.com/astral-sh/uv); the script installs fonttools and
brotli in an isolated env on the fly. `scripts/subset-fonts.py` carries the
Newsreader instancing commands.

## Sources of truth

| Doc | What it owns |
|---|---|
| [`DESIGN.md`](DESIGN.md) | The visual system as built: tokens, type, surfaces, layout, figures, motion, theme, a11y |
| [`FIGURES.md`](FIGURES.md) | The append-only figure registry and the ground-truth rule |
| [`voiceDNA.md`](voiceDNA.md) | Voice rules, banned phrases, anti-AI structural patterns |
| [`CLAUDE.md`](CLAUDE.md) | Project guidance for AI agents working on this codebase |
| [`HANDOFF.md`](HANDOFF.md) | What's next for the next session |
| [`MIDJOURNEY_PROMPTS.md`](MIDJOURNEY_PROMPTS.md) | Historical. The generated-image system the redesign retired |

## Claim gating

No business outcome, magnitude or performance figure appears anywhere on the
site unless it resolves through `content/proof-metrics.ts`. That covers prose,
figure labels, captions, stat tables and OG cards alike. `npm run proof:guard`
enforces it and holds a floor on the renderer count that is never lowered. See
[CLAUDE.md](CLAUDE.md) for the full rule.

## License

The code in this repo is private. GT Sectra Fine is a commercial typeface; the
webfont files ship under Connor's commercial web-embedding license. Newsreader
ships under the SIL Open Font License, copy included at
`public/fonts/newsreader/OFL.txt`. Raster artwork under `public/` is Connor's
commissioned work. Not for redistribution.
