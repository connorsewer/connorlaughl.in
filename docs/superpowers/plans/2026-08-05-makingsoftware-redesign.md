# Making Software Manual Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild connorlaughl.in as a 1:1 Making Software-style reference manual (visual system + manual IA) with all copy rewritten from a vault-derived story spine, executed overnight on branch `redesign/manual`, local-only.

**Architecture:** Additive token/type foundation first (light `:root`, dark under `html.dark`, `forcedTheme="light"` during transition), then cover, then chapter chrome, then route-by-route conversion, then metadata + hardening. Content flows one way: vault → story spine → copy deck → pages. Claims flow only through `content/proof-metrics.ts`.

**Tech Stack:** Next.js 16.1 (Turbopack), React 19.2, Tailwind v4 (`@theme inline`), next-themes, motion, lenis, Geist (Sans/Mono/Pixel), GT Sectra Fine (display only), Newsreader (body, to acquire).

**Spec (authoritative):** `docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md` (v3.1, `6ee4c1b7`). Every implementer reads §1a/§1b (fidelity checklist + permitted divergences), §4 (claim rules), §8 (guardrails) before starting. Reference screenshots: `docs/superpowers/reference/{cover,chapter}-{1440,390}.png` (local-only).

## Global Constraints

- **No push, PR, merge, or deploy. Local commits on `redesign/manual` only.**
- **IP guardrails:** never copy/trace/transcribe the source site's CSS, DOM, SVG paths, or assets; reimplement from the reference screenshots and spec only. No verbatim or near-verbatim source phrasings.
- **Claim gating:** no *claim numeral* (business outcome/magnitude/performance) anywhere — prose, figure, label, stat, FAQ, OG — unless it resolves from `content/proof-metrics.ts`. Structural numbering (`FIG_00N`, ordinals) and build-computed word counts exempt. Repo markdown (FIGURES.md, overnight log, this plan) must never contain gated values or private vendor/system names.
- **Voice:** voiceDNA.md is law. No em-dashes in body copy (only inside `[Fig. N]`-style labels). No banned words (leverage, robust, delve, harness, elevate, …). No "Not X. It's Y." Sentence-case headings. Short paragraphs (1–3 sentences).
- **A11y:** WCAG 2.1 AA. `prefers-reduced-motion` fallback for every animation. Focus: 2px `--blueprint` outline + offset. Figures: `role="img"` + `<title>`/`<desc>` + visible caption stating the claim in words.
- **Dirty files are Connor's** (`HANDOFF.md`, `app/edge/opengraph-image.tsx`, `app/edge/page.tsx`, `components/edge/EdgeMobileChip.tsx`, `content/case-studies/one-tsi-revenue-infrastructure.md`; backup patch committed as `docs/superpowers/pre-redesign-dirty.patch`). Rewrite only where the spec requires; note every such rewrite in the overnight log.
- **Every task ends buildable and committed** (conventional commits, `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`). Verification: `npm run lint && npm run build && npm run proof:guard` (dev server checks where stated).
- **Machine:** 8GB RAM. Max 2 concurrent agents; builds/dev servers as background shell tasks; kill dev servers when done.
- Vault path prefix `VAULT` = `/Users/connorlaughlin/Documents/CJL Vault/04 Domains/Career`. Vault is read-only except the three named deliverables.
- Log every decision + orphaned asset in `docs/superpowers/2026-08-05-overnight-log.md` (public-safe wording only).

---

### Task 1: Story spine (Phase 1a)

**Files:**
- Create: `VAULT/Resume & Positioning/Portfolio Story Spine - 2026-08-05.md`
- Read (exhaustive list, nothing else): `VAULT/Resume & Positioning/candidate-profile-master-v3.md`, `Public-Safety Claim Subset - 2026-05-12.md`, `Proof Library.md`, `Career Story Bank and Armory Proof Blocks.md`, `Source-Mined Resume Bullet Bank - 2026-05-12.md`, `AI-Native Build Evidence - 2026-08-04.md`, `Portfolio Narrative Message Map - 2026-05-05.md`, `Portfolio Website Career Alignment Spec v2 - Aggressive Proof-Led - 2026-05-13.md`, `VAULT/Career Experience Source Map.md`, and the five approval docs named in spec §4.

