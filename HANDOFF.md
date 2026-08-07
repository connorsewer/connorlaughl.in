# ADDENDUM 2026-08-06 (late night): phase 3 shipped, `/builds` is live

The Builds section replaced its reserved page. The bank-A7 count entered
`content/proof-metrics.ts` as `buildsHeadline` (sourced to the build-evidence
file, scoped to the `/builds` headline) and HANDOFF 4A item 4's unlock is
resolved; the confirmation half of item 4 (the eight kept chapter values) is
still open. Nine cards render deck 17.5 verbatim over FIG_023, with statuses
and eras from `content/builds-metadata.json` (regenerate:
`node scripts/builds-metadata.mjs`). Builds is contents section 2; The
operator, Writing, Resume and the Appendix renumbered to 3, 4, 5, 6, and every
route that names its own section number was updated in the same commit.
CLAUDE.md's naming rule now records the A6 unlock. Verified: build green,
proof:guard 6 renderers over floor 4, voice scan 0 findings on 26 routes
against a self-owned prod server, headers intact, dark tokens confirmed on the
new route. One flag for Connor: the only public hermes-agent repository under
his account is an unmodified fork of NousResearch/hermes-agent, so that card
(approved copy, rendered verbatim) carries no repository link; the mcOS,
DebtNext and this-site cards link to their public repos, verified 2026-08-06.
Phase 4 (warm pass) is next.

# ADDENDUM 2026-08-06 (night): the re-story is approved

Connor approved the re-story design in session. Read
`docs/superpowers/specs/2026-08-06-restory-design.md` first: it records the
thesis, the identity arc, the naming unlocks (details in the vault story bank
A4-A6), the six-item nav, the route renames, and the cover diet. Upstream copy
is written and final in Spine v2 and copy deck section 17 (vault). Phase 1
(spine, deck, bank) is done. Next session starts Phase 2 (recomposition), then
Phase 3 (`/builds`, the showpiece, wants a fresh context), then Phase 4 (warm
pass). HANDOFF section 4A item 3 (employer naming) is resolved by bank A6;
item 4 (build-count unlock) is still open and gates the `/builds` headline.

# ADDENDUM 2026-08-06 (evening): elevation + wow session

Ten commits, `2d2247f0..411c0ac4`, on `redesign/manual`. Connor's standing
directive this session (recorded in session memory as `wow-mandate`): repo
design conservatism is negotiable; the claim gate and voiceDNA are not.

**Shipped.** Engine fixes (true 1.25px strokes, coherent draw-on, no stranded
labels, layout-effect parks, transform-only checker); a working terminal under
the cover FAQ (help/ls/open/theme/whoami, one earned easter egg); chrome
elevation (theme wipe via View Transition, Lenis anchor glide, rebuilt
scroll-spy, live TOC rows, scrimmed mobile contents sheet, one-line wordmark at
390); dark surfaces (luminous sheet rim, cyanotype teal, visible paper grid,
ratios recorded); markdown renderer fixes and a formatted planner; page
recomposition (three cover figure registers, OUTCOME above the fold, foot nav
on every route, index and resume proof blocks, /edge in three acts, errata
404); living figures (signal packets after draw-on, hover lift, drafting
crosshair); x-ray mode (self-annotating page, all values measured live);
micro-delights (wordmark scramble, scrubbable ruler, Konami operator mode,
404 pencil test).

**Verification.** Prod build green, voice scan 0/24 against prod, proof:guard
5 renderers over floor 4, security headers intact, console clean, adversarial
review verdict FIX-THEN-SHIP with all three P1s fixed and re-verified,
impeccable detector empty, reduced-motion outcome parity confirmed on every
new surface.

**Still open from the original list.** Everything in section 4A (Connor's
gating calls) is untouched. The plate-program hold stands. Longform foot nav
was deliberately skipped (renderer-count coupling); TOC section-2/4/5 kind
tokens shipped instead of counts.

# HANDOFF: connorlaughl.in, consolidated 2026-08-06

