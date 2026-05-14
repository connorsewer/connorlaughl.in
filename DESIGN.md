# DESIGN.md — connorlaughl.in

A reference manual. The site is a small museum of governed systems, set in the visual register of an old technical document, rebuilt for the web. Swiss grid, GT Sectra editorial display, retro-futurist accents, schematic-honest imagery, motion-rich. Every screen reads like a page from a 1970s reference binder that someone updated last week.

If you're an agent making changes here, this is the contract. Cross-check every commit against it.

For overall scope and sequencing, see [GOAL.md](GOAL.md). For voice rules, see [voiceDNA.md](voiceDNA.md). For image prompts, see [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).

---

## 1. Voice

Source of truth: [voiceDNA.md](voiceDNA.md). Read it before writing any user-facing copy.

### Core posture

The page is the byline. Don't sell. Don't announce. Don't reflect. Report.

A reader should be able to find a number, a verb, and a year inside the first ten words of any block. If they can't, the block is too soft.

### Sentence rhythm

- Vary length. One short, one longer, one short. Never three of the same.
- Contractions on. Period.
- Mono captions name the thing, optionally with a year and a state. `[Fig. 04, BDR Pod, 2024, shipped]`. No adjectives.
- Display copy speaks like a person who knows. Sans body explains. Mono labels file.

### Hard bans (anywhere user-facing)

| Banned | Why |
|---|---|
| Em-dash (—) in body copy | The single most notorious AI tell. Use a comma, period, colon, semicolon, or parenthesis. Em-dashes appear only inside `[Fig. N]` labels and figure caption dividers, because mono typography frames them as a symbol rather than punctuation. |
| "Actually" | Hedging. Defensive. Drop it. |
| "Operating proof" | Internal jargon. Say "the work" or just show it. |
| "Outperform" | Promotional. Use a number. |
| "Leverage", "harness", "utilize", "unlock", "unleash", "elevate", "supercharge" | All radioactive. Use plain verbs. |
| "Tapestry", "intricate", "vibrant", "robust", "meticulous", "nestled", "bustling" | Ornamental. Cut. |
| "Delve", "dive into", "unpack" | AI tells. Just describe the thing. |
| "Game-changer", "cutting-edge", "future-proof" | Banned outright. |
| "Dossier" | The site is one already. Say "file" or "brief". |
| "Architecture of trust", "rich", "deeply rooted" | Puffery. |
| "Furthermore", "additionally", "moreover" | Mechanical transitions. |
| "Not X. It's Y." / "Not just X, it's Y" | The fatal one. Negative parallelism creates fake drama. State the positive. |

### Self-check before merge

Walk the rendered HTML for each route. For each section:

1. Did this sentence inflate importance? Cut.
2. Did I use "serves as" or "stands as" where "is" works? Replace.
3. Are all my lists exactly 3 items? Break the pattern.
4. Did I summarize what I just said? Delete.
5. Did I write "not X, it's Y"? Delete the negation, state the claim.
6. Does any sentence sound like a tourism brochure? Rewrite.
7. Did I attribute a claim to nobody specific ("widely regarded")? Name or cut.
8. Are all paragraphs the same length? Vary.
9. Em-dash in body? Replace with comma, colon, period, or parenthesis.
10. Would a real person say this out loud? If not, rewrite.

---

## 2. Tokens

CSS custom properties live in [app/globals.css](app/globals.css). Never inline a hex. Reference the token.

```
--ink:           #070707     /* near-black, primary background dark */
--paper:         #F6F1E7     /* cream, primary text on dark; primary background light */
--accent:        #B7AA7A     /* warm khaki, sparingly */
--accent-light:  #7D744D     /* deeper khaki, used in light mode */
--rule:          rgba(246, 241, 231, 0.12) dark / rgba(7, 7, 7, 0.12) light
--paper-muted:   rgba(246, 241, 231, 0.72) dark / rgba(7, 7, 7, 0.70) light
--dither-shadow: rgba(0, 0, 0, 0.4)
--terminal-green:#B5C7B0                   /* status pills only, once per screen max */
--redaction:     #1A1A1A                   /* redaction bars on the dark theme */
--signal:        #C75F3D                   /* dithered red, used for redaction reveals and warnings, never as decoration */
```

