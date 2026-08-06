# Spec: connorlaughl.in as a reference manual (Making Software redesign)

- **Date:** 2026-08-05
- **Status:** Approved by Connor (design conversation, 2026-08-05). Execution authorized overnight, local-only.
- **Supersedes:** the dark editorial system described in DESIGN.md / GOAL.md / MIDJOURNEY_PROMPTS.md (docs rewritten in Phase 6).

## 0. Decisions (locked)

1. **Fidelity:** full 1:1 replication of makingsoftware.com look and feel.
2. **IA:** manual metaphor all the way down — cover page with TOC, chapters, stats, FAQ.
3. **Content:** site rewrite from a new canonical story spine saved to the vault; resume/cover-letter changes ship later as an audit deliverable, not in this build.
4. **Assets:** figures are hand-built SVG in code; Higgsfield only for the photographic layer (portrait plate, optional motion).
5. **Execution:** in-place rebuild on branch `redesign/manual` in portfolio-v2.
6. **Ship gate:** no push, PR, merge, or deploy without Connor's explicit go. Everything overnight stays local.

## 1. Reference pattern catalog (observed 2026-08-05)

Source: https://www.makingsoftware.com/ (cover) and /chapters/touch-screens (interior).

**Cover page:**
- Off-white paper ground with faint graph-grid texture.
- Pixel/bitmap display wordmark, top-left, blueprint blue.
- Right-aligned serif tagline + author line ("Written and illustrated by …").
- Dithered checker divider bands between major sections.
- Justified serif body with drop caps on section openers.
- Exploded isometric technical line diagrams, blueprint blue, mono uppercase leader-line labels (`HD NOTCH →`), dashed construction lines, rotated sideways captions (`FIG_001`, `[ 3.5" FLOPPY DISK ]`, `© 1986`).
- Table of Contents: numbered mono section headers (`1. PIXELS AND COLOR`), serif chapter titles ending in periods, per-chapter word counts in mono (`3.6K WORDS`).
- Stats block: ASCII progress bar (`█████▒░░░`), mono label/value pairs (FINISHED CHAPTERS 21/32, CURRENT WORD COUNT 74.1K).
- Terminal-style FAQ: list of questions, `IN:` / `OUT:` mono exchange display.
- Primary CTA as bordered mono button (`GET EARLY ACCESS ($99)`).

**Interior (chapter) page:**
- Left sidebar TOC: numbered mono section headers, serif chapter links, active state in blue.
- Content on a white "sheet" card floating on the graph-paper ground.
- Mono uppercase breadcrumb with prev/next chevrons (`PIXELS AND COLOR / TOUCH SCREENS`).
- Meta line: `1384 WORDS | DAN HOLLICK` in mono.
- Large centered serif chapter title ending in a period + centered serif dek.
- Figures inside the sheet use soft pastel fills (light blue, lavender, teal) over blue line work.
- Right-edge ruler: tick marks + numeric scroll progress (`0.00`).
- Persistent CTA bottom of sidebar.

## 2. Visual system

### Tokens (starting values; tune against reference screenshots during Phase 2)

- `--paper: #F7F7F5` (ground), `--sheet: #FFFFFF` (content card)
- `--ink: #171715` (body text)
- `--blueprint: #2E47F1` (single working ink: links, labels, diagrams, rules, wordmark)
- Pastel figure fills: `--fig-blue: #D8E0FA`, `--fig-lavender: #DCD6F7`, `--fig-teal: #CBEDE4`, used only inside figures.
- Graph-grid texture: CSS background (repeating linear-gradients), ~8px minor grid at very low opacity, on `--paper` surfaces only.
- Dither/checker band: existing dither assets re-colored to blueprint-on-paper.
- **Dark mode = cyanotype negative** (secondary priority, Phase 6): `--paper` becomes blue-black (`#0B1020`-family), line work and text go white/light-blue, same `--blueprint` accent. Implemented via the existing `next-themes` + CSS-variable flip. Light is default.

### Type roles

- **Geist Pixel** — display: wordmark, TOC section headers, stat labels wherever the reference uses its bitmap face. Uppercase.
- **GT Sectra Fine** — body serif: justified paragraphs, drop caps (CSS `::first-letter`) on section openers, chapter titles (large, sentence case, trailing period), deks, TOC chapter links.
- **Geist Mono** — labels, breadcrumbs, figure captions, leader-line callouts, stats, buttons, FAQ exchange. Uppercase for labels/captions.
- Geist Sans retires from body duty (may remain for form controls if needed).

### Retired

Walnut `.dither-frame`/`.gilt-frame` mat frames, WebGL hero (`ogl` dependency removed if nothing else uses it), `<CustomCursor>`, photographic plates as primary imagery, dark-first cream-on-ink palette.

## 3. Information architecture

Working title on the cover: pixel wordmark `CONNOR LAUGHLIN` + serif tagline — final wording comes from the story spine (Phase 1). Candidate direction: "A field manual for revenue systems." + "Written and operated by Connor Laughlin."

