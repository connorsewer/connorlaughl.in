# Wave C — visual elevation (v3, post-pilot-gate)

Status: spec, revised after adversarial review and again after Connor's pilot
gate. Authority: [DESIGN.md](../../../DESIGN.md) and the code win over this
file. [FIGURES.md](../../../FIGURES.md) is append-only.

Two locked decisions from Connor (2026-08-06), not reopenable. **Motion
ceiling is "living document":** constant but quiet, figures draw themselves on
scroll, stats tick on entry, leader labels settle, the ruler breathes, nothing
blocks reading. Reduced motion is **outcome-parity**: a reduced-motion visitor
sees the same finished page, reaches the same information, and loses only the
transition into it. **Plates everywhere, plus motion:** one plate per
case-study chapter depicting that chapter's system as an object, paired with
the line diagram and never replacing it, plus one ambient loop on the cover
under the same ceiling.

## Plate art direction, pivoted at the pilot gate (2026-08-06, locked)

Phase 3 shipped two halftone-photograph pilots, FIG_021 and FIG_022. Connor
reviewed them and redirected the program. The v2 art direction is superseded.
Three rulings, all locked:

1. **Plates are technical renderings, not photographs.** Each plate is a clean,
   label-free exploded-view blueprint rendering of the chapter's
   system-as-object, in the illustration genre of makingsoftware.com — an
   exploded floppy disk, drawn as parts on a common axis. Not a photographic
   scene, not a halftone screen of a desk.
2. **Real type only.** No lettering is ever generated into an image. Labels
   arrive as a `PlateLabels` SVG overlay of real DOM text in Geist Mono,
   positioned over the plate and reusing `LeaderLabel`. §2 specifies it.
3. **No dark-mode inversion for plates.** `plate-duotone` comes off the chapter
   plates. A blueprint-on-paper rendering is already the site's ink on the
   site's paper, and inverting it produced a cyanotype negative that read as a
   different image in each theme. Chapter plates render as authored in both
   themes. The `/about` portrait, FIG_020, is a photograph and **keeps**
   `plate-duotone`; that rule in `app/globals.css` stays, it simply stops
   having chapter-plate callers.

Everything the superseded direction settled that is not about pixels — the
placement, the frame, the caption grammar, the claim guardrails, the file
naming, the size budget, the append-only registry — carries forward unchanged.

---

## 0. Phase 0 — sequencing assertion

Wave C does not start until an implementing agent asserts both in the phase
log, with evidence: (1) `npm run voice:scan` comes back empty against a
prod-mode local build, and (2) a Wave B claim-scope commit is present on
`redesign/manual`, named by hash. Fail either and stop.

---

## 1. Motion primitives

Additions to `lib/motion-manual.ts`, same contract as the existing runners:
take a `MotionTarget`, return `MotionCleanup`, check `prefersReducedMotion()`
first, ship a `*Spec` beside the runner. Values come from `lib/motion.ts`.

Already present: `drawOn`, `sheetReveal`, `statFill`, `wordmarkReveal`,
`prefersReducedMotion` — but only `drawOn` has a caller today
(`Figure.tsx:64`). Phase 2 resolves the other three: wire `wordmarkReveal` on
the cover masthead, delete `sheetReveal` and `statFill` if still unused when
the wiring pass finishes, and log what was deleted.

| New primitive | Behavior | Reduced motion |
|---|---|---|
| `drawOnProgress()` | Scroll-linked stroke dash offset, for **below-fold plates only**. At mount the runner measures the plate: if its top is inside the first viewport it does nothing and the caller falls back to one-shot `drawOn`. Below-fold plates bind progress with motion's `scroll()` at offset `["start 0.9", "start 0.3"]`. | No measurement, no `scroll()` registration. Strokes stay as authored, i.e. fully drawn. |
| `statTick()` | Numeric readout counts to its final value once, on entry, then restores the DOM-authored string verbatim. The animation never synthesizes a claim. | Final string stands. No tick, no observer. |
| `labelSettle()` | Leader labels arrive as a group after their plate enters: opacity 0→1 with a 4px settle, `STAGGER.med` between labels. One-shot, latched. | All labels at final state immediately. |
| `rulerBreathe()` | ±0.06 opacity oscillation on a ~6s period, applied to the `RulerRail` readout-plus-rule element only (the ticks are one gradient span and cannot be targeted individually). Ambient, carries no state. | Not started. Ruler is static, as today. |

