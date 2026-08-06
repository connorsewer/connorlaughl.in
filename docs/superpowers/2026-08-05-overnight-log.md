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
- **Task 5 (guard and measurement scripts):** the proof guard no longer carries hard-coded path lists. It discovers renderers by scanning `app/` and `components/` for files that read the claims module, and it strips comments first, so a presentational component that merely documents the rule is not counted as a renderer. The direct-access checks skip files that no longer exist and log the skip rather than throwing. `PROOF_RENDERER_FLOOR` is set to the measured current count of 5 renderers; the constant carries a comment saying it may only change alongside a one-line justification here.
- `scripts/word-counts.mjs` computes chapter word counts from the public rendered projection only: markdown bodies for longform, the enumerated narrative fields of the case-study route for chapters, and the soft-skills module's rendered text for `/edge` with hidden anchors dropped through the module's own projection helper. Counted fields are enumerated in a comment at the top of the script so the list has one home. It also emits the site-wide sum and the published-chapter count the cover stats block needs. `lib/word-counts.ts` imports the same functions, so the CLI and the rendered site cannot drift. Node reads the typed content modules directly (their cross-module imports are type-only), so no parser or extra dependency was needed. Sanity check: the shortest longform body counts within one percent of a hand count.
- `scripts/voice-scan.mjs` discovers routes by fetching the running server's `sitemap.xml`, re-bases the absolute URLs onto `--base`, and unions the routes that are not in the sitemap. First run recorded `scripts/voice-scan-baseline.json`: 24 routes scanned, findings on 4 of them, 7 route-and-token pairs. The baseline stores route and matched token only, never surrounding text, because it is repo JSON inside the guard's own scan. Everything flagged today sits in long-form markdown bodies plus one word on `/edge`. Route-conversion tasks delete their own routes' entries; final QA wants the file empty.
- `app/sitemap.ts` gained `/edge` and the strategy memo, which were both live but unlisted.
- `content/proof-metrics.ts` gained the stats rows the spine cleared: two new cover-stat entries plus the existing regulated-scope entry, which was extracted to a shared constant so the legacy hero strip and the new cover stats reference one object. Its register id was dropped (that register row does not carry a vertical count) and its source note now cites the approval the spine names. Three further entries cover the magnitude numerals that ship as prose rather than as stats rows. Tier references sit in comments above each row. The two build-computed rows have no entry by design.
- Verified: lint, build, proof guard, `npm run words -- --json`, and two consecutive `npm run voice:scan` runs (baseline write, then a clean pass).
- **Task 7 (sample page):** `app/dev-sample/page.tsx` is a temporary specimen sheet that mounts every Task 6 primitive at once inside `.manual-root`, so the ground, the sheet, the type roles, the checker band, the ruler, the stat table, and the figure grammar can be read against the reference in one screenshot. It is `noindex, nofollow` and absent from the sitemap; Task 19 deletes it.
- Specimen copy is placeholder and states no outcome, so nothing on the page needs to resolve through the claims module. The only numerals present are the figure's registry number and the layer order. The stat rows carry type and surface names rather than results.
- The demo plate is drawn from this repository itself: an exploded stack of the four build layers, a lattice standing for the route files the build writes out, and one leader label on the lattice. It is registered as FIG_000 so it cannot collide with the cover figure numbers, which start at 001.
- Two page-local corrections after the first render: the fixed ruler rail was overlapping the masthead nav at desktop, so the specimen masthead carries extra right padding at that breakpoint (a note for chapter chrome in Task 11, which will need the same clearance), and the plate's viewBox was tightened after it rendered with a wide dead margin.
- Screenshots captured at 1440 and 390 for the fidelity reviewer; verified lint, build, and proof guard green with the page present.

## Decisions made overnight

(running list)

## Orphaned assets for Connor's cleanup call

