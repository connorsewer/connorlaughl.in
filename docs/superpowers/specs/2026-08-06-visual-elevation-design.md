# Wave C — visual elevation (v2, post-review)

Status: spec, revised after adversarial review. Authority:
[DESIGN.md](../../../DESIGN.md) and the code win over this file.
[FIGURES.md](../../../FIGURES.md) is append-only.

Two locked decisions from Connor (2026-08-06), not reopenable. **Motion
ceiling is "living document":** constant but quiet, figures draw themselves on
scroll, stats tick on entry, leader labels settle, the ruler breathes, nothing
blocks reading. Reduced motion is **outcome-parity**: a reduced-motion visitor
sees the same finished page, reaches the same information, and loses only the
transition into it. **Plates everywhere, plus motion:** one halftone plate per
case-study chapter depicting a real artifact of that system, paired with the
line diagram and never replacing it, plus one ambient loop on the cover under
the same ceiling.

---

## 0. Phase 0 — sequencing assertion

Wave C does not start until an implementing agent asserts both, in the phase
log, with evidence:

1. `npm run voice:scan` comes back empty against a prod-mode local build.
2. A Wave B claim-scope commit is present on `redesign/manual` (the commit
   that lands the copy edits; name its hash in the log).

Fail either and stop. Do not begin phase 1.

---

## 1. Motion primitives

Additions to `lib/motion-manual.ts`. Same contract as the existing runners:
take a `MotionTarget`, return `MotionCleanup`, check `prefersReducedMotion()`
first, ship a `*Spec` object beside the runner. Values come from
`lib/motion.ts`; do not invent new ones.

Already present: `drawOn`, `sheetReveal`, `statFill`, `wordmarkReveal`,
`prefersReducedMotion`. Only `drawOn` has a caller today (`Figure.tsx:64`).
Phase 2 resolves the other three: wire `wordmarkReveal` on the cover masthead,
and delete `sheetReveal` and `statFill` if still unused when the wiring pass
finishes. Record the decision and what was deleted in the phase log.

| New primitive | Behavior | Reduced motion |
|---|---|---|
| `drawOnProgress()` | Scroll-linked stroke dash offset, for **below-fold plates only**. At mount the runner measures the plate: if its top is inside the first viewport it does nothing and the caller falls back to one-shot `drawOn`. Below-fold plates bind progress with motion's `scroll()` at offset `["start 0.9", "start 0.3"]`. | No measurement, no `scroll()` registration. Strokes stay as authored, i.e. fully drawn. |
| `statTick()` | Numeric readout counts to its final value once, on entry, then restores the DOM-authored string verbatim. The animation never synthesizes a claim. | Final string stands. No tick, no observer. |
| `labelSettle()` | Leader labels arrive as a group after their plate enters: opacity 0→1 with a 4px settle, `STAGGER.med` between labels. One-shot, latched. | All labels at final state immediately. |
| `rulerBreathe()` | ±0.06 opacity oscillation on a ~6s period, applied to the `RulerRail` readout-plus-rule element only (the ticks are one gradient span and cannot be targeted individually). Ambient, carries no state. | Not started. Ruler is static, as today. |

### In-scope files beyond `lib/motion-manual.ts`

- **`components/manual/RulerRail.tsx` — rewrite.** It currently violates this
  budget: a hand-rolled `rAF` scroll loop writing `top: N%` on every frame,
  which is a layout write per frame. Replace with `transform: translateY()`
  and motion's `scroll()`. `rulerBreathe` lands on the rewritten element.
- **`components/figures/LeaderLabel.tsx`** — add a `data-leader-group`
  attribute so `labelSettle` has something to select. No visual change.
- **`components/manual/StatTable.tsx`** — gains a small client wrapper that
  runs `statTick`. The presentational component stays server-rendered and
  still never imports `content/proof-metrics`.
- **`components/figures/Figure.tsx`** — chooses `drawOnProgress` or `drawOn`
  per the above-fold measurement.

### One-shot versus scroll-linked, stated exactly

