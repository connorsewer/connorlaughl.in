# DESIGN.md — the manual system, as built

This documents what is in the repo today, not an intent. If the code and this
file disagree, the code is right and this file is stale. Fix it.

The colophon footer carries the byline, the type set, and the stack. The spec
made a named design-language credit a shipping requirement; it was removed by
Connor's decision 2026-08-06, and the spec section it came from no longer
applies.

Companion documents: [CLAUDE.md](CLAUDE.md) for working rules,
[FIGURES.md](FIGURES.md) for the figure registry, [voiceDNA.md](voiceDNA.md) for
voice.

The spec this system was built to is archived at
[`docs/archive/2026-08-05-makingsoftware-redesign-design.md`](docs/archive/2026-08-05-makingsoftware-redesign-design.md).
Read it for the reasoning behind a decision, never as a requirement: where it
and this file disagree, this file wins, and where this file and the code
disagree, the code wins.

---

## 1. The idea

The site is a printed reference manual for the revenue systems Connor has built.
One document, chapters instead of pages, a table of contents that knows how long
each chapter is, a ruler that tracks where you are in it, and drawings that
document real machinery.

Three consequences worth internalizing:

1. **Chrome is running furniture.** The masthead, breadcrumb, meta line, sidebar and colophon appear on every chapter because a manual has running heads and feet. They are not navigation garnish.
2. **The sheet is the unit of layout.** Body copy lives on a white sheet resting on paper. Full bleed is the exception.
3. **A drawing must document something.** Figures are technical illustration, not decoration. See §6.

---

## 2. Color and tokens

All tokens are CSS custom properties in `app/globals.css`, surfaced to Tailwind
through `@theme inline`. Utilities resolve through the property, so every one of
them flips with `html.dark` without a second class.

### Light (`:root`, unconditional)

| Token | Value | Role |
|---|---|---|
| `--ground` | `#FBFBFB` | Page ground. The paper. |
| `--sheet` | `#FFFFFF` | Sheet and figure-plate surface. |
| `--body-ink` | `#171715` | Body text, inherited default. |
| `--blueprint` | `#2E47F1` | Structural blue: strokes, rules, links, focus. |
| `--blueprint-bright` | = `--blueprint` | Text-safe blue by name. |
| `--fig-blue` | `#D8E0FA` | Figure fill. |
| `--fig-lavender` | `#DCD6F7` | Figure fill. |
| `--fig-teal` | `#CBEDE4` | Figure fill. |
| `--grid-line` | blueprint at 7% | Structural hairline: sheet edges, dividers, table rules. |
| `--plate-grid` | blueprint at 7% | The 8px drafting grid printed on a figure plate. |
| `--grid-paper-line` | `#F3F3F1` | The 8px rule on the page ground. |
| `--checker-ink` | `#C6C6C2` | Checker band tile. |
| `--rule-hair` | `#D8D8D6` | Section hairline under a heading, dotted TOC leaders. |
| `--label-muted` | `#6B6B66` | Mono label and caption gray. |
| `--sheet-shadow` | two-layer | Sheet lift off the ground, md and up. |

Three grid weights exist on purpose and are not interchangeable.
`--grid-line` is a line of the drawing, `--plate-grid` is the surface a drawing
is drafted on, `--grid-paper-line` is the paper itself.

### Dark: cyanotype negative (`html.dark`)

Dark mode is the negative of the manual, not the manual with the lamp turned
down. Blue-black ground, off-white body, lifted blueprint, so the drawings read
as cyanotype prints.

| Token | Value |
|---|---|
| `--ground` | `#0B1020` |
| `--sheet` | `#101833` |
| `--body-ink` | `#E8ECF6` |
| `--blueprint` | `#9BB4FF` |
| `--fig-blue` / `--fig-lavender` / `--fig-teal` | `#1B2748` / `#241F45` / `#173430` |
| `--grid-line` | blueprint at 20% |
| `--plate-grid` | blueprint at 9% |
| `--grid-paper-line` | `#121A2E` |
| `--checker-ink` | `#2C3A5E` |
| `--rule-hair` | `#2A3554` |
| `--label-muted` | `#A3B1CE` |

Measured contrast is recorded in a comment above the `html.dark` block. Body
text lands at 16.01:1 on ground and 14.79:1 on sheet; blueprint at 9.35:1 and
8.63:1. The headroom is deliberate, because the manual sets labels and captions
at 55 to 75 percent opacity and the composite still has to clear 4.5:1. The
worst case in the tree is `text-blueprint/70` on sheet at 4.87:1.