Color rules:
- Two-tone is the default. Cream on ink, or ink on cream. Accent is a guest.
- Never use accent for body text.
- Never combine terminal-green and accent in the same component.
- The `--signal` ochre-red is reserved for warning states, redaction reveals, and the WebGL displacement amplitude indicator. Never decorative.
- No gradients on text. No drop shadows on text.
- Light mode keeps every contrast ratio ≥ 4.5:1 on body, ≥ 3:1 on large display.

---

## 3. Type

Four families. Each has one job. Don't cross the streams.

| Family | Role | Typical use | CSS var |
|---|---|---|---|
| GT Sectra Fine | Display, "human voice" | Page titles, hero headline, pull quotes, drop caps, section displays | `--font-display` |
| Geist Sans | Body, paragraph copy | Reading text, captions of >1 line, UI text | `--font-sans` |
| Geist Mono | "System voice" | Metadata labels, figure numbers, nav items, status, code | `--font-mono` |
| Geist Pixel (Square) | Retro-futurist accent | Status pills, ASCII overlay, hover labels, badges | `--font-pixel` |

Geist Pixel is reserved. Use it once or twice per screen, never for body or display.

### GT Sectra Fine weights

Self-hosted from [public/fonts/gt-sectra-fine/](public/fonts/gt-sectra-fine/). 5 weights plus italics, all wired via `@font-face`.

| Weight | CSS | Used for |
|---|---|---|
| 350 Book | `font-weight: 350` | Long-form prose, secondary captions in display register |
| 400 Regular | `font-weight: 400` | Section displays, subhead, paragraph display |
| 500 Medium | `font-weight: 500` | Page titles, signature-systems card titles |
| 700 Bold | `font-weight: 700` | Hero headline secondary line, pull quotes |
| 900 Black | `font-weight: 900` | Hero headline primary line, impact-ledger anchor metrics |

Italic equivalents exist for each weight. Use sparingly. One italic per screen, max.

### Hierarchy (clamp pairs)

```
hero-display      clamp(3.5rem, 10vw, 8rem)     leading 0.85   tracking -0.02em  weight 900
page-display      clamp(2.5rem, 6vw, 5rem)      leading 0.92   tracking -0.015em weight 500
section-display   clamp(1.875rem, 4vw, 3.25rem) leading 1.0    tracking -0.01em  weight 500
subsection        clamp(1.25rem, 2vw, 1.5rem)   leading 1.2    weight 400
body-large        1.125rem (18px)               leading 1.65   weight 400 (sans)
body              1rem      (16px)              leading 1.6    weight 400 (sans)
caption           0.875rem  (14px)              leading 1.5    weight 400 (sans)
mono-meta         0.625rem  (10px)              tracking 0.3em uppercase
mono-fig          0.6875rem (11px)              tracking 0.2em
pixel-pill        0.6875rem (11px)              tracking 0.15em
display-stat      clamp(3rem, 5vw, 4.5rem)      leading 0.9    weight 900 (impact-ledger anchors)
```

### Type rules

- Display copy is text-balance.
- Body copy is left-aligned, ragged right. Never justified.
- All-caps only on mono labels and pixel pills. Never on display or sans body.
- Mix weights within a single display line for emphasis (e.g. Black for the noun, Regular for the verb). The weight ladder is the system.
- A drop cap appears on the first paragraph of each long-form section. GT Sectra Fine Black, 4.5em, drops 3 lines, 0.5rem right margin.
- Body copy caps at 68ch on long-form pages.

---

## 4. Grid

12-column Swiss grid, max width `64rem` (1024px) or `80rem` (1280px) on long-form pages. Outer gutter `1.5rem` mobile, `6rem` desktop.