### In-scope files beyond `lib/motion-manual.ts`

- **`components/manual/RulerRail.tsx` — rewrite.** It violates this budget
  today: a hand-rolled `rAF` scroll loop writing `top: N%` every frame, which
  is a layout write per frame. Replace with `transform: translateY()` on
  motion's `scroll()`. `rulerBreathe` lands on the rewritten element.
- **`components/figures/LeaderLabel.tsx`** — add `data-leader-group` so
  `labelSettle` has something to select. No visual change.
- **`components/manual/StatTable.tsx`** — a small client wrapper runs
  `statTick`; the presentational component stays server-rendered and still
  never imports `content/proof-metrics`.
- **`components/figures/Figure.tsx`** — picks `drawOnProgress` or `drawOn` per
  the above-fold measurement.

### One-shot versus scroll-linked, stated exactly

Only **strokes** are scroll-linked, and only on below-fold plates. Everything
else is one-shot and latched, so nothing un-animates on scroll-up. On a
scroll-linked plate, labels fade in at progress > 0.85 and latch there.

### `statTick` rules

- Applies only to a value matching `/^[\d,.$+]+$/` **after** resolution
  through `renderableProofMetrics()`. Anything else renders static.
- Floor is `0` for counts; for `$` values the first significant digit is held
  constant, so `$159.4M` ticks from `$100M` and never from `$0`.
- The value cell reserves `min-width` in `ch` equal to the final string's
  width, so ticking cannot reflow the row. That is a width reservation, not a
  `tabular-nums` claim.

### Performance budget, enforced in review

- Transform and opacity only, plus `stroke-dashoffset` for draw-on. No width,
  height, top, left, or margin animated anywhere in the diff.
- Entry-triggered primitives are `inView()`-driven; `drawOnProgress` uses
  motion's `scroll()`. `stroke-dashoffset` is **not** on motion's accelerated
  list (opacity, clipPath, filter, transform), so the scroll-linked case runs
  on motion's JS scroll driver. Accepted: the driver is passive-listener based
  and the animation performs no layout writes. Budget it as main-thread work,
  one scroll-linked animation per plate.
- The ban is on **hand-rolled** `rAF` scroll handlers and on
  `getBoundingClientRect` inside a scroll callback. Motion's driver is
  permitted, and is what the RulerRail rewrite moves onto.
- Each runner ships a `failsafe` like `drawOn`'s: content is never left
  invisible because an observer did not fire.

---

## 2. Plate program

One blueprint plate per case-study chapter: a clean, label-free exploded-view
technical rendering of that chapter's system drawn as a physical object, with
its labels applied afterward in real type by the `PlateLabels` overlay.

### Subjects — the chapter's system as an object

**Provenance.** Each subject is the structure of that chapter's paired line
diagram, restated as an assembly of parts. The diagram already encodes the
system honestly and is already public-safe, so deriving the plate from the
diagram keeps the plate inside the same boundary. Subjects name geometry and
nothing else: no vendor, employer, client, or gated value reaches a subject
line, and no subject asserts a magnitude or an outcome.

Subjects are deliberately **abstract mechanisms**, not literal depictions of
software. An exploded stack of plates is the honest object for a layered
system; a screenshot of a tool would be a leak and a lie about the medium.