### Routes (all survive; content restructured)

| Route | Becomes |
|---|---|
| `/` | Manual cover: wordmark, tagline, drop-cap narrative intro interleaved with 3–5 SVG figures, TOC with word counts, stats block, IN/OUT FAQ, contact CTA |
| `/case-studies` | Section landing folded into cover TOC; route redirects or renders the TOC section |
| `/case-studies/[slug]` | Chapters, section 1 (chapter chrome) |
| `/edge` | Section 2 landing + its chapters (keeps URL; must stand alone for direct links) |
| `/resume` | Appendix chapter; keeps URL and scannability |
| `/about` | Appendix chapter (human anchor: portrait plate lives here and on cover colophon) |
| `/longform/[slug]` | Section 3 chapters |
| `/tools/revops-capacity-planner` | Appendix chapter (tool keeps function, gets manual chrome) |
| `/case-studies/strategy-memo` | Chapter in section 1 |

### TOC sections

1. **REVENUE SYSTEMS** — case studies (sourced from vault proof clusters; existing case studies re-mapped, new ones only if the spine supports them).
2. **THE OPERATOR** — /edge soft-skills content re-cut as chapters.
3. **WRITING** — longform pieces.
4. **APPENDIX** — resume, about, capacity planner, colophon.

Word counts in the TOC are computed at build time from content files (no hand-maintained numbers).

### Stats block (cover)

Real, claim-gated values only (Green tier or standing-approved): e.g., years operating, systems shipped, site word count (computed), chapters finished. NO revenue/pipeline metrics unless Green in the Public-Safety Claim Subset. Exact rows decided in Phase 1 with the spine.

### FAQ (IN/OUT block)