- Hero: 12-col split, content cols 1–6, hero plate cols 7–12.
- Selected work index: 12-col, list cols 1–4, preview cols 5–12.
- Case study body: 8-col centered prose (cols 3–10), marginalia in col 1 (mono notes) and cols 11–12 (figure callouts).
- Footer: 12-col, three balanced thirds in mono.

Baseline: every block snaps to a 0.5rem rhythm (8px). Mono captions snap to a 1rem (16px) baseline so they line up across columns.

A dev-only grid overlay activates with `?grid` in the URL. Use it before claiming alignment is right.

---

## 5. Motion

Maximum, not minimum. Motion announces, surprises, and rewards interaction. Every animation has a `prefers-reduced-motion: reduce` fallback. The reduced fallback is always instant or near-instant.

### Stack

| Layer | Library | Role |
|---|---|---|
| Smooth scroll | Lenis | Global inertia scrolling, scroll progress hooks |
| Motion primitives | Motion One (motion.dev) | `animate()`, `inView`, `useScroll`, springs |
| Text kinetics | Custom `<SplitText>` component | Word/char split for stagger reveals on display copy |
| 3D and shaders | OGL | Hero WebGL plate, case-card distortion, redaction shader |
| View transitions | CSS View Transitions API | Named pairs across route changes |

Framer Motion gets removed. GSAP is not in the stack.

### Motion primitives (declared once, used everywhere)

| Name | Where | Spec |
|---|---|---|
| `enter-up` | Default below-fold sections | 0.6s ease-out-quart, y 24→0, opacity 0→1 |
| `stagger-up` | Lists, ledger rows, card grids | 0.5s per item, 40ms stagger, ease-out-quart |
| `redact-in` | Confidential reveals | 0.9s, 1px horizontal sweep, ink→signal→paper |
| `print-stamp` | Status pills, fig labels | 0.25s, scale 1.08→1, opacity 0→1 |
| `magnetic` | CTAs, signature card titles | Cursor proximity in a 120px radius, max translate 6px |
| `marquee` | Figure-number ticker, stat rolls | Infinite horizontal, 30s loop, pauses on hover |
| `splittext-words` | Display H1/H2 on enter | 0.8s, 30ms per word, y 18→0, opacity 0→1 |
| `splittext-chars` | Hero only | 1.2s, 12ms per char, y 24→0, opacity 0→1 |
| `count-up` | Every stat across the site | 1.4s ease-out-expo, debounced when input-driven |
| `pulse-grain` | Paper texture overlay | 4s loop, opacity 0.06→0.10→0.06 |
| `walk-glyph` | Section divider rules | 1.2s on viewport-enter, glyph translates left→right across the rule |

### Scroll-driven (Lenis + Motion One useScroll)

- Hero plate parallax: subtle z-translate on scroll until past 60vh.
- Impact-ledger rows: stagger-up on enter, then sticky-pinned for one full row of scroll.
- Signature-systems grid: card-by-card reveal with shutter open transform.
- Case study TOC: scroll-spy active state.
- Section dividers: rule draws across on enter.
- Cursor magnetism: heightened inside hero, dampened in body.

### View Transitions API

- Same-document anchor jumps animate via View Transitions.
- Named pairs:
  - `hero-portrait` → `case-detail-hero` (signature-systems card → case detail)
  - `case-title` → `case-detail-title`
  - `fig-label-NN` → matching fig label on the destination page
- Reduced motion swaps named transitions to instant.

### WebGL moments

Each is lazy-loaded as a separate chunk, suspended with a static plate fallback. See §11 for guardrails.

1. Hero plate. OGL canvas. Static dithered portrait or schematic as base art, displaced by a low-frequency noise field whose amplitude is mouse-x/y. Subtle. Reduced-motion shows the static plate.
2. Signature-systems card hover. OGL canvas per card, fragment shader that distorts the dither pattern on the back of the card on hover. Edge-only effect, never the whole card.
3. Redaction reveal. Shader that pixelates the redacted text in place, then pixelates back. Replaces the current CSS-based RedactionReveal.

### Never

