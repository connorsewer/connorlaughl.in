# HANDOFF — connorlaughl.in design and motion overhaul

**For:** the next Claude Code session, picking up where this one left off.
**Working directory:** `/Users/connorlaughlin/clawd/career/portfolio-v2/.claude/worktrees/thirsty-shirley-52e7b0`
**Branch:** `claude/thirsty-shirley-52e7b0` (worktree off `origin/main`).
**Status:** not deployed. Not pushed. Local dev only.
**Author note from Connor (verbatim, truncated by send):** *"I also don't want to be afraid to diversify the..."* — likely meant "the stack" or "the visual language" or "the experience." Ask before you assume.

---

## 1. What this project is

Connor J. Laughlin's portfolio site. Career positioning is **VP of Marketing & GTM (acting CMO), GTM Engineer, revenue systems builder**. He built marketing from near-$0 inside a roughly $460M PE-backed enterprise and produced the systems behind $159.4M in influenced pipeline.

Target reader: CEOs, CROs, founders, PE operating partners, AI-native B2B SaaS executives, recruiters and hiring managers for VP Marketing / CMO / Head of GTM / VP RevOps / GTM Engineer roles.

The voice is **rigorous, editorial, lived-in**. Magazine typography. Mat-board frames. Calm authority. Anti-references: generic SaaS / Stripe-clone, LinkedIn-influencer.

---

## 2. State of the codebase

### Stack
- Next.js 16.1.6 (Turbopack), React 19.2.3
- Tailwind v4 (CSS variables via `@theme inline`)
- `next-themes` for dark/light
- `framer-motion` (installed but barely used — see opportunity below)
- `geist` font + `Instrument_Serif` from Google
- No CMS. No backend. Everything is local content files. Sanity was removed in this session.