**The raw light blueprint `#2E47F1` measures 2.96:1 on the cyanotype ground and
fails AA.** It is overridden in `html.dark` so no utility can resolve to it.
When a component needs blue text by name, use `--blueprint-bright`. Any new dark
value gets measured and its ratio recorded in that comment.

`prefers-contrast: more` steps up `--grid-line`, `--rule-hair` and
`--label-muted` on both surfaces and widens the focus ring to 3px.

---

## 3. Type

Four families, one job each. Loading is `next/font`: GT Sectra Fine and
Newsreader self-hosted from `public/fonts/` via `localFont`, Geist from the
`geist` package.

| Family | Class | Job |
|---|---|---|
| Geist Pixel | `.font-pixel` | Wordmark, TOC section headers, stat labels. Uppercase, 0.05em tracking. |
| GT Sectra Fine | `.font-display` | Display only: chapter titles, deks, drop-cap glyphs. `-0.015em` tracking. |
| Newsreader | `.manual-body`, `.font-serif-body` | Body copy. |
| Geist Mono | `.font-mono` | Labels, breadcrumbs, captions, stats, buttons, FAQ chrome. |

Geist Sans is the inherited body default and serves form controls only. Nothing
else should depend on it.

GT Sectra never sets body copy: its hairlines break at body sizes. That is why
Newsreader exists in the stack at all. Weights pinned are 400 regular and
italic, 500, and 600, instanced from the variable source at opsz 18 and subset
to Latin-plus. `scripts/subset-fonts.py` carries the reproduction commands and
the OFL copy ships at `public/fonts/newsreader/OFL.txt`.

### Body setting

`.manual-body` is 17px on 1.65, capped at a 68ch measure, ragged right and
unhyphenated by default. At `min-width: 60rem` it switches to justified with
`hyphens: auto`, `text-justify: inter-word` and `hanging-punctuation:
allow-end`. Below that width the column cannot absorb the word spacing
justification creates and opens rivers, so it stays ragged.

`.manual-dropcap::first-letter` sets the opening capital, one per page. The
float version is the baseline; browsers that support `initial-letter: 3` get the
properly sunk three-line cap and the float is reset inside the `@supports`
block so the two never apply at once.

Paragraphs run one to three sentences per voiceDNA. The source manual's
paragraphs are short too, so this is not a compromise.

---

## 4. Surfaces

Three surfaces, all pure CSS. No raster plates, no SVG assets.

- **`.bg-ground-grid`**: the paper. An 8px rule in both directions at a four-step delta off the ground. One layer only, no major grid. Anything stronger reads as a visible grid instead of as paper, and a second pitch reads as graph paper for a different trade.
- **`.figure-plate`**: white sheet carrying the same 8px rule. Drawings sit on gridded plates while the page ground stays plain, so the grid reads as the surface a figure was drafted on.
- **`.manual-checker`**: the divider band between movements. A hard-edged checker on a 7px pitch, 8px tall, a printed halftone rule rather than a fade. It drifts one tile over 14s, below the threshold of perceived motion, and the drift is gated behind `prefers-reduced-motion: no-preference`.

`<Sheet>` is the white content surface. Full bleed below 768px (no border, no
shadow, no ground at the edges: a phone screen is the sheet), bordered in
`--grid-line` with `--sheet-shadow` from md up. The sheet carries no measure cap
of its own; `.manual-body` and the page column do that.

---

## 5. Layout

`ChapterLayout` is the chapter shell and defines the geometry:

- Outer container `max-w-[84rem]`, padding stepping `px-0` / `md:px-6` / `lg:px-10`.
- Sidebar TOC is a `13rem` sticky column, `xl` and up only.
- Content column `max-w-[53rem]`, centered below xl and left-aligned at xl so the sidebar sits in the gutter beside it rather than pushing the sheet right.
- Below xl the sidebar collapses into a `Contents` disclosure that shares a row with the breadcrumb, and the standing nav links fold inside it so nothing is lost at phone width.
- `RulerRail` is fixed and needs gutter clearance from the masthead at desktop. This bit off once already.

Everything is wrapped in `.manual-root`, which is the hook for manual-scoped
selectors. Since the whole site is manual, `html` and `body` paint the ground
directly.

---

## 6. Figures

