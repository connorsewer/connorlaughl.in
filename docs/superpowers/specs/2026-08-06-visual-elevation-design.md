# Wave C — visual elevation

Status: spec. Implementation starts only after Wave B copy edits land.
Authority: [DESIGN.md](../../../DESIGN.md) and the code win over this file.
Registry: [FIGURES.md](../../../FIGURES.md) is append-only.

Two locked decisions from Connor (2026-08-06), not reopenable. **Motion
ceiling is "living document":** constant but quiet, figures draw themselves on
scroll, stats tick on entry, leader labels settle, the ruler breathes, nothing
blocks reading, reduced motion is parity rather than a fallback. **Plates
everywhere, plus motion:** one halftone plate per case-study chapter depicting
a real artifact of that system, paired with the line diagram and never
replacing it, plus one ambient loop on the cover under the same ceiling.

---

## 1. Motion primitives

Additions to `lib/motion-manual.ts`. Same contract as the existing four: a
runner takes a `MotionTarget`, returns `MotionCleanup`, checks
`prefersReducedMotion()` first, and ships a `*Spec` object beside it.

Already there, do not duplicate: `drawOn`, `sheetReveal`, `statFill`,
`wordmarkReveal`, `prefersReducedMotion`. Durations, eases and staggers come
from `lib/motion.ts`; do not invent values.

| New primitive | Behavior | Reduced motion |
|---|---|---|
| `drawOnProgress()` | Scroll-linked variant of `drawOn`. Stroke dash offset is bound to the plate's scroll progress across the viewport, so the drawing plots as the reader arrives and unplots if they scroll back. Wired with `scroll()` from `motion` (v12) so it runs on a native `ScrollTimeline` where the browser has one. | No observer, no `scroll()` registration. Strokes stay exactly as authored, i.e. fully drawn. |
| `statTick()` | Numeric readout counts from a floor to its final value once, on entry. Operates on `[data-stat-tick]` text nodes; the final string is authored in the DOM and restored verbatim when the tick finishes, so the rendered claim is never synthesized by the animation. | Final string written synchronously. No tick. |
| `labelSettle()` | `LeaderLabel` text arrives after its leader line has drawn: opacity 0→1 with a 4px settle along the leader's own axis. Staggered by `STAGGER.short`, sequenced behind `drawOn`/`drawOnProgress` on the same plate. | All labels at final state immediately. |
| `rulerBreathe()` | `RulerRail`'s active tick holds a ±0.06 opacity oscillation on a ~6s period, amplitude below the threshold where it reads as blinking. Ambient, not state-carrying. | Not started. Ruler is static, as today. |

**Performance budget, enforced in review.**

- Transform and opacity only, plus `stroke-dashoffset` for draw-on. No width,
  height, top, left, margin, or any other layout property is animated.
- Entry-triggered primitives are `inView()`-driven; `drawOnProgress` is
  `scroll()`-driven. No `rAF` scroll handlers, no `getBoundingClientRect` in a
  scroll callback.
- No scroll-jacking: nothing pins, snaps, or takes the wheel. Lenis stays as
  configured and is still bypassed under reduced motion.
- `statTick` writes into a fixed-width `tabular-nums` cell so ticking cannot
  reflow the row. `rulerBreathe` is one compositor-only opacity animation on
  one element.
- One scroll-linked animation per plate, maximum. A plate's draw stays capped
  at `DURATION.long` per shape with `STAGGER.short` between, as today.
- Each runner ships a `failsafe` equivalent to `drawOn`'s: content is never
  left invisible because an observer did not fire.

---

## 2. Plate program

One photographic halftone plate per case-study chapter, in the treatment
already proven by FIG_020 on `/about`.

### Subjects — the real artifact of each chapter

Derived from `artifactIdeas` and `systemsBuilt` in `content/case-studies.ts`.
Every subject is a physical desk or wall object, photographed as an object.
No screens, no legible text, no vendor surfaces.

