# MIDJOURNEY_PROMPTS.md

The image system for connorlaughl.in. One locked treatment formula, one Midjourney system-context block, a complete figure registry, and per-image prompts for every plate the site needs.

Read [DESIGN.md](DESIGN.md) §6 (Imagery) and §12 (Midjourney visual context) before generating anything. Read [voiceDNA.md](voiceDNA.md) before writing captions.

---

## How to use this file

1. Open [Midjourney](https://www.midjourney.com).
2. Paste the system-context block (§A below) once at the start of a session.
3. Pick a figure from §C, paste its prompt.
4. Generate 4 variants. Pick the one that reads at thumbnail size. Halftone images often look great at 1080p and turn to mush at 480p; verify mobile.
5. Save the source render at full resolution into `public/raw/figXX-source.png` (the `public/raw/` folder is gitignored).
6. Run the optimization step (Block A delivers `npm run optimize:images`):
   ```
   npm run optimize:images -- public/raw/fig04-source.png public/case-studies/bdr-logbook.webp
   ```
7. Wire the plate into the page via `<DitheredImage fig={N} src="..." caption="..." alt="..." ratio="..." />`.

For schematic plates (Layer 1), do not use Midjourney. Build them as inline SVG using the symbol library at [github.com/sjgallagher2/SchematicSymbolsSVG](https://github.com/sjgallagher2/SchematicSymbolsSVG) (MIT). The Ghost Pipeline Detector at `public/case-studies/ghost-pipeline.svg` is the reference.

---

## §A. System-context block (paste once per Midjourney session)

```
SYSTEM CONTEXT (styling guidance, do not render literally)

Aesthetic register: 1970s technical reference manual, updated for the web.
Visual language: Swiss grid, editorial display serif (GT Sectra Fine, sharp wedge terminals),
mono labels (Geist Mono), retro-futurist accents.
Treatment: 1-bit Atkinson dithered halftone or fine print halftone, cream paper #F6F1E7
with ink #070707 marks. A single warm spot color is allowed when it earns its place:
khaki accent #B7AA7A, or dithered red #C75F3D for warning or redaction.
Composition: high contrast, fine grain, archival print quality, asymmetric Swiss grid,
generous negative space, mono captions sit in the lower margin.
Subject latitude: schematics, exploded views, blueprints, control panels, mainframes,
magnetic media, library catalogs, ledger pages, calendar grids, typographic posters,
dithered photography of people, places, objects.
Anti-aesthetic: glossy 3D SaaS renders, flat vector UI illustration, stock-photo
"happy team" compositions, smooth photographic gradients with no print texture, neon,
Stripe-clone gradients, isometric icon packs, AI-mush soft edges.

Reply OK when ready for prompts.
```

---

## §B. The base formula

Every per-figure prompt below ends with this treatment block. Don't drop it.

```
1-bit dithered halftone, Atkinson dithering or fine print halftone,
predominantly monochrome on cream paper #F6F1E7 with ink #070707 marks,
1980s technical reference manual feel, Swiss design composition,
high contrast, fine grain, archival print quality
--ar [RATIO] --style raw --stylize 50 --v 6
```

Negative prompt boilerplate (append only when a render comes back glossy):

```
--no glossy 3D render, flat vector UI, stock-photo composition, AI-mush soft edges,
gradient skies, Stripe-clone aesthetic, neon, isometric icon pack
```

---

## §C. Figure registry (locked, do not renumber)

When a new image is needed, append a row at the bottom. Existing figure numbers must stay stable because copy in the site body references them.

### Shipped status (as of 2026-05-14)

Live in production:

- **Fig. 01 — desk portrait of Connor + Henry at the desk, Lincoln Park** (overrides the registry row; see note below). File: `public/hero/desk-portrait.webp`, aspect 2:3.
- **Fig. 02 — typographic OG poster**. File: `public/og/og.webp`.
- **Fig. 04 — BDR Pod isometric system diagram**. File: `public/case-studies/bdr-pod.webp`.
- **Fig. 05 — outcome-first before/after panel**. File: `public/case-studies/outcome-first.webp`.
- **Fig. 06 — marketing org chart blueprint**. File: `public/case-studies/org-chart.webp`.
- **Fig. 07 — tracking pixel exploded view**. File: `public/case-studies/tracking-pixel.webp`.
- **Fig. 08 — mainframe / AI operating system**. File: `public/case-studies/mainframe.webp`.
- **Fig. 09 — ASCII grid divider**. File: `public/dividers/grid.webp`. Used as the work-to-personal homepage divider.
- **Fig. 10 — control panel divider**. File: `public/dividers/control-panel.webp`. Used as the ledger-to-systems homepage divider.
- **Fig. 11 — blueprint divider**. File: `public/dividers/blueprint.webp`. Used as the `/case-studies` archive index divider.

Pending / not yet generated: Fig. 12-30 plus the SVG schematics in §E (Revenue OS, agent mesh, signal-demand, platform-narrative, post-acquisition). The Ghost Pipeline Detector at `public/case-studies/ghost-pipeline.svg` is the reference style for those.

### Registry

| Fig. | File | Aspect | Layer | Where used | Subject |
|---|---|---|---|---|---|
| 01 | `public/hero/desk-portrait.webp` (shipped) | 2:3 (1024×1537) | Raster | Homepage WebGL hero | Hand-drawn ink illustration of Connor at his standing desk with Henry, looking out at Lincoln Park. Mouse-driven swell shader runs on top. |
| 02 | `public/og/og.jpg` | 1200×630 | Raster | Root OG meta image | Typographic poster, mono uppercase wordmark, dithered background |
| 03 | `public/about/portrait.webp` | 1:1 | Raster | /about hero | Connor portrait, dithered halftone, three-quarter angle |
| 04 | `public/case-studies/bdr-logbook.webp` | 16:9 | Raster | BDR Pod artifact | Open notebook with hand-written BDR call notes and signal tags |
| 05 | `public/case-studies/outcome-first.webp` | 16:9 | Raster | Outcome-first repositioning | Before/after typographic panel, two columns separated by a rule |
| 06 | `public/case-studies/org-chart.webp` | 16:9 | Raster | Marketing org design | Blueprint of an org chart, dimension lines, hierarchical boxes |
| 07 | `public/case-studies/tracking-pixel.webp` | 16:9 | Raster | GA4 governance | Exploded technical view of a tracking pixel with callouts |
| 08 | `public/case-studies/mainframe.webp` | 16:9 | Raster | AI operating system | 1970s mainframe terminal showing code, paper printout spilling out |
| 09 | `public/dividers/grid.webp` | 1:1 | Raster | Section dividers | Abstract dithered ASCII grid pattern, no subject |
| 10 | `public/dividers/control-panel.webp` | 1:1 | Raster | Section dividers | Vintage analog control panel, dials, rocker switches |
| 11 | `public/dividers/blueprint.webp` | 1:1 | Raster | Section dividers | Cropped technical blueprint, dimension callouts |
| 12 | `public/case-studies/kpi-dictionary.webp` | 4:3 | Raster | KPI dictionary artifact | A printed dictionary-style page listing KPIs with definitions and formulas |
| 13 | `public/case-studies/cadence-wall.webp` | 4:3 | Raster | Cadence wall artifact | Calendar grid pinned to a wall showing weekly operating reviews |
| 14 | `public/case-studies/claims-register.webp` | 4:3 | Raster | Claims register artifact | Bound register page with claims, check boxes, and proof citations |
| 15 | `public/case-studies/content-calendar.webp` | 4:3 | Raster | Content calendar artifact | Editorial wall calendar with weekly briefs and assignments |
| 16 | `public/case-studies/crm-lifecycle.webp` | 16:9 | Raster | CRM lifecycle artifact | Schematic of lead → MQL → SQL → opportunity → won, technical drawing |
| 17 | `public/case-studies/cross-sell-matrix.webp` | 4:3 | Raster | Cross-sell matrix artifact | Grid matrix of products vs accounts with highlighted cells |
| 18 | `public/case-studies/ga4-taxonomy.webp` | 16:9 | Raster | GA4 taxonomy artifact | Event taxonomy as a hierarchical tree, technical drafting |
| 19 | `public/case-studies/ia-map.webp` | 16:9 | Raster | IA map artifact | Information architecture sitemap, hand-drafted feel |
| 20 | `public/case-studies/intake-board.webp` | 4:3 | Raster | Intake board artifact | Sticky-note board with categorized incoming requests |
| 21 | `public/case-studies/messaging-pillars.webp` | 16:9 | Raster | Messaging pillars artifact | Three-column pillar diagram showing brand pillars |
| 22 | `public/case-studies/rag-index.webp` | 16:9 | Raster | RAG index artifact | Schematic of a retrieval-augmented generation pipeline |
| 23 | `public/case-studies/recovery-ledger.webp` | 4:3 | Raster | Recovery ledger artifact | Accounting-style ledger of debt-recovery campaigns |
| 24 | `public/case-studies/reverse-funnel.webp` | 16:9 | Raster | Reverse funnel artifact | Inverted funnel diagram with annotations and capacity math |
| 25 | `public/case-studies/rfp-gate.webp` | 16:9 | Raster | RFP gate artifact | Gate diagram with approval and rejection paths, threshold notes |
| 26 | `public/case-studies/signal-routing.webp` | 16:9 | Raster | Signal routing artifact | Routing diagram with conditional rules, signal indicators |
| 27 | `public/case-studies/tracking-pixel-alt.webp` | 16:9 | Raster | Tracking pixel (alt angle) | Different exploded angle of the tracking pixel |
| 28 | `public/case-studies/utm-spec.webp` | 4:3 | Raster | UTM spec artifact | A printed spec sheet of UTM parameter definitions |
| 29 | `public/case-studies/ai-audit-log.webp` | 16:9 | Raster | AI audit log artifact | Audit log printout with timestamps, agent IDs, decisions |
| 30 | `public/about/film-roll-01..16.webp` | 4:3 | Raster | /about film roll (×16) | 16 dithered family photographs, see §D.2 for the set prompt |
| 31 | `public/schematics/ghost-pipeline.svg` | 16:9 | SVG | Ghost Pipeline Detector | Existing custom schematic (do not regenerate) |
| 32 | `public/schematics/revenue-os.svg` | 16:9 | SVG | Revenue OS card | Schematic system diagram, see §E.1 |
| 33 | `public/schematics/agent-mesh.svg` | 16:9 | SVG | 22-Agent AI GTM card | Multi-agent topology with gates, see §E.2 |
| 34 | `public/schematics/signal-demand.svg` | 16:9 | SVG | Signal-Based Demand Engine card | Signal source → routing → SLA → meeting, see §E.3 |
| 35 | `public/schematics/platform-narrative.svg` | 16:9 | SVG | Platform Narrative card | Before/after positioning panel with ICP overlay, see §E.4 |
| 36 | `public/schematics/post-acquisition.svg` | 16:9 | SVG | Post-Acquisition SaaS GTM Bridge | Two systems converging, bridge symbol, see §E.5 |
| 40 | (typeset, no asset) | n/a | Typeset | /edge route | Fig. 40 hero thesis diagram (inline SVG, three converging axes meeting at "judgment at speed"); Fig. 40.01–40.11 per-chapter language asides on /edge; Fig. 40.12 closing one-line moat pull-quote. No raster generation needed. |

---

## §D. Midjourney prompts, raster plates

### Fig. 01, signature hero base art (1:1, 1024×1024)

```
A medium-format documentary photograph of a man in his mid-thirties,
three-quarter angle, looking off-camera, neutral confident expression,
plain cream paper background, soft directional light from upper left,
shoulders and head only, archival portrait composition,
rendered as 1-bit Atkinson dithered halftone, fine grain,
very high contrast, every facial feature legible,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s technical reference manual portrait, archival print quality
--ar 1:1 --style raw --stylize 50 --v 6
```

If you want your actual face: use Midjourney's `--cref` with a cropped headshot, generate, then dither in post via [dither.it](https://dither.it) or `ffmpeg -i in.jpg -vf format=gray,floyd_steinberg out.png` for tighter control.

### Fig. 02, OG image (1200×630)

```
A typographic poster on cream paper,
upper third: empty negative space,
middle band: "CONNOR J. LAUGHLIN" set in editorial serif occupying full width,
lower edge: "VP MARKETING and GTM ENGINEER" set in mono uppercase tracking-loose,
four small index marks ([01] [02] [03] [04]) in mono in the corners,
dithered halftone framing the type, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color,
Swiss design composition, generous negative space
--ar 1200:630 --style raw --stylize 50 --v 6
```

Render-time touch-up: drop the real type in Figma over the rendered background. Midjourney's letterforms are unreliable. Use the dithered illustration as a backdrop only.

### Fig. 03, about portrait (1:1)

```
A medium-format documentary photograph of a man in his mid-thirties,
three-quarter angle, soft smile, looking just past the camera,
plain background, soft window light from left,
rendered as 1-bit Atkinson dithered halftone, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s reference-manual portrait, archival print quality
--ar 1:1 --style raw --stylize 50 --v 6
```

### Fig. 04, BDR logbook (16:9)

```
An open spiral-bound logbook on a wooden desk,
left page: handwritten BDR call notes, dates, signal tags, tally marks,
right page: a small flow chart of signal source to meeting,
overhead camera angle, fine paper texture, archival photography,
1-bit dithered halftone, Atkinson dithering, high contrast,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 05, outcome-first repositioning (16:9)

```
A before-and-after typographic panel, two columns separated by a thick vertical rule,
left column dense small type set in mono, right column open large type set in serif,
both columns identical width, archival document framing,
mono labels "BEFORE" and "AFTER" at the top of each column,
1-bit dithered halftone, Atkinson dithering, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 06, marketing org chart (16:9)

```
An architectural blueprint of an organizational chart,
fine ink lines on cream paper, dimension marks at every connection,
hierarchical boxes with role labels, drafting precision, blueprint corners,
hand-drafted feel, 1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 07, GA4 tracking pixel (16:9)

```
An exploded technical view of a 1x1 tracking pixel,
component callouts, dimension arrows, layered transparency showing payload,
patent-illustration line work, archival document feel,
small mono labels for each callout, fine drafting precision,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 08, AI mainframe operating system (16:9)

```
A 1970s mainframe terminal, CRT screen showing lines of code,
visible scanlines on the screen, fan-fold paper printout spilling onto a wooden desk,
operator hands silhouetted on the keyboard,
high-contrast monochrome technical photography,
1-bit dithered halftone, Atkinson dithering, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 09, ASCII grid divider (1:1)

```
An abstract dithered texture, ASCII grid pattern,
dots and dashes arranged on a strict grid, density gradient across the field,
no subject, decorative, 1-bit dithered halftone,
cream paper #F6F1E7 background, ink #070707 marks, no color,
Swiss design composition, blueprint feel
--ar 1:1 --style raw --stylize 50 --v 6
```

### Fig. 10, control panel divider (1:1)

```
A vintage analog control panel, dials, rocker switches, labeled toggle banks,
photographed straight-on, archival monochrome, fine grain, cropped tight, no people,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 1:1 --style raw --stylize 50 --v 6
```

### Fig. 11, blueprint divider (1:1)

```
A cropped technical blueprint, dimension lines, callout numbers,
fine drafting line work, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 1:1 --style raw --stylize 50 --v 6
```

### Fig. 12, KPI dictionary (4:3)

```
A printed dictionary-style page on cream paper,
column of KPI names in serif bold, each followed by a short mono definition and a formula,
fine ink rules between entries, page number in the lower corner,
archival print quality, fine grain,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 13, cadence wall (4:3)

```
A weekly operating review calendar pinned to a corkboard,
hand-drawn grid showing Monday through Friday, each cell labeled with a meeting and an owner,
push pins, paper texture, slight curl at the edges,
archival monochrome, fine grain,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 14, claims register (4:3)

```
A bound register page on cream paper, ruled lines, each row a claim followed by a check box and a citation,
fountain pen check marks, fine ink rules separating sections,
archival document feel, top-down view,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 15, content calendar (4:3)

```
An editorial wall calendar laid flat on a desk,
weekly grid, each cell labeled with a brief title and a deadline date,
hand annotations in red ink (single warm spot color allowed: #C75F3D),
archival monochrome elsewhere, fine grain,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 16, CRM lifecycle (16:9)

```
A technical drafting drawing of a CRM lifecycle flow,
five labeled boxes left-to-right (LEAD, MQL, SQL, OPPORTUNITY, WON),
each with conditional arrows and small mono annotations,
dimension lines below indicating SLA, fine drafting precision,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 17, cross-sell matrix (4:3)

```
A grid matrix on cream paper, columns labeled with product codes, rows labeled with account names,
each cell either empty, marked with a small mono "x", or filled with a tally count,
highlighted cells in warm spot color #B7AA7A (khaki), fine ink rules,
archival document framing, top-down view,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 18, GA4 taxonomy tree (16:9)

```
A hierarchical event taxonomy tree drawn as a technical drafting diagram,
root node at left, branching to second-level events, then to parameters,
each node labeled in mono, branch lines fine drafting weight,
dimension marks at intervals, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 19, IA map (16:9)

```
An information architecture sitemap drawn as a technical drafting diagram,
boxes labeled "/", "/about", "/case-studies", "/longform", "/tools", "/resume",
fine connecting lines, hand-drafted feel, hierarchical layout,
mono labels under each box, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 20, intake board (4:3)

```
A magnetic board photographed straight-on, sticky notes arranged in three labeled columns
(INBOX, IN-FLIGHT, SHIPPED), each note carries a hand-written project title and an owner,
some notes overlap, one warm-spot-color sticky in #C75F3D dithered red,
archival monochrome elsewhere, fine grain,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 21, messaging pillars (16:9)

```
A three-column pillar diagram on cream paper,
three vertical bars labeled in serif uppercase at the top of each,
each pillar contains 3-5 short mono bullet labels stacked vertically,
fine drafting precision, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 22, RAG index pipeline (16:9)

```
A schematic of a retrieval-augmented generation pipeline,
five labeled blocks left-to-right (SOURCE, CHUNK, EMBED, RETRIEVE, GENERATE),
each connected by signal lines, small mono annotations for vector dimensions and model names,
fine drafting precision, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 23, recovery ledger (4:3)

```
An accounting-style ledger page on cream paper, ruled columns labeled DATE, ACCOUNT, AMOUNT, STATUS,
hand-entered figures in fountain pen, totals at the bottom,
archival document feel, top-down view, slight paper curl,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 24, reverse funnel (16:9)

```
An inverted funnel diagram on cream paper,
top-of-funnel wide at the bottom, narrowed at the top to "WON" label,
each band labeled with a stage name and a capacity number in mono,
dimension lines showing conversion percentages between stages,
fine drafting precision, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 25, RFP gate (16:9)

```
A gate diagram, central diamond labeled "RFP GATE",
two outbound paths labeled "APPROVE" and "REJECT", thresholds noted on each path in mono,
small clipboard icon and a stop sign icon at the path endpoints,
fine drafting precision, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 26, signal routing (16:9)

```
A signal routing diagram, multiple labeled signal inputs on the left
(WEBHOOK, ENRICHMENT, INTENT, FORM), router block in the middle,
conditional rules listed in mono next to the router,
outputs on the right labeled by SLA bucket (2H, 24H, 72H),
fine drafting precision, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 27, tracking pixel (alt angle) (16:9)

```
A second exploded view of a 1x1 tracking pixel, side angle this time,
component callouts, dimension arrows, layered transparency showing payload,
mono labels offset to the right margin, archival print quality,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 28, UTM spec sheet (4:3)

```
A printed spec sheet on cream paper titled "UTM PARAMETER SPECIFICATION",
table of parameter names (utm_source, utm_medium, utm_campaign, utm_term, utm_content),
each row carries a definition, allowed values, and example,
fine ink rules between rows, archival document framing,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks, no color
--ar 4:3 --style raw --stylize 50 --v 6
```

### Fig. 29, AI audit log (16:9)

```
A printed audit log on cream paper, monospace rows with columns
TIMESTAMP, AGENT_ID, DECISION, CONFIDENCE, ESCALATED,
some rows highlighted in warm spot color #C75F3D dithered red for escalations,
fine ink rules, archival document framing, top-down view,
1-bit dithered halftone, Atkinson dithering,
cream paper #F6F1E7 background, ink #070707 marks
--ar 16:9 --style raw --stylize 50 --v 6
```

### Fig. 30 set, /about film roll (4:3, 16 plates)

Use this single prompt 16 times with subject swaps. Subjects below.

```
A dithered halftone photograph of [SUBJECT], medium-format documentary feel,
soft directional light, plain or natural background,
1-bit Atkinson dithering, high contrast, fine grain,
cream paper #F6F1E7 background, ink #070707 marks, no color,
1980s archival photograph
--ar 4:3 --style raw --stylize 50 --v 6
```

`[SUBJECT]` per plate:

| Slot | Subject |
|---|---|
| 30.01 | A wedding ceremony in Rome, two figures at the altar, candlelight |
| 30.02 | A black labrador, head and shoulders, neutral background |
| 30.03 | A golden retriever puppy asleep on a couch |
| 30.04 | An older retriever staring directly into the camera |
| 30.05 | Three dogs in a row in a kitchen, waiting for food |
| 30.06 | A man playing a round of golf, mid-swing, fairway in the background |
| 30.07 | A woman holding a baby, both laughing |
| 30.08 | Four young brothers and sisters around a kitchen table |
| 30.09 | A man at a stove, plating a dinner, steam rising |
| 30.10 | A football fan in a Liverpool kit, watching the match |
| 30.11 | A man running on a tree-lined road at dawn |
| 30.12 | A dining table set for six, candles, after-dinner state |
| 30.13 | A bookshelf with a stack of finance and engineering textbooks |
| 30.14 | A man hiking in the Apennines, backpack and walking stick |
| 30.15 | A Vatican Museum corridor, archival photograph |
| 30.16 | A black notebook on a wood desk, pen beside it |

These replace the 16 identical orange plates on /about.

---

## §E. SVG schematic prompts (Layer 1, do not use Midjourney)

These are hand-built. Each schematic uses the Ghost Pipeline Detector at `public/case-studies/ghost-pipeline.svg` as a structural reference. Symbols pulled from [github.com/sjgallagher2/SchematicSymbolsSVG](https://github.com/sjgallagher2/SchematicSymbolsSVG).

Each schematic carries:
- A fig label and mono caption in the lower margin.
- Inline `<title>` and `<desc>` for accessibility.
- Stroke widths: 1.5px primary, 0.75px ornament.
- Single warm spot color (`#B7AA7A`) only on the signal-path or the active node. Never decorative.

### Fig. 32, Revenue OS schematic

Components: KPI dictionary block (top-left), funnel block (center), audit log block (right), governance loop block (bottom). Signal arrows connect them in a clockwise flow. Dimension lines below indicate cadence (weekly, monthly, quarterly). Active node highlighted in `#B7AA7A`.

### Fig. 33, 22-Agent AI GTM schematic

Components: 22 small agent nodes arranged in a 5-row mesh on the left. A central "Governance gate" block. Two paths exit: "Auto-execute" and "Escalate to human". Audit log rail along the bottom. Each agent node carries a single-letter label (R, G, S, C, etc. for role).

### Fig. 34, Signal-Based Demand Engine schematic

Components: Four signal sources on the left (Webhook, Enrichment, Intent, Form). A router diamond in the middle with three labeled outputs (2H SLA, 24H SLA, 72H SLA). Each SLA output connects to a meeting block on the right. Routing rules listed in the upper margin.

### Fig. 35, Platform Narrative & ICP Intelligence schematic

Components: Two-column typographic before/after on cream paper. Left column dense, set in mono ("PLATFORM A: 47 features, 12 segments, no narrative anchor"). Right column open, set in serif ("PLATFORM B: 1 narrative, 3 ICPs, every feature aligned"). ICP overlay (3 concentric rings) lives in the lower-right corner with mono labels.

### Fig. 36, Post-Acquisition SaaS GTM Bridge schematic

Components: Two system diagrams on the left and right of a central bridge symbol. Left system = acquiring company (CRM, brand, GTM stack). Right system = acquired company (different CRM, different brand, different GTM stack). The bridge in the middle is labeled "GTM BRIDGE" and carries 5 sub-components (data routing, brand reconciliation, lifecycle merge, sales rebuild, audit). Cross-sell matrix appears in the lower margin.

---

## §F. Adding new images

1. Append a row to §C with the next available fig number. Do not renumber.
2. If raster: write a per-figure prompt in §D using the base formula from §B. Vary only the subject and ratio.
3. If schematic: describe the components and the signal flow in §E. Build as inline SVG.
4. Generate, dither-verify on mobile, optimize, ship.
5. Visual-diff against existing figures. They should look like siblings, not cousins.

---

## §G. Quality bar

A render passes if:

- The subject is legible at thumbnail size (256px).
- The treatment matches the rest of the registry (you can place it in a contact sheet of the existing figures and it looks like a sibling).
- The dither grain is even, not banded.
- Mono captions are absent from the render itself (captions are added in code, not baked into the image).
- The cream paper background is consistent across the set.
- Color, if used, is the single allowed warm spot. Not more.
- It does not look like a glossy 3D render, a flat vector illustration, or a stock photo.

If a render fails on any bullet, regenerate or fix in post via [dither.it](https://dither.it) before checking it in.