The rule that governs the whole system: **every figure depicts a real, named
artifact, and every labeled part is a real component of it.** A figure that
cannot name its ground truth gets cut. Decorative isometrics are the AI-slop
failure mode and are banned outright.

### Primitives

`components/figures/`, re-exported from its `index.ts`:

| Primitive | What it draws |
|---|---|
| `Figure` | The plate wrapper: `role="img"`, `<title>`, `<desc>`, visible caption. |
| `IsoBox` | Isometric box, with `isoPoint` / `isoPolygon` / `figFill` helpers and the `ISO_COS` and `FIG_STROKE` constants. |
| `ExplodedStack` | Layer stack pulled apart along the iso axis. |
| `GridPlane` | Gridded plane for matrix-shaped subjects. |
| `IsoChain` | Sequence of nodes with connectors. |
| `LeaderLabel` | Mono uppercase label on a leader line. |

Every primitive strokes in `var(--blueprint)` at 1.25 and fills only from the
`--fig-*` tokens. Labels are mono, uppercase and horizontal, never rotated to
follow an edge.

That 1.25 is a **rendered** weight. Plate viewBoxes run from 467 to 1092 units
into the same column, so `app/globals.css` sets `vector-effect:
non-scaling-stroke` on every shape inside `.figure-plate`; it is not an
inherited property and does nothing on the group that carries the stroke.
`plateScale()` in `lib/motion-manual.ts` is the other half of that: once a
stroke is non-scaling the UA reads its dash in the host space, so the draw-on
writes its lengths there too.

Leader labels are normalised the same way. `Figure` measures units per CSS
pixel and publishes it through `FigureScale`, and `LeaderLabel` sizes its type,
gap and arrowhead in the reader's space, targeting 11px. It may only grow as
far as the plate's own margins allow, so a plate drawn tight around its longest
label stays under the target. Below a 420px plate the callouts come off
entirely and the visible caption carries the claim.

### Numbering and the registry

Numbered plates live at `components/figures/fig-0NN-*.tsx` and are registered in
[FIGURES.md](FIGURES.md). The registry is **append-only**. A new plate takes the
next free number; a retired one keeps its number and gains a note. Never
renumber.

Caption grammar is `FIG_00N` followed by `[ SUBJECT ]`. No year marks.

### Rules that are easy to break

- No claim numeral on a plate. Figure numbers and step ordinals are structural and exempt; anything asserting an outcome or magnitude is not, and does not belong in a drawing anyway.
- The registry is public repo markdown and is scanned. Ground truths are described generically: no vendor names, no employer names, no client names, no gated values.
- The visible caption must state the figure's claim in words. A screen-reader user and a language model both get the claim from text, never from the drawing.

Minimums: the cover carries 6 to 8 figures, each case-study chapter carries at
least one. A text-only chapter is an acceptable outcome where no honest figure
exists. Inventing one is not.

---

## 7. Motion

Two files. `lib/motion.ts` holds only the scales; `lib/motion-manual.ts` holds
the catalog components animate from.

### Scales (`lib/motion.ts`)

- `EASE`: `outQuart`, `outQuint`, `outExpo`, `standard`. Out-only. No bounce, no elastic.
- `DURATION` in seconds: `instant` 0.001, `quick` 0.25, `short` 0.45, `medium` 0.6, `long` 0.9, `hero` 1.2. Pick from the list; do not invent.
- `STAGGER` in seconds: `tight` 0.012, `short` 0.03, `med` 0.05, `wide` 0.08.
- `reducedMotionFallback(spec)` collapses any `{ from, to }` spec to an instant jump to its end state.

### Catalog (`lib/motion-manual.ts`)

| Primitive | Behavior |
|---|---|
| `drawOn()` | SVG stroke draw-on when a figure enters the viewport. One-shot. |
| `drawOnProgress()` | The same draw bound to scroll, for below-fold plates. Measures at mount and hands back to `drawOn` for anything in the first viewport. |
| `statFill()` | Stat rows fill. |
| `statTick()` | Numeric readouts count up to the string already in the DOM, then restore it verbatim. |
| `labelSettle()` | A plate's leader labels settle in as a group. |
| `valuePulse()` | A recomputed readout re-inking itself. Opacity and scale only. |
| `rulerBreathe()` | Ambient opacity oscillation on the ruler readout. |
| `wordmarkReveal()` | Pixel reveal on the masthead wordmark. |
| `prefersReducedMotion()` | The branch every one of them takes. |

