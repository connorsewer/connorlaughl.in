# Figure registry

Every numbered plate on the site, in the order it was drawn. Append only.
Numbers are permanent: a retired figure keeps its number and gains a note, and
a new figure always takes the next free number.

## Rules

1. **Ground truth.** Every figure depicts a real system, and every labeled part
   is a real component of that system. A figure that cannot name its ground
   truth is cut. Decorative isometrics are banned.
2. **Public-safe wording.** This file is repo markdown and is scanned. Ground
   truths are described generically: no vendor names, no employer names, no
   client names, no gated values.
3. **No claim numerals on a plate.** Figure numbering and step ordinals are
   structural and exempt; anything asserting an outcome or a magnitude is not,
   and does not belong in a drawing.
4. **Accessibility.** Each plate is `role="img"` with a `<title>` and a
   `<desc>`, plus a visible caption that states the figure's claim in words.
5. **Caption grammar.** `FIG_00N` followed by `[ SUBJECT ]`. No year marks.

## Registry

| ID | Title | Page | Ground truth (public-safe) | Description |
|---|---|---|---|---|
| FIG_001 | Revenue operating layers | `/` | Layer stack of the revenue operating system as built | Exploded stack. Funnel definitions at the base, then lifecycle stages, routing rules, response windows, pipeline inspection, and the executive cadence on top. |
| FIG_002 | Signal to touch | `/` | Signal tiering model: sources, tiers, routing, response windows | Sequence. Signal sources feed a tier assignment, the tier selects a routing path, the path carries a response window. |
| FIG_003 | Lifecycle stages | `/` | CRM lifecycle stage set with entry and exit definitions and handoff owners; vendor unnamed | Grid plane. Columns are the stage set; the three bands are the entry definition, the stage owner, and the exit definition every stage carries. |
| FIG_004 | Attribution join | `/` | Performance ledger join path from session capture to closed revenue | Sequence. Session and source capture, lead record, opportunity, closed revenue, and the single ledger row the join produces. |
| FIG_005 | Approval gate path | `/` | Governed proposal-triage workflow with its human review gate and audit log | Sequence with a gate. Intake, classification, retrieval, draft, a human review gate drawn as a held step, release, audit log. |
| FIG_006 | Claim to publish | `/` | This site's claim register lifecycle | Sequence with a gate. Claim, evidence, tier, approval reference held as a gate, publish surface. |
| FIG_007 | This site | `/` | The portfolio's own stack and content gate | Exploded stack. Typed content modules at the base, the proof-metrics gate, React components, the Tailwind token layer, App Router routes, prerendered HTML. |

| FIG_008 | Revenue operating layers | Chapter, revenue operating system | The same layer stack as FIG_001, at chapter scale, with the written form each layer took | Exploded stack, two label columns. Left names the layer, right names the artifact it exists as: a definitions document, a stage set, a rule table, a response table, inspection screens, a standing review. |
| FIG_009 | Approval gate path | Chapter, governed AI operating layer | The proposal-triage workflow and the audit log every stage writes to | Sequence with a gate over a log strip. Intake, classification, retrieval, draft, the human review gate drawn as a held step, release, with a dashed tie dropping from every stage into the log beneath the run. |
| FIG_010 | Pipeline decay signals | Chapter, pipeline inspection | The three pipeline inspection screens instrumented, and the review they report into | Merge. Close-date drift, stage aging, and non-advancing activity each drawn as a slab, tied into one review slab. Thresholds are held back. |
| FIG_011 | Signal to touch | Chapter, signal-based demand engine | The signal tiering model: one row per tier, each carrying a routing path and a response window | Grid plane. Rows are the tiers, the two columns are what every tier carries. Tier thresholds and window lengths are held back. |
| FIG_012 | Pillar to proof | Chapter, positioning framework | The positioning framework's structure: five pillars, each mapped to a buyer outcome, a proof artifact, and an approval state | Grid plane, five columns and four bands. The pillar-name band is drawn empty because those names are withheld. |
| FIG_013 | Integration sequence | Chapter, post-acquisition marketing integration | The integration stages run on an acquired business, including the regulated-market requirements | Sequence with a gate. Brand consolidation, site merge, lifecycle mapping, a claims review drawn as a held step, jurisdiction requirements. |
| FIG_014 | Performance ledger join | Chapter, marketing analytics architecture | The join path from two source systems into one performance ledger row | Two runs merging. Session and source capture on one run, lead record, opportunity, and closed revenue on the other, both tied into a single ledger slab. |
| FIG_015 | Operating cadence | Chapter, leadership and team operating system | The standing cadence artifacts and their owners | Three slabs spaced by how often each runs, artifact named on the left, owner called out on the right. No period is printed on the drawing; the spacing carries it. |
| FIG_016 | Claim to approval | Chapter, messaging architecture | The claim register lifecycle as it runs on a messaging architecture | Sequence with a gate, starting one step earlier than FIG_006: buyer outcome, claim, evidence, tier assignment, the approval reference held as a gate, published message. |
| FIG_017 | Two function model | Chapter, marketing operating model | The two functions, the inputs each owns, the outputs each ships, and the review gate they share | Two runs merging on a held step. Demand inputs and outputs on one run, narrative inputs and outputs on the other, both tied into the shared gate drawn with the double outline. |
| FIG_018 | Schema to page | Chapter, structured content system | The structured content pipeline from schema to published page | Sequence with a gate. Schema, content record, template, a QA check drawn as a held step, published page. |

