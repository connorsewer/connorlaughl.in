# Overnight log — Making Software redesign (2026-08-05)

Spec: `docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md` (v3.1, `6ee4c1b7`). Plan: `docs/superpowers/plans/2026-08-05-makingsoftware-redesign.md`.
Rule reminder: no gated value or private vendor/system name may appear in this file. Generic descriptors only.

## Phase 0 — Reconcile + reference capture

- **Git state at start of overnight run:** branch `redesign/manual` (created off local `main` at `c3715337`). Local `main` is ahead 1 / behind 8 vs `origin/main` (measured live; HANDOFF's "behind 5" was stale). No pull/merge/rebase performed — drift reconciliation is Connor's morning decision.
- **Dirty files (5, all unstaged, Connor's workstream):** `HANDOFF.md`, `app/edge/opengraph-image.tsx`, `app/edge/page.tsx`, `components/edge/EdgeMobileChip.tsx`, `content/case-studies/one-tsi-revenue-infrastructure.md`. Backed up verbatim to `docs/superpowers/pre-redesign-dirty.patch` (427 lines) and committed. Restore any file with `git apply --include=<path> docs/superpowers/pre-redesign-dirty.patch` against `c3715337`-era content.
- Reference screenshots: captured to `docs/superpowers/reference/` (gitignored — third-party copyrighted pages, local scaffolding only).

## Phase 1a — Story spine

- **Spine written** to the vault path named in the plan's Global Constraints. 22 proof points cleared (7 Green, 15 Amber with a cited standing approval, corrected in the round-1 review pass); every row carries its approval reference. Stats block locked at 5 display rows (years operating, regulated verticals, acquisitions integrated, plus two build-computed counts) with 6 `content/proof-metrics.ts` row specs flagged for Task 5: 5 new (including prose-numeral rows for progression and structure counts) and 1 reuse of an existing entry. Spine passed adversarial round 1 with fixes applied; round-2 confirmation pending. FAQ locked at 6 questions, each traced to a real recruiter or hiring screen in the vault. Tagline picked with 2 runners-up; CTA copy set. Self-audit recorded at the bottom of the spine: build-volume evidence downgraded to numeral-free phrasing, all target/projected rows dropped, one exact numeral survives site-wide and is scoped to a single route.

## Phase 2 — Foundation

- **Task 4 (Newsreader body serif):** acquisition succeeded over the network, so the Georgia fallback was not needed. Pulled the two Newsreader variable TTFs (roman + italic) from the Google Fonts repository, pinned static instances with fonttools at optical size 18 (the family default, tuned for body sizes) and weights 400/500/600 roman plus 400 italic, subset each to the Latin-plus range, and shipped four woff2 files in `public/fonts/newsreader/` (110 KB total) with the OFL license copy alongside. The variable sources are not kept in the repo; the reproduction commands live in the `scripts/subset-fonts.py` docstring.
- `scripts/subset-fonts.py` is now parameterized: optional source directory argument, `--out`, and `--keep-gsub`. Defaults reproduce the existing GT Sectra output exactly; Newsreader is built with `--keep-gsub` so its ligatures survive.
- Type roles added to `app/globals.css`: `.font-serif-body`, `.manual-body` (ragged right below a 48rem viewport, justified with automatic hyphenation above it, which is where the sheet column first clears a 60ch measure), and `.manual-dropcap` (float-based cap by default, upgraded to a sunk three-line cap inside `@supports (initial-letter: 3)` so no browser applies both).
- Note for figure and label work: Newsreader carries no arrow glyphs, and neither does the upstream family. Arrows stay a mono-role character in Geist Mono.
- **Task 6 (global chrome + figure primitives):** six manual components (`Masthead`, `Sheet`, `CheckerBand`, `RulerRail`, `StatTable`, `ColophonFooter`), five figure primitives (`Figure`, `LeaderLabel`, `IsoBox`, `ExplodedStack`, `GridPlane`), and `lib/motion-manual.ts` (`drawOn`, `sheetReveal`, `statFill`, `wordmarkReveal`). All reimplemented from the reference screenshots and the spec; no source CSS, DOM, or SVG was copied. Barrel exports at `components/manual/index.ts` and `components/figures/index.ts`. Nothing mounts them yet; Task 7 does.
- CSS added: `.bg-ground-grid` (8px minor rule plus a 64px major rule, both blueprint at very low alpha) and `.manual-checker` (repeating-conic-gradient checker, 3px cells, with a 14s drift that is suppressed under reduced motion), plus a 2px blueprint focus ring scoped to `.manual-root`.
- Figure a11y contract is enforced by the component, not by convention: `Figure` owns the `<svg>`, sets `role="img"`, and requires a title, a ground-truth description, and a visible caption. Side captions are `FIG_00N` on the left and `[ SUBJECT ]` on the right. No copyright stamp.
- Decision worth keeping: `drawOn` parks SVG strokes at zero length before it observes, so a figure whose observer never fires would be an invisible figure. It now carries a failsafe timer that reveals the drawing regardless. Gate screenshots still need a couple of seconds after load, or the plates capture mid-draw.
- Two tuning corrections made against the reference after a throwaway render: the graph grid was reading as a visible grid rather than as paper and was halved, and the ruler readout was clipping at the top of its rail and is now held inside it.
- Masthead contact link resolves from the existing schema module rather than a new literal, so there is still one email address in the tree.
- Verified: typecheck, lint, build, and the proof guard are green with the new components present and unused.

## Decisions made overnight

(running list)

## Orphaned assets for Connor's cleanup call

(running list — nothing deleted overnight beyond what the spec's disposition table mandates)

## Phase status

- [x] Phase 0 (a) git state recorded, (b) dirty patch committed
- [x] Phase 0 (c) reference captures (cover-1440/390, chapter-1440/390 in docs/superpowers/reference/, local-only)
- [x] Phase 1a spine + IA lock (adversarial gate PASSED round 2, 9/10; residuals in morning decisions)
- [ ] Phase 2 foundation
- [ ] Phase 1b copy deck
- [ ] Phase 3 cover
- [ ] Phase 4 chapter chrome + case studies
- [ ] Phase 5 remaining routes
- [ ] Phase 6a metadata surface
- [ ] Phase 6 hardening + final QA

## Morning decisions (running)

- Spine round-2 residuals (all sub-BLOCKER, recorded in the spine's self-audit): (1) FAQ Q2's verticals count must render through the stats row's metrics entry or be dropped from Q2 — carried into Task 8 instructions; (2) one sourceNote cites a weaker approval sentence than the authoritative one; (3) one proof row's where-used omits /resume though the message map includes it; (4) a label collision ("a sixth row" vs the S6 entry id); (5) one editing artifact sentence lost its concessive clause. Plus the five decisions from the spine self-audit (employer naming, legacy public surfaces carrying held names, value-form mismatch, metrics module showing more than the spine clears, build-volume evidence unlock).
