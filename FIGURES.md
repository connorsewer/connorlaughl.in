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

| FIG_021 | Binder | Chapter, revenue operating system | The written form the operating layers took: a document somebody could open and follow | Halftone plate rather than a drawing. A ring binder open flat on a desk under a lamp, screened as a blueprint-on-paper duotone. Pairs with FIG_008 and never replaces it. |
| FIG_022 | Checklist | Chapter, governed AI operating layer | The human approval step every run passed, and the record each one left | Halftone plate rather than a drawing. A printed checklist on a desk with a rubber stamp and an ink pad beside it, screened as a blueprint-on-paper duotone. Pairs with FIG_009 and never replaces it. |

## Generation log

Every generation attempt on a halftone plate, accepted or rejected, with its
reason. Rejection criteria are fixed: any legible text, any legible numeral,
off-palette color, or subject drift from the subject table. A rejected
generation is regenerated, never retouched into compliance.

| Figure | Attempt | Verdict | Reason |
|---|---|---|---|
| FIG_021 | 1 | Rejected | Off-palette. The plate was rendered as a print lying on a brown wooden surface, which puts a third color across the frame. Subject drift as well: it read as a stack of filed folders rather than a binder open flat. |
| FIG_021 | 2 | Accepted | Two inks only, coarse dot screen intact, binder open flat under a lamp, no legible mark anywhere at full resolution. |
| FIG_021 | 2b | No output | Second variant of the same request failed in the service before returning an image. Nothing to judge. |
| FIG_022 | 1 | Accepted | Two inks only, coarse dot screen intact, subject as written, checklist rules and stamp die abstract with nothing readable at full resolution. |

## Reserved

`FIG_019` is reserved for the remaining plate listed in the copy deck's figure
index. Do not reuse this number for anything else.
