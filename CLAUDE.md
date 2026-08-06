# CLAUDE.md — connorlaughl.in

Project-scoped guidance for Claude. Read alongside [DESIGN.md](DESIGN.md) (the system as built), [FIGURES.md](FIGURES.md) (the figure registry), [voiceDNA.md](voiceDNA.md) (voice law), and [HANDOFF.md](HANDOFF.md) (next session's scope).

The site is a reference manual. Every page is a chapter of one document, not a
page of a portfolio. Hold that idea and most layout questions answer themselves.

## Quickstart

- **Stack**: Next.js 16.1 (Turbopack), React 19.2, Tailwind v4 (`@theme inline`), `next-themes`, `motion` (motion.dev), `lenis`, Geist Sans/Mono/Pixel, GT Sectra Fine and Newsreader (both self-hosted).
- **No Sanity**, no CMS, no `framer-motion`, no WebGL. Content is file-based under `content/`, plus markdown bodies rendered by `lib/markdown.tsx`.
- **Dev**: `npm run dev` (port 3000). After CSS edits Turbopack sometimes serves stale styles; `rm -rf .next && npm run dev` if a change does not appear.
- **Build**: `npm run build`. Cover, chapters, longform, OG routes and icons all prerender.
- **Prod-mode local**: `npm run build && npm run start`. Run this before shipping anything CSP-sensitive; dev mode skips CSP.
- **Scripts**: `npm run lint`, `npm run proof:guard` (claim gate), `npm run words` (word counts), `npm run voice:scan` (rendered-copy voice scan). `./scripts/subset-fonts.sh` regenerates the woff2 set; requires `uv`.

## Design context

### Users

Two readers:

1. **Hiring decision-makers**. CEOs, founders, board members and executive recruiters weighing Connor for VP Marketing / CMO / Head of GTM at AI-forward, high-growth companies. They scan first and read second.
2. **Existing professional network**. Peers and former colleagues arriving from a share. They want recent thinking and the person behind it.

Job to be done: prove competence in 30 seconds, communicate taste in 60 seconds, communicate character in 3 minutes.

### Brand personality

**Rigorous, technical, printed.** The voice of a manual that documents systems
somebody actually shipped and still operates.

- *Rigorous*. Every claim carries a number, a year, or a state, and every number resolves through the claim gate.
- *Technical*. Drawings, not decoration. Each figure depicts a real system and labels its real parts.
- *Printed*. Justified serif body on a paper ground, mono labels, a ruler rail, drop caps, running word counts. It should read like a document that went to press.

### Aesthetic direction

A software reference manual: paper ground with an 8px drafting grid, white
sheets floating on it, isometric blueprint line drawings with pastel fills,
pixel section headers, mono captions, a checker band between movements. Light by
default. Dark is a cyanotype negative of the same manual, not a dimmed copy.

The design language follows Dan Hollick's Making Software. The colophon footer
carries that credit by name and it is not optional.

### Anti-references

Do not look or read like:

1. **Generic SaaS or Stripe-clone.** Glossy gradients, product illustrations, "AI for [Industry]" hero copy, three feature columns with icons.
2. **LinkedIn-influencer personal brand.** Quote graphics, listicles, look-at-me thought leadership.
3. **Decorative isometrics.** A drawing that cannot name the real system it depicts is AI slop. Cut it.

### Design principles

1. **Reportage over rhetoric.** State the fact. Do not sell it.
2. **Every figure has a ground truth.** Real artifact, real parts, named in FIGURES.md before it ships.
3. **Four families, one job each.** Geist Pixel for the wordmark and section headers, GT Sectra Fine for display, Newsreader for body, Geist Mono for labels and chrome.
4. **Blueprint is structure, not decoration.** The blue draws lines, rules and links. It never becomes a gradient or a mood.
5. **The sheet is the unit of layout.** Body copy lives on a sheet at a real measure. Full-bleed is the exception and needs a reason.
6. **Motion draws, it does not swoosh.** Strokes draw on, sheets rise, stats fill. Reduced motion completes every one of them instantly.
7. **Light is the default mode and dark is a real one.** Both are tested at every used size.
8. **Voice rules are law.** See [voiceDNA.md](voiceDNA.md).

### Accessibility

WCAG 2.1 AA floor. `prefers-reduced-motion` and `prefers-contrast` honored.
Focus is a 2px blueprint outline with offset, set once globally. Skip-to-content
link in the masthead. Every figure is `role="img"` with `<title>`, `<desc>`, and
a visible caption that states its claim in words, because recruiters paste URLs
into language models and screen-reader users deserve the same claim.

## Architecture quickref

### Tokens

All tokens are CSS custom properties surfaced to Tailwind through `@theme
inline` in `app/globals.css`, so `bg-ground`, `text-body-ink`, `text-blueprint`,
`border-rule-hair` and friends flip with `html.dark` on their own.

| Token | Role |
|---|---|
| `--ground` | Page ground. The paper. |
| `--sheet` | Sheet and figure-plate surface. |
| `--body-ink` | Body text and default inherited color. |
| `--blueprint` | Structural blue: strokes, rules, links, focus. |
| `--blueprint-bright` | Text-safe blue by name. Reach for this when a component needs blue text on a dark ground. |
| `--fig-blue`, `--fig-lavender`, `--fig-teal` | The only fills a figure may use. |
| `--grid-line`, `--plate-grid`, `--grid-paper-line` | Hairline, plate texture, ground grid. Three weights, do not mix them up. |
| `--rule-hair` | Section hairlines and dotted TOC leaders. |
| `--label-muted` | Mono label and caption gray. |
| `--checker-ink` | Checker band tile. |
| `--sheet-shadow` | Sheet lift off the ground, md and up. |

Contrast for the dark values is measured in a comment above `html.dark`. The raw
light blueprint fails AA on the cyanotype ground and is overridden there so no
utility can resolve to it. If you add a dark value, measure it and record the
ratio in that comment.

### Type roles

- **Geist Pixel** (`.font-pixel`): wordmark, TOC section headers, stat labels. Uppercase.
- **GT Sectra Fine** (`.font-display`): display only. Chapter titles, deks, drop-cap glyphs. Its hairlines break at body sizes, so it never sets body copy.
- **Newsreader** (`.manual-body`, `.font-serif-body`): body copy. Ragged right below a 60ch measure, justified with hyphenation above it.
- **Geist Mono** (`.font-mono`): labels, breadcrumbs, captions, stats, buttons, FAQ chrome.
- **Geist Sans**: form controls only. It is the inherited body default and nothing else should rely on it.

`.manual-dropcap` sets the opening capital, one per page.

### Theme architecture

Light values sit on `:root` unconditionally; `html.dark` names only what
changes. `ThemeProvider` is `attribute="class" defaultTheme="light"
enableSystem`, so a visitor with no stored choice gets paper, a dark-OS visitor
lands in the cyanotype negative, and `ThemeToggle` overrides either way.
`viewport.themeColor` tracks both grounds.

### Manual chrome

`components/manual/` holds the furniture, all re-exported from its `index.ts`:

- `Masthead`, `ColophonFooter`: the running head and foot of the document.
- `Sheet`: the white surface body copy sits on.
- `ChapterLayout`: chapter shell. Wraps everything in `.manual-root` and composes header, sidebar, meta and ruler.
- `SidebarTOC`: chapter sidebar with scroll-spy over in-page anchors.
- `CoverTOC`: the cover table of contents with dotted leaders and build-time word counts.
- `ChapterHeader`, `ChapterMeta`, `Breadcrumb`: title block, `N WORDS | CONNOR LAUGHLIN` meta line, and trail.
- `RulerRail`: the fixed reading-progress ruler. Needs gutter clearance from the masthead at desktop.
- `CheckerBand`: the pure-CSS checker between movements.
- `StatTable`, `TerminalFAQ`: cover stats and the `IN:/OUT:` FAQ.

### Figure system

`components/figures/` holds primitives (`Figure`, `IsoBox`, `ExplodedStack`,
`GridPlane`, `IsoChain`, `LeaderLabel`) and the numbered plates
(`fig-0NN-*.tsx`), all re-exported from its `index.ts`.

Every primitive strokes in `var(--blueprint)` at 1.25 and fills only from the
`--fig-*` tokens. Labels are mono, uppercase and horizontal.

[FIGURES.md](FIGURES.md) is the registry and it is append-only. A new plate takes
the next free number and lands in the table with its ground truth before it
ships. Never renumber. Caption grammar is `FIG_00N` followed by `[ SUBJECT ]`,
no year marks.

### Motion

`lib/motion.ts` holds the scales: `EASE`, `DURATION`, `STAGGER`, and
`reducedMotionFallback()`. Nothing else lives there.

`lib/motion-manual.ts` is the catalog every component animates from:

- `drawOn()`: SVG stroke draw-on when a figure enters the viewport.
- `sheetReveal()`: sheets rise into place.
- `statFill()`: stat rows fill.
- `wordmarkReveal()`: pixel reveal on the masthead wordmark.
- `prefersReducedMotion()`: the branch every one of them takes.

Under reduced motion figures render complete, nothing draws on, Lenis is
bypassed for native scroll, and the ruler is static. Add a primitive here rather
than hand-rolling an `animate()` call in a component.

### Claim gating

This is the rule that matters most. No claim numeral reaches a page unless it
resolves through `content/proof-metrics.ts`.

- A **claim numeral** is any business outcome, magnitude or performance figure. Structural numbering (`FIG_003`, step ordinals, chapter numbers) and build-computed word counts are exempt.
- `renderableProofMetrics()` and `renderableProofMetric()` are the only legal way to render a `ProofMetric`. They apply the metric's `publicUse` posture (`show`, `soften`, `hide`, `label-as-target`) and drop what must not appear.
- `proseProofClaims` carries claims that appear inside sentences rather than in a stat table. `proseClaimTokens` maps a stable token to its metric so prose can name a claim without hardcoding its value. Prose claims go through the same gate as everything else.
- `npm run proof:guard` enforces it: it discovers every renderer, asserts each resolves through the gate, forbids known direct-access patterns, and holds a floor on the renderer count. **The floor is never lowered.** If your change drops the count, you removed a renderer and need to say so.
- Never put a gated value, a private vendor name, or a private system name in repo markdown. That includes FIGURES.md, the overnight log, and this file.

### Word counts

`scripts/word-counts.mjs` and `lib/word-counts.ts` compute counts at build time
from the same source that renders, so a count can never describe text a reader
cannot see. Drafts, stubs and `publicUse: "hide"` fields are excluded by
construction, which is a leak guard as much as an accuracy one. Bespoke TSX
pages (resume, about, the planner) carry no word-count meta.

### Voice scan

`scripts/voice-scan.mjs` fetches rendered routes and scans the copy a reader
actually gets, which is the only place voice rules can be checked. It resolves
routes from the sitemap plus explicit extras. Run it against dev and again
against a production build before merging copy changes; some copy only appears
after prerender.

```bash
npm run build && npm run start &   # then, in another shell:
npm run voice:scan
```

### CSP and security

`proxy.ts` emits a host-restricted CSP plus `X-Frame-Options: DENY`, HSTS,
`Referrer-Policy` and `Permissions-Policy`. No nonce-based CSP: Next.js
prerendered HTML carries no per-request nonce, so a nonce plus `strict-dynamic`
policy blocks every chunk and the inline bootstrap. The working policy uses
`'self' 'unsafe-inline'` for `script-src`. Dev mode skips CSP entirely, which is
why prod-mode local is the only real check.

## Voice non-negotiables

Read [voiceDNA.md](voiceDNA.md) before writing any user-facing copy. The fatal
patterns:

- Em-dashes in body copy. Allowed only inside `[Fig. N]`-style labels.
- "Actually," "leverage," "operating proof," "dossier," "outperform," "robust," "tapestry," "delve," "harness," "elevate," "unleash," "architecture of trust."
- Negative parallelism: "Not X. It's Y." in any form.
- Title-case headings. Use sentence case.
- "Bold-term: definition" bullets. Write a sentence instead.
- Paragraphs longer than three sentences.

`npm run voice:scan` should return empty on every route, in dev and in prod.

## Sources of truth

- [DESIGN.md](DESIGN.md): the visual system as built. Tokens, type scale, grid, sheet geometry, figure rules, motion catalog, theme architecture.
- [FIGURES.md](FIGURES.md): the append-only figure registry.
- [voiceDNA.md](voiceDNA.md): voice rules and banned phrases.
- [HANDOFF.md](HANDOFF.md): next session's scope.
- `docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md`: the redesign spec the current system was built to.
- [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md): historical. The generated-image system it documents was retired with the old design.