- Never bounce. Never elastic. Easing is out-quart, out-quint, out-expo only.
- Never animate color directly (animate opacity over a color stack instead).
- Never animate CSS layout properties (left, top, width, height) — only transform and opacity.
- Never park a WebGL canvas above the fold without a static fallback poster.
- Never spring on display copy.

---

## 6. Imagery

Three-layer image system. Order matters: schematic first, photo second, decorative texture third.

### Layer 1: hand-built SVG schematics (preferred)

Used for: signature systems, case-study hero figures, impact-ledger schematic, system diagrams, control panels, network topologies, gates and signal logic.

- Built as inline SVG, not raster. Scale infinitely. No dithering.
- Style: thin ink lines on cream paper. 1.5px stroke for primary lines, 0.75px for ornament. Mono labels under each node. Dimension marks where they help reading.
- Reference symbol library: [github.com/sjgallagher2/SchematicSymbolsSVG](https://github.com/sjgallagher2/SchematicSymbolsSVG) (MIT). Pull symbols into `public/symbols/` as named components when used.
- Each schematic carries a fig number and caption in mono, exactly like a dithered plate.
- Ghost Pipeline Detector is the bar. Every signature system gets one.

### Layer 2: Midjourney-rendered raster plates

Used for: portraits (Connor, family), atmospheric subjects (mainframe, control panel, magnetic media), artifact photography (KPI dictionary as a printed page, BDR logbook as a notebook).

- 1-bit Atkinson dithering, fine halftone, or stylistically-similar reduced-tone monochrome on cream paper. Color is allowed when it serves the work and only as a single warm spot.
- Higher contrast than the previous round. The subject must be legible at thumbnail size. If you can't tell what the artifact is, the prompt is too soft.
- 1px ink rule around every image (provided by `.dither-frame`). Mono caption underneath: `[Fig. NN, subject, year, state]`.
- Figure numbering increments site-wide. Add new figures at the bottom of the registry in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).
- The `.dither-frame` CSS gets fixed in Block A so the underlying image content is not crushed by the walnut texture.

### Layer 3: programmatic textures

Used for: paper grain, ASCII grid overlays, scanline indicators, fig-number marquees.

- Generated at runtime via CSS noise, Canvas 2D, or shader. Never shipped as a webp.
- Paper grain animates subtly via `pulse-grain`. Other textures stay static.

### Captions

A good caption names the thing in under 12 words. Year and state are useful but optional. Adjectives are usually unnecessary. The em-dash inside a fig caption is allowed because mono typography frames it as a symbol.

### Placeholders

When an image isn't yet generated, render the `<DitheredImage placeholder />` state: a terminal block reading `[FIG. NN, IMAGE PENDING]` with the same border, caption position, and aspect ratio. The page never shows a broken image.

### Hero plate

The 5s ASCII portrait video at [public/hero/ascii.mp4](public/hero/ascii.mp4) gets retired in Block B. Replaced by a WebGL signature plate. The new plate base art lives at [public/hero/signature-base.webp](public/hero/signature-base.webp) (to be generated). Reduced-motion shows the static base art.

---

## 7. Component checklist

Every new section or page passes this list before merge.

- [ ] Sits inside the 12-col Swiss grid (verify with `?grid`).
- [ ] Carries one mono label (`section/eyebrow`) above the headline.
- [ ] Headline is GT Sectra Fine. Body is Geist Sans.
- [ ] Display weights mixed deliberately (Black for the noun, Regular for the verb, etc.).
- [ ] If imagery: schematic if possible, dithered raster if photographic. Captioned. Figure-numbered.
- [ ] Mono caption ≤ 12 words.
- [ ] No banned phrase from voiceDNA.
- [ ] No em-dash in body copy (only inside fig labels).
- [ ] Light mode tested; contrast holds.
- [ ] Reduced-motion variant exists.
- [ ] Pixel font appears at most once.
- [ ] Status pills follow the format `▌ STATE ▌ YEAR ▌`.
- [ ] Motion primitives drawn from §5 catalog. Custom one-offs documented in the PR.

---

## 8. Naming

