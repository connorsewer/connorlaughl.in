# Spec: connorlaughl.in as a reference manual (Making Software redesign) — v3

- **Date:** 2026-08-05 (v3. v1 scored 5/10 + 5/10 by two adversarial reviewers; v2 scored 7/10 "go with amendments" by a verification reviewer; v3 applies those amendments)
- **Status:** Approved direction by Connor. Execution authorized overnight, local-only.
- **Supersedes:** the dark editorial system in DESIGN.md / GOAL.md / MIDJOURNEY_PROMPTS.md (docs rewritten in Phase 6).
- **Companion artifacts:** reference screenshots in `docs/superpowers/reference/` (Phase 0 output), overnight log at `docs/superpowers/2026-08-05-overnight-log.md`.

## 0. Decisions (locked by Connor)

1. **Fidelity:** full replication of makingsoftware.com's look and feel, expressed as the *adopted-structures checklist* in §1a plus the *permitted divergences* in §1b. "1:1" means a reader recognizes the same visual system; it does not mean copied code or assets (see §8 IP guardrails).
2. **IA:** manual metaphor all the way down — cover with TOC, chapters, stats, FAQ.
3. **Content:** site rewrite from a canonical story spine saved to the vault; resume/CL changes ship later as an audit deliverable.
4. **Assets:** figures are hand-built SVG in code; Higgsfield only for the photographic layer.
5. **Execution:** in-place rebuild on branch `redesign/manual` (already created; spec committed as `26e5be6e`).
6. **Ship gate:** no push, PR, merge, or deploy without Connor's explicit go. Overnight work is local commits only.

Reviewer findings that argued against decision 1 (recognition/derivative risk) were surfaced to Connor before the decision and he chose 1:1 anyway; the mitigations in §8 (IP guardrails, colophon credit) are mandatory, the decision itself is not reopened.

## 1. Reference (verify during Phase 0 capture)

Patterns observed live on 2026-08-05 (cover + `/chapters/touch-screens`). Phase 0 captures dated screenshots (cover full-scroll, chapter full-scroll, both at desktop 1440 and mobile 390) to `docs/superpowers/reference/` and re-verifies this catalog against them; the catalog as corrected then becomes the fidelity checklist.

### 1a. Adopted structures (the fidelity checklist)