| Chapter (slug) | Paired diagram | FIG | Plate subject |
|---|---|---|---|
| `revenue-operations-signal-to-revenue` | FIG_008 | FIG_021 | An exploded stack of six flat rectangular plates held apart on one vertical axis, widest at the bottom and smallest at the top, four slim guide posts running through every plate. |
| `ai-native-gtm` | FIG_009 | FIG_022 | An exploded gate mechanism on one horizontal axis: an intake tray, three sorting plates, a hinged gate block with a lever arm, a release chute, and one long flat tray running beneath the whole assembly. |
| `revenue-operations-pipeline-truth` | FIG_010 | FIG_023 | Three round dial faces lifted clear of a single flat backing panel, three short spindles floating between them, one common mounting bracket below. |
| `bdr-pod-signal-to-meeting` | FIG_011 | FIG_024 | An exploded sorting device: a funnel at the top, a slotted selector disc beneath it, three parallel chutes below that, and a toothed escapement wheel at the base. |
| `gtm-strategy-positioning` | FIG_012 | FIG_025 | An exploded card rack: five upright divider plates lifted off a slotted base rail, a backing panel behind them, a clamp bar floating above. |
| `debtnext-integration` | FIG_013 | FIG_026 | Two rectangular housings of different sizes exploded apart side by side, with a coupling plate, four bolts, and a latch block floating in the gap between them. |
| `marketing-analytics-architecture` | FIG_014 | FIG_027 | Two parallel rails exploded above one cylindrical drum, two junction blocks and a joining yoke lifted clear in the space between rails and drum. |
| `leadership-team-development` | FIG_015 | FIG_028 | An exploded escapement: three toothed wheels of decreasing size on one spindle at three different spacings, a pallet fork and a base plate beneath. |
| `outcome-first-repositioning` | FIG_016 | FIG_029 | An exploded hand press on a vertical axis: a flat bed plate, a single sheet, a raised die block, a pressure plate, and a lever arm. |
| `marketing-org-design-governance` | FIG_017 | FIG_030 | Two exploded assemblies of three plates each, drawn side by side, both converging on one shared square gate block with a doubled outline at the base. |
| `enterprise-site-overhaul` | FIG_018 | FIG_031 | An exploded stack of five thin rectangular panels on one axis, each smaller than the one below, a slotted frame at the base and one flat sheet on top. |

Eleven subjects, one per chapter. Where a subject cannot be made honest at
generation time, that chapter ships diagram-only and its FIG number gets a
Reserved note in FIGURES.md (§4). A missing plate is an acceptable outcome. A
dishonest plate is not.

### Generation prompt template

Fill the bracket with the subject line verbatim from the table; change nothing
else.

> Blueprint technical rendering. `[SUBJECT]`. Isometric exploded view: the
> parts are separated along one axis with clear air between them, drawn as a
> precise three-dimensional parts diagram. Two colors only: blueprint ink
> `#2E47F1` on flat off-white paper `#FBFBFB`. Clean line work and flat fills.
> Even ambient light across the entire frame, identical on every surface. No
> light source anywhere in the scene: no lamp, no bulb, no window, no glow, no
> highlight, no cast shadow, no gradient, no gloss. Objects only, floating on
> plain paper ground. Completely unlabeled: no text, no lettering, no
> numerals, no callouts, no leader lines, no arrows, no dimension marks, no
> annotation of any kind anywhere in the frame. No logos, no screens, no user
> interface, no faces, no hands. Generous paper margin. Drawn as an
> engineering parts diagram, not as an advertisement.

Negative list: `text, lettering, handwriting, numbers, labels, callouts,
leader lines, annotation, arrows, dimension lines, logos, watermark, UI,
screenshot, monitor, phone screen, gradient, neon, dramatic lighting, lamp,
bulb, glow, highlight, cast shadow, stock photo lighting, photograph, wood,
desk, third color`.

**The zero-type boundary.** Under v2 a plate could carry illegible marks,
because a used page reads as an artifact. That allowance is withdrawn. A
technical rendering that carries marks reads as an *annotated* drawing, and
every mark competes with the real type the overlay puts on top of it. The
boundary is now absolute: **any mark in the frame that reads as lettering, a
numeral, a callout, a leader line, an arrow, or a dimension tick rejects the
generation.** Rejected generations are regenerated, never retouched into
compliance.

**The flat-light boundary.** Models reach for a hero light on a 3D render.
Any light source, glow, highlight, specular edge, or cast shadow in the frame
rejects the generation. Light is even and sourceless or the plate does not
ship.

### The two-ink remap, a fixed pipeline step

