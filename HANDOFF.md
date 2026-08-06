# HANDOFF: connorlaughl.in, refreshed 2026-08-06

**For:** Connor, first thing in the morning, and any session that picks the repo up after him.
**Working directory:** `/Users/connorlaughlin/clawd/career/portfolio-v2`.
**Branch:** `redesign/manual`, 37 commits ahead of local `main`, branched from `c3715337`.
**Posture:** nothing was pushed, merged, deployed, or published. All work is local commits on the branch.

> **Note on this file.** Your in-progress version of `HANDOFF.md` (the `/edge`
> route handoff, refreshed 2026-06-16) was one of five dirty files at the start
> of the overnight run. It is preserved verbatim in
> `docs/superpowers/pre-redesign-dirty.patch` and can be restored with
> `git apply --include=HANDOFF.md docs/superpowers/pre-redesign-dirty.patch`
> against `c3715337`-era content. This rewrite is the single sanctioned touch of
> that file, and it happened because the plan's final task owns it.

---

## 1. What happened

The site was rebuilt as a reference manual: a light-first blueprint system with
a cover page, numbered chapters, drawn SVG figures, and a claim gate that every
number on the site has to pass through. The old cream-and-ink editorial system
is gone, along with the hero, the WebGL plate, the impact ledger, the custom
cursor, and the walnut frames.

Content flowed one way and only one way: vault sources → a story spine → a copy
deck → the pages. No page copy was written fresh. Both upstream documents live
in the vault under `Resume & Positioning/` and both passed adversarial review.

Full narrative record, decision by decision, is in
`docs/superpowers/2026-08-05-overnight-log.md`. The plan is
`docs/superpowers/plans/2026-08-05-makingsoftware-redesign.md` and the spec is
`docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md` (v3.1).

## 2. Branch and commit state

Local `main` is **ahead 1, behind 8** versus `origin/main`. That drift predates
the overnight run and was deliberately not reconciled. No pull, merge, or rebase
was performed. See morning decision 1.

`redesign/manual` carries 37 commits from `c3715337`:

| Range | What |
|---|---|
| `26e5be6e..ea2ce5f2` (9) | Spec v1 to v3.1, plan v1 to v2.1, phase-0 dirty-file patch backup, gitignore hygiene |
| `11a54df0..6e33aad3` (6) | Phase 2 foundation: light-first tokens, body serif, manual chrome, figure primitives, guard and measurement scripts, specimen page |
| `1e83198f`, `e796d8bf`, `52aee5f7` | Phase 3 cover, plus its two gate fix rounds |
| `4c065c98`, `1131a468`, `aae3278d`, `c82d484c`, `533ec90b` | Phase 4 chapter chrome, case-study conversion, 11 chapter figures, gate fixes |
| `da14986a..f37068e7` (6), `5e1372ca` | Phase 5 route conversions (resume, edge, about, longform, tools, index, 404) and gate fixes |
| `a698c7d1` | Phase 6a metadata: three OG routes, icons, structured data |
| `4c2d3a05`, `4a323263`, `3389d531` | Cyanotype dark mode, legacy deletion, docs rewrite |
| `a671e3b0`, `ebaaaac9`, `caee1566` | Portrait plate, final QA, QA decision log |

Only one file is dirty in the tree right now: this one, plus the overnight log,
both committed together as the last commit of the run. The other four files that
were dirty at the start were each consumed by a task that the spec required to
rewrite them. See morning decision 20.

## 3. What shipped

**Foundation.** Light values on `:root`, cyanotype dark under `html.dark`, theme
toggle restored as a printed setting rather than a lamp icon. Newsreader body
serif self-hosted in four weights. Geist Sans, Mono and Pixel for chrome and
labels, GT Sectra retired from body use. The stylesheet went from 971 lines to
391 after the legacy sweep.

**Cover.** Masthead lockup, checker band, drop-cap intro, seven drawn plates,
five-section table of contents with build-computed word counts, stats block,
terminal-style FAQ, contact, colophon.

