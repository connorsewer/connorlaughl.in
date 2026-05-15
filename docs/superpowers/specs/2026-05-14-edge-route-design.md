# Edge route — design spec

**Status:** approved 2026-05-14
**Owner:** Connor J. Laughlin
**Route:** `/edge`
**Source content:** `Executive Soft Skills Compendium - GTM Engineer - 2026-05-13.md` (CJL Vault, not in repo)
**Worktree:** `claude/friendly-banzai-bdc80d`

## 1. Purpose

A canonical, top-level positioning route that publishes Connor's eleven-skill operating-edge taxonomy as a single editorial essay. Reframes traditional executive soft skills as AI-native operating advantages around the umbrella thesis **taste applied at velocity**.

The page should feel like a designed magazine feature, not a list of traits. Reading-decision time targets: 35 seconds for the hero alone to land the thesis; 4–5 minutes for the full chaptered read.

Two reader profiles:

1. Hiring decision-makers (CEOs, founders, board members, executive recruiters) scanning for a VP Marketing / CMO / Head of GTM hire at AI-forward, high-growth companies.
2. Existing professional network landing from a share. They want recent thinking.

## 2. Information architecture

Top-level route. Header nav drops `Contact` and adds `Edge`, keeping the nav at five items: `About · Case studies · Resume · Tools · Edge`. The hire-signal CTA block at the bottom of every page already carries Contact; the nav link was redundant.

Reachable from:
- Header nav (label `Edge`)
- Homepage echo section (between Signature systems and About teaser) with deep-links to chapter anchors
- Resume sidebar block (`/resume`), single quiet link to `/edge`

## 3. Page architecture and reading flow

Top to bottom, single column at narrow viewports, 12-col grid at lg+:

1. **Eyebrow** — mono caption, `[FIG. 12] · EDGE · 2026`. Fig number 12 is the next available across the site; claim in `MIDJOURNEY_PROMPTS.md`.
2. **Hero block** — H1 in GT Sectra weight-ladder (`**Taste** *applied at* **velocity**`, Black + Light Italic + Black). Lede paragraph: the *portfolio version* paragraph from the compendium, GT Sectra 24–28px, 68ch cap. Typeset thesis diagram (no Midjourney work) — three short axis labels (Executive GTM judgment / Systems fluency / AI-native operating leverage) converging on the mono caption *judgment at speed*. Walnut frame, fig-captioned.
3. **Stake block** — single mono line, full-width: *"Generation is cheap. The bottleneck is recognition."* GT Sectra Light Italic, 28–32px, two lines, sentence break for a beat. Letters split with `<SplitText>` at 30ms stagger.
4. **Eleven numbered chapters** — see §4.
5. **Closing block** — the one-line moat from the compendium, GT Sectra 32–40px, 50ch cap, centered, between two walnut rules. Fig-captioned `[Fig. 40.12] · ONE-LINE MOAT`.
6. **Hire-signal carry** — site-standard hire-signal block, no customization.
7. **Footer** — site default.

The sticky chapter index lives in the right rail of the chapters block only — fades in at chapter 01 and out at the closing block.

## 4. The chapter unit

Each of the eleven skills renders as one continuous editorial chapter with six components.

### 4.1 Components per chapter

1. **Chapter plate** — giant number `01` in GT Sectra Fine Black at ~180–220px, hung in columns 1–2 of the 12-col grid. Skill name in GT Sectra Medium at ~32–40px on the same baseline. Number plate carries a dithered drop-shadow plate (inline SVG dither, 4px offset down-right, `--dither-shadow` color) — *not* a CSS box-shadow. The chapter masthead.
2. **Lead paragraph** — working definition + why-it-matters woven into one passage. GT Sectra 20–22px, 68ch cap. Real prose, no labeled-bullet pattern.
3. **Connor-specific read** — second paragraph, 2–3 sentences, lands the claim.
4. **Proof block** — walnut hairline above (animates 0→100% width on chapter enter, once, 600ms), mono `PROOF` label, typeset list of 3–5 anchors. Each anchor rendered through the posture model (§5.2). Anchors with `caseStudySlug` are quiet underline-on-hover links.
5. **Language aside** — fig-captioned sidebar card, mono labels + GT Sectra body at ~14px, narrow column (40–50ch). Three rows: Resume language / Recruiter language / Interview prompt. Slightly tinted paper background (4–6% delta from `--ink`), 1px walnut hairline border. Reads as paratext. Fig-captioned `[Fig. 40.NN]` where NN is the chapter number.
6. **Not footer** — single mono line, dim, prefixed `NOT:` carrying the avoid-reducing-to phrases as `·`-separated. Walnut hairline below closes the chapter.

