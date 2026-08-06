# .impeccable.md

Persistent design context for connorlaughl.in. Read this before any visual work.

## Design Context

### Users

The site has two primary readers:

1. **Hiring decision-makers** — CEOs, founders, board members, and executive recruiters considering Connor for VP Marketing / CMO / Head of GTM roles at AI-forward, high-growth companies. They scan first, read second. They've seen a thousand exec portfolios and are tired of every one.
2. **Existing professional network** — peers, former colleagues, and clients who land here from a LinkedIn share or word-of-mouth. They want to see what he's been up to, the personal side, and recent thinking.

The job-to-be-done: prove competence in 30 seconds, communicate taste in 60 seconds, communicate character in 3 minutes. Each scroll layer earns the next.

### Brand Personality

**Rigorous · Editorial · Lived-in.**

- *Rigorous* — every claim has a number, a year, or a state. Governance, SLAs, audit trails are part of how the work is described, not buzzwords.
- *Editorial* — magazine typography (Instrument Serif display, Geist Sans body, Geist Mono labels). Figure numbering. Captions. Mat-board frames. Reads like a small museum or a 1970s reference manual that someone updated last week.
- *Lived-in* — the personal page (Kristin, three dogs, Liverpool FC, Criterion Collection nights, guitar within reach) keeps the work anchored to a human. Warm where warmth is earned, never performative.

The interface should evoke confidence and considered taste. Not slick. Not loud. Calm authority.

### Aesthetic Direction

**A small museum of governed systems.**

- **Visual fusion**: Swiss grid discipline (12-col, mono captions, tight alignment) + editorial rhythm (Instrument Serif, drop caps, marginalia) + retro-futurism (terminal/CRT references, ASCII grid overlays, status pills) + dithered imagery (1-bit Atkinson halftone, no glossy stock) + rich-walnut wood frames around every photo, video, and figure.
- **Mode**: dark-first (cream-on-ink) with a refined light variant. Both held to ≥4.5:1 body contrast.
- **Color**: two-tone (cream `#F6F1E7` + ink `#070707`) with a single warm-khaki accent (`#B7AA7A` dark, `#7D744D` light). Wood frames provide the only other color (mahogany gradients). Terminal-green token reserved for one status pill per screen.
- **Type**: Instrument Serif (display) / Geist Sans (body) / Geist Mono (system labels) / Geist Pixel Square (retro accents only — status pills, ASCII grid, fig badges).
- **Imagery**: every image dithered or ASCII-rendered. Subjects are wide open — terminals, blueprints, control panels, magazine spreads, typographic posters, signage, dithered photography of people and places, anything that earns it. Text and logos are welcome when they serve the image. The dithered treatment carries the identity, not a narrow subject list. See the latitude section in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).
- **Frames**: mahogany walnut on every media element via `.dither-frame`, with a `.gilt-frame` (gold) variant available per-instance.
- **Motion**: conservative. Fade, slide-up, ASCII flicker, CRT scanline on primary CTAs. No bounce, no springs on display copy, no animated color. Reduced-motion swaps everything to instant.

### Anti-References

This site should explicitly **not** look or read like:

1. **Generic SaaS / Stripe-clone** — glossy gradients, colorful product illustrations, "AI for [Industry]" hero copy, three feature columns with icons. Most exec portfolios drift this way; we push away from it.
2. **LinkedIn-influencer / personal brand** — bold quote graphics, "10 things I learned" listicles, look-at-me thought leadership, aggressive personal branding energy. Also avoided.

If a design decision starts to resemble either of these, reject it.

### Design Principles

These guide every decision. Cite them in code review.

1. **Reportage over rhetoric.** State the fact. Don't sell it. If a sentence exists only to make the subject sound important, cut it. (Driven by [voiceDNA.md](voiceDNA.md) and [DESIGN.md §1](DESIGN.md).)
2. **One frame per medium.** Every photo, video, and figure sits in a wood frame with a mat stroke and a numbered caption. The frame is not decoration; it's how the page treats imagery as evidence.
3. **Mono is the system, serif is the human.** Geist Mono labels the work. Instrument Serif tells the story. Sans body fills the middle. Pixel speaks only in retro-futurist accents (status pills, fig badges).
4. **Two-tone, with restraint.** Cream and ink do most of the work. Accent is a guest, never a body color. No gradients on text. No drop shadows on text. No third color without justification.
5. **The grid is real.** 12 columns at desktop, max 64–80rem container, 6rem outer gutter. Use the dev `?grid` overlay before claiming alignment. Asymmetric splits over centered ones when there's hierarchy to communicate.
6. **Motion announces, never decorates.** If motion isn't carrying meaning, cut it. Reduced-motion is a first-class state, not an afterthought.
7. **Light mode is a real mode.** Every component tested on cream paper. Dithered imagery and accent text must hold contrast. Wood frames don't change saturation between modes.
8. **Banned words and patterns are non-negotiable.** Em-dashes only inside fig captions. No "actually," "leverage," "operating proof," "dossier," "outperform," "robust," or any negative-parallelism construction ("Not X. It's Y."). See [voiceDNA.md](voiceDNA.md) for the full hit list.

### Accessibility

- WCAG 2.1 AA as the floor. Body contrast ≥4.5:1, large display ≥3:1.
- `prefers-reduced-motion` honored across all motion (hero video swaps to poster, ASCII flicker becomes static, scanline becomes a static rule).
- `prefers-contrast: more` ramps `--rule` opacity up.
- Focus states use a 2px accent outline with offset.
- Skip-to-content link present in header.
- Header backdrop-blur falls back to higher-opacity solid where unsupported.

### Stack snapshot

- Next.js 16 (App Router) + React 19 + Tailwind v4 (`@theme inline`) + Sanity CMS (project `tb1n5tfz`)
- `geist@1.7.0` (Sans, Mono, Pixel Square) + Instrument Serif (Google Fonts)
- `next-themes` for light/dark, `framer-motion` for redaction reveals
- All theme colors flow through CSS vars (`--ink`, `--paper`, `--accent`, `--rule`, `--terminal-green`, `--dither-shadow`) so `text-paper`, `bg-ink`, etc. automatically flip with `html.light`.

### Sources of truth

- [DESIGN.md](DESIGN.md) — full design system spec (tokens, type, grid, motion, imagery, component checklist)
- [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md) — image generation formula and per-figure prompts
- [voiceDNA.md](voiceDNA.md) — voice rules, banned phrases, self-check
- [.impeccable.md](.impeccable.md) — this file (design context)
