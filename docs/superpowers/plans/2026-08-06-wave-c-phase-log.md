# Wave C — phase log

Running record for
[the Wave C spec](../specs/2026-08-06-visual-elevation-design.md). One section
per build phase, written as the phase closes. A failed gate stops the wave and
is recorded here rather than waived.

Public-repo file: no gated value, no vendor, employer or client name, no
metric. Numbers here are build and performance measurements only.

---

## Phase 0 — sequencing assertion

Both assertions pass. Wave C may start.

**Assertion 1: `voice:scan` clean against a prod-mode build.**

- `npm run build` on `redesign/manual`, then `npx next start -p 3117`. Port
  3117 was confirmed free before the start and the listening PID was confirmed
  to be this session's own process. Port 3000 was not used and no pre-existing
  listener was trusted.
- `node scripts/voice-scan.mjs --base http://localhost:3117` →
  `Voice scan passed: 24 route(s) scanned, 0 route(s) still on the baseline.`
- `scripts/voice-scan-baseline.json` is `{}`, so "passed" means empty rather
  than baselined-over.

**Assertion 2: Wave B claim-scope commit present on `redesign/manual`.**

All three named commits verified as ancestors of `HEAD`:

| Hash | Subject |
|---|---|
| `a1da60a4` | `fix(claims): enforce claim-scope decisions on chapter proof blocks` |
| `595e4bb6` | `fix(copy): wave B style rewrite (edge signatures, chapter slots, parallelisms, captions)` |
| `eadd8e0c` | `fix(copy): wave B round-1 fixes, Connor-attested facts sourced` |

`npm run proof:guard` also passes: 4 renderers against a floor of 4.

---

## Phase 1 — baseline

Method, fixed for every later gate: prod-mode local build, Lighthouse 12.8.2
mobile preset (`--form-factor=mobile --screenEmulation.mobile
--throttling-method=simulate`), headless Chrome, median of 3 runs per route.
Tolerance for later phases is −2 points against these numbers.

Captured against the build at `HEAD` before any Wave C source change.

| Route | Perf | A11y | Best practices | SEO | LCP (ms) | TBT (ms) | CLS | Bytes (KB) |
|---|---|---|---|---|---|---|---|---|
| `/` | 71 | 100 | 100 | 100 | 7292 | 239 | 0.000 | 1024 |
| `/case-studies/revenue-operations-signal-to-revenue` | 70 | 100 | 100 | 100 | 7374 | 261 | 0.000 | 1012 |
| `/case-studies/ai-native-gtm` | 68 | 96 | 100 | 100 | 7385 | 222 | 0.000 | 1038 |

Notes on the baseline, recorded rather than acted on:

- Performance sits in the high sixties to low seventies on all three routes,
  driven by simulated-mobile LCP around 7.3s. That is the number the plate
  program in phases 3 to 5 has to stay inside, and it is why the per-route
  plate budget is one plate.
- `/case-studies/ai-native-gtm` scores 96 on accessibility where the other two
  score 100. Pre-existing, unrelated to Wave C, not in scope for this wave.
- CLS is 0.000 everywhere. Anything in this wave that reflows on entry would
  show up here, which is why the stat tick reserves its width.

---

## Phase 2 — motion primitives

Four new runners, the `RulerRail` rewrite, the `StatTable` client wrapper, and
the three zero-caller primitives resolved. No plates: phase 2 ends at Connor's
taste gate.

### Primitives added to `lib/motion-manual.ts`

| Runner | Wired at | Reduced motion |
|---|---|---|
| `drawOnProgress()` | `components/figures/Figure.tsx`, chosen at mount over `drawOn` | Returns `bound: false` before any measurement or `scroll()` call; caller's `drawOn` also returns before its observer, so strokes stand as authored |
| `statTick()` | `components/manual/StatTableMotion.tsx` | Returns before the observer; the server-rendered string stands |
| `labelSettle()` | `components/figures/Figure.tsx`, manual on scroll-linked plates and `inView` on one-shot plates | Writes every label to final state, parks nothing, registers nothing, and `release()` is a no-op |
| `rulerBreathe()` | `components/manual/RulerRail.tsx`, on the readout-plus-rule element | Not started |