- Off-white paper ground, faint graph-grid texture; content sheets in white.
- Single blueprint-blue working ink for labels/diagrams/links/rules; near-black body text; pastel fills (light blue, lavender, teal) inside figures only.
- Pixel/bitmap display face for wordmark + section headers (we use **Geist Pixel**, already licensed and wired).
- Serif body: justified, hyphenated, drop cap on chapter/section openers only (one per page); serif chapter titles, large, sentence case, trailing period; centered serif deks.
- Mono uppercase for: labels, breadcrumbs, figure captions, leader-line callouts, stats, buttons.
- Exploded/isometric SVG line diagrams with mono leader labels, dashed construction lines, rotated side captions (`FIG_00N`, `[ SUBJECT ]`).
- Dithered checker divider bands (pure CSS, see §2).
- Cover TOC: numbered mono section headers, serif chapter links with trailing periods, mono per-chapter word counts.
- Stats block: mono label/value table (see §3 for which rows; the source's `PROGRESS ⋅ WORDS` toggle is adopted only if we have two honest modes — otherwise single mode).
- FAQ rendered as terminal-style `IN:`/`OUT:` exchange (visual chrome only; the words are human, see §4).
- Chapter chrome: left sidebar TOC (numbered mono headers, serif links, blue active state), white sheet, mono breadcrumb with prev/next chevrons, `N WORDS | CONNOR LAUGHLIN` meta on chapters (not on resume), right-edge ruler with numeric scroll progress.
- Bordered mono CTA button; a secondary text CTA line may accompany it.

### 1b. Permitted divergences (fidelity reviews may not flag these)

- Fonts: Geist Pixel ≠ the source's custom bitmap face; body serif is **Newsreader** (OFL, self-host + subset), GT Sectra Fine demoted to display-size use only (titles, deks, drop caps — never body text; its hairlines break at body sizes). Geist Mono for mono roles.
- No `© year` marks on figures (fabricated patina — banned).
- No version-stamp heading (`V1.0`) on the TOC.
- No progress bar or completion ratio with an invented denominator; stats rows must have real external referents (§3).
- TOC entries may carry a one-line serif outcome/dek in addition to word counts.
- Tagline/author-line wording must NOT mirror the source's constructions ("A reference manual for…", "Written and illustrated by…"). Written fresh from the spine in Connor's voice.
- Dark mode exists (cyanotype negative, §2) — the source has none.
- Cover leads with proof, not curiosity hooks: intro ≤150 words before the reader can see proof/TOC (the source's reader-contract — selling a book to browsers — does not transfer to a hiring exec with 30 seconds).

## 2. Visual system

### Tokens and migration strategy

Current code is dark-first with inverted usage (`body { background: var(--ink); color: var(--paper) }`, 230 `text-paper` / 36 `bg-ink` uses). Do NOT change the meaning of existing tokens mid-flight. Instead:

- Phase 2 introduces a NEW token set, additive: `--ground: #F7F7F5`, `--sheet: #FFFFFF`, `--body-ink: #171715`, `--blueprint: #2E47F1`, `--fig-blue: #D8E0FA`, `--fig-lavender: #DCD6F7`, `--fig-teal: #CBEDE4`, plus utilities (`bg-ground`, `text-body-ink`, `text-blueprint`, `border-blueprint`, …). Values tuned against reference screenshots during Phase 2.
- Converted routes use only new tokens. Legacy tokens/utilities stay untouched until the last consumer is converted, then are deleted in Phase 6 (gate: `grep -r "text-paper\|bg-ink\|border-rule\|text-accent" app components lib` empty first — Tailwind v4 fails *silently* when a theme variable disappears).
- **Theme architecture (Phase 2, not 6):** current CSS is dark-on-`:root` + `html.light` overrides, `ThemeProvider` is `attribute="class" defaultTheme="dark" enableSystem` — so a stored `theme=dark` or a dark-OS `system` visitor would render converted light pages on a black legacy body. Phase 2 therefore: (i) inverts the CSS — light values move to `:root`, dark under `html.dark` (all 13 `html.light` blocks restructured); (ii) sets `ThemeProvider forcedTheme="light"` and hides `ThemeToggle` for the duration of the transition (restored in Phase 6 with the cyanotype theme); (iii) updates `viewport.themeColor`. `enableSystem` returns in Phase 6.
- **Dark mode = cyanotype negative** (Phase 6): ground flips to blue-black (`#0B1020` family), body text to off-white, and blueprint gets a dedicated lightened token `--blueprint-bright` with measured contrast ≥ 4.5:1 for text/links (raw `#2E47F1` on `#0B1020` is ~3.1:1 — fails AA; never reuse it for dark text).
- Graph-grid texture: CSS repeating-linear-gradients, ~8px minor grid, very low opacity, `--ground` surfaces only.
- Dither/checker band: a pure-CSS primitive (repeating-conic-gradient checker in blueprint-on-ground), built in Phase 2. The existing raster divider plates and `.dither-frame` walnut CSS retire (do not reuse).
- Known bug to fix in Phase 2: `globals.css` references `var(--font-geist-pixel-grid)` which is never registered (only `--font-geist-pixel-square` is) — silently falls back to mono.

### Type roles

- **Geist Pixel** — wordmark, TOC section headers, stat labels (uppercase).
- **GT Sectra Fine** — display only: chapter titles, deks, drop-cap glyphs.
- **Newsreader** (add in Phase 2: OFL license, download TTFs from Google Fonts, pin static instances — 400/500/600 + italics — with fonttools `instancer` before subsetting; `scripts/subset-fonts.py` must be parameterized first, its `SRC` is hard-coded to the GT Sectra directory). Fallback chain if acquisition fails: try `npm`-packaged `@fontsource` files (also network-dependent — the only true offline path is the system stack); else ship `Georgia, 'Times New Roman', serif` and log a TODO — body work proceeds regardless. `proxy.ts` CSP already allows self-hosted fonts.
- **Geist Mono** — labels, breadcrumbs, captions, stats, buttons, FAQ chrome.
- Geist Sans retires from body duty (retained for form controls in the planner tool if needed).
- Justified body: `hyphens: auto`, applied at measures ≥ 60ch only; narrower breakpoints go ragged-right. voiceDNA's short-paragraph rule (1–3 sentences) holds — the source's paragraphs are short too.

### Component disposition table

| Component | Fate |
|---|---|
| `HeroSignature`, `WebGLHero`, `HeroAsciiVideo` | delete (Phase 3); remove `ogl` dep (sole consumer) |
| `CustomCursor` | delete (Phase 2) |
| `ImpactLedger` | replaced by cover stats block (data source `proof-metrics.ts` survives) |
| `CaseStudyArchive` | replaced by TOC section rendering on `/case-studies` |
| `SectionDivider` | re-skinned → CSS checker band |
| `FigureMarquee` | delete unless cover design earns it back in blueprint style |
| `SplitText`, `Magnetic` | delete with their consumers (Phase 3–5); `lib/motion.ts` stays additive until last consumer gone |
| `HireSignal` | keep concept, re-skin as mono status label |
| `NowFeed` | keep, re-skin (data module `content/now-feed.ts` kept) |
| `ReadingPathJump` | delete (TOC replaces it) |
| `ThemeToggle` | hidden in Phase 2 (forcedTheme), restored in Phase 6 with cyanotype |
| `PrintButton` | keep on `/resume`, re-skin |
| `components/webgl/` (directory) | delete with `WebGLHero` |
| `content/homepage-copy.ts` | replaced by new cover content module |
| `content/visual-asset-inventory.md`, `content/work-page-layout.md` | mark historical (top-of-file note), do not delete |
| `content/blog-drafts/`, `content/case-studies/stubs/` | untouched (drafts; excluded from word counts) |
| `FigureReveal`, `RedactionReveal`, `DitheredImage`, `ResponsiveImage` | replaced by figure primitives + plain `next/image` for the few remaining photos |
| `CaseStudyTOC` | evolves into the chapter sidebar TOC (scroll-spy logic reused) |
| `PulseOnChange`, planner tool internals | keep, re-theme (tool function must survive) |
| `CountUp`, `TerminalGrid` | keep only if the stats block uses them; else delete |
| `Header`/`Footer` | rebuilt as manual masthead / colophon footer |
| `JsonLd` | keep, update contents |
| Edge components (`components/edge/*`) | re-skinned in Phase 5 (chrome swap, structure kept) |
| `public/case-studies/*.webp` (24), `public/dividers/*.webp` (5), hero assets | orphaned by redesign; NOT deleted overnight — listed in the log for Connor's cleanup call |

## 3. Information architecture

### Route map (complete; no other routes exist after Phase 5)

| Route | Treatment |
|---|---|
| `/` | Cover (see anatomy below) |
| `/case-studies` | Kept as a route; renders Section 1 TOC in manual chrome (no redirect; sitemap/nav links keep working) |
| `/case-studies/[slug]` | Chapters with full chapter chrome (11 existing slugs; none added or removed) |
| `/case-studies/strategy-memo` | Chapter, Section 1 |
| `/edge` | **Single page** (no `/edge/[slug]`): Section 2 rendered as one scroll document with in-page chapter chrome — sidebar scroll-spy TOC over its acts/skills, one meta line, one ruler. Must stand alone for direct links |
| `/resume` | **Section 4, not appendix.** Chrome-light standalone: manual styling, NO whole-site sidebar TOC, no word-count meta; scannable in 30 seconds; direct-link entry is the primary case |
| `/about` | Appendix chapter (portrait plate lives here + cover colophon) |
| `/longform/[slug]` | Section 3 chapters |
| `/tools/revops-capacity-planner` | Appendix chapter; tool interactivity preserved |
| `/proof` | Existing redirect → `/case-studies` (kept; still valid) |
| `not-found.tsx` | NEW: manual-styled 404 ("page not in this manual"), Phase 5 |
| `/sitemap.xml`, `/robots.txt` | Kept; sitemap gains `/edge` + `/case-studies/strategy-memo` in Phase 2 |
| OG image routes | See §7 Phase 6a |

### Cover anatomy (top to bottom)

1. Masthead: Geist Pixel wordmark `CONNOR LAUGHLIN` top-left in blueprint; right-aligned serif tagline + role line (fresh wording from spine; not the source's constructions).
2. Dither band.
3. Proof-first opening: ≤150-word drop-cap intro interleaved with the first figures; TOC reachable within ~1.5 viewports.
4. Cover figures: 6–8 total (FIG_001–FIG_00N), each grounded in a real system (§5).
5. Table of Contents: sections below, word counts computed at build time, one-line outcome dek per chapter.
6. Stats block: mono table, real referents only. Candidate rows (final call in Phase 1a, all Green-tier or standing-approved): years operating, revenue systems shipped (count), chapters published (count, no denominator), longform words published (computed from rendered content). Any non-computed row must be added to `content/proof-metrics.ts` in Phase 1a so it resolves through the gate; rows that can't be are dropped. NO progress bar, NO estimated totals, NO invented denominators.
7. FAQ: 4–8 real questions sourced from actual recruiter/hiring screens in the vault (story bank, application packets). `IN:/OUT:` visual chrome; answers in Connor's human voice; the question list itself is claim-gated.
8. Contact CTA: bordered mono button (primary: email) + secondary text line; exact copy from Phase 1a.
9. Colophon footer: **named credit — "Design language after Dan Hollick's Making Software"** (linked) + type/stack colophon. Mandatory, Phase 6 exit requirement.

### TOC sections

1. **REVENUE SYSTEMS** — case studies (11 existing, mapped to vault proof clusters).
2. **THE OPERATOR** — `/edge` acts as chapters (in-page anchors).
3. **WRITING** — longform.
4. **RESUME** — its own top-level section, one entry.
5. **APPENDIX** — about, capacity planner, colophon.

### Word counts

- Built by NEW `scripts/word-counts.mjs` (Phase 2): counts words from the same source that renders (markdown bodies via `lib/markdown`, typed content modules' rendered-text fields). Pages authored as bespoke TSX (resume, about, tool) get NO word-count meta. Counts must reflect only published text — never draft/stripped/conditionally-hidden passages (leak vector).
- Chapter meta line `N WORDS | CONNOR LAUGHLIN` on case-study and longform chapters only.

## 4. Content pipeline

### Sources (vault, read-only except the two deliverables)

As v1 (§4 list preserved): `candidate-profile-master-v3.md`, `Public-Safety Claim Subset - 2026-05-12.md`, `Proof Library.md`, `Career Story Bank and Armory Proof Blocks.md`, `Source-Mined Resume Bullet Bank - 2026-05-12.md`, `AI-Native Build Evidence - 2026-08-04.md`, `Portfolio Narrative Message Map - 2026-05-05.md`, `Portfolio Website Career Alignment Spec v2 - 2026-05-13.md`, `Career Experience Source Map.md`.
Approval state — the authoritative standing-approval set is exactly: `Portfolio Claims Register - 2026-05-11.md`, `Portfolio Proof Publishing Approval Queue - CJLA-74 - 2026-05-12.md`, `Career Builder Permanent Claim Approvals - 2026-05-12.md`, `Career/Standing Authorizations - 2026-08-05.md`, `Career/Approval Decisions - 2026-08-04.md`. Nothing else grants approval.

### Deliverables

1. **Story spine** → vault `Resume & Positioning/Portfolio Story Spine - 2026-08-05.md` (positioning, chronology, cleared proof points with tier annotations, canonical phrasing, page-by-page message map).
2. **Copy deck** → vault `Resume & Positioning/Portfolio Copy Deck - 2026-08-05.md`. **In the vault, not the repo** — the repo-wide proof:guard scan would fail on any gated token the deck mentions even as an exclusion note.
3. **Resume/CL alignment audit** → vault `Resume & Positioning/Portfolio-Resume Alignment Audit - 2026-08-05.md` (fast-follow, not applied in this build).

### Rules

- Green-tier claims only, or Amber with a standing approval from the named set. When in doubt, leave it out.
- **No *claim numeral* may appear in a figure, leader label, stat row, caption, FAQ answer, or OG image unless it resolves from `content/proof-metrics.ts`** (which carries posture metadata). A claim numeral is anything asserting a business outcome, magnitude, or performance ($X, N%, pipeline counts, headcounts). Exempt: structural numbering (`FIG_00N`, step ordinals, section numbers) and build-computed word/chapter counts, which must derive from the rendered public projection via `scripts/word-counts.mjs`. Claims live in pictures now, not just prose — the gate follows them.
- **Repo-side docs are scanned too:** `FIGURES.md` and the overnight log are repo markdown and pass through proof:guard's repo-wide token scan. They must use only public-safe names — describe gated ground truths generically ("intent-data vendor", "the held metric") and never quote a gated value, even to record its exclusion. Gated specifics belong in the vault deliverables only.
- voiceDNA.md governs all copy. Manual-page addendum: justified setting and drop caps are layout, not license — paragraph length and banned-phrase rules unchanged.
- Cover intro ≤150 words. No throat-clearing. Proof before narrative.
- Every copy batch passes adversarial review by a non-author agent: rendered-HTML banned-phrase scan + humanizer pass + claim-tier check against the spine.
- Discrepancies with resume variants go into the audit deliverable; the spine wins.

## 5. Figure system

- Library in `components/figures/`: primitives for iso boxes/planes, exploded stacks, leader labels (mono, uppercase, horizontal), dashed construction lines, pastel fills, grid planes, rotated side captions.
- **Ground-truth rule:** every figure depicts a real, named artifact or system, and every labeled part is a real component of it (e.g., the actual stages of the Zoho lifecycle build; the actual signal sources in the attribution system). A figure that can't name its ground truth is cut. Decorative isometrics are the AI-slop failure mode — banned.
- Numbering `FIG_001…` in new append-only `FIGURES.md` (id, title, page, ground-truth artifact, description). Old Midjourney registry marked historical. Never renumber.
- Caption grammar: `FIG_00N` + `[ SUBJECT ]`. No `© year`.
- **Accessibility:** every figure has `role="img"` + `<title>`/`<desc>`, and a visible caption that states the figure's claim in words. Machine-readability matters: recruiters paste URLs into LLMs; screen-reader users get the full claim.
- Minimums: cover 6–8 figures; each case-study chapter ≥1 figure, with "text-only chapter" an acceptable fallback where no honest figure exists; other pages as earned.
- **Higgsfield lane (only):** portrait plate re-treated as halftone/dither; optional cover motion later. Never line diagrams, never text-bearing figures.

## 6. Motion

As v1, plus: the new primitive catalog in `lib/motion.ts` is **additive** — existing exports remain until their last consumer is converted (build breaks otherwise). New: SVG stroke draw-on (viewport enter), sheet-reveal, live ruler progress, stat-fill, subtle wordmark pixel reveal. `prefers-reduced-motion`: complete figures, no draw-on, lenis bypass, static progress. WCAG 2.1 AA: blueprint-on-ground contrast verified at used sizes (§2 dark-mode token rule), 2px focus outlines, skip link, keyboard nav.

## 7. Execution phases and gates

Conventional commits; each phase ends **buildable, committed, and logged** in `docs/superpowers/2026-08-05-overnight-log.md` (running status + decisions + orphaned-asset list). If time runs out mid-phase: finish the current atomic step, commit, write status. **Minimum viable overnight state: Phases 0–4** (foundation + cover + chapter chrome + case studies). There are NO existing automated tests (package.json: dev/build/start/lint/proof:guard only); the verification commands below are the harness.

- **Phase 0 — Reconcile + reference capture.**
  (a) Record live git state (`git status -sb`, `git log`) in the log — do not trust HANDOFF's stale "ahead 1/behind 5"; observed today: ahead 1/behind 8 with **5** dirty files (`HANDOFF.md`, `app/edge/opengraph-image.tsx`, `app/edge/page.tsx`, `components/edge/EdgeMobileChip.tsx`, `content/case-studies/one-tsi-revenue-infrastructure.md`).
  (b) **Back up Connor's dirty work:** `git diff > docs/superpowers/pre-redesign-dirty.patch`, commit the patch file. The redesign may later rewrite those files; the patch preserves his versions. `HANDOFF.md` is protected until Phase 6 (which rewrites it; patch retains the old).
  (c) Capture reference screenshots (cover + chapter, 1440w and 390w, full scroll) into `docs/superpowers/reference/` and **add that directory to `.gitignore`** — they are third-party copyrighted pages and stay local-only scaffolding, never committed (repo may be pushed publicly). Correct §1a against them.
  (d) No pull/merge/rebase against origin — drift reconciliation is Connor's morning decision.
- **Phase 1a — Spine + IA lock.** Vault mining → story spine; final TOC entries + outcome deks; stats rows; FAQ question list (from real screens); tagline/CTA wording candidates. Gate: claim-tier self-audit of the spine against the approval set.
- **Phase 2 — Foundation.** New tokens/utilities + theme inversion per §2 (light on `:root`, dark under `html.dark`, `forcedTheme="light"`, toggle hidden); Newsreader acquisition per §2 (with fallback chain); type roles; graph texture; checker band; masthead/footer; figure primitives; ruler rail; `scripts/word-counts.mjs` (counts post-projection rendered text only — never stubs, drafts, or `publicUse:"hide"` fields); voice-scan script (a `.mjs`, not `.sh` — it must resolve routes from TS: scans sitemap routes ∪ explicit extras `{/edge, /case-studies/strategy-memo, /proof, one known-404 path}`); sitemap gains `/edge` and `/case-studies/strategy-memo` NOW, not Phase 6; **proof:guard rewrite to a phase-independent shape** — dynamic discovery (glob `app/**` + `components/**` for references to `proofMetrics`/gated data and assert each resolves through `renderableProofMetrics`) plus a floor assertion set from the measured post-conversion count at each phase (not a decorative literal) so file renames can neither crash it (bare `readFileSync` ENOENT today) nor silently zero its coverage; fix `--font-geist-pixel-grid` bug. Gate: `npm run lint && npm run build && npm run proof:guard` green; sample page styled (spine fragments as placeholder copy — 1b lands next) and screenshot-reviewed against reference checklist §1a.
- **Phase 1b — Copy deck.** Full page-by-page copy from spine (needs Phase 1a decisions; runs after/alongside Phase 2). Gate: adversarial copy review (claims, voice, slop) by non-author agent.
- **Phase 3 — Cover.** `/` per §3 anatomy. Gate: fidelity checklist vs reference; rendered voice scan; build green.
- **Phase 4 — Chapter chrome + case studies.** Sidebar TOC, sheet, breadcrumb, meta, ruler; 11 case-study chapters + strategy memo converted with figures per §5. Gate: fidelity + voice + proof:guard + word counts correct.
- **Phase 5 — Remaining routes.** `/edge` (in-page chrome; its chapter sections need `id=` anchors added — `EdgeChapters` has none today, and the sidebar scroll-spy reuses `CaseStudyTOC` logic which assumes anchors), `/resume` (chrome-light standalone), `/about`, `/longform/[slug]` (no index route exists or is added), `/tools`, `/case-studies` index, 404 page. Gate: same as 4 + resume 30-second scan test (all key facts above the fold at 1440×900).
- **Phase 6a — Metadata surface** (runs BEFORE the final QA checklist): `app/opengraph-image.tsx`, `app/case-studies/[slug]/opengraph-image.tsx`, `app/edge/opengraph-image.tsx` re-cut with real fonts loaded as ArrayBuffers (GT Sectra + Geist Pixel/Mono); static `public/og/*`; `app/icon.png`/`apple-icon.png`/`favicon.ico` re-cut to blueprint system; `JsonLd` contents; robots unchanged. Gate: **literal-string review of every OG surface for claim tier and voice** (the curl scan can't see rasterized text).
- **Phase 6 — Hardening (last).** A11y sweep (keyboard, focus, contrast incl. dark tokens, reduced motion, SVG titles/descs); cyanotype dark mode + `ThemeToggle`/`enableSystem` restored; legacy token/utility deletion (grep gate first, per §2); repo docs rewritten (CLAUDE.md, DESIGN.md, FIGURES.md; MIDJOURNEY_PROMPTS.md marked historical; HANDOFF.md refreshed). The **final QA checklist runs after everything above, including 6a**, with prod-mode CSP check (`npm run build && npm run start`, smoke + voice scan against :3000).

### Final QA checklist (Phase 6 exit)

- lint, build, proof:guard green; prod-mode smoke of every route in the §3 map; CSP clean.
- `scripts/voice-scan.mjs` empty on all routes (dev AND prod runs).
- Reduced-motion + keyboard pass on cover, one chapter, resume.
- Contrast: blueprint-on-ground AND dark cyanotype tokens at used sizes.
- TOC word counts match rendered content; no gated numeral outside `proof-metrics.ts` resolution; colophon credit present.
- No em-dashes in body copy; banned-phrase scan empty.

### Delegation

Opus: page/component implementation, adversarial reviews. Sonnet: recon, mechanical conversion, scripts, voice scans. Orchestrator: spec ownership, sequencing, git, final review. Max 2 concurrent agents (8GB machine), prefer sequential; long builds via background shell tasks, not agents.

## 8. Guardrails

- **No push, PR, merge, or deploy without Connor's explicit instruction.**
- **IP guardrails (mandatory):** never copy, trace, or transcribe the source site's CSS, DOM structure, SVG paths, or assets; reimplement from screenshots and this spec only. No use or imitation of the source's custom typeface beyond the already-licensed Geist Pixel. No verbatim or near-verbatim phrasings from the source. Colophon credit required (§3).
- Vault read-only except the three named deliverables.
- Claim gating (§4) always wins; numerals rule applies to figures/stats/OG, not just prose.
- The 5 dirty files are Connor's: patch backup before any redesign commit; rewrites of those files are allowed only where this spec requires them and must be noted in the log.
- Accessibility and reduced motion are hard requirements.

## 9. Risks (accepted, watched)

- Recognition risk of the 1:1 direction — accepted by Connor with credit + IP mitigations.
- Justified serif + drop caps at narrow widths — ragged fallback below 60ch.
- First case-study figure sets the quality bar — budget review cycles there, then template.
- Overnight scope is large; the phase order front-loads the highest-value surface (cover + case studies). Partial completion leaves a buildable branch and an honest log.