The compendium's *portfolio angle* field is **not rendered**. It drives `caseStudySlug` metadata on the proof anchors.

### 4.2 Three-act structure

Eleven chapters grouped into three acts, each opened by an `<ActDivider>` plate (extension of existing `<SectionDivider>`):

- **Act I — How I move** (01–03): Taste applied at velocity · Specification clarity · Decision quality under uncertainty
- **Act II — How I make ambiguity legible** (04–07): Narrative construction · Epistemic humility with conviction · Cross-functional frame fluency · Trust calibration
- **Act III — How I build operating leverage** (08–11): Delegation to non-humans · Governance without drag · Signal detection / instrumentation skepticism · Operator empathy and adoption design

Each divider: full-bleed, dither pattern, act number (I/II/III) in GT Sectra Fine Black at 96–120px, act title in GT Sectra Medium, one-line subtitle in mono. Parallax at 0.85× scroll (reduced-motion: no parallax).

## 5. Content model

### 5.1 Types

`content/soft-skills.ts` mirrors `content/proof-metrics.ts` and reuses its `ClaimPosture` and `PublicUse` types.

```ts
import type { ClaimPosture, PublicUse } from "./proof-metrics";

export type ActSlug = "move" | "make-sense" | "build-leverage";

export type ProofAnchor = {
  internalName: string;        // never rendered unless publicUse === "show"
  categoricalPhrase: string;   // public-safe default render
  posture: ClaimPosture;
  publicUse: PublicUse;
  caseStudySlug?: string;      // optional deep-link
  longformSlug?: string;       // optional /longform/<slug> link
  claimId?: string;
  sourceNote?: string;         // internal-only, never rendered
};

export type SoftSkillLanguage = {
  resume: string;
  recruiter: string;
  interview: string;
};

export type SoftSkill = {
  number: string;              // "01" .. "11"
  slug: string;                // url anchor
  name: string;                // chapter plate title
  act: ActSlug;
  definition: string;          // prose, not "Definition: X"
  whyNow: string;              // continues the lead paragraph
  connorRead: string;
  proof: ProofAnchor[];
  language: SoftSkillLanguage;
  not: string[];
};

export const ACTS: Record<ActSlug, { number: string; title: string; subtitle: string }>;
export const softSkills: SoftSkill[];

export const HERO_THESIS = {
  display: string;             // "Taste applied at velocity."
  portfolio: string;           // lede paragraph
  stake: string;               // stake-block line
  moat: string;                // closing pull-quote
};
```

### 5.2 Posture-driven render

Single render function for proof anchors:

```ts
function renderProofAnchor(a: ProofAnchor): { text: string; href?: string } | null {
  if (a.publicUse === "hide") return null;
  const text = a.publicUse === "show" ? a.internalName : a.categoricalPhrase;
  const href = a.caseStudySlug
    ? `/case-studies/${a.caseStudySlug}`
    : a.longformSlug
    ? `/longform/${a.longformSlug}`
    : undefined;
  return { text, href };
}
```

Defaults across the 11 skills:
- Anchors already public via `proof-metrics.ts` (`22-agent`, `35+ KPI`, `7 acquisitions`) → `publicUse: "show"` mirroring existing posture.
- Anchors with live case studies on the site (Ghost Pipeline Detector, Platform Narrative) → `publicUse: "show"` with the matching `caseStudySlug` or `longformSlug` for deep-link.
- Internal-only anchors (Governed RFP/RFX AI Answer Library, Leadership + Team Development Operating System, JobOS / Hermes, Public-Safety Claim Subset, Career claim governance, Zoho-specific internals) → `publicUse: "soften"`, render the categorical phrase only.
- Anchors marked `do-not-use-as-personal-achievement` → `publicUse: "hide"`.

### 5.3 Source provenance

The compendium markdown stays in the CJL Vault, not in the repo. `content/soft-skills.ts` is the public-facing transformation, with a head comment pointing to the vault path so future edits don't drift.

## 6. Sticky chapter index

### 6.1 Desktop (lg+)

Right-rail editorial chapter index, not floating chrome. Numbered list:
- Mono number, `text-[11px] tracking-[0.2em] uppercase`.
- GT Sectra 13–14px title.
- Inline act dividers (`─── ACT II ───`) at smaller mono size.

