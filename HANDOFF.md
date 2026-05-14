# HANDOFF — connorlaughl.in design overhaul, in-progress 2026-05-14

**For:** the next Claude Code session, picking up where this one left off.
**Working directory:** `/Users/connorlaughlin/clawd/career/portfolio-v2/.claude/worktrees/thirsty-shirley-52e7b0`
**Branch:** `claude/thirsty-shirley-52e7b0` (worktree off `origin/main`).
**Status:** local commits only. No push, no PR, no deploy.
**Tip:** 30 commits since the checkpoint at `b915b4fb`.

---

## 1. What was just shipped

The session ran two big arcs:

**Arc one — premium foundation (Block A through D from the prior GOAL.md).**
GT Sectra Fine wired (5 weights + italics, woff2-subset 2.9MB → 414KB).
Motion stack swapped: motion.dev + lenis + ogl in, framer-motion out.
`lib/motion.ts` with 11 named primitives. `<SplitText>`, `<SmoothScrollProvider>`, `<FigureReveal>` (hardened no-JS-safe).
WebGL hero with mouse-driven dither swell shader.
Impact ledger restructured as a typeset table.
Header redesigned (availability pill + Resume + Tools).
Case-study sticky TOC.
Long-form markdown table support + 68ch body cap + emoji→glyph swaps.
Planner output spring + CountUp on input.