**For:** Connor, and any session that picks the repo up after him.
**Working directory:** `/Users/connorlaughlin/clawd/career/portfolio-v2`.

This file replaces the append-style continuation notes that accumulated across
the long session. It is one coherent statement of where the branch stands, what
still needs a call from Connor, and where everything lives. Nothing here is
gated: no claim value, no employer name, no client name.

---

## 1. Current state

**Branch.** `redesign/manual`, branched from `c3715337`, 60 commits ahead of
local `main`. Working tree clean as of this commit.

**Posture.** Nothing was pushed, merged, deployed, or published. Every artifact
is a local commit on the branch. Local `main` is ahead 1 and behind 8 versus
`origin/main`, and that drift predates all of this work and was deliberately
left alone.

**Shape of the 60.** Thirty-eight commits are the manual redesign through its
wrap at `c409fed5`. Twenty-two are the wave session that followed.

### The redesign (38 commits, `26e5be6e` through `c409fed5`)

The site was rebuilt as a reference manual: a light-first blueprint system with
a cover page, numbered chapters, drawn SVG figures, and a claim gate every
number on the site passes through. The old cream-and-ink editorial system is
gone, along with the hero, the WebGL plate, the impact ledger, the custom
cursor, and the walnut frames.

Copy flowed one way only: vault sources, then a story spine, then a copy deck,
then the pages. No page copy was written fresh. Both upstream documents live in
the vault and both passed adversarial review.

What shipped: light values on `:root` with cyanotype dark under `html.dark` and
the theme toggle as a printed setting; Newsreader body serif self-hosted in four
weights; a cover with masthead, checker band, drop cap, seven drawn plates, a
five-section table of contents with build-computed word counts, stats, terminal
FAQ, contact and colophon; eleven case-study chapters plus a strategy memo, four
long-form pieces, the operator page, resume, about appendix, capacity planner,
Section 1 index and a manual 404, all on shared chapter chrome; twenty-one
registered figures `FIG_000` through `FIG_020`, all drawn SVG except the
portrait; the claim gate in `content/proof-metrics.ts` with a guard script that
discovers renderers dynamically; three OG routes, blueprint pixel icons at three
sizes, structured data and metadata rewritten to numeral-free strings.

Every phase gate ran with a fresh reviewer agent under a two-round cap and all
seven passed. Notable catches: internal identifiers reaching the production
payload through React keys on one route, a legacy unlayered rule pinning the
skip link to one pixel on focus site-wide, and two prose magnitudes typed as
literals instead of resolving through the gate.

### Wave A, identity and docs (`a64d6904`, `1e9f8272`, `ce455059`)

Full name to Connor J. Laughlin site-wide. The design-language credit came out
of the colophon at Connor's call. Historical docs moved to `docs/archive/` under
a single-entrypoint structure.

### Wave B, claim scope and style (`a1da60a4`, `595e4bb6`, `eadd8e0c`)

A copy audit of the built site produced 102 findings. The structural verdict was
that the pages read as a mish-mash across five repeating copy slots. Two work
streams followed.

**Claim-scope enforcement (`a1da60a4`).** Chapter proof blocks were rendering
values the register and the story spine exclude. The root cause was register
drift: one internal-only row was wearing a drifted claim ID together with an
approved-exact posture, so the guard saw a well-formed `show` and passed it.
Thirty-seven rendered values were adjudicated one at a time, eight kept, eight
softened to an approved categorical or shape form, twenty-one dropped, and every
claim ID was corrected against the register. The values excluded from the
acquired-product chapter were withheld from source as well as from render. The
retired `impactLedger` export was removed. The guard was extended to close the
exact combination that shipped: `proof:guard` now fails a `show` posture whose
claim ID, posture, or source note maps to an internal-only, target, projected,
company-level, or excluded register row.