Active state:
- Current chapter: full `text-paper`, size up to `text-[15px]`, left walnut tick glyph `▌`.
- Prior chapters: `opacity-40`.
- Upcoming chapters: `opacity-65`.
- Swap transitions over 240ms ease-out (reduced-motion: instant).

Scroll spy: `IntersectionObserver` per chapter, `rootMargin: "-40% 0px -55% 0px"`. Flip on commitment, not enter.

Click: smooth-scroll (lenis) and update URL hash (`/edge#01-taste-applied-at-velocity`).

Hover: full opacity + `<Magnetic>` pull on the active row only.

Reading-progress hair-rule: 1px walnut-toned vertical bar to the right of the rail, height bound to scroll progress between hero bottom and closing block top. Disappears at closing block.

### 6.2 Mobile (<lg)

Replace rail with a **chapter chip** in the page sub-header band (sticky beneath the site header):
- `01/11 · Taste applied at velocity` — number updates live, title truncates with ellipsis.
- Tap expands a full-screen sheet listing all 11 with same dim/active treatment, larger tap targets.
- Sheet uses `role="dialog"`, escape closes, focus trapped while open.

## 7. Off-route echoes

### 7.1 Homepage echo

Lives between the Signature systems section and the About teaser on `/`. Single full-bleed band, paper background, 1px walnut hairlines top and bottom. Inside the same 12-col grid.

Content:
- Eyebrow: `[FIG. 12] · EDGE` + reading time marker (e.g. `+1,400 words`).
- H2: `Taste applied at velocity.`
- Body: the portfolio-version paragraph from the compendium (voice-cleaned).
- Four numbered teaser lines (each deep-linked to `/edge#<slug>`):
  - `01  Taste applied at velocity`
  - `03  Decision quality under uncertainty`
  - `07  Trust calibration`
  - `11  Operator empathy and adoption design`
- CTA: `Read the edge →` linking to `/edge`.

No card, no border, no icon. Editorial band.

### 7.2 Resume sidebar

Right-rail block on `/resume`, position determined during build to match resume's existing rail structure. Walnut hairline above, no border:

```
HOW I WORK

The soft-skill edge a resume can't carry:
taste applied at velocity, specification clarity,
trust calibration, and the operating leverage that
comes from delegating real work to AI agents.

Operating edge →
```

Single quiet link to `/edge`. Block stays short.

### 7.3 Header nav

`components/Header.tsx` NAV array becomes:
```ts
{ href: "/about", label: "About" },
{ href: "/case-studies", label: "Case studies", matchPrefix: true },
{ href: "/resume", label: "Resume" },
{ href: "/tools/revops-capacity-planner", label: "Tools", matchPrefix: true },
{ href: "/edge", label: "Edge" },
```
`Contact` link removed. The hire-signal CTA block at the bottom of every page is the canonical Contact surface.

## 8. Voice guardrails

Standard site rules apply (`voiceDNA.md`, `CLAUDE.md`):
- No em-dashes in body copy (allowed only inside fig captions and the page title wordmark).
- No banned phrases. The compendium itself uses some banned words (`pivotal`, `delve`, `tapestry`, `harness`, `fast-paced`); each must be reworded during port.
- Sentence case for every heading.
- No "Bold-term: definition" bullets. The compendium uses them in source structure; those field labels are TypeScript keys, never headings.
- No negative parallelism in any form.

After each chapter is ported, the route-copy scan from CLAUDE.md runs against `/edge` rendered HTML. Zero banned phrases required before commit.

## 9. Motion guardrails

All motion has a `prefers-reduced-motion: reduce` path.

| Motion | Default | Reduced |
| --- | --- | --- |
| Hero thesis diagram | SVG strokes animate 1.4s | Final state instant |
| Hero H1 weight-ladder | `<SplitText>` per-word fade | Solid text on mount |
| Stake block | Word-by-word reveal 30ms stagger | Solid text |
| Chapter plate entry | 8px rise + fade (`<FigureReveal>`) | Fade only |
| Proof hairline | Width 0→100% on enter | Drawn full-width |
| Sticky TOC active swap | Opacity + size 240ms | Instant |
| Act divider plate | Parallax 0.85× | No parallax |
| Closing pull-quote | `<FigureReveal>` | Fade only |