Generation gets the geometry right and the colour wrong. Across two rounds the
model returned ink at chroma 17 to 78 against the site ink's 100.5, drifting
between plates in the same batch, so a pair generated together still did not
match each other. Prompt pinning moved the number and never landed it.

So colour is not a generation outcome. Every plate passes through
`scripts/plate-recolor.py` before it is encoded:

    t   = (Lmax - L) / (Lmax - Lmin)      # 0 at paper, 1 at the darkest ink
    out = #FBFBFB * (1 - t) + #2E47F1 * t

This is a fixed function of the input. Same file in, same file out, no model in
the loop, no hand-painting, no content change. Line structure and antialiasing
survive because `t` is preserved per pixel; only the two endpoints move. A flat
ground is a consequence rather than a second operation, since every paper pixel
lands on `#FBFBFB` by construction.

It is a **colour** step and nothing else. It cannot add, remove, or reshape a
mark, so it can never launder a generation that failed the zero-type boundary,
the flat-light boundary, or subject drift. Those are judged on the raw
generation, before the remap, and a plate that fails them is regenerated.

**Measured gates, checked on every plate before it ships.** Impressions are not
evidence; the round-2 review overturned two accept notes that read "flat paper"
and "matching register" against pixels that said otherwise.

| Gate | Threshold |
|---|---|
| Ink hue | within 10° of the reference 300.5° |
| Ink chroma | ≥ 80 after the remap; the darkest pixel is exactly `#2E47F1` |
| Ground chroma | < 6, i.e. neutral, no warmth |
| Ground flatness | < 10% variation across an 8×8 tile grid |
| Corner falloff | < 10% across the four corner blocks |
| Stroke median | within 1.5× of the other plates in the program |
| Ink coverage | within 1.5× of the other plates |
| Object bbox | 55–65% of frame width, margins symmetric within 3 points |

Flatness and falloff are measured over **every non-ink pixel**. Sampling only
the brightest quartile hides exactly the falloff being tested: on the round-2
FIG_021 that bias reported 2.4% where the honest measurement was 26.4%.

The three tools live beside the other repo scripts and need `pillow` and
`numpy`, which is why they are standalone Python rather than part of the Node
build. None of them runs in CI; they gate a plate at authoring time.

    python3 scripts/plate-measure.py <img>...        # the table above
    python3 scripts/plate-recolor.py <src> <dst>     # the remap
    python3 scripts/plate-anchors.py <img> '<json>'  # arrow-tip-to-ink

### `PlateLabels` — real type over the plate

All lettering on a plate is DOM text. `components/figures/PlateLabels.tsx` is a
server component that renders one absolutely-positioned SVG over the image and
draws each label through the existing `LeaderLabel` primitive, so plate labels
and figure labels are the same type at the same weight in the same ink.

- **Coordinates are percentages of the image box.** Each label carries
  `{ x, y, dx, dy, text }` where `x`/`y` are percent of image width and height
  and `dx`/`dy` are the percent offset from the label to the part it names.
  Percentages survive re-encoding and re-cropping; pixel anchors do not.
- **The overlay's coordinate space is one unit per rendered pixel.**
  `LeaderLabel`'s authored constants are absolute: 11-unit mono, a 10-unit gap,
  a 7-unit arrowhead. They read correctly only at roughly one unit per CSS
  pixel, so `PlateLabels` emits `viewBox="0 0 416 ${416 / aspect}"` against the
  `max-w-[26rem]` plate rather than the ~640-unit space the full-column figures
  use. Borrowing the figure viewBox shrinks plate labels to about seven pixels,
  which is how the first wiring pass got it wrong.
- **Two to four labels, never more.** A plate is not a diagram. If a chapter
  needs five callouts, the line diagram is already carrying them.
- **Every arrow tip must land on ink, measured.** An anchor is verified against
  the plate's pixels, not placed by eye: the distance from the tip to the
  nearest ink pixel, expressed in the 416px render space, must be ≤ 6px. A tip
  in open paper is a label pointing at nothing, and it is invisible in review
  because the arrowhead still draws. The round-2 `Audit trail` anchor sat 64px
  from any ink and shipped. Anchors are re-verified whenever a plate is
  regenerated, because the geometry moves underneath them.