Only **strokes** are ever scroll-linked, and only on below-fold plates.
Everything else is one-shot and latched, so nothing un-animates on scroll-up.
When a plate is scroll-linked, its labels fade in at scroll progress > 0.85
and then latch: they do not fade back out when the reader scrolls up.

### `statTick` rules

- Applies only to a value matching `/^[\d,.$+]+$/` **after** resolution
  through `renderableProofMetrics()`. Anything else renders static.
- Floor is `0` for counts; for `$` values the floor is the first significant
  digit held constant (so `$159.4M` ticks from `$100M`, never from `$0`).
- The value cell reserves `min-width` in `ch` equal to the final string's
  width, so ticking cannot reflow the row. This is a width reservation, not a
  `tabular-nums` claim.

### Performance budget, enforced in review

- Transform and opacity only, plus `stroke-dashoffset` for draw-on. No width,
  height, top, left, or margin is animated anywhere in the diff.
- Entry-triggered primitives are `inView()`-driven. `drawOnProgress` uses
  motion's `scroll()`. `stroke-dashoffset` is **not** on motion's accelerated
  list (opacity, clipPath, filter, transform), so the below-fold scroll-linked
  case runs on motion's JS scroll driver. That is accepted: the driver is
  passive-listener based and the animation performs no layout writes. Budget
  it as main-thread work and keep it to one scroll-linked animation per plate.
- The ban is on **hand-rolled** `rAF` scroll handlers and on
  `getBoundingClientRect` inside a scroll callback. Motion's own driver is
  permitted; that is what the RulerRail rewrite moves onto.
- Each runner ships a `failsafe` equivalent to `drawOn`'s: content is never
  left invisible because an observer did not fire.

---

## 2. Plate program

One photographic halftone plate per case-study chapter, in the treatment
proven by FIG_020 on `/about`.

### Subjects — the real artifact of each chapter

**Provenance.** Each subject was derived by reading that chapter's
`systemsBuilt` and `artifactIdeas` in `content/case-studies.ts` and
generalizing to a physical object. Subjects are not quotations of those
fields, are not claims, and assert nothing about magnitude or outcome.

| Chapter (slug) | Paired diagram | Plate subject |
|---|---|---|
| `revenue-operations-signal-to-revenue` | FIG_008 | A thick tabbed binder open flat on a desk under a lamp. |
| `ai-native-gtm` | FIG_009 | A printed checklist on a desk with a rubber stamp and an ink pad resting beside it. |
| `revenue-operations-pipeline-truth` | FIG_010 | A stack of printouts on a desk, top sheet marked up in red pen. |
| `bdr-pod-signal-to-meeting` | FIG_011 | A closed logbook held shut by an elastic band, beside a phone handset. |
| `gtm-strategy-positioning` | FIG_012 | Five index cards pinned in a row on a corkboard, string running to a second row below. |
| `debtnext-integration` | FIG_013 | Two ring binders side by side, one worn and one new, a single tab bridging them. |
| `marketing-analytics-architecture` | FIG_014 | A graph-paper worksheet with two columns joined by hand-ruled lines, pencil and straightedge beside it. |
| `leadership-team-development` | FIG_015 | A stack of one-page agenda sheets lying face-down beside a pen. |
| `outcome-first-repositioning` | FIG_016 | A galley proof on a light table, one column struck through and rewritten in the margin. |
| `marketing-org-design-governance` | FIG_017 | Index cards in two vertical lanes on a magnetic board, one card mid-move. |
| `enterprise-site-overhaul` | FIG_018 | Paper rectangles taped out on a wall with arrows drawn between them in marker. |

Eleven subjects, one per chapter. Where a subject cannot be made honest at
generation time, that chapter ships diagram-only and its reserved FIG number
gets a Reserved note in FIGURES.md (see §4). A missing plate is an acceptable
outcome. A dishonest plate is not.

### Generation prompt template

Style-locked to FIG_020. Fill the bracket with the subject line verbatim from
the table above; change nothing else.