**Chapters.** Eleven case studies plus a strategy memo, four long-form pieces,
the operator page, the resume, the about appendix, the capacity planner, the
Section 1 index, and a manual-styled 404. All on shared chapter chrome: compact
masthead, sidebar contents, breadcrumb with prev and next, white sheet, ruler
rail, colophon.

**Figures.** Twenty-one registered plates, `FIG_000` through `FIG_020`, all
drawn SVG except the portrait, which is a halftone treatment of the existing
desk photograph. Every one is ground-truthed to a real system in
`FIGURES.md`, carries `role="img"` with a title and description, and states its
claim in words in a visible caption.

**Claim gate.** Every gated numeral on every route resolves through
`renderableProofMetrics()` in `content/proof-metrics.ts`. Prose magnitudes
resolve through a token registry rather than being typed as literals. The guard
script discovers renderers dynamically instead of carrying a path list.

**Metadata.** Three OG routes in the manual system with real fonts, blueprint
pixel monogram icons at three sizes, structured data and site metadata rewritten
to the deck's numeral-free strings, title template so a chapter reads as itself.

## 4. Gates passed

Every phase gate ran with a fresh reviewer agent and a two-round cap.

| Phase | Result |
|---|---|
| 1a spine | PASSED round 2, 9/10 |
| 1b copy deck | PASSED round 2, 8/10 |
| 2 foundation fidelity | PASSED round 2 |
| 3 cover | PASSED round 2 |
| 4 chapters | PASSED round 2 |
| 5 remaining routes | PASSED round 2, with an independently verified production leak grep at zero |
| 6 exit, final QA | Full spec checklist run, every line recorded in the log |

Notable catches the gates made rather than missed: internal identifiers reaching
the production payload through React keys on one route (fixed and verified
against a real production build), a legacy unlayered rule that had been pinning
the skip link to one pixel on focus across the whole site, and two prose
magnitudes that had been typed as literals instead of resolving through the gate.

Final QA state as of `ebaaaac9`: lint clean apart from one pre-existing warning,
build green with 43 pages prerendered, proof guard green at four renderers on a
floor of four, voice scan clean across 24 routes with an empty baseline in both
dev and production, security headers present on the production response, reduced
motion and keyboard passing on cover, chapter and resume, contrast recomputed in
both themes. Nothing has changed in `app/`, `components/`, `content/`, `lib/` or
`scripts/` since that commit.

## 5. Verification commands