| Chapter (slug) | Paired diagram | Plate subject (real artifact, public-safe) |
|---|---|---|
| `revenue-operations-signal-to-revenue` | FIG_008 | The printed funnel KPI dictionary, a thick tabbed binder open flat on a desk under a lamp. |
| `ai-native-gtm` | FIG_009 | A workflow map drawn across a whiteboard in marker, boxes and arrows, half-erased and rewritten. |
| `revenue-operations-pipeline-truth` | FIG_010 | A stack of weekly pipeline printouts on a desk, top sheet marked up in red pen. |
| `bdr-pod-signal-to-meeting` | FIG_011 | An SLA logbook: a ruled notebook open on a desk beside a desk clock and a phone handset. |
| `gtm-strategy-positioning` | FIG_012 | Five index cards pinned in a row on a corkboard, connected by pinned string to a second row below. |
| `debtnext-integration` | FIG_013 | Two ring binders set side by side on a table, one older and worn, one new, a single tab bridging them. |
| `marketing-analytics-architecture` | FIG_014 | A field-mapping worksheet on graph paper, two columns joined by hand-ruled lines, pencil and straightedge beside it. |
| `leadership-team-development` | FIG_015 | A wall calendar with recurring blocks marked, a stack of one-page agendas on the shelf below. |
| `outcome-first-repositioning` | FIG_016 | A galley proof spread on a light table, one column struck through and rewritten in the margin. |
| `marketing-org-design-governance` | FIG_017 | An intake board: index cards in two vertical lanes on a magnetic board, cards mid-move. |
| `enterprise-site-overhaul` | FIG_018 | A site map taped out in paper rectangles on a wall, arrows drawn between them in marker. |

Eleven subjects, one per chapter. Where a subject cannot be made honest at
generation time, that chapter ships diagram-only. A missing plate is an
acceptable outcome. A dishonest plate is not.

### Generation prompt template

Style-locked to the FIG_020 portrait treatment. Fill the bracket, change
nothing else.

> Editorial halftone plate. `[SUBJECT]`. Coarse halftone dot screen, dots
> clearly visible at print scale. Two colors only: blueprint ink `#2E47F1` on
> flat off-white paper `#FBFBFB`. No gradients, no third color, no gloss.
> Straight-on or slight three-quarter framing, even light, no dramatic
> shadow. Objects only. No text, no lettering, no numbers, no logos, no
> screens, no user interface, no people's faces. Generous paper margin. Shot
> as documentation, not as an advertisement.

Negative reinforcement to carry into every generation: `text, letters,
numbers, logos, watermark, UI, screenshot, monitor, phone screen, gradient,
neon, 3d render, stock photo lighting`.

### Placement and layout

- The plate sits **below** the chapter's line diagram inside the same section,
  as a second `<figure>` with its own caption. Diagram states the mechanism;
  plate shows what the mechanism was made of. Never side by side on mobile.
- `max-w-[26rem]` inside a `border border-blueprint/40 p-2` frame: the FIG_020
  pattern verbatim.
- Class `plate-duotone` is required. Dark mode inverts it into the cyanotype
  negative through the existing rule in `app/globals.css`; without the class
  the plate lights up as a white rectangle on the dark ground.
- `next/image`, explicit `width`/`height`, `sizes="(min-width: 768px) 26rem,
  100vw"`, lazy (no `priority`: chapter plates are below the fold).

### Files, naming, registry, size

- `public/case-studies/plate-<slug>.webp`, slug matching
  `content/case-studies.ts`.
- New optional field on `CaseStudy`: `plateFig?: string` (e.g. `"FIG_021"`),
  resolved in `app/case-studies/[slug]/page.tsx` the way `figureSlug` is. An
  absent field means diagram-only, which stays legal.
- FIG numbers: `FIG_019` stays reserved and untouched. Chapter plates take
  **FIG_021 through FIG_031** in the declaration order of the table above; the
  cover loop takes **FIG_032**. Append to FIGURES.md, never renumber. Registry
  rows are public repo markdown, so ground truths stay generic: no vendor,
  employer, client or gated value.
- WebP, longest edge 1280px, **target under 300KB, hard ceiling 400KB**. Over
  ceiling means re-encode or re-crop, not ship. Halftone screens compress
  badly at high quality; drop quality until the file fits and the dot screen
  is still crisp. Record final byte sizes in the phase-6 QA pass.

### Accessibility contract

- `alt` describes the object and its state in one sentence, e.g. "Halftone
  plate of a tabbed binder lying open on a desk." It never repeats the caption
  and never asserts a claim.
- A visible `<figcaption>` states the plate's claim in words, in the existing
  grammar: `FIG_0NN [ SUBJECT ]` in mono, then a serif sentence.
- No claim numeral on or in a plate. Numbers reach the page only through
  `renderableProofMetrics()`.
- The plate is never the sole carrier of any information; the frame and the
  caption carry it.

---

## 3. Cover ambient loop

One moving plate on `/`, and only one.