### Routes (41 prerendered)
- `/` — homepage
- `/about` — personal narrative (DO NOT REWRITE Connor's personal content; layout-only edits are fine)
- `/case-studies` — archive with filter chips
- `/case-studies/[slug]` — 11 detail pages, all SSG
- `/case-studies/[slug]/opengraph-image` — per-case-study OG, all SSG
- `/case-studies/strategy-memo` — short editorial memo
- `/longform/[slug]` — 4 long-form markdown reads
- `/resume` — printable resume route
- `/tools/revops-capacity-planner` — interactive reverse-funnel calculator
- `/proof` — 307 redirect to `/case-studies`
- `/opengraph-image` — root OG
- `/sitemap.xml`, `/robots.txt`

### File layout
```
app/
  page.tsx                       homepage
  layout.tsx                     root metadata
  globals.css                    theme tokens, motion, figure-reveal, view transitions
  about/page.tsx                 personal narrative (locked content)
  case-studies/
    page.tsx                     archive (Suspense-wrapped CaseStudyArchive)
    [slug]/page.tsx              detail with 5-part case logic + TLDR + jump nav
    [slug]/opengraph-image.tsx   dynamic OG per case
    strategy-memo/page.tsx
  longform/[slug]/page.tsx       renders content/case-studies/*.md
  proof/page.tsx                 redirect("/case-studies")
  resume/page.tsx                printable resume
  tools/revops-capacity-planner/page.tsx
  opengraph-image.tsx            root OG
  robots.ts
  sitemap.ts
components/
  Header.tsx                     nav: About | Case studies | Contact
  HeroAsciiVideo.tsx             ASCII video loop in hero
  CaseStudyArchive.tsx           URL-state filter chips, multi-select
  CountUp.tsx                    proof-strip number animation
  FigureReveal.tsx               redaction-sweep on viewport enter
  HireSignal.tsx                 availability scoreboard
  NowFeed.tsx                    current building/reading feed
  JsonLd.tsx                     server JSON-LD with Person + Article schemas
  ReadingPathJump.tsx            TLDR / 5-min / 15-min jump pills
  RevOpsPlanner.tsx              the calculator
  RedactionReveal.tsx            interactive redaction reveal
  PrintButton.tsx                client-only print trigger
  ThemeToggle.tsx                light/dark
  DitheredImage.tsx              fallback dithered image
  TerminalGrid.tsx               legacy
content/
  case-studies.ts                CaseStudy type + 11 cases with 5-part fields + ProofMetric
  proof-metrics.ts               ClaimPosture model, heroProofStrip, impactLedger
  homepage-copy.ts               all homepage strings
  hire-signal.ts                 availability + roles + fit notes
  now-feed.ts                    public "Now" feed entries
  longform-map.ts                slug -> markdown file
  case-studies/*.md              4 long-form bodies
hooks/
  useClientMounted.ts            useSyncExternalStore for SSR-safe mounted
  useMediaQuery.ts               useSyncExternalStore for media queries
lib/
  markdown.tsx                   zero-dep markdown renderer
public/case-studies/
  ghost-pipeline.svg             custom SVG schematic (only piece of generated art)
  *.webp                         22 prior dither-frame plates
proxy.ts                         CSP + security headers (prod only)
```

### Voice rules (non-negotiable)
- No em dashes in body copy (fig captions allowed).
- No en dashes anywhere.
- Banned words: actually, leverage, dossier, robust, pivotal, showcase, underscore, testament, foster, landscape, supercharge, unlock, future-proof, revolutionize, tapestry, delve, harness, outperform, elevate, unleash, public-safe, "not just", "not only", "$15M+", "first call is free".
- Sentence-case headings.
- Active verbs: I built, I designed, I turned.
- Short paragraphs. Plain business nouns.

### Validation commands
```bash
npm run lint                                  # passes, 0 errors across whole codebase
npm run build                                 # 41 routes SSG
git diff --check                              # clean
# Route-copy scan (see prior session, full script in HANDOFF appendix)
```

---

## 3. What's working

- The proof claim is in front: hero title, eyebrow, subhead, 5-stat strip all carry the executive title and the $159.4M / 22-agent / 35+ / 7 / near-$0 set.
- Case studies use a real 5-part structure (problem / built / changed / mattered / proves) with proof metrics that carry claim posture in source.
- Filters on `/case-studies` have URL state, multi-select AND-combine, count badges.
- RevOps capacity planner is genuinely interesting and useful as proof.
- Custom Ghost Pipeline SVG renders cleanly inside the dither frame.
- View Transitions, CountUp on hero stats, redaction-sweep on figures, all with prefers-reduced-motion fallbacks.
- SEO infrastructure is real: sitemap, robots, JSON-LD, per-route metadata, dynamic OG per case study.
- CSP, X-Frame-Options DENY, HSTS, Referrer-Policy, Permissions-Policy live via `proxy.ts` (prod only).
- 820 npm packages removed when Sanity was killed; the dependency tree is now tight.
- Lint is clean across the whole codebase (was 35+ pre-existing errors).

---

## 4. What's sloppy or broken (be ruthless in the next session)

Connor's words: **"this is a bit sloppy and things are broken... it still feels very static."** Take that seriously.

### A. Static / inert feel
- Motion is currently load-time only (CountUp, fade-up). Once you scroll past the hero, there is almost nothing that responds, attracts the eye, or rewards interaction.
- The signature-systems cards have hover states (border color, text color) and that's it. They should feel like physical objects: subtle tilt, parallax, a redaction sweep on hover, a fig-number flicker. Right now they're stamps.
- The figure reveal works, but the rest of the page (5-part case logic, proof grid, systems built) has no enter motion. The page lands as a static slab.
- No scroll-driven motion. No parallax. No marquee. No moving glyphs. No subtle background life.
- No micro-interactions on buttons. CTAs are plain. The site asks the reader to do work that the page itself doesn't do.

### B. Density and rhythm
- The case-study detail page is a long, undifferentiated vertical scroll. TLDR card sits above 5-part, then proof grid, then systems built, then meta, then artifacts, then governance, then interview, then long-form, then redaction-reveal, then back nav. It's too many sections.
- The homepage stacks: hero / what I build / built from zero / impact ledger / signature systems / about teaser / now / hire signal / contact. Eight body sections plus hero. Without strong section breaks or visual contrast between them, they feel like one continuous wall.
- The impact ledger groups (revenue / funnel / AI / RevOps / narrative) are five rows of tiny cells. It scans like a spreadsheet. There's a stronger way to render this.

### C. Inconsistency / things that don't fit
- The HireSignal scoreboard and NowFeed were dropped in late and live between Signature Systems and Contact. The order feels arbitrary. Consider: is "Now" actually a homepage section, or a sidebar / footer / dedicated `/now` route? Is "Hire signal" part of the contact block or its own thing?
- ASCII video in the hero is a holdover from the prior design and may not match the new aggressive positioning. It also takes a huge chunk of the LCP. Either own it visually or replace it with something that earns the real estate.
- The Reading Path Jump pills (TLDR / 5-min / 15-min) currently scroll-to anchors rather than truly switching content density. It works but doesn't deliver on the promise.
- The Ghost Pipeline SVG is good but it's the only custom plate; the rest are reused webps. Visual consistency suffers when readers click through cases.
- The 5-stat hero strip wraps to two columns on small screens. Counts at 2 / 3 / 2 then which feels uneven. Worth testing other layouts.

### D. Information architecture
- No way to discover `/resume` from the site (it's only in the sitemap).
- No way to discover `/tools/revops-capacity-planner` from the site (NowFeed links to it, but the entry point is buried).
- No way to discover `/longform/[slug]` from anywhere except the case-study detail page where each links its own longform.
- `/proof` redirects to `/case-studies` (good) but if a recruiter lands there from an old link, they have no context they were redirected.
- The Header has only About / Case studies / Contact. Should probably also surface Resume and maybe Tools.

### E. Visual quality details that scream "AI-built portfolio"
- Color: dark cream-on-ink with a single accent. Disciplined but flat. Where is the texture, depth, layering? Where is the typographic surprise?
- Spacing: ~standard. Not bad, not memorable.
- Typography: Instrument Serif headings are good. Body in Geist Sans is fine. But there's no real type *system* — no display weight ladder, no italic / small-caps experiments, no contrasting weights inside the same paragraph for emphasis.
- Cards: rounded-2xl, border-rule, ink/55 background. Same shape everywhere. No card variance to break the rhythm.
- Numbers: tabular-nums on the hero, not consistently applied elsewhere. Stats are sometimes serif, sometimes mono.

### F. Specific known issues
- `dev` mode CSP is intentionally relaxed because Next 16's HMR injects inline scripts without nonce. Prod CSP works but should be smoke-tested on a real deploy before the strict policy is trusted.
- The print stylesheet on `/resume` works for a one-page PDF but breaks across the section-divider rules. The current print rules are minimal.
- `framer-motion` is in the bundle but barely used. Either commit to it everywhere or replace with a lighter primitive.
- View Transitions only work between same-origin documents; cross-domain hard-fails silently.
- The custom markdown renderer in `lib/markdown.tsx` does not handle tables, footnotes, or HTML embedded in markdown. If Connor's long-form ever needs those, the renderer needs extending.
- `/about` apostrophes are escaped (`&rsquo;`) for lint pass; not visible to readers but lives in source.
- Image LCP on case-study detail pages is the hero figure. We added `priority` and `loading="eager"`. Some webps are 1600px wide; an AVIF conversion would be a real LCP win.

---

## 5. What Connor wants in the next session

Verbatim from his message:
- "Comprehensive review of the UI/UX and design."
- "If there is content that doesn't fit or needs to be moved or rearranged and Claude Code thinks it can make improvements, I want improvements."
- "I want more motion, interactivity, and dynamism — for this to truly be elevated."
- He named **motion.dev** and **React Bits** explicitly as references and asked for research on others.
- "I need it to use all the skills at its disposal, like impeccable and ui ux pro max (please suggest others that you think will be appropriate)."
- "I also don't want to be afraid to diversify the..." *(message truncated — surface this as a question)*.
- No production deploy. Save progress.

Interpretation: a comprehensive UI/UX critique pass first, then opinionated rearrangement, then a motion/interactivity layer that takes the site from "static editorial" to "living editorial." Don't be conservative.

---

## 6. Tools and libraries to research and consider

### Motion / animation
- **motion.dev** (Motion One — the rewrite of Framer Motion; smaller, faster, supports plain DOM, React, and Vue). Worth a serious look as a replacement for `framer-motion`. Modern API, scroll-driven primitives, `animate()` with springs, `inView`, `useScroll`.
- **GSAP 3.x** — heavyweight, paid for some plugins (SplitText, ScrollTrigger licensed), but still the gold standard for complex timeline animation. Use selectively for hero or hero-adjacent moments.
- **Anime.js v4** — recently rewritten, smaller, scope-based. Good for SVG path animation and stagger sequences.
- **React Spring** — physics-based. Good for natural-feeling interactions (drag, swipe).
- **Lottie** — for hand-crafted After Effects exports. Heavy but unique.
- **CSS @scroll-timeline** + view() — browser-native scroll-driven animations, no JS. Excellent perf, growing browser support.
- **View Transitions API** — already enabled in `globals.css`. Add named transitions for hero-image-to-detail-page jumps.

### Component / pattern libraries
- **React Bits** (https://reactbits.dev) — copy-paste animated React components. SplitText, blur-in, marquee, magnetic hover, distortion text, particle backgrounds. Excellent reference, not all reusable without polish.
- **Aceternity UI** (https://ui.aceternity.com) — Tailwind + framer-motion patterns. Hero scroll, spotlight, sticky scroll reveal, evervault card.
- **Magic UI** (https://magicui.design) — animated components: marquee, ripple, retro grid, animated beam, dot pattern. Free and good.
- **shadcn/ui** — base for accessible primitives. Already partially in the stack via Tailwind v4. Use for dialogs, sheets, tabs, popovers if needed.
- **uiverse.io** — open buttons / cards / loaders, varying quality.
- **Cult UI** (https://cult-ui.com) — newer, ambitious components, motion-heavy.

### Editorial / typographic effects
- **SplitType.js** or **GSAP SplitText** — split headlines into characters / words / lines for staggered reveals.
- **PIXI.js** or **OGL** — for shader effects (grain, distortion, displacement) without the React Three Fiber overhead.
- **React Three Fiber + drei** — for genuine 3D moments. Worth it for one hero element, not the whole page.
- **Theatre.js** — visual timeline animation editor that exports React-controllable scenes.
- **Locomotive Scroll** or **Lenis** — smooth-scroll with scroll-driven hooks. Lenis is lighter and the new standard.

### Image / texture
- **next/image with AVIF**, then WebP fallback. Already configured.
- **Dithered Image filters** (CSS or canvas) — could programmatically dither the existing webps to match the visual language. Connor's brand is dither.
- **Noise SVG overlay** — already in globals.css. Could be turned up or down per section.
- **Replicate / Fal.ai** for one-off Midjourney-style generation if Connor wants more bespoke plates.

### Type
- **Variable fonts**: Instrument Serif has only one weight. Consider Adobe / OFL alternatives with weight axes: GT Sectra, Cambon, Domaine Display, Tiempos, ABC Diatype Mono, JetBrains Mono, IBM Plex Mono.
- **Pair experiments**: Söhne (sans) + GT Sectra (serif), Inter Tight + Editorial New, Geist Mono + Tiempos Headline. Currently we have Geist + Instrument Serif + Geist Mono + Geist Pixel.
- **Specimen pages**: build a one-off `/specimen` route to test type pairings live.

### Color
- We're cream + ink + one accent (gold-ish). Diversify carefully:
  - A "terminal green" already exists as a CSS var, barely used.
  - Add a dithered red for redactions, a paper-stain ochre for highlights.
  - Don't tip into Stripe rainbow.

### Sound (optional, surprising)
- **Howler.js** for a single hover sound or a tape-deck click on filter chips. Use sparingly.

---

## 7. Skills to invoke

Use the `Skill` tool in the new session. Highest leverage:

| Skill | When |
|---|---|
| `using-superpowers` | First thing in the session. |
| `brainstorming` | Before any large design pivot. Surface intent, audience, constraints. |
| `impeccable` | The driver skill for design review + opinionated improvements. Triggers on "redesign, shape, critique, audit, polish." |
| `ui-ux-pro-max` | UI/UX library of 50+ styles, 161 palettes, 57 font pairings, 99 UX guidelines. Cross-reference when picking direction. |
| `frontend-design` | When generating actual production-grade frontend. |
| `make-interfaces-feel-better` | The polish principles: stagger, optical alignment, font smoothing, tabular nums, hover micro-detail. |
| `animate` | When adding purposeful animation to a finished feature. |
| `polish` | Final pass. |
| `delight` | Add personality, unexpected touches. |
| `distill` | If the page feels too dense (it does). |
| `layout` | Visual rhythm, spacing, hierarchy. |
| `typeset` | Type system and pairings. |
| `colorize` | Color system review. |
| `quieter` | If a section gets too loud. |
| `bolder` | If the site feels too restrained. |
| `harden` | Accessibility + edge cases. |
| `audit` | Cross-cutting quality pass. |
| `web-design-guidelines` | Final guideline-compliance check. |
| `redesign-existing-projects` | Probably the framing skill for the whole next session. |
| `shape` | Discovery interview before any rebuild. |
| `here-now` | If a section needs to be quieter and more present. |
| `optimize` | Performance pass once visual work settles. |
| `gpt-taste` / `design-taste-frontend` / `high-end-visual-design` / `image-taste-frontend` | Taste-level direction skills. |
| `threejs-fundamentals` and the rest of the `threejs-*` family | Only if Connor wants a real 3D moment in the hero. |
| `tailwind-design-system` | If you re-think tokens. |
| `setup-pre-commit` | Already useful to run once before the next deploy. |

Read-then-decide. Don't blast all of them — pick the smallest set that maps to the work.

---

## 8. Specific tasks worth queueing

Not a plan. Inputs for the next session to triage.

### Information architecture
1. Add Resume + Tools to the Header (or under an Index dropdown / mega-menu).
2. Decide whether **Now** is a homepage section, a slot in the footer, or its own `/now` route. Personal pages traditionally treat Now as its own route — that may be the move here, with a small "Now" entry in the header.
3. Decide whether **Hire signal** belongs above Contact, inside Contact, or near the hero (as a live status pill in the header).
4. Consider a left-rail TOC on case-study detail pages (sticky, with scroll-spy) so the long page becomes scannable.
5. The 5-stat hero strip could be reorganized: pick the 3 strongest as a primary lockup and demote the other 2 to "see more" disclosure.

### Motion and interactivity
6. Replace the hero ASCII video with a more confident hero element. Options:
   - A live, scroll-reactive type lockup (SplitText stagger + magnetic underline).
   - A WebGL displacement field driven by mouse position.
   - A subtle, looped marquee of the 5 metrics rolling under the H1.
   - The current ASCII video, if kept, should at minimum have a soft scroll-tied parallax and a redaction-style fade when scrolled past.
7. Add scroll-driven reveal to the impact-ledger groups (stagger up, opacity, on-enter spring). Don't go floaty.
8. Add hover-state polish to signature-systems cards: subtle 3D tilt (max 6°), light parallax on the proof tags, color flicker on the fig number.
9. Add **section transitions** between homepage blocks: a faint divider rule that draws on scroll, a subheading that types out, an accent dot that walks the section.
10. Replace static fade-up with a small set of named entrances (`stagger-up`, `redact-in`, `print-stamp`) and use them with intention. One signature entrance per section.
11. Add a **hero pull-quote** that swaps between 3 of Connor's interview lines on a 5-second timer with crossfade.
12. Add page-to-page **View Transition** named pairs so clicking a signature-system card lifts the title into the detail page (visual continuity).
13. Marquee or rolling fig-number band somewhere on the homepage — a subtle nod to the editorial / press-release voice.

### Visual quality
14. Type system: pick a second display face for case-study titles and headings to break the Instrument Serif monotony. Document the pairing in `DESIGN.md`.
15. Card variance: introduce 3 card shapes (rounded-3xl + shadow, square + thick rule, mat-board + offset shadow). Assign by content type.
16. Texture: turn up the paper-grain in selective sections (e.g., interview, governance) to create depth zones. Currently it's uniform.
17. Custom plates for the other 5 signature systems (Revenue OS, 22-Agent AI, Signal Demand, Platform Narrative, Post-Acquisition). The Ghost Pipeline SVG is the pattern; replicate the schematic style with system-specific diagrams. Use Replicate / Fal for image generation, or hand-write SVG (the Ghost Pipeline plate was hand-written and is the highest-quality piece of art on the site).
18. Replace some webp art with AVIF (with WebP fallback). Faster LCP on detail pages.

### Component polish
19. Filter chips on `/case-studies` could grow a subtle "selected count" badge and a "clear all" affordance.
20. RevOps planner could use **smooth-counting** outputs (CountUp on every input change, debounced).
21. Reading-path jump pills could become **a real density toggle** that swaps the page body between TLDR / 5-min / 15-min, with the longform link as the 15-min path. This was attempted in a previous turn and reverted; the right pattern is a single client component that renders all three densities and toggles visibility via `hidden` to preserve SEO.

### Content moves
22. The "Built from zero" section duplicates content that lives in the impact ledger and case-study bullets. Consider folding the four bullets into a single editorial paragraph with three inline stats and a CTA.
23. The "About teaser" on the homepage is fine but could become a single line + photo, not a 4-paragraph teaser.
24. The Contact section is centered and feels marketing-page-ish. A left-aligned editorial column with the right-rail showing availability + LinkedIn + email might feel more on-brand.
25. The Strategy Memo (`/case-studies/strategy-memo`) was authored in the prior design. Review whether it still fits the aggressive proof-led positioning. It may need to be retired or rewritten.

### Accessibility and performance
26. Run an axe / Lighthouse audit. Confirm focus rings, skip-link target, color contrast in light mode (the cream-on-paper accent is at the edge of WCAG AA).
27. Check that the redaction-sweep CSS doesn't tank LCP for users without prefers-reduced-motion. Worth a measurement.
28. Confirm the 320px breakpoint is intact after motion is added. Currently passes.
29. Bundle-size audit: with Sanity gone, the JS payload is much smaller. After adding motion libraries, recheck.

### Process improvements
30. Add a `/specimen` route for type testing.
31. Add a `/styleguide` route (private, robots-noindexed) showing the design tokens, motion primitives, and component variants. Make the system explicit to future contributors.
32. Consider whether `framer-motion` should be swapped for `motion.dev` (Motion One) given its smaller footprint.

### Possible new routes
- `/now` — extract NowFeed into its own canonical route.
- `/tools` — index for the planner plus future tools.
- `/uses` — what's on Connor's desk (hardware, software, AI stack). Personal-site tradition.
- `/talks` — if Connor has speaking history worth surfacing.

---

## 9. Open questions to surface to Connor

1. Finish your truncated sentence: "I also don't want to be afraid to diversify the ___" (the stack? the visual language? the layout per page? the case-study formats?).
2. Is the ASCII video a keeper or a hand-me-down from the prior design? It's the highest-cost asset above the fold.
3. Are you open to a second display typeface, or do you want to keep Instrument Serif as the single editorial voice?
4. How much WebGL / canvas are you comfortable with? Heavy 3D moments could feel slick or could feel branded-portfolio.
5. Should the Hire Signal availability flip be controlled by an env var so you can change it without a code push?
6. Do you want a printable PDF resume static asset (`/resume.pdf`) in addition to the printable route?
7. Should the Strategy Memo be retired, rewritten, or kept as a deep-cut?
8. Any third-party services you'd like to integrate? Analytics (Plausible? Vercel Analytics?), commenting (none, I assume), newsletter capture (probably no), Calendly for the "Talk about a role" CTA?

---

## 10. Constraints and guardrails

- **Do not push, deploy, open PRs, merge, or modify anything in `origin/main`.** This is a worktree.
- **Do not edit Connor's personal narrative on `/about`** (family, dogs, hobbies, Kristin, etc.). Layout-only changes are fine.
- **Voice rules are strict.** Run the route-copy scan after every batch of content edits.
- **Claim posture is sacred.** Numbers carry a `posture` field in `content/proof-metrics.ts` and the case-study `proofMetrics` array. Don't drop the field. Don't surface internal-only artifact sizes as personal achievements.
- **Lint must stay clean** across the whole codebase. If you add tools (motion.dev, etc.), keep them ESLint-compatible.
- **Build must stay green.** All routes SSG unless a feature genuinely requires dynamic rendering.
- **Performance must not regress.** Image LCP is acceptable today; don't tank it with hero WebGL that ships 2MB of WASM.
- **Prefers-reduced-motion is first-class.** Every animation must have a reduced-motion fallback.
- **WCAG 2.1 AA floor.** Focus states 2px accent outline with offset. Test light theme as carefully as dark.

---

## 11. Recommended kickoff sequence in the new session

1. Spawn into the worktree path above.
2. Run `git status` and `git log --oneline -10` to confirm state.
3. Read this HANDOFF.md.
4. Read CLAUDE.md, DESIGN.md, voiceDNA.md (if present), MIDJOURNEY_PROMPTS.md.
5. Invoke `using-superpowers` (skill tool).
6. Ask Connor to clarify the truncated sentence and the open questions in §9.
7. Invoke `brainstorming` skill to align on scope before touching code.
8. Run `npm install`, `npm run lint`, `npm run build` to confirm baseline.
9. Start the dev server (`npm run dev`) and open `http://localhost:3000` in the Playwright MCP for ongoing visual diff.
10. Run a 60-minute UI/UX critique pass (no code). Produce a punch list. Get Connor's sign-off on priority order before touching code.
11. Then code, in tight blocks (10-15 file changes, validate, repeat).

---

## 12. Appendix: route-copy scan script

```python
python3 - <<'PY'
from pathlib import Path
import sys
paths = list(Path('.').rglob('*.tsx')) + list(Path('.').rglob('*.ts'))
paths = [p for p in paths if 'node_modules' not in str(p) and '.next' not in str(p)
         and str(p).startswith(('app','components','content','hooks','lib','proxy'))]
bad = [chr(0x2014),chr(0x2013),chr(0x2011),
       'not just','not only',
       'dossier','public-safe','leverage','robust','pivotal',
       'showcase','underscore','testament','foster','landscape',
       'supercharge','unlock','future-proof','revolutionize',
       '$15M+','first call is free',
       'actually','tapestry','delve','harness','outperform','elevate','unleash',
       'architecture of trust']
problems = 0
for p in paths:
    txt = p.read_text(errors='ignore')
    for i, line in enumerate(txt.splitlines(), 1):
        for token in bad:
            if token.lower() in line.lower():
                problems += 1
                print(f'{p}:{i}: {token!r}')
print(f'TOTAL: {problems}')
sys.exit(0 if problems == 0 else 1)
PY
```

---

## 13. Appendix: file shortlist worth touching first

If the next session has limited time, focus here:

1. `app/page.tsx` — homepage section order, density, motion entry points.
2. `app/case-studies/[slug]/page.tsx` — detail page is the longest; restructure first.
3. `components/HeroAsciiVideo.tsx` — hero element decision.
4. `components/CountUp.tsx`, `FigureReveal.tsx` — broaden motion primitives.
5. `components/HireSignal.tsx`, `NowFeed.tsx` — decide their home.
6. `app/globals.css` — motion + type + texture system.
7. `app/about/page.tsx` — layout only (no content edits).
8. `app/longform/[slug]/page.tsx` and `lib/markdown.tsx` — render quality.

Everything else is supporting cast.

---

**End of handoff. Good luck. Don't be afraid to throw out what isn't working.**