Easing: `cubic-bezier(0.4, 0, 0.2, 1)` throughout. Range 240–600ms. No spring, no bounce, no chained sequences.

## 10. Accessibility (WCAG 2.1 AA floor)

- `<nav aria-label="Edge chapters">` around the sticky TOC. Active row carries `aria-current="location"`.
- Each chapter is `<section id="<NN>-<slug>">` with `<h2>` carrying the skill name. The number plate is `aria-hidden="true"`.
- Mobile chip: `<button aria-expanded>` controlling a `role="dialog"` sheet with focus trap and escape close.
- Focus rings: 2px accent outline + 2px offset (site standard).
- Skip-to-content link already exists.
- Color contrast on GT Sectra body sizes verified during audit; expected AA+ but flagged.
- Hero thesis diagram includes textual `<desc>` for screen readers.
- Language aside contents are keyboard-reachable; nothing hidden behind hover-only.

## 11. Luxury craft pass — twelve specific moves

1. Hero thesis diagram draws line-by-line (SVG stroke-dasharray, 1.4s ease).
2. Chapter plate dithered drop-shadow (inline SVG dither, not CSS box-shadow).
3. Sticky TOC film-reel active-state (dim/current/upcoming with `▌` tick).
4. Reading-progress walnut hairline glued to right viewport edge.
5. Act divider plate parallax at 0.85× scroll.
6. Stake block letter reveal via `<SplitText>` at 30ms stagger.
7. Hero H1 weight-ladder mixing GT Sectra Black + Light Italic + Black.
8. Language aside as paratext with subtle hover treatment.
9. Proof hairline draws from left edge on chapter entry, once, 600ms.
10. Closing pull-quote between two walnut rules, fig-captioned.
11. Per-chapter `data-cursor` labels (Read · Read Chapter 0N · Open · Quote · Talk).
12. Magnetic restraint — only hero CTA, active sticky-TOC row, hire-signal CTA.

## 12. Cursor bug (parallel deliverable)

Standalone atomic commit before or alongside the Edge work.

Root cause: `components/CustomCursor.tsx:123` uses `mix-blend-difference` with the cursor drawn in `border-paper/80` (and label `text-paper/85`). Since `--paper` and `--ink` swap values when `html.light` is on, the difference math returns a near-cream output against the cream paper in light mode. Effectively invisible.

Fix: change the cursor color to a fixed `border-white/80` (and label `text-white/85`). With `mix-blend-difference`, a white foreground returns the exact inverse of the background pixel — visible by definition on any underlying color, in any theme.

Files touched:
- `components/CustomCursor.tsx` — two token swaps.

Verification: visit `/`, `/about`, `/resume`, `/case-studies`, `/edge` in both modes. Cursor crosshair and label both visible in both modes against both paper and ink surfaces.

## 13. Fig-number registry

`MIDJOURNEY_PROMPTS.md` claims Fig. 40 for `/edge` with sub-numbering:
- `[Fig. 40]` — hero thesis diagram
- `[Fig. 40.01]` through `[Fig. 40.11]` — per-chapter language asides
- `[Fig. 40.12]` — closing one-line moat pull-quote

No Midjourney artwork is required for any Fig. 40 entry — they are all typographic.

## 14. Acceptance criteria

The Edge route is complete when:

- `/edge` renders all 11 chapters with the editorial register intact.
- Voice scan returns zero banned phrases on `/edge`, the homepage, and the resume.
- Public-use posture is preserved on every proof anchor flagged approval-required.
- Homepage echo block links to `/edge` with four working chapter deep-links.
- Resume sidebar block links to `/edge`.
- Header nav shows `About · Case studies · Resume · Tools · Edge`. Contact link removed.
- Reduced-motion and light mode both verified on every chapter, both echoes, and the cursor fix.
- Lint clean across the codebase.
- Build green; all routes (now 42 instead of 41) prerender.
- The cursor is visible in both light and dark mode on every existing route.
- The page reads as a designed magazine essay, not a content dump.

## 15. Out of scope

- No Midjourney artwork for `/edge`.
- No CMS work; content stays local in `content/soft-skills.ts`.
- No analytics events beyond the page-view that already fires.
- No A/B testing of homepage echo placement.
- No density toggle, no expand/collapse. Single editorial top-to-bottom read.
- No "Phrases to avoid" callout on the public route. The page itself demonstrates the discipline.
- The compendium markdown stays in the vault; we do not check it into the repo.
