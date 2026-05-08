# CLAUDE.md — connorlaughl.in

Project-scoped guidance for Claude. Read alongside [.impeccable.md](.impeccable.md), [DESIGN.md](DESIGN.md), [voiceDNA.md](voiceDNA.md), and [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).

## Quickstart

- Stack: Next.js 16, React 19, Tailwind v4, Sanity CMS, `next-themes`, `geist` + Instrument Serif, `framer-motion`.
- Dev: `npm run dev` (port 3000). After CSS edits, Turbopack sometimes caches stale styles — `rm -rf .next && npm run dev` if changes don't appear.
- Build: `npm run build`.

## Design Context

### Users

Two readers:

1. **Hiring decision-makers** — CEOs, founders, board members, executive recruiters considering Connor for VP Marketing / CMO / Head of GTM at AI-forward, high-growth companies. Scan first, read second.
2. **Existing professional network** — peers and former colleagues landing here from a share. They want recent thinking and the personal side.

Job-to-be-done: prove competence in 30 seconds, communicate taste in 60 seconds, communicate character in 3 minutes.

### Brand Personality

**Rigorous · Editorial · Lived-in.**

- *Rigorous* — every claim has a number, a year, or a state.
- *Editorial* — magazine typography, figure numbering, captions, mat-board frames. Reads like a 1970s reference manual updated last week.
- *Lived-in* — the personal page anchors the work to a human. Warm where warmth is earned, never performative.

Evokes confidence and considered taste. Calm authority. Not slick. Not loud.

### Aesthetic Direction

A small museum of governed systems. Swiss grid + editorial rhythm + retro-futurism + dithered imagery + walnut wood frames. Dark-first cream-on-ink palette with a refined light variant.

### Anti-References

Do **not** look or read like:

1. **Generic SaaS / Stripe-clone** — glossy gradients, colorful product illustrations, "AI for [Industry]" hero copy, three feature columns with icons.
2. **LinkedIn-influencer / personal brand** — bold quote graphics, listicles, look-at-me thought leadership.

### Design Principles

1. **Reportage over rhetoric.** State the fact. Don't sell it.
2. **One frame per medium.** Every photo, video, and figure sits in a wood frame with a mat stroke and a numbered caption.
3. **Mono is the system, serif is the human.** Geist Mono labels work. Instrument Serif tells stories. Pixel only for retro accents.
4. **Two-tone, with restraint.** Cream and ink do most of the work. Accent is a guest. No gradients on text.
5. **The grid is real.** 12 columns desktop, 6rem gutter. Use `?grid` overlay before claiming alignment.
6. **Motion announces, never decorates.** Reduced-motion is first-class.
7. **Light mode is a real mode.** Every component tested on cream paper.
8. **Banned words and patterns are non-negotiable.** See [voiceDNA.md](voiceDNA.md). Em-dashes only in fig captions.

### Accessibility

WCAG 2.1 AA floor. `prefers-reduced-motion` and `prefers-contrast` honored. Focus states 2px accent outline with offset. Skip-to-content link in header.

## Component conventions

- Tailwind theme tokens flow through CSS vars (`--paper`, `--ink`, `--accent`, `--rule`, `--terminal-green`, `--dither-shadow`). Utilities like `text-paper`, `bg-ink`, `border-rule` flip automatically with `html.light`.
- Status pills: `<span class="status-pill pixel-flicker">SHIPPED 2024</span>`. Pixel font, ▌ glyph borders, never two per screen.
- Figure numbering: `[Fig. NN]` mono caption under every framed media element. Numbering registry lives in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).
- Frames: `.dither-frame` is the default (mahogany walnut). `.gilt-frame` for gold per-instance. Each requires the structure:
  ```tsx
  <div className="dither-frame">
    <div className="frame-well aspect-[X] overflow-hidden bg-ink">
      <Image fill ... />
    </div>
  </div>
  ```
  The frame uses `padding: 14px` so the inner well is required to keep the image off the wood.

## Voice non-negotiables

Read [voiceDNA.md](voiceDNA.md) before writing user-facing copy. The fatal patterns:

- Em-dashes in body copy (allowed only inside fig captions and the page title wordmark).
- "Actually," "leverage," "operating proof," "dossier," "outperform," "robust," "tapestry," "delve," "harness," "elevate," "unleash," "architecture of trust."
- Negative parallelism: "Not X. It's Y." in any form.
- Title-case headings (use sentence case).
- "Bold-term: definition" bullet points (write a sentence instead).

Run a grep over rendered HTML before merging copy changes:

```
curl -s http://localhost:3000/<route> | grep -ioE "actually|tapestry|delve|leverage|outperform|operating proof|dossier|game-changer|robust|architecture of trust|elevate|unleash|harness|bustling|meticulous|pivotal" | sort -u
```

Should return empty.

## Sources of truth

- [DESIGN.md](DESIGN.md) — full design system spec
- [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md) — image generation formula
- [voiceDNA.md](voiceDNA.md) — voice rules
- [.impeccable.md](.impeccable.md) — design context (this file links to it)