(running list — nothing deleted overnight beyond what the spec's disposition table mandates)

## Phase status

- [x] Phase 0 (a) git state recorded, (b) dirty patch committed
- [x] Phase 0 (c) reference captures (cover-1440/390, chapter-1440/390 in docs/superpowers/reference/, local-only)
- [x] Phase 1a spine + IA lock (adversarial gate PASSED round 2, 9/10; residuals in morning decisions)
- [x] Phase 2 foundation (fidelity gate PASSED round 2; commits 11a54df0 77727df8 196acef2 69197211 e5945852 6e33aad3)
- [x] Phase 1b copy deck (gate PASSED round 2, 8/10)
- [ ] Phase 3 cover
- [ ] Phase 4 chapter chrome + case studies
- [ ] Phase 5 remaining routes
- [ ] Phase 6a metadata surface
- [ ] Phase 6 hardening + final QA

## Morning decisions (running)

- Spine round-2 residuals (all sub-BLOCKER, recorded in the spine's self-audit): (1) FAQ Q2's verticals count must render through the stats row's metrics entry or be dropped from Q2 — carried into Task 8 instructions; (2) one sourceNote cites a weaker approval sentence than the authoritative one; (3) one proof row's where-used omits /resume though the message map includes it; (4) a label collision ("a sixth row" vs the S6 entry id); (5) one editing artifact sentence lost its concessive clause. Plus the five decisions from the spine self-audit (employer naming, legacy public surfaces carrying held names, value-form mismatch, metrics module showing more than the spine clears, build-volume evidence unlock).

## Phase 1b — Copy deck

- Deck written to the vault (all routes, OG strings, 20 figures with ground truths). Adversarial gate: round 1 CHANGES REQUIRED (2 blocker: gated headcounts hard-coded, colophon mirroring the banned author-line construction; both fixed), round 2 PASS 8/10. Mechanical residuals applied post-gate; Section 3 TOC titles duplicating Section 1 chapter titles left for Connor's morning call. One authorized spine FAQ amendment recorded in the spine changelog. Site copy total ~2.8k words plus token expansions.

- **Task 6 fidelity round 1 (fixes applied):** ground grid reduced to the 8px rule alone and the 64px major layer deleted; figures now sit on gridded white plates (`.figure-plate`) so the page ground reads as plain paper; `.manual-body` capped at a 68ch measure, ragged and unhyphenated by default, justified with hyphenation only above 68rem. StatTable lost its box and row dividers for a two-column list under a single rule; the checker band dropped to 8px at roughly a fifth of its previous contrast; the ruler went to a 10px tick pitch in neutral ink with no continuous hairline; figure captions moved to serif body; the sheet goes full bleed below 768px; and the breadcrumb moved out of the masthead into its own rail above the sheet as a new minimal `Breadcrumb` component that Task 11 will compose.
- Gate finding on the wordmark was a misread, verified rather than assumed: the computed font stack on the wordmark resolves `GeistPixelSquare` first and the browser reports that face as loaded, so it was never falling back to mono. Geist Pixel Square is a fine pixel-grid face, not the heavy bitmap of the reference, which spec §1b already permits. The stack is now written explicitly on the element so it cannot silently fall through.
- Screenshot capture note: `devIndicators` was set to false in `next.config.ts` for the capture only and reverted before the commit, so the dev badge is absent from both captures and the config is unchanged in the tree.

## Orchestrator continuation state (auto-updated; latest wins)

- As of this entry: Tasks 1-8 of the plan are DONE (spine + deck approved in vault; foundation commits 11a54df0, 77727df8, 196acef2, 69197211, e5945852, 6e33aad3). Phase 2 fidelity gate round 2 verdict PENDING from reviewer agent "fidelity-review-p2".
- Next in strict order: (1) fidelity round-2 verdict → mark Phase 2 done; (2) Task 9 cover build (agent reads plan Task 9 + deck cover block + spec §3 anatomy; import coverStats from content/proof-metrics.ts, prose numerals via proseProofClaims; carry fidelity reviewer's notes into the prompt); (3) Task 10 gates; (4) Tasks 11-14; (5) 15-16; (6) 17 (remember --with brotli), 18, 19, 20, 21.
- Standing rules for every remaining task prompt: plan Global Constraints binding (pathspec-only commits, Playwright MCP only, 2-round gate cap, no push/deploy, 5 dirty files untouched, vault deck is the only copy source, log lines public-safe). Reviewer agents by name: fidelity-review-p2, deck-review, spine-review (resumable via SendMessage).
- Deliverables still owed at end: Task 21 alignment audit (vault) + final HANDOFF refresh + morning-decisions summary message to Connor.

- Task 11 (chapter chrome): `ChapterLayout`, `SidebarTOC`, `ChapterMeta` built and exported from the manual barrel. Sidebar is sticky at xl+, `<details>` disclosure below; breadcrumb composed from the existing component as its own rail above the sheet; meta line omitted when no word count is supplied. tsc/lint/build/proof:guard green.

- **Task 9 (cover):** `/` rebuilt to the spec §3 anatomy inside `.manual-root` (masthead with the tagline lockup, checker band, proof-first drop-cap intro, seven plates, contents at `#contents`, stats, terminal FAQ, contact, colophon). All copy is the approved deck's section 1, verbatim, held in a new `content/cover.ts`; new `CoverTOC` and `TerminalFAQ` components; `FIGURES.md` created as the append-only registry (FIG_001 to FIG_007, public-safe ground truths). Every gated value on the page resolves through `renderableProofMetrics()`; the two counts resolve from the rendered public projection through `lib/word-counts.ts`. Voice scan clean on `/` with no baseline entries; lint, build, and proof:guard green; captures taken at 1440 and 390.
- **Floor change:** `PROOF_RENDERER_FLOOR` lowered from 5 to 4. Justification: Task 9 deleted the ledger component that was the fifth renderer, and the rewritten cover still resolves every gated value through `renderableProofMetrics()`, so coverage is unchanged in substance.
- **Deletions:** the hero component, its WebGL directory and the ASCII video variant, the marquee, the impact ledger, the custom cursor (and its layout mount), and the old homepage copy module. `ogl` removed from `package.json` and the lockfile pruned. Greps were clean before each delete.
- **One claims-module edit:** the regulated-scope row gained a public-safe bare-numeral render so the count can sit beside its own noun in a stat row and in a sentence. The approval's context requirement still travels with it, as screen-reader text in the table and as the surrounding sentence in prose. No value changed.
- **Deviation:** one new figure primitive (`IsoChain`) was added alongside the Task 6 set, because five of the seven cover plates are sequences rather than stacks and inlining the same geometry five times would have been worse. Same stroke, fills, and label voice as the rest.
- **Left for Task 17:** the JSON-LD description string still carries the legacy metadata copy, including a magnitude claim. Deck section 12.4 replaces it there. Page metadata on `/` already uses the deck's numeral-free strings.
