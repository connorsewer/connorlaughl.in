# Overnight log — Making Software redesign (2026-08-05)

Spec: `docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md` (v3.1, `6ee4c1b7`). Plan: `docs/superpowers/plans/2026-08-05-makingsoftware-redesign.md`.
Rule reminder: no gated value or private vendor/system name may appear in this file. Generic descriptors only.

## Phase 0 — Reconcile + reference capture

- **Git state at start of overnight run:** branch `redesign/manual` (created off local `main` at `c3715337`). Local `main` is ahead 1 / behind 8 vs `origin/main` (measured live; HANDOFF's "behind 5" was stale). No pull/merge/rebase performed — drift reconciliation is Connor's morning decision.
- **Dirty files (5, all unstaged, Connor's workstream):** `HANDOFF.md`, `app/edge/opengraph-image.tsx`, `app/edge/page.tsx`, `components/edge/EdgeMobileChip.tsx`, `content/case-studies/one-tsi-revenue-infrastructure.md`. Backed up verbatim to `docs/superpowers/pre-redesign-dirty.patch` (427 lines) and committed. Restore any file with `git apply --include=<path> docs/superpowers/pre-redesign-dirty.patch` against `c3715337`-era content.
- Reference screenshots: captured to `docs/superpowers/reference/` (gitignored — third-party copyrighted pages, local scaffolding only).

## Phase 1a — Story spine

- **Spine written** to the vault path named in the plan's Global Constraints. 22 proof points cleared (6 Green, 16 Amber with a cited standing approval); every row carries its approval reference. Stats block locked at 5 rows: years operating, regulated verticals, acquisitions integrated, plus two build-computed counts (chapters, words). Three of those rows need new `content/proof-metrics.ts` entries and are flagged for Task 5. FAQ locked at 6 questions, each traced to a real recruiter or hiring screen in the vault. Tagline picked with 2 runners-up; CTA copy set. Self-audit recorded at the bottom of the spine: build-volume evidence downgraded to numeral-free phrasing, all target/projected rows dropped, one exact numeral survives site-wide and is scoped to a single route.

## Phase 2 — Foundation

- **Task 4 (Newsreader body serif):** acquisition succeeded over the network, so the Georgia fallback was not needed. Pulled the two Newsreader variable TTFs (roman + italic) from the Google Fonts repository, pinned static instances with fonttools at optical size 18 (the family default, tuned for body sizes) and weights 400/500/600 roman plus 400 italic, subset each to the Latin-plus range, and shipped four woff2 files in `public/fonts/newsreader/` (110 KB total) with the OFL license copy alongside. The variable sources are not kept in the repo; the reproduction commands live in the `scripts/subset-fonts.py` docstring.
- `scripts/subset-fonts.py` is now parameterized: optional source directory argument, `--out`, and `--keep-gsub`. Defaults reproduce the existing GT Sectra output exactly; Newsreader is built with `--keep-gsub` so its ligatures survive.
- Type roles added to `app/globals.css`: `.font-serif-body`, `.manual-body` (ragged right below a 48rem viewport, justified with automatic hyphenation above it, which is where the sheet column first clears a 60ch measure), and `.manual-dropcap` (float-based cap by default, upgraded to a sunk three-line cap inside `@supports (initial-letter: 3)` so no browser applies both).
- Note for figure and label work: Newsreader carries no arrow glyphs, and neither does the upstream family. Arrows stay a mono-role character in Geist Mono.

## Decisions made overnight

(running list)

## Orphaned assets for Connor's cleanup call

(running list — nothing deleted overnight beyond what the spec's disposition table mandates)

## Phase status

- [x] Phase 0 (a) git state recorded, (b) dirty patch committed
- [x] Phase 0 (c) reference captures (cover-1440/390, chapter-1440/390 in docs/superpowers/reference/, local-only)
- [ ] Phase 1a spine + IA lock
- [ ] Phase 2 foundation
- [ ] Phase 1b copy deck
- [ ] Phase 3 cover
- [ ] Phase 4 chapter chrome + case studies
- [ ] Phase 5 remaining routes
- [ ] Phase 6a metadata surface
- [ ] Phase 6 hardening + final QA