> Editorial halftone plate. `[SUBJECT]`. Coarse halftone dot screen, dots
> clearly visible at print scale. Two colors only: blueprint ink `#2E47F1` on
> flat off-white paper `#FBFBFB`. No gradients, no third color, no gloss.
> Straight-on or slight three-quarter framing, even light, no dramatic
> shadow. Objects only. No legible text, no legible numerals, no logos, no
> screens, no user interface, no faces. Generous paper margin. Shot as
> documentation, not as an advertisement.

Negative list: `legible text, readable lettering, numbers, logos, watermark,
UI, screenshot, monitor, phone screen, clock face, calendar, gradient, neon,
3d render, stock photo lighting`.

**The legibility boundary.** Marks on paper may exist — a page with writing on
it reads as a used artifact. They must be **illegible at full resolution**. If
any word, numeral, or logo can be read when the plate is viewed at 1:1, the
generation is rejected and regenerated. It is never retouched into compliance.

### Placement and layout

- The plate renders **after the chapter's first body section**, below the
  opening prose, as its own `<figure>` — not in the header section, where it
  would sit near the fold on mobile.
- The line diagram keeps its existing position. Diagram states the mechanism;
  plate shows what the mechanism was made of.
- `max-w-[26rem]`, wrapped in a single `border border-blueprint/40 p-2` frame
  around the `next/image`: the FIG_020 pattern verbatim, one border element,
  no nested frames.
- Caption follows the `Figure.tsx` `<figcaption>` layout: mono
  `FIG_0NN [ SUBJECT ]` line, then the serif claim sentence.
- Class `plate-duotone` is required. Dark mode inverts it into the cyanotype
  negative through the rule in `app/globals.css`; without the class the plate
  lights up as a white rectangle on the dark ground.
- `next/image`, explicit `width`/`height`, `sizes="(min-width: 768px) 26rem,
  100vw"`, lazy. No `priority`.

### Wiring, files, registry

- **No new `CaseStudy` fields.** A `chapterPlates` lookup lives in
  `app/case-studies/[slug]/page.tsx` beside the existing `chapterFigures`,
  keyed by slug: `{ fig, src, width, height, alt, caption }`. A slug absent
  from the table renders diagram-only, which stays legal. The claim gate
  reviews this table, the same way it reviews any rendered copy.
- Files are named **by figure number, never by slug**:
  `public/case-studies/plate-fig-021.webp` and so on. A slug-named file would
  put a client name in a public path.
- FIG numbers: `FIG_019` stays reserved and untouched. Chapter plates take
  **FIG_021 through FIG_031** in the table's order; the cover loop takes
  **FIG_032**. Append to FIGURES.md, never renumber. Registry rows are public
  repo markdown, so ground truths stay generic: no vendor, employer, client or
  gated value.

### Encoding and size

- Near-lossless or paletted WebP — the dot screen is what has to survive, and
  lossy quality ladders smear it before they save much. Longest edge 1280px;
  if a plate still misses budget, reduce the longest edge to 1080 before
  touching quality further.
- **Target under 300KB, hard ceiling 400KB per plate.** Over ceiling means
  re-encode or re-crop, not ship.
- Two different budgets, do not conflate them. **Per-route cost** is one plate,
  300–400KB, and that is the number that affects a reader. **Repo weight** is
  the sum of all plates plus both loop variants, roughly 8.6MB, which is a
  repository-size concern and not a page-performance one.

### Accessibility contract

- `alt` describes the object and its state in one sentence, e.g. "Halftone
  plate of a tabbed binder lying open on a desk." It never repeats the caption
  and never asserts a claim.
- The visible `<figcaption>` states the plate's claim in words.
- No claim numeral on or in a plate. Numbers reach the page only through
  `renderableProofMetrics()`.
- The plate is never the sole carrier of any information; the caption is.

---

## 3. Cover ambient loop

One moving plate on `/`, and only one.