| FIG_020 | Portrait | `/about` | The desk in Chicago where the work in this manual was built | Photographic plate rather than a drawing. The desk illustration re-screened as a blueprint-on-paper halftone duotone so it sits in the same ink as the figures. |

| FIG_021 | Layer stack | Chapter, revenue operating system | The operating layers as an assembly: each one defined and stacked in order, none of them free-standing | Rendered plate rather than a hand-drawn figure. Seven uniform flat plates exploded along one vertical axis on four guide posts above a wider base panel, eight slabs in all, no taper from bottom to top. Blueprint line work on flat paper, remapped to the site ink. Generated label-free; the three labels are DOM text placed by `PlateLabels`. Pairs with FIG_008 and never replaces it. Renders as authored in both themes, with no duotone. |
| FIG_022 | Gate | Chapter, governed AI operating layer | The human approval step every run passed, and the record each one left | Rendered plate rather than a hand-drawn figure. An intake tray, three sorting plates, a hinged gate block with a lever arm, and a release chute exploded above one long tray, blueprint line work on flat paper, remapped to the site ink. Generated label-free; the three labels are DOM text placed by `PlateLabels`. Pairs with FIG_009 and never replaces it. Renders as authored in both themes, with no duotone. |

## Generation log

Every generation attempt on a plate, accepted or rejected, with its reason.
Rejection criteria are fixed: any lettering or numeral, any pseudo-label,
leader line, arrow or dimension mark, any light source or cast shadow,
off-palette color, or subject drift from the subject table. A rejected
generation is regenerated, never retouched into compliance.

Attempts are numbered per art direction. The v1 rows below ran under the
superseded halftone-photograph direction; they stand as history and are not
edited. Connor reviewed those two plates at the pilot gate on 2026-08-06 and
redirected the program to label-free exploded blueprint renderings with real
type applied over them, so both files were superseded and regenerated. The
plate a supersession replaces is deleted from `public/`; its log rows are not.

| Figure | Direction | Attempt | Verdict | Reason |
|---|---|---|---|---|
| FIG_021 | v1 halftone | 1 | Rejected | Off-palette. The plate was rendered as a print lying on a brown wooden surface, which puts a third color across the frame. Subject drift as well: it read as a stack of filed folders rather than a binder open flat. |
| FIG_021 | v1 halftone | 2 | Accepted | Two inks only, coarse dot screen intact, binder open flat under a lamp, no legible mark anywhere at full resolution. |
| FIG_021 | v1 halftone | 2b | No output | Second variant of the same request failed in the service before returning an image. Nothing to judge. |
| FIG_022 | v1 halftone | 1 | Accepted | Two inks only, coarse dot screen intact, subject as written, checklist rules and stamp die abstract with nothing readable at full resolution. |
| FIG_021 | v1 halftone | n/a | Superseded | Art direction changed at the pilot gate. The accepted halftone binder was withdrawn and its file deleted. |
| FIG_022 | v1 halftone | n/a | Superseded | Art direction changed at the pilot gate. The accepted halftone checklist was withdrawn and its file deleted. |
| FIG_021 | v2 blueprint | 1 | Accepted, later overturned | Judged by eye as line work on flat paper. Zero-type held. The colour and light claims did not survive measurement (see the correction below) and the plate was superseded. |
| FIG_022 | v2 blueprint | 1 | Rejected | Register drift. The parts came back as solid flood-filled silhouettes on aged cream stock, which does not sit beside the line-work plate accepted for FIG_021 and puts a third tone on the ground. Subject and type were clean; the drawing register was not. |
| FIG_022 | v2 blueprint | 2 | Accepted, later overturned | Judged by eye as matching FIG_021's register. Zero-type held. The register claim did not survive measurement (see the correction below) and the plate was superseded. |

**Correction, round 2.** An independent review measured both v2 plates and
overturned two of the accept reasons above. The notes recorded impressions as
findings. What the pixels said, reproduced with `scripts/plate-measure.py`:

| Claim made | Measured |
|---|---|
| "two inks on flat paper" (FIG_021) | Ground varied 26.4% across the frame with a 21.3% directional falloff into one corner, a flat-light violation. The bottom-right corner sat at L73 against L93 top-left. |
| "no light source" (FIG_021) | Consistent with the falloff above: sourceless light was asserted, not verified. |
| "matching FIG_021's register" (FIG_022) | Stroke medians were 4.0px and 2.0px and ink coverage 2.46% and 1.80%, with object widths 44.1% and 79.6% of frame. The two plates did not read as one program. |
| ink "two inks" on both | Ink chroma measured 21.3 and 16.6 against the site ink's 100.5. Both were desaturated slate, not blueprint blue. |