**Style rewrite (`595e4bb6`, `eadd8e0c`).** Deck-first, author plus reviewer
pair. Eleven `/edge` signature lines replaced so each names an artifact that
exists, carries a verb, and takes a different grammatical shape from its
neighbours. The chapter `Why it mattered` slot became optional, six chapters
dropped it and five were rewritten. Eleven `What it proves` slots became
evidence pointers. Nine negative parallelisms cleared. Seventeen figure captions
replaced. Two long-form result tables de-hedged, with emoji stat labels, the
bolded-term bullet run and the "Challenges overcome" formula removed.

Round one failed 6/10 on claim provenance. Connor ruled on the flagged lines and
`eadd8e0c` applied it: three signature facts he attested directly on 2026-08-06
are now sourced in the vault story bank under "Connor-attested additions", with
the spine pointing there; one unattested signature was cut and rewritten from
attested material; the `/edge` route scoping for one claim was authorized and
the spine's where-used column amended; the cover pipeline value was conformed to
the spine's approved string. Wave B closed at PASS 8.5/10.

### Wave C, motion and plates

**Motion program: shipped and approved.** Phases 0 through 2 landed in
`e1aeb543`, `6ca88b5a` and `ae1aff5f`, and Connor approved them at the phase-2
taste gate. Four primitives (`drawOnProgress`, `statTick`, `labelSettle`,
`rulerBreathe`), the `RulerRail` rewrite off its hand-rolled per-frame layout
write and onto a transform bound to motion's `scroll()`, `data-leader-group` on
`LeaderLabel`, a `StatTable` client wrapper, and the three zero-caller
primitives resolved. Reduced motion is outcome parity: the same finished page,
the same information, only the transition into it is lost.

**Plate program: on hold.** Two pilot plates were generated, judged, rejected,
re-rolled and re-judged across three rounds, and the final pair passed every
measured gate on colour, ground flatness, register and zero type. Connor stopped
the program at the pilot gate. His verdict, verbatim:

> "I think the plates are missing the mark. They're nonsensical and don't
> actually represent the narrative content and copy visually. they add nothing.
> let's put a hold on the plate images for now."

`6b216f82` acted on it reversibly. The remaining nine plates were never
generated. The two pilot files stay on disk in `public/case-studies/` and the
`PlateLabels` component stays in `components/figures`, but `chapterPlates` in
the chapter route is an empty table and the mounts are gone, so no chapter
renders a plate. Refilling the table brings the pilots back. The cover ambient
loop in spec §3 is held on the same call, since it is the same generated-imagery
program.

**State of the tree.** Lint clean apart from one pre-existing warning. Build
green. Proof guard green. Voice scan clean with an empty baseline.

---

## 2. Verification commands

All local, none touch the network.

```bash
npm run lint
npm run build
npm run proof:guard
npm run words -- --json
```

The voice scan needs a running server, so it goes in two steps. Dev:

```bash
npm run dev                      # background
npm run voice:scan               # defaults to http://localhost:3000
```

Production smoke, which is the one that matters before any deploy decision:

```bash
npm run build && npm run start   # background
npm run voice:scan -- --base http://localhost:3000
curl -sI http://localhost:3000/ | head -20        # security headers
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
```

Two operating notes learned the hard way. Run the voice scan against a server
you started yourself on a port you own: a round-one scan passed against a stale
server owned by another process and missed a banned word that had shipped.
`npm run voice:scan` exits nonzero on any finding not already in
`scripts/voice-scan-baseline.json`, and that file is empty and should stay
empty. `npm run proof:guard` fails if any file resolves a gated value without
going through `renderableProofMetrics()`, if the renderer count drops below the
floor, or if a `show` posture maps to a register row that excludes it.

Plate authoring tools are standalone Python needing `pillow` and `numpy`, and
none of them runs in CI. They are dormant under the hold.

---

## 3. Deploy path (not executed)

**None of this was run.** Merging, pushing, and deploying are explicitly
Connor's calls, and the origin drift has to be settled first.

1. Settle the origin drift. `main` is ahead 1 and behind 8, so decide whether
   the local commit belongs on the remote and whether the 8 remote commits
   belong in this branch before merging anything.
2. Answer the gating decisions in section 4A. Two of them affect what the public
   site says about claims.