Run these before doing anything with the branch. All are local and none touch
the network.

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
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/            # and each route
```

`npm run voice:scan` exits nonzero on any finding not already in
`scripts/voice-scan-baseline.json`. That file is currently empty and should stay
empty. `npm run proof:guard` fails if any file resolves a gated value without
going through `renderableProofMetrics()`, or if the renderer count drops below
the floor.

Morning screenshot set: 54 captures, every route at desktop and phone width,
with cover, a chapter, the resume and the about page also in dark, saved under
`final/` in the session scratchpad.

## 6. Deploy path (not executed)

**None of this was run.** Merging, pushing, and deploying are explicitly your
calls, and the origin drift in section 2 has to be settled first.

The sequence, when you want it:

1. Settle the origin drift. `main` is ahead 1 and behind 8, so decide whether the local commit belongs on the remote and whether the 8 remote commits belong in this branch before merging anything.
2. Answer the gating morning decisions, at minimum 3, 4, 5 and 6 in section 7. Two of them affect what the public site says about claims and one of them is a latent leak.
3. Rebase or merge `redesign/manual` onto a reconciled `main`, then re-run every command in section 5 on the merged tree. The branch has never been built on top of the 8 remote commits.
4. Production smoke locally, headers included.
5. Push, then deploy through Vercel.

## 7. Morning decisions

Twenty-three items, gathered from the whole overnight log plus the spine and
copy-deck self-audits. Grouped by what they block. Nothing here is a bug that
stops the site working; every one is a judgment call an agent declined to make
on your behalf.

The vault-side counterparts, including the per-file resume edits, are in
`Resume & Positioning/Portfolio-Resume Alignment Audit - 2026-08-05.md`, written
as part of this task and applied to nothing.

### A. Gating: answer before merge or deploy

1. **Origin drift.** Local `main` is ahead 1, behind 8 versus `origin/main`, unreconciled by design. The branch was cut from local `main` and has never seen the 8 remote commits. Decide the reconciliation before merging.

2. **Deploy go or no-go.** The whole run was local-only. Nothing is published. Section 6 has the sequence.

3. **Employer naming on `/resume` and `/about`.** The standing decision holds employer naming for portfolio proof lanes, so the default taken everywhere was no naming. A resume with no employer name reads noticeably odd, and your own approved outreach copy names the employer. Cheap to add, expensive to retract. This is the spine's first open item.

4. **Exact-metric scope on the chapter routes.** The biggest one. The spine says one exact value appears anywhere on the site, on one route. That is true of the cover and false of the chapters: seven case-study routes render exact outcome values in their proof blocks, including, on one chapter, the same exact value the spine scopes to the cover only. This is not a guard failure. Every one of those values resolves correctly through the gate; the postures in `content/case-studies.ts` predate the standing decision that holds exact metrics for public routes and were never revisited. Three options and a recommendation are laid out in section 4 of the alignment audit. Whichever you pick, the per-value pass is the part that cannot be skipped, because some of those values sit on directional and company-level postures and one belongs to a register row in the excluded set.

5. **The acquired-product URL slug.** One Section 1 chapter's public URL path carries an acquired product name that is otherwise held. Renaming it breaks existing links, so it was left alone and flagged. The same name also appears in a vault resume variant, so the two decisions are best made together.

6. **Dead narrative bullets holding literal magnitudes.** A field in the case-study content module still carries exact values as literals. Nothing renders it and nothing imports it, verified across the whole tree, so nothing escapes the gate today. It is a latent leak the moment somebody renders that field. Delete it or route it through the gate.

7. **Build-volume evidence unlock.** The counted build artifacts from this year are the single best answer to "is he really hands-on", and the source file is not in the authoritative approval set, so the site can only gesture at it with a numeral-free capability statement. Both the spine and the copy deck record this as the place the gate cost the most. One line of approval from you unlocks it for the site, the FAQ, and every cover letter.

### B. Content restoration and placement

8. **`/edge` lost its hero thesis, stake block and closing copy.** The deck supplies a page intro that replaces them, so the old thesis, stake line, closing moat and thesis diagram no longer render. The wording is retained in the content module under a historical comment and is recoverable in minutes. Consequence worth knowing: the umbrella positioning line that used to open that route now appears only on the cover.

9. **HireSignal and NowFeed were deleted.** No deck-approved copy covered either component, so both were retired along with their content modules rather than re-skinned. Restoring them means writing new approved copy, which is more than a revert.

10. **Portrait plate in the cover colophon.** The plan called for the portrait in two places and it shipped in one, on the about chapter. The cover had already passed its gate without it and there was no reviewer awake to judge whether a plate at the foot of the cover helps or crowds it. The asset is in the repo and the placement is a few lines either way.

11. **Section 3 contents titles duplicate Section 1 chapter titles.** Four long-form pieces sit under titles that read very close to their case-study counterparts in the contents. Deliberately left for you because renaming touches the markdown source files and their slugs.

### C. Design and polish

12. **`/case-studies` header alignment.** That route's header is left-aligned while the other four chapter-header consumers are centered. It may well be right for an index page rather than a chapter, which is why it was not "fixed". One-line call.

13. **Focus-ring contract.** The written contract asks for a blueprint ring everywhere. In practice the contents links and a couple of buttons ring in body ink, which is comfortably visible and looks deliberate. Either tighten the contract to match the build or make the ring one colour.

14. **Chapter meta separator.** The meta line renders as "N words by CONNOR J. LAUGHLIN" where the deck specifies the mono pipe form. The component is shared by every chapter, so it was not changed under a single route.

15. **Figure leader labels at phone width** render at roughly four pixels, which matches the reference but is unreadable. The visible serif caption under every plate states the claim in words, so nothing is lost, but you may want the labels dropped below a breakpoint rather than shrunk.

16. **Long-form bold-term runs.** The `Role:` and `Timeline:` style lines in the long-form markdown are the "bold-term: definition" construction voiceDNA bans. They pre-date the redesign and were not rewritten because rewriting them means rewriting the source documents.

17. **Capacity planner input formatting.** The revenue input renders raw, without thousands separators or a currency affix on the field itself.

18. **`/edge` anchor ids start with digits**, which is legal in HTML5 and awkward in CSS selectors. Changing them breaks every existing deep link into that page.

19. **Figure caption and rail text triplication.** At desktop width a plate's claim appears in the rotated rails, in the visible caption, and in the SVG description. That is the accessibility contract working as designed, and it reads as repetitive to a sighted desktop reader.

### D. Housekeeping

20. **Dirty-file dispositions.** Four of the five files that were dirty at the start were rewritten by tasks the spec required: the operator route page, its OG image, the operator mobile chip (deleted, since the shared layout's disclosure replaces it), and one case-study markdown body (edited in the long-form claim pass). Every rewrite is logged. Your versions of all five, this file included, are in `docs/superpowers/pre-redesign-dirty.patch`. Nothing was lost, but nothing was merged either: if any of that in-progress work mattered, it needs re-applying by hand.

21. **Fifty-one orphaned raster assets.** Chapter plates, the personal photo set from the old about page, old hero stills, divider bands, memo plates, plus five framework starter SVGs at the root of `public/`. Nothing was deleted. The full table is in the overnight log under "Orphaned assets for Connor's cleanup call". Two notes from there worth repeating: the about-page photo set is the only warm human imagery the site ever had, and the desk portrait in the hero directory is still live, so do not sweep that directory wholesale.

22. **One lint warning survives**, an unused parameter in the header module. It pre-dates this work and touching that file means touching the security-header path.

23. **The original grayscale desk image is unreferenced** now that the halftone plate replaced it. Left in place because it is your asset. Delete whenever the plate is settled.

## 8. Where things live

| Path | What |
|---|---|
| `docs/superpowers/2026-08-05-overnight-log.md` | The full narrative record, phase by phase, with every decision and deviation |
| `docs/superpowers/plans/2026-08-05-makingsoftware-redesign.md` | The 21-task plan as executed |
| `docs/superpowers/specs/2026-08-05-makingsoftware-redesign-design.md` | The design spec, v3.1 |
| `docs/superpowers/pre-redesign-dirty.patch` | Verbatim backup of the five dirty files |
| `FIGURES.md` | Append-only figure registry with ground truths |
| `CLAUDE.md`, `DESIGN.md` | Rewritten to describe the manual system as built |
| `content/proof-metrics.ts` | The claim gate. Every gated numeral resolves here |
| `scripts/check-public-proof-metrics.mjs` | The guard, with its renderer floor and the justification rule |
| `scripts/voice-scan.mjs`, `scripts/word-counts.mjs` | Voice scan and build-time word counts |
| `VAULT/Resume & Positioning/Portfolio Story Spine - 2026-08-05.md` | The upstream source for all site copy |
| `VAULT/Resume & Positioning/Portfolio Copy Deck - 2026-08-05.md` | The route-by-route copy, applied verbatim |
| `VAULT/Resume & Positioning/Portfolio-Resume Alignment Audit - 2026-08-05.md` | Resume-system alignment recommendations, applied to nothing |

`VAULT` is `~/Documents/CJL Vault/04 Domains/Career`.