**Interfaces:**
- Produces: the spine document with these exact sections, consumed by Tasks 2, 8, 21:
  1. `## Positioning` — one paragraph per lane (RevOps/GTM Systems; VP Marketing/Acting CMO; GTM Engineer), plus the single cross-lane positioning sentence the site leads with.
  2. `## Chronology` — role-by-role timeline with public-safe titles/dates.
  3. `## Cleared proof points` — table: claim | exact approved phrasing | tier (Green/Amber+approval ref) | source doc | where used on site.
  4. `## Canonical phrasing` — recurring claims written once, reused verbatim everywhere.
  5. `## Page message map` — for each route in spec §3: job of the page, must-say points, must-not-say points.
  6. `## Stats block decision` — final rows per spec §3.6 with tier refs; rows needing `proof-metrics.ts` additions flagged for Task 5.
  7. `## FAQ decision` — 4–8 real questions traced to actual screens/packets (cite which packet), with approved answers.
  8. `## Tagline + CTA` — 3 tagline candidates (none mirroring source constructions) with a picked winner, CTA button + secondary line copy.

- [ ] **Step 1:** Read the approval docs first, then the content sources. Build the cleared-proof-points table strictly from claims that are Green or Amber-with-standing-approval. Record the approval reference per row.
- [ ] **Step 2:** Write all eight sections. Every claim row must quote its source doc verbatim where phrasing is approved phrasing.
- [ ] **Step 3:** Self-audit pass: re-read `Public-Safety Claim Subset` top to bottom; delete or downgrade any spine row not defensible from it. Record the audit result at the bottom of the spine.
- [ ] **Step 4:** No repo commit (vault file). Add one public-safe line to the overnight log: spine written, N proof points cleared, stats rows chosen, FAQ count.

### Task 2: Adversarial spine review (Phase 1a gate)

**Files:** none created; reviewer reads the spine + the approval docs + `voiceDNA.md`.

- [ ] **Step 1:** Fresh non-author agent reviews the spine: (a) every proof row traceable to an approval doc; (b) no gated value marked usable; (c) tagline/FAQ don't mirror the source site's constructions; (d) page message map covers every route in spec §3; (e) voice rules.
- [ ] **Step 2:** Author agent (or orchestrator) applies fixes in the vault file. Loop until reviewer reports zero BLOCKER/MAJOR findings.
- [ ] **Step 3:** Log gate result (public-safe).

### Task 3: Tokens + theme inversion (Phase 2)

**Files:**
- Modify: `app/globals.css` (restructure `:root`/`html.light` → light-on-`:root`/`html.dark`; add new tokens + utilities), `components/ThemeProvider.tsx` (`forcedTheme="light"`), `components/ThemeToggle.tsx` (hide: return `null` with a `// restored in Phase 6` note), `app/layout.tsx` (`viewport.themeColor`).

**Interfaces:**
- Produces (Tailwind utilities every later task uses): `bg-ground`, `bg-sheet`, `text-body-ink`, `text-blueprint`, `bg-blueprint`, `border-blueprint`, `border-grid-line`, plus CSS vars `--ground:#F7F7F5`, `--sheet:#FFFFFF`, `--body-ink:#171715`, `--blueprint:#2E47F1`, `--blueprint-bright` (dark-mode text-safe, set in Task 18), `--fig-blue:#D8E0FA`, `--fig-lavender:#DCD6F7`, `--fig-teal:#CBEDE4`, `--grid-line: color-mix(in srgb, var(--blueprint) 7%, transparent)`.
- Legacy tokens (`--ink`, `--paper`, `--accent`, `--rule`, …) keep TODAY'S dark values on `:root` untouched-in-meaning: move the current `:root` dark block under `html.dark` AND keep a duplicate on `:root` *for legacy tokens only* so unconverted pages still render dark-styled while converted pages use the new light tokens. (Forced light theme means `html.dark` never applies during transition; unconverted pages keep their current look via the duplicated legacy values.)