3. Rebase or merge `redesign/manual` onto a reconciled `main`, then re-run every
   command in section 2 on the merged tree. The branch has never been built on
   top of the 8 remote commits.
4. Production smoke locally, headers included.
5. Push, then deploy through Vercel.

---

## 4. Open decisions for Connor

Everything still waiting on a judgment call, deduplicated across the whole
session and ordered by what it blocks. Nothing here is a bug that stops the site
working.

### A. Gating: answer before merge or deploy

1. **Deploy go or no-go.** The whole run is local. Nothing is published. Section
   3 has the sequence. Every item below is cheaper to settle before the first
   deploy than after it.

2. **Origin drift.** Local `main` is ahead 1 and behind 8 versus `origin/main`,
   unreconciled by design. The branch was cut from local `main` and has never
   seen the 8 remote commits. Decide the reconciliation before merging.

3. **Employer naming, three linked calls that are best made together.** The
   standing decision holds employer naming for portfolio proof lanes, so the
   default taken everywhere was no naming. Three places strain against it.
   First, a resume with no employer name reads noticeably odd, and Connor's own
   approved outreach copy names the employer. Second, the site-overhaul chapter
   names a company domain in two rendered strings, which identifies the employer
   as plainly as the employer name would. Third, one chapter's public URL slug
   carries an acquired product name that is otherwise held, and the same name
   appears in a vault resume variant. Naming is cheap to add and expensive to
   retract; the slug is the one piece that breaks existing links if it changes.

4. **Exact-metric scope, mostly settled, two pieces left.** The audit's option 3
   plus the per-value pass shipped in `a1da60a4`: the exact pipeline value is
   off the chapter routes and lives on the cover alone per DECISIONS Gate 1, and
   thirty-seven rendered values were adjudicated with eight kept, eight softened
   and twenty-one dropped. What remains is a confirmation and an unlock. The
   confirmation: the eight kept exact values on chapter routes are the scope
   Connor is comfortable publishing, adjudicated against the register but never
   ruled on by him. The unlock: the counted build artifacts from this year are
   the single best answer to "is he really hands-on", and the source file is not
   in the authoritative approval set, so the site can only gesture at it with a
   numeral-free capability statement. One line of approval releases it for the
   site, the FAQ, and every cover letter. Both the spine and the copy deck
   record this as the place the gate cost the most.

5. **Two cover lines the audit wants changed and the spine locks.** Both are
   verbatim canonical phrasings, so deviating from them needs Connor rather than
   an author. The first is the "Nothing here was inherited" block, which the
   audit rates a style finding for its negative listing and proposes replacing
   with a plain statement of being the first digital marketing hire; its third
   sentence should go regardless, since that metaphor now appears nowhere else.
   The second is the claim-register line, which the audit proposes rewriting to
   carry the tier and approval reference instead of the negative second
   sentence. Held with them: the audit's flag on one intensifier in two approved
   claim phrasings, which is a claim-language request rather than a copy edit.
   Deck section 16.8 has all three written out.

### B. Program decisions

6. **Plate program: revisit or abandon.** The hold is reversible and currently
   costs nothing. If it is revisited, the spec is intact and the three rounds of
   measured gates are recorded, so a fourth round starts from a working pipeline
   rather than from scratch. The judge's read across the rounds was that the
   craft problem was solved (colour, light, register and zero type all held) and
   the subject problem was not: the plates depicted abstract mechanisms that did
   not connect to the chapter copy. If it is abandoned, the two pilot files, the
   `PlateLabels` component, the empty `chapterPlates` table and three Python
   scripts come out, and the reserved figure numbers get a closing note. Until
   one or the other, the repo carries a dormant program.

7. **Cover ambient loop.** Held on the same call as the plates, since it is the
   same generated-imagery program. It is specified end to end in spec §3 and was
   never generated. It also needed a blueprint-direction style pass before it
   would have gone to a gate.

