# connorlaughl.in

Connor J. Laughlin's portfolio site. VP of Marketing & GTM (acting CMO), GTM Engineer. Hand-built in Next.js 16 / React 19 / Tailwind v4 with a custom motion + WebGL layer.

## Stack

- **Framework**: Next.js 16.1 (Turbopack), React 19.2
- **Styling**: Tailwind v4 via `@theme inline` CSS variables, dark-first cream-on-ink with a light variant
- **Typography**: GT Sectra Fine (self-hosted, 5 weights + italics, subset to woff2), Geist Sans, Geist Mono, Geist Pixel Square
- **Motion**: `motion` (motion.dev), `lenis` (smooth scroll), `ogl` (~16KB WebGL)
- **Theme**: `next-themes`, dark default
- **Content**: file-based. No CMS.
- **Hosting**: auto-deploys from `main` (Vercel via GitHub integration)

## Routes (41 prerendered)

- `/` — homepage: desk-portrait hero, impact ledger, signature systems, about teaser, now feed, hire signal, contact
- `/about` — personal narrative
- `/case-studies` — archive with multi-select filter chips
- `/case-studies/[slug]` — 11 case-study detail pages with 5-part structure
- `/case-studies/strategy-memo` — short editorial memo
- `/longform/[slug]` — 4 long-form markdown reads
- `/resume` — printable resume
- `/tools/revops-capacity-planner` — interactive reverse-funnel calculator
- `/proof` — 307 redirect to `/case-studies`
- `/opengraph-image`, `/case-studies/[slug]/opengraph-image` — dynamic OG plates
- `/sitemap.xml`, `/robots.txt`

## Run locally

```bash
npm install
npm run dev          # port 3000
```

## Build + verify

```bash
npm run lint
npm run build        # 41 routes, all SSG except the proxy
npm run start        # prod-mode local; verifies CSP under real conditions
```

## Font subset

GT Sectra Fine ships as woff2 at ~414KB total across 10 files (5 weights × 2 styles). Source TTFs are also tracked. To regenerate the woff2 set after changing the Unicode range:

```bash
./scripts/subset-fonts.sh
```

Requires [uv](https://github.com/astral-sh/uv); the script installs fonttools + brotli in an isolated env on the fly.

## Sources of truth

| Doc | What it owns |
|---|---|
| [`DESIGN.md`](DESIGN.md) | Tokens, type ladder, grid, motion budget, image system, WebGL guardrails |
| [`MIDJOURNEY_PROMPTS.md`](MIDJOURNEY_PROMPTS.md) | Figure registry + per-figure prompts + base treatment formula |
| [`voiceDNA.md`](voiceDNA.md) | Voice rules, banned phrases, anti-AI structural patterns |
| [`CLAUDE.md`](CLAUDE.md) | Project guidance for AI agents working on this codebase |
| [`HANDOFF.md`](HANDOFF.md) | What's next for the next session |

## Voice quickcheck

Should return zero hits on every rendered route:

```bash
curl -s http://localhost:3000/<route> \
  | sed -E 's/<[^>]*>//g' \
  | grep -ioE "leverage|robust|dossier|outperform|pivotal|tapestry|delve|harness|elevate|unleash|supercharge|revolutionize|future-proof|testament|foster|intricate|meticulous|nestled|bustling|beacon|enduring|interplay|embark|multifaceted|elucidating|culminating|swiftly|architecture of trust|game-changer|cutting-edge|furthermore|notably|consequently|not just|not only"
```

## License

The code in this repo is private. GT Sectra Fine is a commercial typeface; the webfont files ship under Connor's commercial web-embedding license. The illustrations under `public/` are Connor's commissioned artwork (Midjourney + hand-drawn ink portrait). Not for redistribution.