- **Subject**: a single sheet of gridded drafting paper under a lamp, a hand
  ruling one line across it, then the shot resets. Objects and hands only, no
  face, no text on the sheet. Same halftone treatment as the still plates.
- **Duration and loop**: 6 to 10 seconds, seamless, no cuts, no camera move
  faster than a slow drift. If it reads as a video rather than as a breathing
  plate, it is too fast.
- **Encoding budget**: `.webm` (VP9) primary plus `.mp4` (H.264) fallback,
  720px longest edge, no audio track. **Under 2MB each or it does not ship.**
- **Poster**: still frame at `public/hero/cover-loop-poster.webp`, under
  200KB, registered as the FIG_032 still. It is what a reader sees before the
  video decodes and what they keep if it never does.

**Ceiling compliance list.** Every item is a merge gate.

- `muted`, `playsInline`, `loop`, and no audio track in the file at all.
- `preload="none"`, and the `<video>` mounts only after an
  `IntersectionObserver` reports it in view, so it never competes with the
  cover's first paint.
- Below the fold. It is not the LCP element and must not become one.
- `usePrefersReducedMotion()` → render the poster `<img>`, never mount the
  `<video>`. Same for a `connection.saveData` hint.
- `plate-duotone` applies to poster and video alike so dark mode inverts both.
- Cover Lighthouse performance must not drop against the phase-1 baseline. `/`
  is the most-shared page; a regression there fails the phase regardless of
  how the loop looks.

---

## 4. Claim and IP guardrails

Carried forward unchanged, and they bind image generation as hard as they bind
copy.

- **No text in any image.** No lettering, numerals, labels, logos or
  watermarks. A generation that produces legible text is rejected, not
  retouched.
- **No claim numerals.** A magnitude never appears in a drawing, a plate, a
  caption, or an `alt`. Numbers resolve through `content/proof-metrics.ts`.
- **No vendor UI.** No screenshots, no monitors showing an interface, no
  product chrome, and no vendor, employer or client name in a subject,
  filename, caption, `alt`, or registry row.
- **No gated content as a subject.** Nothing depicting a board pack's
  contents, a named account, an opportunity row, a threshold, an SLA length,
  or anything marked `publicUse: "hide"`. A binder may be open to an
  unreadable page; its contents may not be legible.
- **No faces.** People appear only as hands, and only in the cover loop.
- `npm run proof:guard` and `npm run voice:scan` still gate the merge.

---

## 5. Build phases and gates

A failed gate stops the wave. It does not get waived.

1. **Baseline.** Lighthouse performance and byte weight for `/` and two
   chapter routes on the current build. *Gate: numbers written down before
   anything changes.*
2. **Motion primitives.** Add the four runners and their specs to
   `lib/motion-manual.ts`, wire them to existing figures, stats and the ruler.
   *Gate: `npm run lint` and `npm run build` clean; reduced-motion pass shows
   every element at final state with no observers registered; no layout
   property animated anywhere in the diff.*
3. **Two pilot plates.** `revenue-operations-signal-to-revenue` and
   `ai-native-gtm` only. *Gate: Connor reviews both in light and dark, desktop
   and phone, and gives an explicit go before any further generation. Style,
   size and honesty are all in scope.*
4. **Remaining plates.** The other nine, same template and placement,
   FIGURES.md appended in one commit at the end. *Gate: every plate under the
   size ceiling, no legible text in any image, every registry row public-safe.*
5. **Cover loop.** Generate, encode, wire with poster and observer mount.
   *Gate: file sizes under budget, Lighthouse on `/` no worse than the phase-1
   baseline, the §3 compliance list checked item by item.*
6. **Final QA.** `npm run lint`, `npm run build`, `npm run proof:guard`, `npm
   run words`, prod-mode local plus `npm run voice:scan`, Lighthouse
   spot-check on `/` and two chapters, and a reduced-motion pass plus both
   themes on every touched route. *Gate: all green.*

---

## 6. Non-goals

Out of scope. Proposing any of these is a scope change, not a refinement.

- **No scroll-pinning set-pieces.** Nothing pins a section, hijacks the wheel,
  or holds the reader in place while something plays.
- **No chapter transitions.** Cross-document navigation keeps the existing
  View Transitions root fade pair. No page-curl, no wipe, no per-chapter
  custom transition.
- **No line diagrams from an image model.** Figures stay hand-authored SVG
  built from `components/figures/`. An image model produces photographic
  plates and nothing else. A generated "diagram" is the AI-slop failure mode
  DESIGN.md §6 bans.
- **No second ambient loop**, and **no new color token** for this wave.