- **Label text comes from that chapter's approved copy only**, in
  `content/case-studies.ts` — `chapterIntro`, `hook`, `systemsBuilt`, or the
  claim-gated body blocks. Never vault content, never a metric, never a
  numeral, never a vendor or client name. Labels are uppercased by
  `LeaderLabel` and stay one or two words.
- **The overlay's ink is fixed, not themed.** `LeaderLabel` draws from
  `var(--blueprint)`, which flips with the theme; the plate's paper no longer
  does. `PlateLabels` overrides `--blueprint` to the generation ink on its own
  root, scoping the fix to the overlay so the primitive needs no special case.
  A themed ink over a fixed cream ground loses contrast in dark mode.
- **The overlay is `aria-hidden` and `pointer-events-none`.** It repeats
  nothing the caption does not already say, and it is never the sole carrier
  of information: a reader with images off still gets `alt` plus the
  `<figcaption>`.
- Labels live in the `chapterPlates` entry beside `alt` and `caption`, so the
  claim gate reviews them with the rest of the rendered copy.
- Motion: the overlay's `<g data-leader-group>` groups are what `labelSettle()`
  already selects. No new primitive.

### Placement, wiring, files

- The plate renders **after the chapter's first body section**, below the
  opening prose, as its own `<figure>`. Not in the header section, where it
  would sit near the fold on mobile. The line diagram keeps its position:
  diagram states the mechanism, plate shows what it was made of.
- `max-w-[26rem]` inside a single `border border-blueprint/40 p-2` frame
  around the `next/image` — one border element, no nested frames. The frame is
  `relative` so the `PlateLabels` overlay can sit on `absolute inset-2` and
  land exactly on the image box rather than on the padding. Caption follows the
  `Figure.tsx` `<figcaption>` layout: mono `FIG_0NN [ SUBJECT ]`, then the
  serif claim sentence.
- **No `plate-duotone` on a chapter plate.** Locked by Connor at the pilot
  gate. A blueprint rendering is authored in the site's ink on the site's
  paper and needs no theme treatment; inverting it made the dark theme show a
  different picture than the light one. The class and its `app/globals.css`
  rule stay in the codebase for the `/about` portrait, FIG_020, which is a
  photograph and keeps the duotone. Do not generalize either way.
- `next/image`, explicit `width`/`height`, `sizes="(min-width: 768px) 26rem,
  100vw"`, lazy. No `priority`.
- **No new `CaseStudy` fields.** A `chapterPlates` lookup lives in
  `app/case-studies/[slug]/page.tsx` beside `chapterFigures`, keyed by slug:
  `{ fig, src, width, height, subject, alt, caption, labels }`. A slug absent
  from the table renders diagram-only, which stays legal. The claim gate
  reviews this table — `labels` included — the way it reviews any rendered
  copy.
- Files are named **by figure number, never by slug**:
  `public/case-studies/plate-fig-021.webp`. A slug-named file would put a
  client name in a public path.
- FIG numbers: `FIG_019` stays reserved and untouched. Chapter plates take
  **FIG_021 through FIG_031** in the table's order; the cover loop takes
  **FIG_032**. Append to FIGURES.md, never renumber. Registry rows are public
  repo markdown: no vendor, employer, client or gated value.

### Encoding and size

- Near-lossless or paletted WebP. Hard line work against flat ground is what
  has to survive, and lossy quality ladders ring the edges before they save
  much. A two-ink rendering palettizes extremely well. Longest edge 1280px;
  if a plate still misses budget, drop it to 1080 before cutting quality
  further.
- **Target under 300KB, hard ceiling 400KB per plate.** Over ceiling means
  re-encode or re-crop, not ship.
- Two budgets, not to be conflated. **Per-route cost** is one plate, 300–400KB,
  and that is the number a reader feels. **Repo weight** is all plates plus
  both loop variants, roughly 8.6MB, a repository-size concern rather than a
  page-performance one.

### Accessibility contract

