# MIDJOURNEY_PROMPTS.md

The image system for connorlaughl.in. One locked formula, eleven specific prompts, a figure registry, and rules for adding more.

Read [DESIGN.md](DESIGN.md) §6 first. The visual goal: a 1970s reference manual that someone updated last week.

---

## The base formula

Every prompt starts with the same treatment boilerplate. Subjects swap. The framing tags below are starting points, not handcuffs — drop, swap, or add language as the subject demands.

```
[SUBJECT], 1-bit dithered halftone, Atkinson dithering or fine print halftone,
predominantly monochrome on cream paper #F6F1E7 with ink #070707 marks,
1980s technical reference manual feel, Swiss design composition,
high contrast, fine grain, archival print quality
--ar [RATIO] --style raw --stylize 50 --v 6
```

### Latitude (encouraged, not exceptions)

The treatment is the unifier. Inside it, you can:

- **Use type and logos.** Typographic posters, magazine covers, tickers showing real metrics, blueprint callouts, terminal screens with visible code, signage, packaging, brand marks. Spell things correctly when type is the subject.
- **Use color when it earns it.** A single warm spot color (the accent) or a duotone print feel is fair game. A single neon signal in an otherwise monochrome dithered scene works. Avoid full glossy color.
- **Use photography of people, places, objects.** Dithered photo halftones (like the about hero) are part of the system, not the exception.
- **Reach beyond the suggested subject list.** If the page calls for an architectural plan, a control panel, a contact-sheet of frames, or a portrait at a lake, all of it fits as long as it's dithered.

`[SUBJECT]` is the field that almost always varies. `[RATIO]` is set by the slot in the figure registry below. The other tags are tunable when the subject needs different language.

### When to push back

Tighten the prompt only if a render comes back as:

- Glossy 3D / SaaS-style render
- Modern flat-UI vector illustration
- Stock-photo "happy team" composition
- Smooth photographic gradients with no print texture

Append a targeted negative such as `--no glossy 3D render, flat vector UI, stock-photo composition`. Don't pre-load the prompt with negatives that close off useful subject matter (text, logos, color spots, people).

---

## Figure registry

Numbering increments site-wide. Add new figures only at the bottom. Do not renumber.

| Fig. | File | Aspect | Where used | Subject |
|---|---|---|---|---|
| 01 | `public/hero/ascii.mp4` | 2:3 (1024×1538) | Homepage hero | Existing ASCII animation video (delivered) |
| 02 | `public/og/og.jpg` | 1200:630 | OG meta image | Typographic poster, monochrome |
| 03 | `public/about/portrait.webp` | 1:1 | Homepage About / future /about | Connor portrait, dithered halftone |
| 04 | `public/case-studies/bdr-pod.webp` | 16:9 | BDR Pod case study | Network of nodes connected by signal lines |
| 05 | `public/case-studies/outcome-first.webp` | 16:9 | Outcome-First Repositioning | Two-column typographic before/after panel |
| 06 | `public/case-studies/marketing-org.webp` | 16:9 | Marketing Org Design | Architectural blueprint of an org chart |
| 07 | `public/case-studies/ga4-governance.webp` | 16:9 | GA4 Governance | Exploded view of a tracking pixel |
| 08 | `public/case-studies/ai-os.webp` | 16:9 | AI Operating System | 1970s mainframe terminal with code |
| 09 | `public/dividers/grid.webp` | 1:1 | Section dividers, ASCII grid | Abstract dithered ASCII grid pattern |
| 10 | `public/dividers/control-panel.webp` | 1:1 | Section dividers, retro accent | Vintage control panel with dials and rocker switches |
| 11 | `public/dividers/blueprint.webp` | 1:1 | Section dividers, blueprint accent | Cropped technical blueprint, dimension lines |

When a new image is needed, append a row. Do not renumber; site copy may reference figure numbers in body text.

---

## Per-figure prompts

### Fig. 02 — OG image (1200×630)

```
A typographic poster, large negative space upper third,
"VP MARKETING" set in mono uppercase along the lower edge,
"Connor Laughlin" set in editorial serif occupying middle band,
small index marks ([01] [02] [03]) in mono in the corners,
1-bit dithered halftone framing the type, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
Swiss design composition, generous whitespace
--ar 1200:630 --style raw --stylize 50 --v 6
```