- [ ] **Step 1:** In `app/globals.css` `@theme inline`, add the new tokens/utilities above. Do not touch legacy definitions or the 13 `html.light` blocks yet (they're inert under forced light; deleted in Task 19).
- [ ] **Step 2:** `components/ThemeProvider.tsx`: add `forcedTheme="light"`, keep other props (note: with forced theme, `defaultTheme`/`enableSystem` are inert; leave them for Task 18 to restore). `ThemeToggle.tsx`: return `null`.
- [ ] **Step 3:** `app/layout.tsx`: set both `viewport.themeColor` entries to `#F7F7F5` for now.
- [ ] **Step 4:** Fix the pixel-font bug: `globals.css` references `var(--font-geist-pixel-grid)` (line ~384) — change to `var(--font-geist-pixel-square)`.
- [ ] **Step 5:** Verify: `npm run lint && npm run build`. Start dev in background, curl `/` and `/resume`, confirm 200s and current dark look intact (legacy values on `:root`).
- [ ] **Step 6:** Commit `feat(theme): light-first token foundation, forced light transition mode`.

### Task 4: Newsreader body font (Phase 2)

**Files:**
- Create: `public/fonts/newsreader/` (woff2 output), `lib/fonts.ts` entry or extend the existing font setup in `app/layout.tsx`.
- Modify: `scripts/subset-fonts.py` (parameterize `SRC`), `app/globals.css` (`--font-serif-body` token + `@font-face` if self-hosted files are used directly).

- [ ] **Step 1:** Acquire Newsreader TTFs (Google Fonts download via curl of the official repo release, or `npm i @fontsource-variable/newsreader` and take the files). If network fails: set `--font-serif-body: Georgia, 'Times New Roman', serif`, log TODO, skip to Step 4.
- [ ] **Step 2:** Pin static instances with fonttools (`uv run --with fonttools fonttools varLib.instancer ...`) at wght 400/500/600, roman + italic, then subset via the parameterized `subset-fonts.py` (latin + punctuation + arrows).
- [ ] **Step 3:** Wire `@font-face` (font-display: swap) + `--font-serif-body` and a `.font-serif-body` utility via `@theme inline`.
- [ ] **Step 4:** Type roles in `globals.css`: `.manual-body` class = serif body, justified with `hyphens:auto` at `min-width` where measure ≥60ch, ragged below; drop-cap utility `.manual-dropcap::first-letter` (Sectra Fine, ~3.2 lines, `initial-letter` with float fallback).
- [ ] **Step 5:** Verify: build green; dev-render a test paragraph on any page temporarily is NOT needed — Task 7's sample page covers visual check. Commit `feat(type): Newsreader body serif + manual type roles`.

### Task 5: Guard + measurement scripts (Phase 2)

**Files:**
- Modify: `scripts/check-public-proof-metrics.mjs`
- Create: `scripts/word-counts.mjs`, `scripts/voice-scan.mjs`
- Modify: `app/sitemap.ts` (add `/edge`, `/case-studies/strategy-memo`), `content/proof-metrics.ts` (add stats rows flagged by Task 1, with posture metadata matching existing entries' shape)
- Modify: `package.json` (scripts: `"words": "node scripts/word-counts.mjs"`, `"voice:scan": "node scripts/voice-scan.mjs"`)

**Interfaces:**
- Produces: `wordCounts()` export from `scripts/word-counts.mjs` — `node scripts/word-counts.mjs --json` prints `{ "case-studies/<slug>": n, "longform/<slug>": n, edgeTotal: n, longformTotalWords: n }`, computed ONLY from the public rendered projection (markdown bodies via the same source `lib/markdown.tsx` consumes; typed content modules' rendered-text fields; excludes `content/case-studies/stubs/`, `content/blog-drafts/`, any `publicUse:"hide"` field). Consumed by TOC (Task 9) and chapter meta (Task 11) via a small `lib/word-counts.ts` that imports the same counting function at build time.
- `voice-scan.mjs`: takes `--base http://localhost:3000`, reads routes from `app/sitemap.ts` route list ∪ `['/edge','/case-studies/strategy-memo','/proof','/this-page-does-not-exist']`, strips tags, greps the banned-phrase set from CLAUDE.md §voice + `—` outside `[Fig` context; exits nonzero with findings.
- proof:guard new shape: keeps existing `forbiddenPrivateTokens` + repo-wide scan exactly as-is; replaces the hard-coded `rendererFiles` with dynamic discovery — glob `app/**/*.{ts,tsx}` + `components/**/*.{ts,tsx}` for files matching `/proofMetrics|heroProofStrip|impactLedger|statsBlock/`, assert each imports/calls `renderableProofMetrics`, wrap reads in try/catch (missing file = clean failure with message, not ENOENT throw), assert floor: count of files calling `renderableProofMetrics` ≥ the count recorded in a `PROOF_RENDERER_FLOOR` const (set now to the measured current value; Tasks 9/11/17 bump it as they add renderers).

- [ ] **Step 1:** Rewrite proof:guard per interface. Run `npm run proof:guard` — must pass against the *current* codebase (floor = measured now).
- [ ] **Step 2:** Write `word-counts.mjs` + `lib/word-counts.ts`. Run `--json`; sanity-check one known count manually (pick the shortest longform, count words in its markdown body ±5%).
- [ ] **Step 3:** Write `voice-scan.mjs`. Start dev server in background; run scan; expect zero findings on current site (baseline is claimed clean); if findings exist on current copy, log them (pre-existing) and exclude those exact matches from failure until the page is converted.
- [ ] **Step 4:** Update `app/sitemap.ts` + `content/proof-metrics.ts` (stats rows from Task 1 with same posture shape as existing entries; tier refs in comments).
- [ ] **Step 5:** `npm run lint && npm run build && npm run proof:guard` green. Commit `feat(scripts): phase-independent proof guard, word counts, voice scan`.

### Task 6: Global chrome + figure primitives (Phase 2)

**Files:**
- Create: `components/manual/Masthead.tsx`, `components/manual/ColophonFooter.tsx`, `components/manual/CheckerBand.tsx`, `components/manual/RulerRail.tsx`, `components/manual/Sheet.tsx`, `components/manual/StatTable.tsx`, `components/figures/Figure.tsx`, `components/figures/LeaderLabel.tsx`, `components/figures/IsoBox.tsx`, `components/figures/ExplodedStack.tsx`, `components/figures/GridPlane.tsx`, `lib/motion-manual.ts`
- Modify: `app/globals.css` (graph-grid texture on `.bg-ground-grid`, checker band keyframes), `lib/motion.ts` (untouched exports; add nothing here — new primitives live in `lib/motion-manual.ts` to keep legacy additive)

**Interfaces (consumed by every page task):**
- `<Masthead wordmark title?>`: pixel wordmark `CONNOR LAUGHLIN` top-left (blueprint), right slot for serif tagline; nav renders as mono uppercase links (Contents, Resume, Contact → `/#contents`, `/resume`, `mailto` from existing contact source).
- `<Sheet>{children}</Sheet>`: white content card (`bg-sheet`, 1px `border-grid-line`, subtle shadow) on `bg-ground-grid`.
- `<CheckerBand />`: full-width CSS checker divider (repeating-conic-gradient, blueprint at low alpha on ground), height ~14px.
- `<RulerRail progress>`: fixed right-edge tick ruler with mono numeric scroll readout; hidden < lg; `aria-hidden`; reduced-motion → static ticks, no live number.
- `<StatTable rows={{label, value, srText}[]}>`: mono table; values must arrive via `renderableProofMetrics()` or the word-count lib (enforced by proof:guard discovery — component references `proofMetrics`).
- `<Figure num title groundTruth caption children>`: renders rotated side caption `FIG_00N` + `[ TITLE ]`, `role="img"`, `<title>/<desc>` from props, visible caption below stating the claim in words. Registers nothing at runtime; FIGURES.md is the registry.
- `<LeaderLabel x y dx dy text>`: mono uppercase label + leader line with arrowhead; `<IsoBox w h d fill>`: isometric box path helper; `<ExplodedStack layers gap>`: vertically exploded iso layers with dashed connectors; `<GridPlane>`: iso grid plane. All SVG, stroke `--blueprint`, 1.25px stroke, fills from `--fig-*` only.
- `lib/motion-manual.ts`: `drawOn(ref)` (SVG stroke-dash draw on viewport enter), `sheetReveal`, `statFill`, each with reduced-motion no-op guard reusing the existing `prefersReducedMotion` helper pattern from `lib/motion.ts`.

- [ ] **Step 1:** Build CSS pieces (`.bg-ground-grid` graph texture per spec §2, checker band). Verify visually via a scratch route later (Task 7); build must stay green now.
- [ ] **Step 2:** Build the six manual components with the exact props above. JSDoc each with its reference-screenshot crop (e.g., "see cover-1440.png masthead").
- [ ] **Step 3:** Build the five figure primitives + `lib/motion-manual.ts`. Reduced-motion: render final state.
- [ ] **Step 4:** `npm run lint && npm run build` green (components exist, unused yet — export via `components/manual/index.ts`).
- [ ] **Step 5:** Commit `feat(manual): global chrome + SVG figure primitives`.

### Task 7: Sample page + fidelity gate (Phase 2 exit)

**Files:**
- Create: `app/dev-sample/page.tsx` (temporary, deleted in Task 19; excluded from sitemap; `robots` noindex via metadata)

- [ ] **Step 1:** Compose a sample chapter-shaped page using every Task 6 primitive, spine-fragment placeholder copy (public-safe), one `ExplodedStack` demo figure with real ground truth (the portfolio site's own stack: Next/React/Tailwind layers — safe, true, and self-referential).
- [ ] **Step 2:** Screenshot at 1440 and 390 with Playwright against dev server.
- [ ] **Step 3:** Fresh reviewer agent compares against `docs/superpowers/reference/*.png` using spec §1a as checklist, §1b as permitted divergences. Loop fixes until reviewer passes all checklist items reachable at this stage (ground, sheet, type roles, mono labels, checker, ruler, figure grammar).
- [ ] **Step 4:** `npm run lint && npm run build && npm run proof:guard` green. Commit `feat(manual): sample page, phase 2 fidelity pass`.

### Task 8: Copy deck + adversarial copy review (Phase 1b)

**Files:**
- Create: `VAULT/Resume & Positioning/Portfolio Copy Deck - 2026-08-05.md`

**Interfaces:**
- Produces: per-route copy blocks (every route in spec §3), each with: final copy, word count, claims used (tier refs), figures referenced (`FIG_00N` + ground truth). Cover intro ≤150 words. Chapter deks one sentence. FAQ questions + answers from spine §7. Consumed verbatim by Tasks 9, 12, 15 — page builders copy from the deck, never write fresh prose.

- [ ] **Step 1:** Write the deck from the spine only (author agent reads spine + spec §3 anatomy + voiceDNA).
- [ ] **Step 2:** Adversarial review by non-author agent: voice rules, claim tiers, economy (flag any sentence that survives deletion without loss), source-construction mirroring, em-dash scan. Loop to zero BLOCKER/MAJOR.
- [ ] **Step 3:** Log (public-safe): deck complete, per-page word counts.

### Task 9: Cover page (Phase 3)

**Files:**
- Create: `content/cover.ts` (typed cover content from the deck: tagline, intro paragraphs, TOC structure, FAQ entries, CTA strings), `components/manual/CoverTOC.tsx`, `components/manual/TerminalFAQ.tsx`, `components/figures/fig-001-*.tsx` … (cover figures)
- Modify: `app/page.tsx` (full rewrite), `FIGURES.md` (create; register cover figures), `scripts/check-public-proof-metrics.mjs` (`PROOF_RENDERER_FLOOR` bump if stats block adds a renderer)
- Delete: `components/HeroSignature.tsx`, `components/webgl/` (dir), `components/HeroAsciiVideo.tsx`, `components/FigureMarquee.tsx`, `components/ImpactLedger.tsx`, `components/CustomCursor.tsx` (+ its layout.tsx mount), `content/homepage-copy.ts`; remove `ogl` from `package.json`
- Deletions happen ONLY after `app/page.tsx` no longer imports them; grep first: `grep -rn "HeroSignature\|WebGLHero\|FigureMarquee\|ImpactLedger\|CustomCursor\|homepage-copy" app components lib`

**Interfaces:**
- `<CoverTOC sections>`: sections per spec §3 (5 sections), entries `{num, title, href, dek, words?}` — words from `lib/word-counts.ts`; TSX-authored pages get no count.
- `<TerminalFAQ entries>`: `IN:`/`OUT:` mono chrome, `<details>`-based disclosure (keyboard-native), entries from `content/cover.ts`.
- Cover figures: 6–8 components, each ground-truthed per FIGURES.md registration; candidates (final set from deck): the revenue-systems architecture exploded stack, signal-flow schematic, CRM lifecycle iso plumbing, attribution decision tree, the site's own stack, career timeline as machined part. Names/labels public-safe.

- [ ] **Step 1:** Write `content/cover.ts` from the deck verbatim. Build `CoverTOC`, `TerminalFAQ`.
- [ ] **Step 2:** Build cover figures (Figure + primitives). Register each in `FIGURES.md` (public-safe ground-truth wording).
- [ ] **Step 3:** Rewrite `app/page.tsx` per spec §3 cover anatomy order (masthead → checker → intro w/ drop cap → figures → TOC (`id="contents"`) → stats → FAQ → CTA → colophon footer w/ credit line).
- [ ] **Step 4:** Grep-check then delete retired components + `ogl`; `npm i` to prune lockfile.
- [ ] **Step 5:** Verify: lint/build/proof:guard green; dev screenshot 1440+390.
- [ ] **Step 6:** Commit `feat(cover): manual cover page, retire hero/webgl/ledger`.

### Task 10: Cover gates (Phase 3 exit)

- [ ] **Step 1:** Fidelity review (fresh agent, §1a checklist vs `cover-*.png` references + Task 9 screenshots). Loop to pass.
- [ ] **Step 2:** `voice-scan.mjs` against dev server: zero findings on `/`. Claim check: every numeral on the cover traced (reviewer lists each numeral + its source).
- [ ] **Step 3:** Reduced-motion spot check (`emulateMedia` in Playwright): figures render complete, no draw-on.
- [ ] **Step 4:** Log + commit any fixes `fix(cover): phase 3 gate fixes`.

### Task 11: Chapter chrome (Phase 4)

**Files:**
- Create: `components/manual/ChapterLayout.tsx`, `components/manual/SidebarTOC.tsx`, `components/manual/Breadcrumb.tsx`, `components/manual/ChapterMeta.tsx`
- Modify: `components/CaseStudyTOC.tsx` (scroll-spy logic extracted/reused into SidebarTOC)

**Interfaces:**
- `<ChapterLayout section chapter prev next words?>`: composes Masthead (compact), SidebarTOC (left, xl+; collapses to top disclosure below), Sheet (main), Breadcrumb (`SECTION / CHAPTER` + prev/next chevron links), ChapterMeta (`N WORDS | CONNOR LAUGHLIN`, omitted when `words` undefined), RulerRail. Consumed by Tasks 12, 15.
- `<SidebarTOC sections activeHref>`: full-site TOC (same data as CoverTOC), numbered mono headers, serif links, blueprint active state, scroll-spy for in-page anchors when `anchors` prop given.

- [ ] **Step 1:** Build the four components; wire keyboard nav (breadcrumb links focusable, sidebar links in tab order, skip link lands on sheet).
- [ ] **Step 2:** Lint/build green. Commit `feat(manual): chapter chrome`.

### Task 12: Case-study chapters (Phase 4)

**Files:**
- Modify: `app/case-studies/[slug]/page.tsx` (wrap in ChapterLayout, restyle body via `lib/markdown.tsx` class updates), `lib/markdown.tsx` (map elements to manual classes: `.manual-body`, mono tables, blueprint rules; keep 68ch cap inside Sheet), `app/case-studies/strategy-memo/page.tsx` (same chrome), `content/case-studies.ts` (only if dek/outcome lines need adding from deck — copy verbatim; claims untouched)
- Note: `content/case-studies/one-tsi-revenue-infrastructure.md` is a dirty file — if the deck rewrites its copy, log it (patch backup exists).

- [ ] **Step 1:** Convert `[slug]` route to ChapterLayout with prev/next from the case-study order in `content/case-studies.ts`; words from `lib/word-counts.ts`.
- [ ] **Step 2:** Restyle `lib/markdown.tsx` output for the manual system (body serif justified, mono table headers, blueprint links, figure-caption styling).
- [ ] **Step 3:** Apply deck copy where the deck changes chapter intros/deks.
- [ ] **Step 4:** Verify all 11 slugs + strategy-memo render (curl loop over slugs from content module); lint/build/proof:guard green.
- [ ] **Step 5:** Commit `feat(chapters): case studies in manual chrome`.

### Task 13: Case-study figures (Phase 4)

**Files:**
- Create: `components/figures/fig-0XX-*.tsx` per chapter (≥1 per case study where an honest figure exists; text-only fallback allowed, log which)
- Modify: chapter rendering to place figures (markdown extension: `[fig:NNN]` token handled by `lib/markdown.tsx` → renders registered figure component), `FIGURES.md`

- [ ] **Step 1:** For each of the 11 case studies: derive the figure from the chapter's actual system (ground-truth rule; public-safe labels). Build; register in FIGURES.md.
- [ ] **Step 2:** First figure gets a dedicated review round (quality bar), then remaining follow its template.
- [ ] **Step 3:** Lint/build/proof:guard; commit `feat(figures): case-study figures FIG_0XX-0YY`.

### Task 14: Phase 4 gates

- [ ] **Step 1:** Fidelity review vs `chapter-*.png` on 2 representative chapters (1440+390).
- [ ] **Step 2:** voice-scan all case-study routes; claim-trace review of every figure label/numeral; word counts in meta match `word-counts.mjs` output.
- [ ] **Step 3:** Keyboard + reduced-motion spot check on one chapter. Fix loop; commit `fix(chapters): phase 4 gate fixes`.

### Task 15: Remaining routes (Phase 5)

**Files:**
- Modify: `app/edge/page.tsx` (dirty file — log rewrite; in-page chapter chrome: SidebarTOC with `anchors`, single ChapterMeta, ruler; add `id=` anchors to `components/edge/EdgeChapters.tsx` sections), `app/resume/page.tsx` (chrome-light per spec: Masthead + Sheet, NO sidebar, no word meta, PrintButton kept re-skinned), `app/about/page.tsx` (chapter chrome; portrait plate: existing photo re-treated later by Task 20 — placeholder is current photo in plain `next/image` with blueprint border), `app/longform/[slug]/page.tsx` (ChapterLayout), `app/tools/revops-capacity-planner/page.tsx` (chapter chrome; PulseOnChange re-themed; tool function untouched), `app/case-studies/page.tsx` (renders Section 1 TOC in manual chrome)
- Create: `app/not-found.tsx` (manual-styled 404: mono `PAGE NOT IN THIS MANUAL`, link to `/#contents`)
- Modify/Delete: `components/Header.tsx` + `components/Footer.tsx` replaced by Masthead/ColophonFooter mounts (check layout.tsx), `components/edge/*` re-skinned (EdgeMobileChip is a dirty file — log if touched), `ReadingPathJump` deleted after grep, `HireSignal`/`NowFeed` re-skinned mono
- Each route conversion applies its deck copy block verbatim.

- [ ] **Step 1:** Convert routes in order: `/resume` (highest stakes) → `/edge` → `/about` → `/longform/[slug]` → `/tools` → `/case-studies` index → 404.
- [ ] **Step 2:** After each route: lint/build, curl the route, screenshot, log.
- [ ] **Step 3:** Resume 30-second test: at 1440×900 screenshot, name/title/current-state/contact/lane summary all visible without scroll (reviewer confirms).
- [ ] **Step 4:** Grep for orphaned imports of replaced components; delete confirmed-dead ones (grep first).
- [ ] **Step 5:** Commit per route (`feat(resume): …`, `feat(edge): …`, etc.).

### Task 16: Phase 5 gates

- [ ] **Step 1:** Full-route fidelity pass (fresh agent, spot 4 routes), voice-scan ALL routes (sitemap ∪ extras), claim-trace on `/resume` and `/edge` (densest claim surfaces).
- [ ] **Step 2:** Fix loop to zero BLOCKER/MAJOR; commit `fix: phase 5 gate fixes`.

### Task 17: Metadata surface (Phase 6a)

**Files:**
- Modify: `app/opengraph-image.tsx`, `app/case-studies/[slug]/opengraph-image.tsx`, `app/edge/opengraph-image.tsx` (dirty file — log): blueprint system, fonts via ArrayBuffer (GT Sectra + Geist Pixel/Mono from `public/fonts` + node_modules geist), pixel wordmark + serif title + mono meta on ground with grid texture approximation.
- Replace: `public/og/og.jpg`/`og.webp` (render via a script hitting the OG route in dev, or `satori`-consistent static export), `app/icon.png`, `app/apple-icon.png`, `favicon.ico` (blueprint pixel monogram `CL`).
- Modify: `components/JsonLd.tsx` contents (title/description per deck), `app/layout.tsx` metadata (title template, description from deck).

- [ ] **Step 1:** Rebuild the three OG routes; verify with `curl -o /tmp/og.png localhost:3000/opengraph-image` and view.
- [ ] **Step 2:** Re-cut icons (script with sharp via `npx` or write SVG → png via Playwright screenshot at exact sizes).
- [ ] **Step 3:** OG literal-string review: reviewer lists every string in all OG surfaces, checks claim tier + voice.
- [ ] **Step 4:** Lint/build/proof:guard; commit `feat(meta): manual-system OG images, icons, jsonld`.

### Task 18: Cyanotype dark mode (Phase 6)

**Files:**
- Modify: `app/globals.css` (populate `html.dark` with cyanotype values: `--ground:#0B1020`-family, `--sheet` slightly lighter, `--body-ink` off-white, `--blueprint-bright` measured ≥4.5:1 for text; figures swap stroke token), `components/ThemeProvider.tsx` (remove `forcedTheme`, `defaultTheme="light"`, `enableSystem` back), `components/ThemeToggle.tsx` (restore, re-skinned mono), `app/layout.tsx` (themeColor pair).

- [ ] **Step 1:** Implement tokens; compute contrast for `--blueprint-bright` on `--ground` dark (document the ratio in a CSS comment).
- [ ] **Step 2:** Screenshot cover + one chapter in dark (Playwright `colorScheme:'dark'` + toggle); reviewer pass on legibility.
- [ ] **Step 3:** Commit `feat(theme): cyanotype dark mode, toggle restored`.

### Task 19: Legacy deletion + docs rewrite (Phase 6)

**Files:**
- Delete: `app/dev-sample/`, legacy tokens/utilities in `globals.css` (`--ink`,`--paper`,`--accent`,`--rule`, `html.light` blocks, walnut/gilt frame CSS, marquee/redaction/etc. keyframes), dead components confirmed by grep, orphaned `lib/motion.ts` exports (keep file, prune dead exports).
- Modify: `CLAUDE.md` (rewrite Design Context + quickrefs for the manual system), `DESIGN.md` (rewrite), `MIDJOURNEY_PROMPTS.md` (top note: historical), `HANDOFF.md` (dirty file, patch backed up — full refresh describing new state + morning decisions for Connor), `README.md` if it describes the old design.

- [ ] **Step 1:** Gate FIRST: `grep -rn "text-paper\|bg-ink\|border-rule\|text-accent\|dither-frame\|gilt-frame" app components lib` → must be empty (fix stragglers before deleting definitions).
- [ ] **Step 2:** Delete legacy CSS + dead files; `npm run build` green.
- [ ] **Step 3:** Rewrite docs (public-safe; DESIGN.md documents tokens/type/figure system/motion catalog as built).
- [ ] **Step 4:** Commit `chore: remove legacy design system` + `docs: rewrite design docs for manual system`.

### Task 20: Final QA + portrait plate (Phase 6 exit)

- [ ] **Step 1:** Portrait plate: if Higgsfield MCP reachable, generate halftone/dither treatment of the existing about-page portrait (style-locked: blueprint/ground duotone); place on `/about` + cover colophon. If unreachable overnight, keep plain-image placeholder, log TODO.
- [ ] **Step 2:** Run the spec's full Final QA checklist: lint, build, proof:guard; `npm run build && npm run start` prod smoke of every §3 route (curl status + spot HTML); CSP headers present (curl -I); voice-scan (prod); reduced-motion + keyboard on cover/chapter/resume (Playwright); contrast checks (light + dark tokens); TOC word counts match; colophon credit present; no em-dash in rendered body copy.
- [ ] **Step 3:** Full-site screenshot set (all routes, 1440+390, light+dark) saved to scratchpad for Connor's morning review.
- [ ] **Step 4:** Fix loop; final commit `chore: final QA pass`.

### Task 21: Alignment audit + morning handoff

**Files:**
- Create: `VAULT/Resume & Positioning/Portfolio-Resume Alignment Audit - 2026-08-05.md` (spine vs the two NO SEND resume variants + CL operating system: per-file recommended edits, discrepancies found during copy work, NOT applied)
- Modify: `docs/superpowers/2026-08-05-overnight-log.md` (final status: phases done, decisions, orphaned assets, TODOs, morning decision list: origin drift, deploy go/no-go, Higgsfield portrait if pending)

- [ ] **Step 1:** Write the audit from spine + discrepancy notes accumulated in Tasks 8/12/15.
- [ ] **Step 2:** Finalize the log; ensure public-safe.
- [ ] **Step 3:** Commit log update `docs: overnight log final`.

---

## Self-review notes (author)

- Spec coverage checked section-by-section: §1a/1b → Tasks 7/10/14/16 gates; §2 → 3/4/6/18/19; §3 → 9/12/15; §4 → 1/2/5/8 + claim-trace steps; §5 → 6/9/13; §6 → 6 + gate spot-checks; §7 phases → task order 1,2 / 3–7 / 8 / 9,10 / 11–14 / 15,16 / 17 / 18,19,20 / 21; §8 → Global Constraints.
- Known intentional deviation from writing-plans granularity: content-generation steps specify inputs/outputs/acceptance instead of literal copy (copy cannot be pre-written before vault mining; the deck IS the copy artifact, gated by Task 8 review).
- Type consistency: `renderableProofMetrics` (existing name, verified), `lib/word-counts.ts` consumed by Tasks 9/11; `ChapterLayout` props consumed by 12/15; token names consistent across 3/6/18/19.
