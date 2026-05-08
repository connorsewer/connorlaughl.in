# DESIGN.md — connorlaughl.in

A reference manual. The site is a small museum of governed systems, set in the visual register of an old technical document. Swiss grid, editorial serif, retro-futurist accents, dithered imagery. Every screen reads like a page from a 1970s reference binder that someone updated last week.

If you're an agent making changes here, this is the contract. Cross-check every commit against it.

---

## 1. Voice

Primary source: `/Users/connorlaughlin/Documents/voiceDNA.md`. Read it before writing any user-facing copy.

### Core posture

The page is the byline. Don't sell. Don't announce. Don't reflect. Report.

A reader should be able to find a number, a verb, and a year inside the first ten words of any block. If they can't, the block is too soft.

### Sentence rhythm

- Vary length. One short, one longer, one short. Never three of the same.
- Contractions on. Period.
- Mono captions are systems, not commentary. They name the thing, optionally with a year and a state. `[Fig. 04 — BDR Pod, 2024, shipped]`. No adjectives.
- Serif headlines speak like a person who knows. Sans body explains. Mono labels file.

### Hard bans (anywhere user-facing)

| Banned | Why |
|---|---|
| Em-dash (—) in body copy | The single most notorious AI tell. Use a comma, period, colon, or parenthesis. Em-dashes are allowed only inside `[Fig. N]` labels and the figure caption divider, and only because the mono-typography frames them as a symbol, not punctuation. |
| "Actually" | Hedging. Defensive. Drop it. |
| "Operating proof" | Internal jargon, doesn't carry. Say "the work" or just show it. |
| "Outperform" | Promotional. Use a number. |
| "Leverage", "harness", "utilize", "unlock", "unleash", "elevate", "supercharge" | All radioactive. Use plain verbs. |
| "Tapestry", "intricate", "vibrant", "robust", "meticulous", "nestled", "bustling" | Ornamental. Cut. |
| "Delve", "dive into", "unpack" | AI tells. Just describe the thing. |
| "Game-changer", "cutting-edge", "future-proof" | Banned outright. |
| "Dossier" | Decorative. The site is one already. Say "file" or "brief". |
| "Architecture of trust", "rich", "deeply rooted" | Puffery. |
| "Furthermore", "additionally", "moreover" | Mechanical transitions. |
| "Not X. It's Y." / "Not just X, it's Y" | The fatal one. Negative parallelism creates fake drama. State the positive. |

### The voiceDNA self-check (run before merge)

Walk the rendered HTML for each route. For each section:

1. Did this sentence inflate importance? Cut.
2. Did I use "serves as" / "stands as" where "is" works? Replace.
3. Are all my lists exactly 3 items? Break the pattern.
4. Did I summarize what I just said? Delete.
5. Did I write "not X. It's Y"? Delete the negation, state the claim.
6. Does any sentence sound like a tourism brochure? Rewrite.
7. Did I attribute to nobody specific ("widely regarded")? Name or cut.
8. Are all paragraphs the same length? Vary.
9. Em-dash in body? Replace with comma, colon, or period.
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
--dither-shadow: rgba(0, 0, 0, 0.4)        /* under dithered images for separation */
--terminal-green:#B5C7B0                   /* status pills only, used at most once per screen */
```

Color rules:
- Two-tone is the default. Cream on ink, or ink on cream. Accent is a guest.
- Never use accent for body text.
- Never combine terminal-green and accent in the same component.
- No gradients on text. No drop shadows on text.
- Light mode keeps every contrast ratio ≥ 4.5:1 on body, ≥ 3:1 on large display.

---

## 3. Type

Four families. Each has one job. Don't cross the streams.

| Family | Role | Typical use | CSS var |
|---|---|---|---|
| Instrument Serif | Display, "human voice" | Page titles, hero headline, pull quotes, drop caps | `--font-display` |
| Geist Sans | Body, paragraph copy | Reading text, captions of >1 line | `--font-sans` |
| Geist Mono | "System voice" | Metadata labels, figure numbers, nav items, status, code | `--font-mono` |
| Geist Pixel (Square) | Retro-futurist accent | Status pills, ASCII overlay, hover labels, badges | `--font-pixel` |

Geist Pixel is reserved. Use it once or twice per screen, never for body or display.

### Hierarchy (clamp pairs)

```
hero-display      clamp(3rem,    9vw, 6.5rem)   leading 0.9   tracking -0.01em
page-display      clamp(2.5rem,  6vw, 4.5rem)   leading 0.95
section-display   clamp(1.875rem, 4vw, 3rem)    leading 1.05
subsection        clamp(1.25rem, 2vw, 1.5rem)   leading 1.2
body-large        1.125rem (18px)               leading 1.65
body              1rem      (16px)              leading 1.6
caption           0.875rem  (14px)              leading 1.5
mono-meta         0.625rem  (10px)              tracking 0.3em uppercase
mono-fig          0.6875rem (11px)              tracking 0.2em
pixel-pill        0.6875rem (11px)              tracking 0.15em
```

### Type rules

- Display copy is text-balance.
- Body copy is left-aligned, ragged right. Never justified.
- All-caps only on mono labels and pixel pills, never on serif or sans body.
- One italic per screen, max. Italics announce; the more you use, the less they announce.
- A drop cap appears on the first paragraph of each long-form section (case studies, /proof writeups). Instrument Serif, 4.5em, drops 3 lines, 0.5rem right margin.

---

## 4. Grid

12-column Swiss grid, max width `64rem` (1024px) or `80rem` (1280px) on long-form pages. Outer gutter `1.5rem` mobile, `6rem` desktop.

- Hero: 12-col split, content cols 1–6, hero plate cols 7–12.
- Selected work index: 12-col, list cols 1–4, preview cols 5–12.
- Case study body: 8-col centered prose (cols 3–10), with marginalia in col 1 (mono notes) and col 11–12 (figure callouts).
- Footer: 12-col, three balanced thirds in mono.

Baseline: every block snaps to a 0.5rem rhythm (8px). Mono captions snap to a 1rem (16px) baseline so they line up across columns.

A dev-only grid overlay activates with `?grid` in the URL — use it before claiming alignment is right.

---

## 5. Motion

Conservative. Motion announces, never decorates.

| Motion | When | Spec |
|---|---|---|
| Fade-in | Page load | 0.8s, ease-out, opacity 0→1 |
| Slide-up | Below-fold sections | 0.8s, ease-out, y 20px→0 |
| Slide-in-right | Hero stats column | 0.8s, ease-out, x 30px→0 |
| ASCII flicker | Pixel pills, on hover | 80ms opacity steps (1 → 0.6 → 1), no blur |
| CRT scanline | Primary CTAs, on hover | 1px horizontal line sweeps the button in 600ms |
| Redaction reveal | Confidential blocks (case studies) | Mouse-x driven horizontal slide, spring 250/30 |
| Figure-number type-in | Mono fig labels on first paint | 0.4s mono character-fade |

Never bounce. Never spring on display copy. Never animate color.

`prefers-reduced-motion: reduce` swaps every motion above to instant. The hero video swaps to its poster. CRT scanline becomes a static 1px rule. ASCII flicker becomes static.

---

## 6. Imagery

Every image is dithered or ASCII-rendered. The treatment is the unifier; the subject matter is open.

### Treatment (the only hard rules)

- 1-bit Atkinson dithering, fine halftone, or stylistically-similar reduced-tone monochrome on cream paper. Color is allowed when it serves the work, but should be sparing and feel printed, not glossy.
- 1px ink rule around every image (provided by `.dither-frame`). Mono caption underneath: `[Fig. NN] subject — year — state`.
- Figure numbering increments site-wide. Add new figures at the bottom of the registry in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md).

### Subjects (suggested, not exhaustive)

The site favors: terminals, blueprints, exploded views, nodes connected by signal lines, control panels, magnetic media, library card catalogs, technical illustrations, abstract systems, and dithered photography (people, places, objects).

**Text and logos are welcome** when they serve the image — typographic posters, magazine covers, tickers showing real metrics, blueprint annotations, terminal screens with code, signage, packaging, brand marks. The dithered treatment carries the visual identity; subject latitude does not break the system.

People are welcome as dithered halftone photography (the about hero is the canonical example). Sharp glossy photography is the only thing that's actively wrong.

### Captions

A good caption names the thing in under 12 words. Year and state are useful but optional. Adjectives are usually unnecessary, but not banned — if a word earns its place, keep it.

### Generation

Use the locked Midjourney formula in [MIDJOURNEY_PROMPTS.md](MIDJOURNEY_PROMPTS.md). Don't deviate without updating the formula and re-rendering existing images for consistency.

### Placeholders

When an image isn't yet generated, render the `<DitheredImage placeholder />` state — a terminal block reading `[FIG. NN — IMAGE PENDING]` with the same border, caption position, and aspect ratio. The page should never show a broken image.

### Hero video

The 5s ASCII portrait video lives at [public/hero/ascii.mp4](public/hero/ascii.mp4). Its poster is [public/hero/ascii-poster.jpg](public/hero/ascii-poster.jpg). `<HeroAsciiVideo />` handles autoplay, loop, mute, the WebM mobile derivative, and the reduced-motion poster swap.

---

## 7. Component checklist

Every new section or page is checked against this list before merge.

- [ ] Sits inside the 12-col Swiss grid (verify with `?grid`).
- [ ] Carries one mono label (`section/eyebrow`) above the headline.
- [ ] Headline is Instrument Serif. Body is Geist Sans.
- [ ] If imagery: dithered, captioned, figure-numbered.
- [ ] Mono caption ≤ 12 words.
- [ ] No banned phrase from voiceDNA.
- [ ] No em-dash in body copy (only inside fig labels).
- [ ] Light mode tested; contrast holds.
- [ ] Reduced-motion variant exists.
- [ ] Pixel font appears at most once.
- [ ] Status pills, if used, follow the format `▌ STATE ▌ YEAR ▌`.

---

## 8. Naming

- Routes: kebab-case, no trailing slash.
- Section labels: noun phrases, sentence-case in the source, mono-uppercased in CSS.
- Figures: `Fig. 01`, `Fig. 02` (period, sentence case in label, all-caps when set in mono).
- Status pills: `SHIPPED`, `RUNNING`, `RETIRED`, `IN-FLIGHT`. No verbs ending in -ing except IN-FLIGHT.
- Components: PascalCase TSX. Props that toggle visual state get a `mode` enum, not booleans (e.g. `<DitheredImage mode="placeholder" />`).

---

## 9. Out of scope (this round)

- /about and /services dedicated pages
- Sanity schema changes
- Calendly / Plausible / Vercel Analytics integration
- Google Drive integration for downloadables
- A bespoke 404
- Print stylesheet beyond what already exists in [globals.css](app/globals.css)

These return in a follow-up branch.