Render-time touch-up: drop typography in Figma after, don't trust Midjourney's letterforms. Use the dithered illustration as the background only.

### Fig. 03 — About portrait (1:1, 1024×1024)

```
A medium-format documentary photograph of a man in his thirties,
three-quarter angle, neutral expression, looking off-camera,
plain background, soft directional light from left,
rendered as 1-bit Atkinson dithered halftone, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual portrait, archival print quality
--ar 1:1 --style raw --stylize 50 --v 6
```

If the user wants Connor's actual face: use Midjourney's `--cref` reference image upload feature with a cropped headshot, then dither in post via [dither-it.com](https://dither.it) or `ffmpeg -i in.jpg -vf format=gray,floyd_steinberg out.png` for tighter control.

### Fig. 04 — BDR Pod (16:9, 1920×1080)

```
An abstract systems diagram, network of nodes connected by signal lines,
control room aesthetic, dense interconnections, signal indicators,
isometric perspective, technical illustration,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual illustration, Swiss design composition
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 05 — Outcome-First Repositioning (16:9)

```
A before-and-after typographic panel, two columns separated by a vertical rule,
left column dense small type, right column open large type,
both columns of identical width, archival document framing,
1-bit dithered halftone, Atkinson dithering, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual illustration, Swiss design composition
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 06 — Marketing Org Design (16:9)

```
An architectural blueprint of an organizational chart,
fine ink lines on cream paper, dimension marks, hierarchical boxes,
hand-drafted feel, technical drafting precision, blueprint corners,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual illustration, Swiss design composition
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 07 — GA4 Governance (16:9)

```
An exploded technical view of a tracking pixel,
component callouts, dimension arrows, layered transparency,
patent-illustration line work, archival document feel,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual illustration, Swiss design composition
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 08 — AI Operating System (16:9)

```
A 1970s mainframe terminal, CRT screen displaying lines of code,
visible scanlines on the screen, paper printout spilling onto a wooden desk,
operator's hands resting on the keyboard (silhouetted only),
high-contrast monochrome, technical photography,
1-bit dithered halftone, Atkinson dithering, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 09 — ASCII grid divider (1:1)

```
An abstract dithered texture, ASCII grid pattern,
dots and dashes arranged on a strict grid,
varying density across the field, no subject, decorative,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
Swiss design composition, blueprint feel
--ar 1:1 --style raw --stylize 50 --v 6
```

### Fig. 10 — Control panel divider (1:1)

```
A vintage analog control panel, dials, rocker switches, labeled toggle banks,
photographed straight-on, archival monochrome, fine grain,
cropped tight, no people,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual illustration
--ar 1:1 --style raw --stylize 50 --v 6
```

### Fig. 11 — Blueprint divider (1:1)

```
A cropped technical blueprint, dimension lines, callout numbers,
fine drafting line work, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual illustration, Swiss design composition
--ar 1:1 --style raw --stylize 50 --v 6
```

---

## Generation workflow

1. Drop a prompt into Midjourney. Generate four variants per slot.
2. Pick the one that reads best at small sizes. Halftone images often look great at 1080p but turn to mush at 480p — verify mobile.
3. Save the source render at full Midjourney resolution into `public/raw/figXX-source.png` (raw folder is gitignored).
4. Run the optimization script:
   ```
   npm run optimize:images -- public/raw/fig04-source.png public/case-studies/bdr-pod.webp
   ```
   The script generates AVIF and WebP at the three breakpoints (full, medium, small) and writes them next to the target file with `-medium`, `-small` suffixes.
5. Reference the figure number in the slot's `<DitheredImage>` component:
   ```tsx
   <DitheredImage
     fig={4}
     src="/case-studies/bdr-pod.webp"
     caption="BDR Pod under load — 2024 — running"
     alt="Network of signal-driven nodes representing the BDR Pod system"
     ratio="16:9"
   />
   ```

---

## Adding new images

1. Append a row to the figure registry. Do not renumber.
2. Write a per-figure prompt using the locked formula. Vary only `[SUBJECT]` and `[RATIO]`.
3. Generate, dither-verify, optimize, ship.
4. Run a visual diff against existing figures — they should look like siblings, not cousins.
