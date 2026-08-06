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

## Reserved

`FIG_008` onward are reserved for the chapter plates listed in the copy deck's
figure index. Do not reuse these numbers for anything else.
