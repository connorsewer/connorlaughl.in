# CLAUDE.md — connorlaughl.in

Project-scoped guidance for Claude. Read alongside [DESIGN.md](DESIGN.md), [voiceDNA.md](voiceDNA.md), [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md), and [HANDOFF.md](HANDOFF.md) (which always points at the next chunk of work).

## Quickstart

- **Stack**: Next.js 16.1 (Turbopack), React 19.2, Tailwind v4, `next-themes`, `motion` (motion.dev), `lenis`, `ogl` for WebGL, `geist` + GT Sectra Fine (self-hosted).
- **No Sanity**, no CMS, no `framer-motion`. All content is file-based under `content/`.
- **Dev**: `npm run dev` (port 3000). After CSS edits, Turbopack sometimes caches stale styles; `rm -rf .next && npm run dev` if changes don't appear.
- **Build**: `npm run build`. 41 routes prerendered (most static, case-study + longform + OG via `generateStaticParams`).
- **Prod-mode local**: `npm run build && npm run start`. Always run this before shipping CSP-sensitive changes — dev hides CSP issues.
- **Font subset**: `./scripts/subset-fonts.sh` regenerates the woff2 set from the source TTFs. Requires `uv`.

## Design Context

### Users

Two readers:

1. **Hiring decision-makers** — CEOs, founders, board members, executive recruiters considering Connor for VP Marketing / CMO / Head of GTM at AI-forward, high-growth companies. Scan first, read second.
2. **Existing professional network** — peers and former colleagues landing here from a share. Want recent thinking and the personal side.

Job-to-be-done: prove competence in 30 seconds, communicate taste in 60 seconds, communicate character in 3 minutes.

### Brand personality

**Rigorous · Editorial · Lived-in.** Calm authority. Not slick. Not loud.

- *Rigorous* — every claim has a number, a year, or a state.
- *Editorial* — magazine typography, figure numbering, captions, walnut mat-board frames. Reads like a 1970s reference manual updated last week.
- *Lived-in* — the hero portrait (Connor + Henry at the desk, Lincoln Park) and the /about page anchor the work to a human. Warm where warmth is earned.

### Aesthetic direction

A small museum of governed systems. Swiss grid, editorial GT Sectra serif, retro-futurist accents, dithered imagery, walnut wood frames. Dark-first cream-on-ink palette with a refined light variant.

### Anti-references

Do **not** look or read like:

1. **Generic SaaS / Stripe-clone** — glossy gradients, colorful product illustrations, "AI for [Industry]" hero copy, three feature columns with icons.
2. **LinkedIn-influencer / personal brand** — bold quote graphics, listicles, look-at-me thought leadership.

### Design principles

1. **Reportage over rhetoric.** State the fact. Don't sell it.
2. **One frame per medium.** Every photo, video, and figure sits in a walnut frame with a mat stroke and a numbered caption.
3. **Display is GT Sectra; body is Geist Sans; system labels are Geist Mono; retro accents are Geist Pixel.** Four families, each with one job.
4. **Two-tone, with restraint.** Cream and ink do most of the work. Khaki accent is a guest. No gradients on text.
5. **The grid is real.** 12 columns desktop, 6rem gutter. Use `?grid` overlay before claiming alignment.
6. **Motion is maximum, not minimum, but reduced-motion is first-class.** Every animation has a `prefers-reduced-motion: reduce` fallback.
7. **Light mode is a real mode.** Every component tested on cream paper.
8. **Voice rules are non-negotiable.** See [voiceDNA.md](voiceDNA.md). Em-dashes only inside `[Fig. N]` labels.

### Accessibility

WCAG 2.1 AA floor. `prefers-reduced-motion` and `prefers-contrast` honored. Focus states 2px accent outline with offset. Skip-to-content link in header.

## Architecture quickref

### Motion stack

