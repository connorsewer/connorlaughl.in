# The re-story - approved design - 2026-08-06

Approved by Connor in session, 2026-08-06, from the re-story proposal
(diagnosis, mockups, and research receipts live in the session artifact).
Upstream sources of record: Spine v2 section of the story spine and section 17
of the copy deck, both in the vault. This doc records the decisions and the
build plan; copy lives in the deck, never here.

## Decisions (all Connor, 2026-08-06)

1. **Thesis A.** "I tell stories people remember, and I build the systems
   that make them true." Replaces the current tagline site-wide; the old line
   becomes the `/work` intro.
2. **Identity arc.** Storyteller, tinkerer, operator. The two-noun lockup
   survives only where space demands it (masthead, OG).
3. **Origin naming.** The mentor and the firm named in bank A4 are approved to
   render on `/story`.
4. **Employer naming unlock.** Recorded in the vault story bank, A6. The
   no-naming default (HANDOFF 4A item 3) is resolved for the two names it
   covers. The repo-markdown naming rule in CLAUDE.md is superseded for those
   names and gets amended when the copy ships. Gated values keep their
   postures; the unlock is names, not numbers.
5. **Navigation.** Six items: WORK, BUILDS, WRITING, STORY, RESUME, CONTACT
   button. Colophon repeats them as links.
6. **Routes.** `/case-studies` → `/work` (redirect kept), `/about` → `/story`
   (redirect kept), `/builds` new. `/edge` keeps its route as chapter two of
   the Story section. Longform: display titles only, slugs untouched.
7. **Cover diet.** Thesis + ~90-word intro, one signature figure (FIG_002),
   three doors, contents collapsed to section heads, stat strip, terminal with
   FAQ cut to three, contact, colophon. FIG_001, FIG_003/006, FIG_007 retire
   to their chapters.
8. **`/edge` register shift.** Titles rewritten to spoken register, content
   unchanged.
9. **Build-count unlock.** Approved by Connor 2026-08-06 (bank A7). The count
   enters the register with a named source file in phase 3 and becomes the
   `/builds` headline. Until that row exists, no numeral renders.

## Phases

1. **Spine v2 + deck 17 + bank A4-A6.** Done 2026-08-06, this session.
2. **Recomposition.** Nav, redirects, cover diet, three doors, colophon
   links. No copy beyond deck 17.
3. **`/builds`.** Nine cards per deck 17.5, first-class section, full design
   treatment. Fresh session.
4. **Warm pass.** `/story` writer-years rewrite, `/edge` retitle table,
   longform display titles, FAQ redistribution. DRAFT-AT-BUILD slots in deck
   17 close here.

## Verification, every phase

`npm run lint`, `npm run build`, `npm run proof:guard` (floor must not drop
when routes merge), `npm run voice:scan` against a self-owned prod server,
reduced-motion parity on anything new.