Each has a `*Spec` object beside it so the values are inspectable without
reading the implementation. Add a primitive here rather than hand-rolling an
`animate()` call in a component.

Strokes are the only thing bound to scroll anywhere on the site, and only on
below-fold plates. Everything else is one-shot and latched, so nothing
un-animates on scroll-up. Transform and opacity only, plus `stroke-dashoffset`
for draw-on: no width, height, top, left or margin is animated. Scroll binding
goes through motion's `scroll()` driver, never a hand-rolled `rAF` loop, and
nothing reads geometry inside a scroll callback.

Cross-document navigation uses the View Transitions API with a root fade pair,
200ms out and 360ms in, disabled under reduced motion.

### Reduced motion

First-class, not a fallback. Figures render complete, nothing draws on, Lenis is
bypassed so native scroll runs, the ruler is static, the checker band stops
drifting, and the global reduce block collapses every remaining animation and
transition. `.motion-essential` and `[data-motion="essential"]` opt back in at
0.15s for anything where movement carries meaning.

Smooth scroll is Lenis via `<SmoothScrollProvider>`, bypassed entirely under
reduced motion.

---

## 8. Theme architecture

Light values sit on `:root` unconditionally and `html.dark` names only what
changes, so light is the default state of the document rather than an override
of a dark base.

`ThemeProvider` is `attribute="class" defaultTheme="light" enableSystem
disableTransitionOnChange`. A visitor with no stored choice and no OS preference
gets paper; a dark-OS visitor lands straight in the cyanotype negative;
`ThemeToggle` overrides either way. `attribute="class"` is what `html.dark` keys
off. `viewport.themeColor` in `app/layout.tsx` carries both grounds and tracks
`--ground`.

---

## 9. Accessibility

WCAG 2.1 AA is the floor.

- **Focus**: one global rule, 2px `--blueprint` outline at 2px offset, 3px offset on buttons and links. Set once, not per component.
- **Contrast**: measured for both themes at the sizes and opacities actually used. See §2.
- **Reduced motion**: see §7.
- **`prefers-contrast: more`**: hairlines, muted labels and focus width all step up.
- **Figures**: `role="img"` plus `<title>` and `<desc>`, plus a visible caption stating the claim in words.
- **Skip link**: in the masthead. Use Tailwind's own `sr-only` utility for it. An unlayered `.sr-only` rule outranks Tailwind's layered `focus:not-sr-only` and will pin the link at 1x1px on focus. That bug shipped once; do not reintroduce an unlayered version.
- **One `h1` per page.** Longform markdown bodies carry their own leading title, which is stripped at render time rather than edited out of the source so the markdown stays a portable document.

---

## 10. Claim gating

Documented in full in [CLAUDE.md](CLAUDE.md). The short version, because it
constrains design as much as copy:

No claim numeral reaches a page unless it resolves through
`content/proof-metrics.ts` via `renderableProofMetrics()`. That applies to a
stat table, a figure label, a caption, an OG card and a sentence equally.
`proseProofClaims` and `proseClaimTokens` cover claims that live inside prose.
`npm run proof:guard` enforces it and holds a floor on the renderer count that
is never lowered.

Design consequence: a stats block cannot invent a denominator, a progress bar
cannot imply a total, and a figure cannot label a magnitude. If a number is not
in the registry, the design has to work without it.

React keys count as rendered output. They are serialized into the streamed
payload, so a row keyed on an internal identifier leaks that identifier into
page source even when it never appears on screen. Key on public values.

---

## 11. Word counts

`scripts/word-counts.mjs` plus `lib/word-counts.ts` compute counts at build time
from the same source that renders. Markdown bodies go through `lib/markdown`,
typed content modules through their rendered-text fields. Drafts, stubs and
`publicUse: "hide"` fields are excluded by construction, which is a leak guard
as much as an accuracy one.

The chapter meta line is `N WORDS | CONNOR J. LAUGHLIN` on case-study and longform
chapters only. Bespoke TSX pages (resume, about, the planner) carry no
word-count meta, because there is no single rendered source to count.

---

## 12. Verification

```bash
npm run lint
npm run build
npm run proof:guard
npm run words
npm run build && npm run start   # then npm run voice:scan against :3000
```

`npm run voice:scan` scans rendered routes and must come back empty in dev and
in prod. Some copy only appears after prerender, so a dev-only pass is not a
pass. CSP is only emitted outside dev, so prod-mode local is the only real check
for anything touching `proxy.ts`.