- `alt` describes the object and its arrangement in one sentence, e.g.
  "Blueprint rendering of six flat plates exploded along a vertical axis." It
  never repeats the caption and never asserts a claim.
- The visible `<figcaption>` states the plate's claim in words. No claim
  numeral on or in a plate; numbers reach the page only through
  `renderableProofMetrics()`.
- The plate is never the sole carrier of any information. The caption is.

---

## 3. Cover ambient loop

One moving plate on `/`, and only one.

- **Subject**: a sheet of gridded drafting paper under a lamp, a hand ruling
  one line across it, then the shot resets. Objects and hands only, no face,
  no legible text.
- **Placement**: below the TOC, above the FAQ. Below the fold, never LCP.
- **Duration**: 6 to 10 seconds, seamless, no cuts, no camera move faster than
  a slow drift. If it reads as a video rather than as a breathing plate, it is
  too fast.
- **Encoding**: `.webm` (VP9) primary plus `.mp4` (H.264) fallback, 720px
  longest edge, no audio track in the file at all. **Under 2MB per file.**
- **Two theme variants, pre-encoded**, swapped by theme. A CSS
  `filter: invert()` on a playing video forces a per-frame full-surface
  repaint and is banned here; `plate-duotone` stays on still plates only.
- **Poster**: still frame at `public/hero/cover-loop-poster.webp` plus its
  dark variant, under 200KB each, registered as the FIG_032 still. On mount,
  crossfade poster to video over 150ms so the swap does not snap.

**Ceiling compliance list.** Every item is a merge gate.

- `autoPlay`, `muted`, `playsInline`, `loop`, `preload="metadata"`, and the
  `<video>` mounts only after an `IntersectionObserver` reports it in view.
- `usePrefersReducedMotion()` → render the poster `<img>` and never mount the
  `<video>`.
- Cover Lighthouse must clear the §5 gate.

`connection.saveData` → poster only, as progressive enhancement. It is not a
merge gate, because the API is not available in every engine.

---

## 4. Claim, IP, and prompt guardrails

- **No type of any kind in any image.** See the zero-type boundary in §2. All
  lettering on a plate is DOM text placed by `PlateLabels`.
- **Reject any generation containing pseudo-labels, leader lines, or
  annotation-like marks.** This is its own gate, not a restatement of the one
  above. An image model asked for a technical drawing will annotate it: it
  adds callout ticks, dimension arrows, tiny illegible captions, and
  scale bars because that is what technical drawings look like in its training
  data. Anything that reads as annotation rejects the generation even when no
  glyph is resolvable — a leader line with nothing on the end of it is still a
  fake label, and it will collide with the real one.
- **No light source, no cast shadow.** See the flat-light boundary in §2.
- **No claim numerals.** A magnitude never appears in a plate, caption, or
  `alt`. Numbers resolve through `content/proof-metrics.ts`.
- **No vendor UI, and no names in paths.** No screenshots, monitors showing an
  interface, or product chrome, and no vendor, employer or client name in a
  subject, filename, caption, `alt`, or registry row. Plate filenames are
  figure numbers for exactly this reason.
- **No gated content as a subject**: nothing depicting a board pack's
  contents, a named account, an opportunity row, a threshold, or anything
  marked `publicUse: "hide"`. **No faces**; hands only, cover loop only.
- **Prompt channel is bounded.** A generation prompt may contain the fixed §2
  template and the §2 subject line verbatim, and nothing else. Never chapter
  prose, never vault content, never claim text, never a metric. Pasting
  chapter content into an image model is a leak path.
- **Every attempt is logged.** FIGURES.md notes record each generation as
  accepted or rejected with a one-line reason. Rejection criteria are fixed:
  any lettering or numeral, any pseudo-label, leader line, arrow, or dimension
  mark, any light source or cast shadow, off-palette color, or subject drift
  from the table. A skipped plate leaves a Reserved note carrying its number.
  Superseding an accepted plate does not erase its log rows; the supersession
  is a new row and the old rows stand.
- `npm run proof:guard` and `npm run voice:scan` still gate the merge.

---

## 5. Build phases and gates

A failed gate stops the wave. It does not get waived.