The lesson is procedural, not cosmetic: an accept note that describes an image
is not evidence. Accept notes from here carry measured values.

| FIG_021 | v3 blueprint | 1 | Accepted | Measured pre-encode; see the round-3 correction below for the shipped-file numbers. Ink hue 297.5° (ref 300.5°), chroma 86.2 after the remap with the darkest pixel exactly `#2E47F1`. Ground chroma 1.5, flatness 0.7%, corner falloff 0.0% across all four blocks. Stroke median 3.0px, coverage 2.17%, object 60.9% of frame width on symmetric margins. Checked at 1:1 on the raw generation before the remap: no glyph, no callout tick, no leader line, no arrow, no dimension mark, no light source, no cast shadow. |
| FIG_022 | v3 blueprint | 1 | Rejected | Ground and type were clean, but the register missed the pair: stroke median 5.0px against FIG_021's 3.0px and object width 73.6% against 60.9%. Held to the same subject line and re-rolled for scale and line weight. |
| FIG_022 | v3 blueprint | 2 | Accepted | Measured pre-encode; see the round-3 correction below for the shipped-file numbers and for the fourth-face reading. Ink hue 296.7°, chroma 82.4 after the remap with the darkest pixel exactly `#2E47F1`. Ground chroma 1.5, flatness 1.0%, corner falloff 0.0%. Stroke median 3.0px, identical to FIG_021; coverage 1.95% against 2.17%; object 58.3% of frame width against 60.9%, margins symmetric. The pair locks on every axis. Checked at 1:1 on the raw generation: no glyph, no annotation mark, no light source, no cast shadow. The subject reads as intake tray, three sorting plates, hinged gate block with lever arm, chute, and the long tray beneath; a fourth plate-like form is the gate block's leading face rather than a fourth sorting plate. |

Both v3 plates went through the two-ink remap in `scripts/plate-recolor.py`
before encoding. It is a deterministic colour step and is recorded here because
it is part of how these files were made: it moves the two endpoints and cannot
add, remove, or reshape a mark. Zero-type, flat light, and subject were all
judged on the raw generation, before the remap ran.

**Correction, round 3.** A judge round re-ran the gates against the files in
`public/case-studies/` rather than the pre-encode PNGs and found two things the
accept notes above got wrong. The rows stay as written; these are the numbers
and the readings that hold.

| Note as written | Shipped file |
|---|---|
| FIG_021 "chroma 86.2, darkest pixel exactly `#2E47F1`" | True of the pre-encode PNG. The file first shipped was a lossy WebP at `-q 88`, a `VP8 ` chunk, and it measured a darkest pixel of `#4049C8` at chroma 72.8 — under the gate of 80. Re-encoded with `cwebp -lossless -m 6`: the shipped `VP8L` file now measures ink hue 297.5°, chroma 86.2, darkest pixel exactly `#2E47F1`, lightest exactly `#FBFBFB`, ground `#F7F8FB` at chroma 1.5, flatness 0.7%, corner falloff 0.0%, stroke median 3.0px, coverage 2.17%, object 60.9% of frame width. 113,758 bytes. |
| FIG_022 "chroma 82.4, darkest pixel exactly `#2E47F1`" | Same failure, same fix. The lossy file measured `#3F49CC` at chroma 70.7. The shipped `VP8L` file measures ink hue 296.7°, chroma 82.4, darkest pixel exactly `#2E47F1`, lightest exactly `#FBFBFB`, ground `#F8F8FB` at chroma 1.5, flatness 1.0%, corner falloff 0.0%, stroke median 3.0px, coverage 1.95%, object 58.3% of frame width. 236,648 bytes. |
| FIG_021 "six flat plates … widest at the bottom, smallest at the top" | The image carries seven uniform plates on four guide posts above a wider base panel, eight slabs in all, and there is no taper: every stacked plate is the same size. The registry row above is corrected to match. The subject line as written was not what the model returned, and the plate was accepted on the drawing rather than on the count. |
| FIG_022 "a fourth plate-like form is the gate block's leading face" | It is the intake tray's raised back wall. The tray at the left of the frame has a tall panel standing up from its back edge, and that panel is what reads as a fourth sorting plate. The gate block sits further along the axis and its faces are part of the housing. Three sorting plates is still the correct count. |

The procedural lesson, added to the spec: acceptance gates run on the file that
ships. A pre-encode measurement describes an artifact no reader receives.

**Program held, 2026-08-06.** Connor stopped the plate program at the pilot
gate: the plates were missing the mark, reading as nonsense against the chapter
copy rather than as a picture of it, and adding nothing. The nine remaining
plates were never generated. `FIG_021` and `FIG_022` stay on disk in
`public/case-studies/` and are unwired from `app/case-studies/[slug]/page.tsx`,
so neither renders. The rows above are kept as history of what was made and how
it was judged, not as a description of what ships. Connor's full verdict is
recorded at the top of §2 in
`docs/superpowers/specs/2026-08-06-visual-elevation-design.md`.

## Reserved

`FIG_019` is reserved for the remaining plate listed in the copy deck's figure
index. Do not reuse this number for anything else.