- **Subject**: a sheet of gridded drafting paper under a lamp, a hand ruling
  one line across it, then the shot resets. Objects and hands only, no face,
  no legible text.
- **Placement**: below the TOC, above the FAQ. Below the fold, never the LCP
  element.
- **Duration and loop**: 6 to 10 seconds, seamless, no cuts, no camera move
  faster than a slow drift. If it reads as a video rather than as a breathing
  plate, it is too fast.
- **Encoding**: `.webm` (VP9) primary plus `.mp4` (H.264) fallback, 720px
  longest edge, no audio track in the file at all. **Under 2MB per file.**
- **Two theme variants, pre-encoded.** Dark mode gets its own inverted encode
  swapped by theme. A CSS `filter: invert()` on a playing video forces a
  per-frame full-surface repaint and is banned here; `plate-duotone` stays on
  still plates only. Each variant is separately under 2MB.
- **Poster**: still frame at `public/hero/cover-loop-poster.webp` (plus its
  dark variant), under 200KB each, registered as the FIG_032 still. On mount,
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

- **No legible text in any image.** See the legibility boundary in §2. A
  generation with readable text is rejected, not retouched.
- **No claim numerals.** A magnitude never appears in a plate, a caption, or
  an `alt`. Numbers resolve through `content/proof-metrics.ts`.
- **No vendor UI, and no names in paths.** No screenshots, no monitors showing
  an interface, no product chrome, and no vendor, employer or client name in a
  subject, filename, caption, `alt`, or registry row. Plate filenames are
  figure numbers for exactly this reason.
- **No gated content as a subject.** Nothing depicting a board pack's
  contents, a named account, an opportunity row, a threshold, or anything
  marked `publicUse: "hide"`.
- **No faces.** People appear only as hands, and only in the cover loop.
- **Prompt channel is bounded.** A generation prompt may contain the fixed
  template in §2 and the subject line verbatim from the §2 table, and nothing
  else. Never chapter prose, never vault content, never claim text, never a
  metric. Pasting chapter content into an image model is a leak path.
- **Every attempt is logged.** FIGURES.md notes record each generation as
  accepted or rejected with a one-line reason. Rejection criteria are fixed:
  any legible text, any legible numeral, off-palette color, or subject drift
  from the table. A skipped plate leaves a Reserved note carrying its number.
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
2. **Motion primitives.** Add the four runners and their specs; rewrite
   `RulerRail`; add `data-leader-group` to `LeaderLabel`; add the `StatTable`
   client wrapper; resolve the three zero-caller primitives. *Gate: `npm run
   lint` and `npm run build` clean; reduced-motion pass shows every element at
   final state with no observers registered; no layout property animated in
   the diff; the RulerRail `top:%` write is gone. Then **Connor go/no-go** on
   one fully wired chapter, both themes, reduced-motion on and off.*
3. **Two pilot plates.** `revenue-operations-signal-to-revenue` and
   `ai-native-gtm` only. *Gate: Connor reviews both in light and dark, desktop
   and phone, and gives an explicit go before any further generation.*
4. **Remaining plates.** The other nine, same template and placement.
   FIGURES.md appended in one commit at the end. *Gate: a fresh reviewer agent,
   with no part in generating them, judges every plate against the §4
   rejection criteria at full resolution and passes each one. Every plate
   under the size ceiling; every registry row public-safe; every attempt
   logged.*
5. **Cover loop.** Generate, encode both theme variants, wire poster,
   crossfade, and observer mount. *Gate: file sizes under budget; Lighthouse
   on `/` inside tolerance; the §3 compliance list checked item by item. Then
   **Connor go/no-go** on the loop on `/` in both themes before merge.*
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
  View Transitions root fade pair. No page-curl, no wipe, no per-chapter
  custom transition.
- **No line diagrams from an image model.** Figures stay hand-authored SVG
  built from `components/figures/`. An image model produces photographic
  plates and nothing else. A generated "diagram" is the AI-slop failure mode
  DESIGN.md §6 bans.
- **No second ambient loop**, and **no new color token** for this wave.