8. **`/edge` lost its hero thesis, stake block and closing copy.** The deck
   supplies a page intro that replaces them, so the old thesis, stake line,
   closing moat and thesis diagram no longer render. The wording is retained in
   the content module under a historical comment and is recoverable in minutes.
   Worth knowing: the umbrella positioning line that used to open that route now
   appears only on the cover.

9. **HireSignal and NowFeed were deleted.** No deck-approved copy covered
   either component, so both were retired along with their content modules
   rather than re-skinned. Restoring them means writing new approved copy, which
   is more than a revert.

10. **Section 3 contents titles duplicate Section 1 chapter titles.** Four
    long-form pieces sit under titles that read very close to their case-study
    counterparts in the contents. Left for Connor because renaming touches the
    markdown source files and their slugs.

11. **Portrait plate in the cover colophon.** The plan called for the portrait
    in two places and it shipped in one, on the about chapter. The cover had
    already passed its gate without it. The asset is in the repo and the
    placement is a few lines either way.

12. **`FIG_019` is reserved and unused.** It was held for a plate in the copy
    deck's figure index that was never drawn, and the numbering ran past it to
    the portrait and then to the plate program. Under the hold it stays
    reserved. Whoever settles decision 6 should settle this at the same time,
    since the two reserved ranges close together or not at all. The registry
    note now says so.

### C. Design and polish

13. **`/case-studies` header alignment.** That route's header is left-aligned
    while the other four chapter-header consumers are centered. It may well be
    right for an index page rather than a chapter, which is why it was not
    fixed. One-line call.

14. **Focus-ring contract.** The written contract asks for a blueprint ring
    everywhere. In practice the contents links and a couple of buttons ring in
    body ink, which is comfortably visible and looks deliberate. Either tighten
    the contract to match the build or make the ring one colour.

15. **Chapter meta separator.** The meta line renders as "N words by CONNOR J.
    LAUGHLIN" where the deck specifies the mono pipe form. The component is
    shared by every chapter, so it was not changed under a single route.

16. **Figure leader labels at phone width** render at roughly four pixels, which
    matches the reference and is unreadable. The visible serif caption under
    every plate states the claim in words, so nothing is lost, but the labels
    may be better dropped below a breakpoint than shrunk.

17. **Long-form bold-term runs.** The `Role:` and `Timeline:` style lines in the
    long-form markdown are the construction voiceDNA bans. They predate the
    redesign and rewriting them means rewriting the source documents.

18. **Capacity planner input formatting.** The revenue input renders raw,
    without thousands separators or a currency affix on the field itself.

19. **`/edge` anchor ids start with digits**, which is legal in HTML5 and
    awkward in CSS selectors. Changing them breaks every existing deep link into
    that page.

20. **Figure caption and rail text triplication.** At desktop width a plate's
    claim appears in the rotated rails, in the visible caption, and in the SVG
    description. That is the accessibility contract working as designed, and it
    reads as repetitive to a sighted desktop reader.

21. **`statTick` runs narrower than the spec's worked example.** The spec fixes
    the gate at a regex admitting no letters, so a value carrying a magnitude
    suffix renders static, and the spec's own currency-floor example uses a
    suffixed value the regex excludes. Implemented literally, which is the
    conservative outcome: only plain and grouped counts tick today. Widening the
    regex widens what an animation is allowed to touch, so it was flagged rather
    than silently changed.

### D. Housekeeping

22. **The legacy `bullets` field in `content/case-studies.ts`.** It was flagged
    as a latent leak because it carried exact values as literals while nothing
    rendered or imported it. `a1da60a4` withheld those values from source, so no
    magnitude remains in the file. What is left is dead code on an ungated path:
    delete the field or route it through the gate before anything renders it.