5–8 questions a hiring exec actually asks (availability, role targets, how he uses AI, remote/location, what he's built). Answers written from the spine, claim-gated.

## 4. Content pipeline

### Sources (vault, read-only except deliverables)

- `…/Career/Resume & Positioning/candidate-profile-master-v3.md` (canonical profile; v1/v2 superseded)
- `…/Career/Resume & Positioning/Public-Safety Claim Subset - 2026-05-12.md` (the public gate; Green/Amber/Red)
- `…/Career/Resume & Positioning/Proof Library.md`
- `…/Career/Resume & Positioning/Career Story Bank and Armory Proof Blocks.md`
- `…/Career/Resume & Positioning/Source-Mined Resume Bullet Bank - 2026-05-12.md`
- `…/Career/Resume & Positioning/AI-Native Build Evidence - 2026-08-04.md`
- `…/Career/Resume & Positioning/Portfolio Narrative Message Map - 2026-05-05.md`
- `…/Career/Resume & Positioning/Portfolio Website Career Alignment Spec v2 - Aggressive Proof-Led - 2026-05-13.md`
- `…/Career/Career Experience Source Map.md` (cluster → case-study router)
- Approval state: `Portfolio Claims Register - 2026-05-11.md`, `Portfolio Proof Publishing Approval Queue - CJLA-74 - 2026-05-12.md`, `Career Builder Permanent Claim Approvals - 2026-05-12.md`

(`…` = `/Users/connorlaughlin/Documents/CJL Vault/04 Domains/Career`)

### Deliverables

1. **Story spine** → `…/Career/Resume & Positioning/Portfolio Story Spine - 2026-08-05.md`: positioning statement per lane, career chronology, the proof points cleared for public use (with tier annotations), canonical phrasing for recurring claims, page-by-page message map for the new IA. This is the single source every site page is written from.
2. **Full site copy deck** → `docs/superpowers/copy/2026-08-05-copy-deck.md` in the repo: every page's copy, written from the spine only, with word budgets (cover intro ≤ ~400 words; chapters sized to substance; no padding).
3. **Resume/CL alignment audit** → `…/Career/Resume & Positioning/Portfolio-Resume Alignment Audit - 2026-08-05.md`: file-specific recommended edits to the resume/CL system against the spine. Not applied in this build.

### Rules

- Every claim on the site must be Green-tier, or Amber with an existing standing approval. When in doubt, leave it out. `proof:guard` posture metadata (`content/proof-metrics.ts`) stays intact and extends to new content.
- voiceDNA.md governs: no em-dashes in body copy, no banned words, no negative parallelism, sentence-case headings, no bold-term bullets.
- Every copy batch passes an adversarial review by an agent that did not write it: banned-phrase scan on rendered HTML + humanizer/no-ai-slop pass + claim-tier check against the spine.
- Nothing on the site may contradict the resume variants; discrepancies found during writing go into the audit deliverable, and the spine wins.

## 5. Figure system

- New SVG component library under `components/figures/`: primitives for isometric boxes/planes, exploded stacks, leader-line labels (mono, uppercase, horizontal), dashed construction lines, pastel fills, grid planes, rotated side captions.
- Case-study systems become the illustrations (ghost pipeline detector → exploded funnel stack; attribution → signal-flow schematic; CRM lifecycle → isometric plumbing; RFP AI → governed pipeline diagram; etc.).
- Figure numbering restarts as `FIG_001…` in a new append-only registry `FIGURES.md` (id, title, page, description). Old Midjourney registry retires with the old skin. Numbers are stable; never renumber.
- Mono caption format follows the reference: rotated `FIG_00N` + `[ SUBJECT ]` + year mark where it earns its place.
- **Higgsfield lane (only):** portrait plate (Connor + Henry) re-treated as halftone/dither to sit in the blueprint world; optional cover motion later. Never line diagrams, never figures with embedded text.

## 6. Motion

- Keep `motion` + lenis. Remove ogl if the WebGL hero is the only consumer.
- New primitive catalog in `lib/motion.ts`: SVG stroke draw-on for figures on viewport enter; sheet-reveal for chapter cards; ruler progress (live scroll number); ASCII progress-bar fill animation; subtle pixel-type reveal on wordmark.
- `prefers-reduced-motion`: figures render complete (no draw-on), no smooth-scroll (lenis bypass stays), progress elements static. First-class, tested.
- WCAG 2.1 AA floor unchanged: contrast (blueprint blue on paper must pass for text sizes used), focus states (2px outline, blueprint), skip link, keyboard nav.

## 7. Execution phases and gates

Branch: `redesign/manual` off current local `main`. Conventional commits. Existing tests/lint run before and after each phase.

- **Phase 0 — Reconcile.** Inspect ahead-1/behind-5 vs origin/main and the 4 pre-existing dirty files (`HANDOFF.md`, `app/edge/opengraph-image.tsx`, `app/edge/page.tsx`, `components/edge/EdgeMobileChip.tsx`, `content/case-studies/one-tsi-revenue-infrastructure.md`). Report findings in the overnight log. Do not discard or commit Connor's dirty work; stash-free approach — branch carries the working tree as-is, redesign commits never `git add` those paths unless the redesign itself rewrites that file, in which case note it in the log.
- **Phase 1 — Story spine + copy deck.** Vault mining → spine → copy deck for all pages. Gate: adversarial copy review (claims, voice, slop) passes.
- **Phase 2 — Foundation.** Tokens, type roles, graph texture, dither bands, global chrome (header/footer → manual masthead), figure primitives, ruler rail. Gate: reference-fidelity screenshot review of a styled sample page; lint/build green.
- **Phase 3 — Cover.** `/` rebuilt per §3. Gate: fidelity review vs cover screenshots; voice scan of rendered HTML; build green.
- **Phase 4 — Chapter chrome + case studies.** Sidebar TOC, sheet, breadcrumb, meta, ruler; case-study chapters converted with their figures. Gate: fidelity + voice + proof:guard.
- **Phase 5 — Remaining routes.** /edge, /resume, /about, /longform, /tools converted. Gate: same as 4.
- **Phase 6 — Hardening.** A11y sweep (keyboard, focus, contrast, reduced motion), prod-mode CSP check (`npm run build && npm run start`), OG images re-cut in the new system, dark cyanotype variant, repo docs rewritten (CLAUDE.md, DESIGN.md, FIGURES.md; MIDJOURNEY_PROMPTS.md marked historical), HANDOFF.md refreshed. Gate: full QA checklist below.

### QA checklist (Phase 6 exit)

- `npm run lint`, `npm run build`, `npm run proof:guard` green.
- Voice scan (HANDOFF §6 script) empty across all routes.
- Prod-mode smoke of every route; CSP clean.
- Reduced-motion and keyboard pass on cover + one chapter + resume.
- Contrast checks for blueprint-on-paper text.
- Word counts in TOC match content.
- No banned em-dashes/phrases in rendered copy.

### Delegation

- Opus subagents: well-specified page/component implementation; adversarial reviews.
- Sonnet subagents: recon, mechanical conversions, test writing, voice scans.
- Orchestrator (this session): spec ownership, sequencing, git, final review. Light parallelism (8GB machine): max ~2 concurrent agents, prefer sequential.

## 8. Guardrails

- **No push, PR, merge, or deploy without Connor's explicit instruction.** Overnight work is local commits on `redesign/manual` only.
- Vault is read-only except the two named deliverables (spine, audit) + nothing else.
- Claim gating per §4 always wins over "it would read better with the number in."
- The 4 dirty files are Connor's; preserve as described in Phase 0.
- Accessibility and reduced motion are hard requirements, not polish.

## 9. Risks / open items

- GT Sectra justified body + drop caps needs typographic care (hyphenation, rag) to not look broken at narrow widths.
- Blueprint blue link/text contrast on paper: verify AA at body sizes; darken token if needed.
- Case-study figure design is the highest-skill work in the build; budget review cycles for the first one, then template it.
- `/tools/revops-capacity-planner` interactivity must survive re-skin (PulseOnChange etc. re-themed, not removed).
- View Transitions pairs (card title ↔ chapter H1) should be preserved if the new TOC → chapter flow supports them.