- **`motion`** (motion.dev): primary animation library. `animate()`, `inView()`, `stagger()`. ~24KB gzipped.
- **`lenis`**: global smooth-scroll via `<SmoothScrollProvider>`. Reduced-motion bypasses Lenis entirely; native scroll runs.
- **`ogl`**: lightweight WebGL (~16KB gzipped) for the hero plate displacement shader. Lazy-loaded.
- **`lib/motion.ts`**: the canonical primitive catalog (`enter-up`, `stagger-up`, `splittext-words`, etc.). Components import specs from here.
- **`<SplitText>`**: kinetic word/char reveal on display copy. SSR-friendly (spans split during render).
- **`<Magnetic>`**: cursor magnetism on CTAs and signature-system cards. 110px radius, 6px max translate.
- **`<FigureMarquee>`**: infinite horizontal ticker under the hero. Pure CSS animation.
- **`<CustomCursor>`**: ink crosshair + label swap based on `data-cursor` attribute. Active on `(pointer: fine) and (min-width: 1024px)` only.
- **`<FigureReveal>`**: SSR-safe redaction-sweep on framed plates. `data-js="active"` gating so no-JS users see clean images.
- **`<PulseOnChange>`**: micro-pulse on value change. Used on RevOps planner output cells.
- **View Transitions API**: named pairs declared via inline `viewTransitionName` styles (signature-system card title ↔ case-detail H1, keyed by slug).

### Components / pages

- **Hero**: `<HeroSignature>` wraps the figure shell + dither-frame + static `<img>` + the lazy-loaded `<WebGLHero>` (ogl) canvas overlay. Single-slide hero now; the rolodex API survives for future multi-slide use.
- **Impact ledger**: `<ImpactLedger>` renders the typeset table with anchor metric + supporting metrics. Stagger reveal on viewport-enter.
- **Section dividers**: `<SectionDivider>` for thin 16:4 plate bands between major homepage sections (control panel, grid, blueprint).
- **Case-study TOC**: `<CaseStudyTOC>` fixed left-rail on xl+. Scroll-spy with `-30%/-60%` rootMargin.
- **Long-form renderer**: `lib/markdown.tsx` is the zero-dep markdown renderer. Supports pipe-tables, ✅→▪ emoji-glyph swap, 68ch body cap.

### Tokens

Tailwind theme vars flow through CSS custom properties (`--paper`, `--ink`, `--accent`, `--rule`, `--terminal-green`, `--dither-shadow`, `--signal`). Utilities like `text-paper`, `bg-ink`, `border-rule` flip automatically with `html.light`.

### Frames

- `.dither-frame` (walnut, default) and `.gilt-frame` (gold). Padding `14px`; inner `.frame-well` is required to keep the image off the wood.
- ```tsx
  <div className="dither-frame">
    <div className="frame-well aspect-[X] overflow-hidden bg-ink">
      <Image fill ... />
    </div>
  </div>
  ```

### Figure numbering

`[Fig. NN]` mono caption under every framed media element. Registry in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md) §C. Numbers are stable; never renumber, only append.

### CSP / security

`proxy.ts` emits a host-restricted CSP plus `X-Frame-Options DENY`, HSTS, `Referrer-Policy`, `Permissions-Policy`. No nonce-based CSP — Next.js prerendered HTML doesn't carry a per-request nonce, so a nonce + strict-dynamic policy blocks every chunk + inline bootstrap. The pragmatic policy uses `'self' 'unsafe-inline'` for `script-src`, which works under prerender. Dev mode skips CSP entirely.

## Voice non-negotiables

Read [voiceDNA.md](voiceDNA.md) before writing any user-facing copy. The fatal patterns:

- Em-dashes in body copy (allowed only inside `[Fig. N]` labels).
- "Actually," "leverage," "operating proof," "dossier," "outperform," "robust," "tapestry," "delve," "harness," "elevate," "unleash," "architecture of trust."
- Negative parallelism: "Not X. It's Y." in any form.
- Title-case headings (use sentence case).
- "Bold-term: definition" bullet points (write a sentence instead).

Run a route-copy scan over rendered HTML before merging copy changes:

```bash
curl -s http://localhost:3000/<route> | sed -E 's/<[^>]*>//g' \
  | grep -ioE "leverage|robust|dossier|outperform|pivotal|tapestry|delve|harness|elevate|unleash|supercharge|revolutionize|future-proof|testament|foster|intricate|meticulous|nestled|bustling|beacon|enduring|interplay|embark|multifaceted|elucidating|culminating|swiftly|architecture of trust|game-changer|cutting-edge|furthermore|notably|consequently|not just|not only" | sort -u
```

Should return empty across every priority route.

## Sources of truth

- [DESIGN.md](DESIGN.md) — tokens, type, grid, motion budget, image system, WebGL guardrails
- [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md) — image generation formula + per-figure prompts + figure registry
- [voiceDNA.md](voiceDNA.md) — voice rules + banned phrases
- [HANDOFF.md](HANDOFF.md) — next session's scope (current: incorporate the Executive Soft Skills Compendium)
- [GOAL.md](GOAL.md) — historical record of the redesign session goal (already shipped)