**Lighthouse method, fixed for every gate below:** prod-mode local build,
mobile preset, median of 3 runs, tolerance −2 points against the phase-1
baseline. Routes are `/`, `/case-studies/revenue-operations-signal-to-revenue`,
and `/case-studies/ai-native-gtm`.

0. **Sequencing.** §0. *Gate: both assertions logged with evidence.*
1. **Baseline.** Lighthouse by the method above, plus byte weight, on the
   current build. *Gate: numbers written down before anything changes.*
2. **Motion primitives.** The four runners and their specs; the `RulerRail`
   rewrite; `data-leader-group` on `LeaderLabel`; the `StatTable` client
   wrapper; the three zero-caller primitives resolved. *Gate: lint and build
   clean; reduced-motion pass shows every element at final state with no
   observers registered; no layout property animated in the diff; the
   RulerRail `top:%` write is gone. Then **Connor go/no-go** on one fully
   wired chapter, both themes, reduced-motion on and off.*
3. **Two pilot plates**, `revenue-operations-signal-to-revenue` and
   `ai-native-gtm` only. *Gate: Connor reviews both in light and dark, desktop
   and phone, and gives an explicit go before any further generation.*
   **Run once under the v2 halftone direction and returned: the pilot gate is
   what produced the v3 art direction above.** Phase 3 re-runs on the new
   template with `PlateLabels` wired and no duotone, and the same gate applies
   to the re-roll. The superseded pilot files are deleted; their generation-log
   rows stay.
4. **Remaining plates.** The other nine, same template and placement,
   FIGURES.md appended in one commit at the end. *Gate: a fresh reviewer
   agent with no part in generating them judges every plate at full resolution
   against the §4 rejection criteria and passes each one; every plate under
   the size ceiling; every registry row public-safe; every attempt logged.*
5. **Cover loop.** Generate, encode both theme variants, wire poster,
   crossfade, observer mount. *Gate: file sizes under budget; Lighthouse on
   `/` inside tolerance; the §3 compliance list checked item by item. Then
   **Connor go/no-go** on the loop in both themes before merge.*
6. **Final QA.** `npm run lint`, `npm run build`, `npm run proof:guard`, `npm
   run words`, prod-mode local plus `npm run voice:scan`, Lighthouse on all
   three fixed routes, and a reduced-motion pass plus both themes on every
   touched route. *Gate: all green.*

---

## 6. Non-goals

Out of scope. Proposing any of these is a scope change, not a refinement.

- **No scroll-pinning set-pieces.** Nothing pins a section, hijacks the wheel,
  or holds the reader in place while something plays.
- **No chapter transitions.** Cross-document navigation keeps the existing
  View Transitions root fade pair. No page-curl, wipe, or per-chapter custom
  transition.
- **No line diagrams from an image model.** Figures stay hand-authored SVG
  from `components/figures/`, and every label on the site is DOM text. The
  pivot narrows this rather than relaxing it: an image model may render a
  three-dimensional object, unlabeled, and nothing else. It never produces a
  flat schematic, never a labeled drawing, never a single glyph. A generated
  figure that names its own parts is the AI-slop failure mode DESIGN.md §6
  bans, and it is now excluded at the prompt as well as at review.
- **No second ambient loop**, and **no new color token** for this wave.

## Appendix: build-phase notes from the round-2 review (GO, 8/10)

1. Phase 2: do not delete `statFill` — wire the `StatTable` client wrapper through it (or strip its doc comment + `data-stat-row` attrs in the same commit). One of the two, never a dangling half.
2. Phase 2: B1 re-measure rule — on resize, if a scroll-bound plate is now above-fold, drop the binding and force full draw.
3. Phase 2: RulerRail reduced-motion branch renders no readout today; the `scroll()` rewrite must not register a binding in that branch.
4. Phase 2: the `["start 0.9","start 0.3"]` offsets are deliberate (both bounds on the start edge so tall plates finish while partially below fold). Do not "correct" them.
5. Phase 5: FIG_032 covers four assets (2 videos, 2 posters); decide the FIGURES.md row grammar before appending.