23. **Dirty-file dispositions.** Four of the five files dirty at the start of
    the redesign were rewritten by tasks the spec required: the operator route
    page, its OG image, the operator mobile chip (deleted, since the shared
    layout's disclosure replaces it), and one case-study markdown body. Every
    rewrite is logged. Connor's versions of all five, including the previous
    `HANDOFF.md`, are in `docs/archive/pre-redesign-dirty.patch`. Nothing was
    lost and nothing was merged, so any in-progress work that mattered needs
    re-applying by hand.

24. **Fifty-one orphaned raster assets.** Chapter plates, the personal photo set
    from the old about page, old hero stills, divider bands, memo plates, plus
    five framework starter SVGs at the root of `public/`. Nothing was deleted.
    The full table is in the overnight log. Two notes worth repeating: the
    about-page photo set is the only warm human imagery the site ever had, and
    the desk portrait in the hero directory is still live, so do not sweep that
    directory wholesale.

25. **The original grayscale desk image is unreferenced** now that the halftone
    plate replaced it. Left in place because it is Connor's asset. Delete
    whenever the plate is settled.

26. **One lint warning survives**, an unused parameter in the header module. It
    predates this work and touching that file means touching the security-header
    path.

27. **The vault-side resume system was audited and nothing was applied.** The
    alignment audit carries per-file edits for the two lane variants, the cover
    letter operating system and the one-page narrative, plus a recommendation to
    generate a canonical base resume from the deck's resume block rather than
    from the master profile so the public and submitted resumes cannot drift. It
    has its own order of operations, and its first three steps are decisions 3
    and 4 above, so it unblocks when they do.

---

## 5. Where things live

| Path | What |
|---|---|
| `docs/superpowers/specs/2026-08-06-visual-elevation-design.md` | Wave C spec v3. The plate hold and Connor's verbatim verdict are at the top of §2 |
| `docs/superpowers/plans/2026-08-06-wave-c-phase-log.md` | Wave C phase log, phases 0 to 2, with gate results and deviations |
| `docs/superpowers/reference/` | Cover and chapter reference screenshots at both widths |
| `docs/archive/2026-08-05-overnight-log.md` | The redesign's full narrative record, phase by phase |
| `docs/archive/2026-08-05-makingsoftware-redesign-plan.md` | The 21-task redesign plan as executed |
| `docs/archive/2026-08-05-makingsoftware-redesign-design.md` | The redesign spec, v3.1 |
| `docs/archive/pre-redesign-dirty.patch` | Verbatim backup of the five pre-redesign dirty files |
| `FIGURES.md` | Append-only figure registry, ground truths, generation log, the round-3 correction, the hold note |
| `CLAUDE.md`, `DESIGN.md`, `voiceDNA.md` | Authority for the manual system, the motion catalog, and voice |
| `content/proof-metrics.ts` | The claim gate. Every gated numeral resolves here |
| `content/case-studies.ts` | Chapter content, including the empty `chapterPlates` consumers and the legacy `bullets` field |
| `scripts/check-public-proof-metrics.mjs` | The guard, with its renderer floor, the justification rule, and the register-drift check added in Wave B |
| `scripts/voice-scan.mjs`, `scripts/word-counts.mjs` | Voice scan and build-time word counts |
| `scripts/plate-measure.py`, `plate-recolor.py`, `plate-anchors.py` | Plate authoring tools, dormant under the hold |
| `lib/motion-manual.ts` | The shipped motion primitives and their specs |
| `VAULT/Resume & Positioning/Portfolio Story Spine - 2026-08-05.md` | Upstream source for all site copy, plus the Connor-attested facts subsection |
| `VAULT/Resume & Positioning/Portfolio Copy Deck - 2026-08-05.md` | Route-by-route copy applied verbatim. Section 16 is the Wave B rewrite, 16.8 the held cover lines |
| `VAULT/Resume & Positioning/Portfolio Copy Audit - 2026-08-06.md` | The 102-finding audit. Section 5E has the per-value claim verdicts, section 8 the style findings |
| `VAULT/Resume & Positioning/Portfolio-Resume Alignment Audit - 2026-08-05.md` | Resume-system recommendations, applied to nothing |
| `VAULT/Resume & Positioning/Career Story Bank and Armory Proof Blocks.md` | Story bank, including the Connor-attested additions from 2026-08-06 |

`VAULT` is `~/Documents/CJL Vault/04 Domains/Career`.