### Zero-caller primitives resolved

- `wordmarkReveal` — **wired.** New `WordmarkMotion` client wrapper around the
  cover masthead only. `Masthead` stays a server component and already shipped
  the wordmark split into `data-glyph` spans. The chapter masthead is left
  alone: at link size a per-glyph reveal reads as a flicker.
- `statFill` — **wired**, per the round-2 appendix note, not deleted. It runs
  from the same `StatTableMotion` wrapper as `statTick`, so the existing
  `data-stat-row` attributes and doc comment now have a live caller.
- `sheetReveal` — **deleted**, with `sheetRevealSpec`. It had no caller and the
  wave's motion ceiling does not ask for one: sheets are the page's reading
  surface, and lifting each one on entry is the "everything moves" register the
  ceiling rules out. DESIGN.md §7's catalog table was updated in the same
  commit so the documented catalog matches the shipped one.

### `RulerRail` rewrite

The hand-rolled `rAF` scroll loop and the `top: N%` write per frame are gone.
The readout now rides `transform: translateY()` driven by motion's `scroll()`.
The rail height it travels across is measured by a `ResizeObserver`, so no
geometry is read inside the scroll callback. The 2% top inset is CSS, so the
resting position is correct before a single frame runs. The readout string is
written only when its two-decimal value actually changes.

Per the appendix note, the reduced-motion branch registers nothing at all: the
effect returns before the `ResizeObserver`, before `scroll()`, and before
`rulerBreathe()`. The ticks still render, as they do today.

### Deliberate offsets

`drawOnProgressSpec.offset` is `["start 0.9", "start 0.3"]`, both bounds on the
plate's own start edge, so a tall plate finishes drawing while its lower half
is still below the fold. Documented in the spec object as deliberate so a later
pass does not "correct" the second bound to `end`.

### Resize re-measure

A scroll-bound plate registers a passive `resize` listener. If a resize puts
the plate's top inside the first viewport, the binding is dropped and the plate
is forced to full draw. Measurement happens on the resize event, never inside
the scroll callback.

### Gate results

**Build.** `npx tsc --noEmit` clean. `npm run lint` reports the one
pre-existing `proxy.ts` unused-argument warning and no errors. `npm run build`
exits 0, 43 routes. `npm run proof:guard` passes at 4 renderers against a
floor of 4.

**No layout property animated.** Audited over the diff. The only animated
properties are `opacity`, `transform`, and `stroke-dashoffset`. No `width`,
`height`, `top`, `left`, `margin` or `padding` is animated anywhere.
`requestAnimationFrame` appears zero times in the diff.
`getBoundingClientRect` appears once, in `isAboveFold`, called at mount and on
the resize event and never inside a scroll callback. `RulerRail` writes only
`style.transform`; the `top: N%` write is gone.

**Reduced motion, verified by browser emulation.** Chrome driven headless with
`--force-prefers-reduced-motion`, with `IntersectionObserver.observe`,
`ResizeObserver.observe` and `addEventListener("scroll")` instrumented before
any page script runs, sampled at 150ms and at 3.5s, on all three fixed routes.

| Signal | Reduced motion | Motion allowed |
|---|---|---|
| IntersectionObservers from Wave C code | 0 on every route | 2 on the figure plate, 1–2 on the stat table |
| `RulerRail` ResizeObserver | not registered | registered |
| Strokes parked | 0 at every sample | parked on entry, released as they draw |
| Leader labels below full opacity | 0 at every sample | parked, then settled |
| Ruler readout in the DOM | absent | present |
| `min-width` reservations written | none | written on tickable values only |

Two findings worth keeping:

- The chapter route registers about twice as many `IntersectionObserver`s under
  reduced motion, and all of the extra ones are on `<a>` elements. It is
  Next.js link prefetching, it reproduces identically on a route this wave does
  not touch, and it predates Wave C. Recorded, not acted on.
- `RulerRail` originally branched on the React hook alone, and the hook can
  still be reporting its server fallback on the first client pass. One pass was
  enough to register a `ResizeObserver` that the reduced-motion branch is not
  allowed to have, and the instrumentation caught it. Fixed by taking the
  imperative `prefersReducedMotion()` check as well. The table above is the
  post-fix measurement.

**Lighthouse, same fixed method as phase 1.**

| Route | Baseline perf | Phase 2 perf | Delta |
|---|---|---|---|
| `/` | 71 | 73 | +2 |
| `/case-studies/revenue-operations-signal-to-revenue` | 70 | 69 | −1 |
| `/case-studies/ai-native-gtm` | 68 | 71 | +3 |

Accessibility, best practices and SEO are unchanged on all three routes
(100/100/100, and 96 accessibility on `ai-native-gtm` as at baseline). CLS
stays 0.000 everywhere, which is the number the stat tick's width reservation
was there to protect.

**Measurement noise, recorded because it matters more than the pass.** An
earlier median-of-3 on a build differing only by a guard that does not execute
on `/` put `/` at 67, which would have been outside tolerance. Five further
runs of `/` on the final build came back 66, 70, 71, 72, 74: median 71, spread
8 points, with total blocking time ranging from 70ms to 348ms across runs. The
−2 tolerance is narrower than this machine's noise floor, so a single
median-of-3 cannot resolve it. Phase 2 is inside tolerance on the run of
record and at parity on the supplementary five, and the honest reading is that
the motion work is performance-neutral. Phase 5, where the plate program adds
real bytes, should raise the run count or move to a quieter machine rather
than trusting a single median-of-3.

### Screenshots

One fully wired chapter, `revenue-operations-signal-to-revenue`, at 1440,
in both themes and with reduced motion on and off, top of page and scrolled to
35%. Held in the session scratchpad at `wave-c/`, eight files named
`chapter-1440-{light,dark}-{motion,reduced}[-scrolled].png`. The reduced-motion
pair shows the plate fully drawn, the labels at full opacity and no ruler
readout; the motion pair shows the readout riding the rail with its value.

### Deviations and open items for Connor

1. **`statTick` regex versus the currency-floor example.** The spec fixes the
   gate at `/^[\d,.$+]+$/`, which admits no letters, so a value carrying a
   magnitude suffix does not match and renders static. The spec's own worked
   example of the currency floor uses a suffixed value, which that regex
   excludes. Implemented literally as written: the regex is the gate, and the
   floor rule is implemented for the currency values that do pass it. The
   practical effect is that only plain counts and grouped counts tick today,
   which is the conservative outcome. Flagged rather than silently widened,
   because widening the regex widens what an animation is allowed to touch.
2. **`rulerBreathe` period sits outside `DURATION`.** The spec fixes it at
   about 6s. `DURATION` tops out at 1.2s and is for transitions a reader waits
   through; an ambient loop is not one. The period is a named constant in
   `rulerBreatheSpec` with that reasoning in the comment rather than a new
   entry in the shared scale.
3. **`sheetReveal` deletion touches DESIGN.md.** DESIGN.md outranks the spec,
   and its catalog table listed `sheetReveal`. Deleting the runner without
   updating the table would have left the authority wrong, so the table was
   rewritten to the shipped set in the same commit.
4. **Parking has to go through motion, not through the style attribute.** An
   attempt to park labels and glyphs with a direct inline style write instead
   of a zero-duration animation left every label stuck at zero opacity: motion
   commits its own value on finish, and an inline opacity it does not own wins
   over that commit. Reverted to the zero-duration park, which is the pattern
   the file already used. Recorded so nobody tries it again as an
   optimization.

Phase 2 stops here, at Connor's taste gate. No plate has been generated and no
FIGURES.md row has been appended.