- Routes: kebab-case, no trailing slash.
- Section labels: noun phrases, sentence-case in the source, mono-uppercased in CSS.
- Figures: `Fig. 01`, `Fig. 02` (period, sentence case in label, all-caps when set in mono).
- Status pills: `SHIPPED`, `RUNNING`, `RETIRED`, `IN-FLIGHT`. No verbs ending in -ing except IN-FLIGHT.
- Components: PascalCase TSX. Props that toggle visual state use a `mode` enum, not booleans (e.g. `<DitheredImage mode="placeholder" />`).
- Schematic SVG files: kebab-case at `public/schematics/<system>.svg`. Each carries an inline `<title>` and `<desc>` for accessibility.

---

## 9. Out of scope (this round)

- Sanity CMS comes back.
- Calendly, Plausible, Vercel Analytics, newsletter capture.
- Bespoke 404.
- Print stylesheet beyond what already exists in [app/globals.css](app/globals.css).
- /uses, /talks routes.

These return in a follow-up branch.

---

## 10. Accessibility

WCAG 2.1 AA floor. Specifically:

- `prefers-reduced-motion: reduce` honored on every motion primitive in §5.
- `prefers-contrast: more` boosts the rule color and removes paper-grain.
- Focus rings: 2px solid `--accent` outline with 2px offset on dark, `--accent-light` on light. Tested on every framed element so the ring sits outside the frame.
- Skip-to-content link in the header.
- All non-decorative imagery carries an `alt` attribute that describes the subject, not the figure number.
- The hero WebGL plate has a static-image fallback hidden behind reduced-motion, with the same alt text.
- Color contrast verified per token combination on both themes.
- Tab order matches visual order on every route.

---

## 11. WebGL guardrails

Bold WebGL is in. Sloppy WebGL is out.

- Use OGL (~16KB gzipped) not three.js. We don't need a scene graph; we need shaders.
- Every WebGL canvas is lazy-loaded as a dynamic import behind a static-plate placeholder. Time-to-first-paint must not regress.
- WebGL chunks together must not add more than 90KB gzipped to the initial bundle.
- Shaders live at [components/webgl/](components/webgl/) with the GLSL inlined as a tagged-template string. No separate `.glsl` files in this round.
- Each shader has three explicit states: `loading` (static plate), `idle` (shader paused at frame 0), `active` (animating).
- On `prefers-reduced-motion`, the shader never reaches `active`. It stays at `idle` showing the static base art.
- Canvases are paused via IntersectionObserver when off-screen and resumed on enter.
- Mouse-driven uniforms are throttled to 60fps via `requestAnimationFrame`. Touch devices map a slow auto-walk instead of cursor.
- A11y: the canvas carries `role="img"` with an `aria-label` that describes the underlying base art. Reduced-motion users see the same art via the static `<img>` fallback.

---

## 12. For Midjourney visual context

When generating images, paste this block into a Midjourney prompt as system context. It captures the design's visual language so the renders feel like siblings, not strangers.

```
SYSTEM CONTEXT (do not render this as image content, use as styling guidance only)

Aesthetic register: 1970s technical reference manual, updated for the web.
Visual language: Swiss grid, editorial display serif (GT Sectra Fine, sharp wedge terminals), mono labels (Geist Mono), retro-futurist accents.
Treatment: 1-bit Atkinson dithered halftone or fine print halftone on cream paper #F6F1E7 with ink #070707 marks. Single warm spot color allowed (#B7AA7A khaki accent, or #C75F3D dithered red for redaction/warning).
Composition: high contrast, fine grain, archival print quality, asymmetric Swiss grid, generous negative space, mono captions in the lower margin.
Subject latitude: schematics, exploded views, blueprints, control panels, mainframes, magnetic media, library catalogs, ledger pages, calendar grids, typographic posters, dithered photography of people / places / objects.
Anti-aesthetic: glossy 3D SaaS renders, flat vector UI illustration, stock-photo "happy team" compositions, smooth photographic gradients with no print texture, neon, Stripe-clone gradients, isometric icon packs.
```

Append this to the per-figure prompt in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).