**Arc two — premium polish (this session's net new).**
3-plate WebGL rolodex shader → simplified to single-plate when the desk portrait landed.
Figure-number marquee under the hero.
`<Magnetic>` cursor magnetism on hero CTAs.
View-transition named pairs (signature-system card title ↔ case-detail title).
`<CustomCursor>` with `data-cursor` label swap ("Read Fig. 04", "Talk", "Open").
GT Sectra weight ladder on the hero H1 (Black + Medium italic).
Eyebrow cleaned (no wordmark duplication).
Marquee rebalanced (numbers-first cadence, no personal refs).
`<SectionDivider>` plates wired at three homepage breaks (control panel between ledger and systems, grid between systems and about, blueprint as the index divider on /case-studies).
12 Midjourney WebP plates dropped in across hero, case studies, dividers, OG.
**Hero is now the desk portrait of Connor + Henry, framed in walnut, with the mouse-driven WebGL displacement still applied.**

Lint clean, build clean (41 routes), voice scan clean (0 banned phrases across all 8 priority routes).

---

## 2. What's next, in priority order

### 2.1 Incorporate the Executive Soft Skills Compendium

**Source file:** `/Users/connorlaughlin/Documents/CJL Vault/04 Domains/Career/Resume & Positioning/Executive Soft Skills Compendium - GTM Engineer - 2026-05-13.md` (514 lines).

**What it is:** an 11-skill taxonomy reframing Connor's soft skills as AI-native operating advantages. Each skill has a working definition, proof anchors, resume language, recruiter language, interview prompts, portfolio angle, and "avoid reducing this to" warnings. The umbrella thesis is *"taste applied at velocity."*

**Recommended approach (for the next session to debate before building):**

A small map of options, hardest first:

1. **New canonical route at `/positioning` or `/soft-skills`.** Holds the full 11-skill framework with the taxonomy laid out as editorial sections. Probably the right home because the content is too rich to scatter, and a single URL gives recruiters a place to link.
2. **Cross-link from /resume.** Add a "What I bring beyond the work" sidebar on the resume that links to the new canonical route. One block of teaser copy, three skill names visible.
3. **Cross-link from homepage.** A new section between "Signature systems" and the About teaser titled something like "Taste applied at velocity" with the portfolio version paragraph as the lede and the top 3-4 skills as cards.
4. **Echo into case-study detail pages.** Each case study could carry a single skill tag underneath the "what it proves" block, sourced from the proof-anchors map in the compendium. Lower priority; do only if it doesn't bloat the page.

**Constraints to preserve:**
- Voice rules. The compendium uses some words this site has banned in body copy (e.g. `pivotal`, `delve`, `tapestry`) — the file is a *drafting source*. Run the route-copy scan after every section ports across.
- Claim posture. The compendium calls out: *"External-use rule: this note is a drafting source, not a blanket approval. Public portfolio copy, exact metrics, employer-specific detail, route-reachable screenshots, and named internal systems still need claim-governance review."* Treat every named system / metric the same way the existing `content/proof-metrics.ts` model does.
- Editorial register. Don't ship the compendium as raw markdown. Render through the design system: GT Sectra display, mono labels, fig captions where artifacts appear.
- 11 skills × 6 fields per skill = 66 cells of content. Don't render all of it at once. Use a `<DensityToggle>` or progressive disclosure pattern. The case-study density-toggle idea from the prior critique is finally relevant.

**Skill-level fields in the source:**
- Working definition
- Why it matters now
- Connor-specific read
- Proof anchors
- Resume / CV language
- Cover letter / recruiter language
- Interview prompt this answers
- Portfolio angle
- Avoid reducing this to

**The 11 skills in order:**
1. Taste applied at velocity
2. Specification clarity
3. Decision quality under uncertainty
4. Narrative construction / sensemaking
5. Epistemic humility with conviction
6. Cross-functional frame fluency
7. Trust calibration
8. Delegation to non-humans
9. Governance without drag
10. Signal detection / instrumentation skepticism
11. Operator empathy / adoption design

**Suggested rough build order:**
1. Read the source file in full.
2. Brainstorm placement with `brainstorming` skill — get Connor's call on the route name (`/soft-skills` vs `/positioning` vs `/edge`) and the integration shape (canonical page + homepage echo, or single homepage section).
3. Add a new `content/soft-skills.ts` with the 11 entries typed as a `SoftSkill` interface, mirroring the structure of `content/proof-metrics.ts`. Preserve the public-use posture on each skill where the compendium is cagey.
4. Build the new route `app/<route>/page.tsx`. Long-form layout: hero block ("taste applied at velocity"), then 11 skill cards or sections with progressive disclosure for the resume/recruiter language.
5. Echo into homepage as a single section. Link to the canonical route.
6. Add link from header nav (now 6 destinations: About, Case studies, Resume, Tools, Soft skills, Contact). Consider whether the header still scans at 6 links or needs a dropdown.
7. Voice scan, lint, build, screenshot diff.

### 2.2 Open questions to surface to Connor

1. Canonical route name. `/positioning`, `/soft-skills`, `/edge`, `/operating-system`, something else?
2. Should the new section also appear on the **resume route** as a sidebar, or only link out from there?
3. Header nav budget. 6 destinations is the upper end of what the current line-up holds without wrapping at 1024px. Drop "Contact" (it's already a CTA on every page) to make room?
4. Some of the "proof anchors" reference systems Connor hasn't shipped publicly as case studies yet (e.g. `Governed RFP/RFX AI Answer Library`, `Leadership + Team Development Operating System`). Should these become new case-study slugs, or stay as named anchors without click-through links?
5. The compendium's `### Phrases to avoid` block at line 475 is itself a writing-discipline artifact. Worth surfacing on the public route, or strictly internal?

### 2.3 Other small follow-ups already queued

These are not blockers for the soft-skills work; they can ship in parallel or be deferred:

- **Density toggle on case-study detail pages.** Sticky TOC landed; the actual "TLDR / 5-min / 15-min" density toggle is still scrolling-to-anchor rather than swapping content. Refactor of the 699-line detail page deferred.
- **WebGL card hover** on signature-system cards (dither distortion under the cursor on each card). Deferred.
- **Redaction shader** (replace the CSS RedactionReveal with a shader pixelation pass). Deferred.
- **Strategy memo copy refresh** (`/case-studies/strategy-memo`). The frame is fine; copy still uses the prior voice. Light pass needed.
- **Explicit axe + Lighthouse runs.** Inline-verified by inspection, no formal numeric scores recorded.
- **The Fig. 02 OG image** (`/public/og/og.webp`) is now the typographic poster from Midjourney; the root `/opengraph-image.tsx` still points at `/og/og.jpg` (legacy). Swap the layout.tsx metadata image to `/og/og.webp` once verified.

---

## 3. Constraints and guardrails

- **Do not push, deploy, open PRs, merge, or modify anything in `origin/main`.** Still a worktree.
- **Voice rules are strict.** `voiceDNA.md` is at the project root. No em dashes in body copy except inside `[Fig. N]` labels. No banned phrases. Route-copy scan after every batch of content edits.
- **Claim posture is sacred.** Numbers carry a `posture` field in `content/proof-metrics.ts`. Don't drop the field. Don't surface internal-only artifact sizes as personal achievements. The soft-skills source explicitly says external-use is approval-required for parts of it.
- **Reduced-motion is first-class.** Every animation has a `prefers-reduced-motion: reduce` fallback. Don't ship motion that breaks the reduced-motion path.
- **Light mode is a real mode.** Test both.
- **WCAG 2.1 AA floor.** Focus rings 2px accent outline with offset. Skip-to-content link.
- **Lint must stay clean** across the whole codebase.
- **Build must stay green.** All 41 routes SSG.

---

## 4. State of the codebase

### Stack
- Next.js 16.1.6 (Turbopack), React 19.2.3
- Tailwind v4 (CSS variables via `@theme inline`)
- `next-themes` for dark/light
- `motion` (motion.dev), `lenis`, `ogl`
- `geist` + GT Sectra Fine (self-hosted from `public/fonts/gt-sectra-fine/`)
- No CMS. Everything is local content.

### Routes (41 prerendered)
- `/`, `/about`, `/resume`, `/proof` (redirect)
- `/case-studies`, `/case-studies/[slug]` (11), `/case-studies/strategy-memo`
- `/case-studies/[slug]/opengraph-image` (11), `/opengraph-image`
- `/longform/[slug]` (4)
- `/tools/revops-capacity-planner`
- `/sitemap.xml`, `/robots.txt`

### Key files for next session
- `lib/motion.ts` — motion primitive specs
- `components/SplitText.tsx`, `Magnetic.tsx`, `CustomCursor.tsx`, `FigureMarquee.tsx`, `SectionDivider.tsx`, `HeroSignature.tsx`, `ImpactLedger.tsx`, `PulseOnChange.tsx`
- `components/webgl/WebGLHero.tsx` — the OGL shader
- `app/page.tsx` — homepage, ~520 lines now
- `app/case-studies/[slug]/page.tsx` — case detail, 699+ lines (refactor target if density toggle gets built)
- `lib/markdown.tsx` — long-form renderer with table + 68ch + emoji-swap support
- `content/proof-metrics.ts` — claim-posture model; pattern to follow for `content/soft-skills.ts`
- `content/case-studies.ts` — 11 cases with 5-part structure
- `GOAL.md`, `DESIGN.md`, `MIDJOURNEY_PROMPTS.md`, `voiceDNA.md` — source of truth for design + voice

### Skills to invoke in the new session
Use the Skill tool. Highest leverage:

- `using-superpowers` — first thing in the session.
- `brainstorming` — before placing the soft-skills content. Surface Connor's intent.
- `impeccable` — design review + critique driver.
- `frontend-design` — production frontend work.
- `make-interfaces-feel-better` — polish principles.
- `web-design-guidelines` — final guideline-compliance check.
- `redesign-existing-projects` — framing if the next session pivots to broader rework.

---

## 5. Recommended kickoff sequence

1. Spawn into the worktree path above.
2. `git status` and `git log --oneline -15` to confirm state.
3. Read this HANDOFF.md.
4. Read `GOAL.md`, `DESIGN.md`, `voiceDNA.md`.
5. Invoke `using-superpowers`.
6. Read the soft-skills source file in full (`/Users/connorlaughlin/Documents/CJL Vault/04 Domains/Career/Resume & Positioning/Executive Soft Skills Compendium - GTM Engineer - 2026-05-13.md`).
7. Invoke `brainstorming` to align with Connor on route name + integration shape.
8. `npm install`, `npm run lint`, `npm run build` to confirm baseline.
9. Start `npm run dev` (port 3000) and open the Playwright MCP.
10. Build the new content/soft-skills.ts. Type it. Preserve postures.
11. Build the route. Voice-scan + lint + build after each section.
12. Echo into homepage. Link from header (consider drop if 6 nav items wraps).
13. Commit atomically per logical unit.

---

## 6. Validation commands

```bash
# Lint + build
npm run lint
npm run build

# Voice scan against rendered HTML (dev server must be up)
ROUTES=(/ /about /case-studies /case-studies/revenue-operations-signal-to-revenue /case-studies/strategy-memo /resume /tools/revops-capacity-planner /longform/revenue-operating-system-from-zero)
for r in "${ROUTES[@]}"; do
  body=$(curl -s --max-time 5 "http://localhost:3000${r}")
  txt=$(echo "$body" | sed -E 's/<[^>]*>//g')
  hits=$(echo "$txt" | grep -ioE "leverage|robust|dossier|outperform|pivotal|tapestry|delve|harness|elevate|unleash|supercharge|revolutionize|future-proof|testament|foster|intricate|meticulous|nestled|bustling|beacon|enduring|interplay|embark|multifaceted|elucidating|culminating|swiftly|architecture of trust|game-changer|cutting-edge|furthermore|notably|consequently|not just|not only" | sort -u)
  [ -n "$hits" ] && echo "  ${r}: $hits"
done

# Font subset (only when changing the Unicode range)
./scripts/subset-fonts.sh
```

---

## 7. Acceptance for next session

The soft-skills incorporation is done when:

- A canonical route at the chosen URL renders all 11 skills with the editorial register intact.
- Voice scan returns zero banned phrases on the new route.
- Public-use posture is preserved on every skill that the source flagged as approval-required.
- Lint clean, build green.
- Homepage carries a single linkable echo block.
- Header nav still scans on lg / xl without wrapping (or shifts to a sensible dropdown if 6 items doesn't hold).
- Reduced motion + light mode both verified on the new route.
- The route is reachable from at least: header nav, homepage echo block, and resume sidebar (per Connor's call).
- The voice rules from voiceDNA.md hold across every line.

---

**End of handoff. The site is in great shape. The soft-skills work is the next high-leverage move. Don't be afraid to push back on the route name or the integration shape if Connor's first answer doesn't feel right.**
