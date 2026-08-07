# /builds product-page system — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Each build becomes a product page — data plate, product shots that develop from blueprint ink, a real architecture figure, and a crosslink to the chapter it proves — with the index cards becoming doors.

**Architecture:** Extend `content/builds.ts` with per-build product data and a slug; add `app/builds/[slug]/page.tsx` on the existing manual chrome; generalize the `/plates` develop interaction into a reusable `DevelopShot`; add a `DataPlate` nameplate component; draw two new figures (jobos, mcOS) and reuse four existing chapter figures whose ground truths already describe the same systems.

**Tech Stack:** Next.js 16 App Router (static prerender), Tailwind v4 tokens, the existing figure primitives (`IsoBox`, `GridPlane`, `IsoChain`, `LeaderLabel`), `next/image`.

## Global constraints

- Every claim numeral resolves through `content/proof-metrics.ts` (`renderableProofMetrics`). **No gated numeral appears on any card or product page.** Deck 17.5's rule extends to the new pages. Feature lists stay numeral-free (no adapter counts, no LOC, no commit counts) until gate G1 clears.
- Deck 17.5 card copy is deck-final and renders verbatim as each product page's lede. New connective prose follows `voiceDNA.md` (sentence case, no em-dash in body, no banned words, ≤3-sentence paragraphs, no negative parallelism). The later humanize pass will revisit tone; keep new prose minimal and factual.
- Figures: stroke `var(--blueprint)` at 1.25, fills only `--fig-*` tokens, labels mono uppercase horizontal, every figure registered in FIGURES.md with a ground truth before it ships, next free number first (FIG_024 onward; FIG_019 stays reserved).
- Naming: TSI and DebtNext may be named (bank A6). No client names, no vendor dashboards in screenshots, nothing from the internal systems beyond what the deck already says publicly.
- Reduced motion: outcome parity. Develop interactions get an instant toggle; figures render complete.
- Verification, every task: `npm run build` green; `npm run proof:guard` floor never drops below 4; before the final commit `npm run voice:scan` against a self-owned prod server (`PORT=3100 npm run start`).
- Never push or production-deploy. Preview deploys via `vercel deploy -y --no-wait` are authorized (C4).
- Read `CLAUDE.md`, `HANDOFF.md` (top addenda), and `content/builds.ts` before Task 1.

## Gates (Connor, before or during the run)

- **G1 — per-build telemetry unlock.** Per-build commit counts and monthly commit activity are measured (evidence file + `scripts/builds-metadata.mjs`) but NOT released; A7 released only the 695 total. Task 8 is **conditional on Connor's one-line approval**, recorded as a story-bank entry (A9) before any per-build numeral or sparkline renders. If G1 is not given, skip Task 8 entirely; the system is complete without it.
- **G2 — internal product shots.** jobos, TSI marketing machine, TSI marketing analytics, TSI video studio, and TSI interactive tools need Connor-supplied (or Connor-approved locally captured) sanitized screenshots. Task 7 captures only what is public today (DebtNext.com, this site, the capacity planner). Product pages must render complete without shots (the layout treats shots as optional), so G2 never blocks shipping.

---

### Task 1: Product data model in `content/builds.ts`

**Files:**
- Modify: `content/builds.ts`

**Interfaces:**
- Produces: extended `BuildCard` type consumed by Tasks 4–8: `slug: string`, `tier: BuildTier`, `stack: string[]`, `chapterHref?: string`, `features: string[]`, `shots: BuildShot[]`, `liveHref?: string`.

- [ ] **Step 1: Extend the types.** Add above the existing `BuildCard`:

```ts
export type BuildTier = "demo" | "source" | "live" | "internal";

export const buildTierChips: Record<BuildTier, string> = {
  demo: "Demo",
  source: "Source",
  live: "Live",
  internal: "Internal",
};

export type BuildShot = {
  /** Under public/builds/<slug>/. */
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
};
```

Extend `BuildCard` with: `slug: string; tier: BuildTier; stack: string[]; features: string[]; shots: BuildShot[]; chapterHref?: string; liveHref?: string;` (keep every existing field).

- [ ] **Step 2: Fill the data.** Slugs equal ids. Tiers: jobos `internal` (private repo), tsi-marketing-machine `internal`, tsi-marketing-analytics `internal`, tsi-video-studio `internal`, tsi-interactive-tools `internal`, debtnext-rebuild `source` with `liveHref: "https://www.debtnext.com"`, mcos `source`, this-site `demo` with `liveHref: "/"`. Stacks (verified from the repos 2026-08-06, keep coarse):

```ts
/* Stacks verified from each repo's manifest on 2026-08-06. Coarse on
   purpose: technologies, never versions, vendors, or model names. */
// jobos:            ["Python", "SQLite", "Convex", "GitHub Actions"]
// tsi-marketing-machine: ["Claude agents", "MCP", "Zoho CRM", "approval gates"]
// tsi-marketing-analytics: ["Next.js", "TypeScript", "Radix"]
// tsi-video-studio:  ["Remotion", "TypeScript"]
// tsi-interactive-tools: ["Next.js", "TypeScript"]
// debtnext-rebuild:  ["Next.js", "Tailwind", "MDX", "GSAP"]
// mcos:              ["Next.js", "Convex", "Supabase"]
// this-site:         ["Next.js", "Tailwind v4", "motion", "no CMS"]
```

`features`: three to five numeral-free lines per build naming real capabilities only — verify each against the repo README or local source before writing it (e.g. jobos: "Scans and deduplicates postings across job sources", "Deterministic lead-quality gating with explainable scoring", "Daily scheduled runs that sync a hosted dashboard"). For the four TSI internal builds, only capabilities the deck card copy or the chapters already state publicly. `shots: []` everywhere in this task (Task 7 fills). `chapterHref`: tsi-marketing-machine → `/case-studies/ai-native-gtm`, tsi-marketing-analytics → `/case-studies/marketing-analytics-architecture`, debtnext-rebuild → `/case-studies/enterprise-site-overhaul`, tsi-interactive-tools → `/case-studies/gtm-strategy-positioning`; others none.

- [ ] **Step 3: Verify.** `npm run build` green (index page unaffected); `npm run proof:guard` passes.

- [ ] **Step 4: Commit.** `git commit -m "feat(builds): product data model - slugs, tiers, stacks, features"`

---

### Task 2: `DataPlate` component

**Files:**
- Create: `components/manual/DataPlate.tsx`
- Modify: `components/manual/index.ts` (add `export { DataPlate } from "@/components/manual/DataPlate";`)

**Interfaces:**
- Consumes: `BuildCard`, `buildStatusChips`, `buildTierChips`, `buildEra` from `content/builds.ts`.
- Produces: `DataPlate({ card }: { card: BuildCard })` server component, used by Task 4.

- [ ] **Step 1: Write the component.** An equipment nameplate: double border, mono rows, crosshair tick marks in the corners. No client directive needed.

```tsx
import {
  buildEra,
  buildStatusChips,
  buildTierChips,
  type BuildCard,
} from "@/content/builds";

/**
 * Equipment nameplate for a build's product page. Pure chrome: every value
 * is a name, a state word, or a year mark. No claim numeral may appear on
 * a data plate; anything numeric routes through the gate first.
 */
const ROW = "flex justify-between gap-6 border-t border-rule-hair py-2 first:border-t-0";
const KEY = "font-mono text-[9px] uppercase tracking-[0.25em] text-label-muted";
const VAL = "font-mono text-[10px] uppercase tracking-[0.18em] text-body-ink text-right";

export function DataPlate({ card }: { card: BuildCard }) {
  const rows: [string, string][] = [
    ["Model", card.name],
    ["Status", buildStatusChips[card.status]],
    ["Commissioned", buildEra(card.id)],
    ["Access", buildTierChips[card.tier]],
    ["Operator", "Connor J. Laughlin"],
    ["Stack", card.stack.join(" · ")],
  ];
  return (
    <div className="relative border border-body-ink p-1">
      <div className="border border-rule-hair px-4 py-2">
        {rows.map(([key, value]) => (
          <div key={key} className={ROW}>
            <span className={KEY}>{key}</span>
            <span className={VAL}>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify.** `npm run build` green (component compiles unused; Next tolerates unimported components — if lint flags an unused export, that is fine, it is consumed in Task 4).

- [ ] **Step 3: Commit.** `git commit -m "feat(builds): DataPlate nameplate component"`

---

### Task 3: Generalize develop interaction into `DevelopShot`

**Files:**
- Create: `components/manual/DevelopShot.tsx`
- Modify: `components/manual/DevelopPlate.tsx` (delegate to `DevelopShot`)
- Modify: `components/manual/index.ts` (export `DevelopShot`)

**Interfaces:**
- Produces: `DevelopShot({ src, alt, width, height, num, caption, sizes }: DevelopShotProps)` client component. `num` renders as `SHOT_{num}` when given, else the caption stands alone.

- [ ] **Step 1: Extract.** Move the button/filter/toggle logic from `DevelopPlate` into `DevelopShot` with props instead of a `PhotoPlate`:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";

const DUOTONE =
  "[filter:grayscale(1)_sepia(0.35)_hue-rotate(190deg)_saturate(2.1)_contrast(1.05)]";

export type DevelopShotProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  /** Optional series stamp rendered before the caption, e.g. "01". */
  num?: string;
  numPrefix?: string;
  sizes?: string;
};

export function DevelopShot({
  src, alt, width, height, caption, num, numPrefix = "SHOT", sizes,
}: DevelopShotProps) {
  const [developed, setDeveloped] = useState(false);
  return (
    <figure className="mb-8 break-inside-avoid">
      <button
        type="button"
        aria-pressed={developed}
        aria-label={`${caption}. Press to develop to full color.`}
        onClick={() => setDeveloped((current) => !current)}
        className="group block w-full cursor-pointer border border-blueprint/40 p-2 text-left"
      >
        <Image
          src={src} alt={alt} width={width} height={height}
          sizes={sizes ?? "(min-width: 640px) 24rem, 100vw"}
          className={`block h-auto w-full transition-[filter] duration-500 motion-reduce:transition-none group-hover:[filter:none] ${developed ? "" : DUOTONE}`}
        />
      </button>
      <figcaption className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {num ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-blueprint">
            {numPrefix}_{num}
          </span>
        ) : null}
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-label-muted">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Rewrite `DevelopPlate` as a thin wrapper** so `/plates` behavior and captions are unchanged:

```tsx
import { DevelopShot } from "@/components/manual/DevelopShot";
import type { PhotoPlate } from "@/content/plates";

export function DevelopPlate({ plate }: { plate: PhotoPlate }) {
  return (
    <DevelopShot
      src={plate.src} alt={plate.alt} width={plate.width} height={plate.height}
      caption={plate.caption} num={plate.num} numPrefix="PLATE"
    />
  );
}
```

- [ ] **Step 3: Verify `/plates` is unchanged.** `npm run build`; then `curl -s localhost:3100/plates | grep -c "PLATE_"` on a fresh prod server returns the same count as before the change (11 plates render, stamps intact).

- [ ] **Step 4: Commit.** `git commit -m "refactor(plates): extract DevelopShot, DevelopPlate delegates"`

---

### Task 4: Product page route and index doors

**Files:**
- Create: `app/builds/[slug]/page.tsx`
- Modify: `app/builds/page.tsx` (cards link to their pages)
- Modify: `content/cover.ts` (section 2 gains one entry per build)
- Modify: `app/sitemap.ts` (build pages)

**Interfaces:**
- Consumes: `buildCards`, `DataPlate`, `DevelopShot`, `ChapterFootNav`, `Masthead`, `Sheet`, `CheckerBand`, `ColophonFooter`, `withPeriod`.
- Produces: routes `/builds/<slug>` for all eight builds.

- [ ] **Step 1: Write the route.** Manual chrome, deck card copy as the lede, figure slot (Task 5/6 fills; render nothing when a build has no figure), features list, shots column, data plate in a side rail at `lg`, chapter crosslink:

```tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ChapterFootNav, CheckerBand, ColophonFooter, DataPlate,
  DevelopShot, Masthead, Sheet, withPeriod,
} from "@/components/manual";
import { buildCards, buildStatusChips } from "@/content/builds";
import { cta } from "@/content/cover";
import { buildFigures } from "@/components/figures/build-figures";

export async function generateStaticParams() {
  return buildCards.map((card) => ({ slug: card.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = buildCards.find((c) => c.slug === slug);
  if (!card) return { title: "Build not found" };
  return { title: card.name, description: card.body.split(". ")[0] + "." };
}

export default async function BuildPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = buildCards.find((c) => c.slug === slug);
  if (!card) return notFound();
  const Figure = buildFigures[card.slug];

  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />
      <CheckerBand />
      <main className="mx-auto w-full max-w-[68rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Sheet id="main-content" as="article" className="px-5 py-10 sm:px-10 lg:px-16 lg:py-14">
          <div className="lg:grid lg:grid-cols-[1fr_18rem] lg:gap-12">
            <div>
              <header className="max-w-[62ch]">
                <p aria-hidden="true" className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint">
                  Section 2 / Builds / {buildStatusChips[card.status]}
                </p>
                <h1 className="mt-4 font-display text-[2rem] leading-tight text-body-ink sm:text-[2.5rem]">
                  {withPeriod(card.name)}
                </h1>
                {/* Deck 17.5 card copy, verbatim, as the lede. */}
                <p className="mt-5 max-w-[58ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
                  {card.body}
                </p>
                <p className="mt-4 font-mono text-[11px] leading-relaxed">
                  <span className="uppercase tracking-[0.2em] text-blueprint">Proves:</span>{" "}
                  <span className="text-body-ink/70">{card.proves}</span>
                </p>
              </header>

              {Figure ? <div className="mt-10 max-w-[34rem]"><Figure /></div> : null}

              <section aria-labelledby="what-it-does" className="mt-10 max-w-[62ch]">
                <h2 id="what-it-does" className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
                  What it does
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex gap-2 font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
                      <span aria-hidden="true" className="shrink-0 text-blueprint">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {card.shots.length > 0 ? (
                <section aria-labelledby="shots" className="mt-10">
                  <h2 id="shots" className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
                    Product plates
                  </h2>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/50">
                    [ Press a plate to develop it ]
                  </p>
                  <div className="mt-4 gap-8 sm:columns-2">
                    {card.shots.map((shot, index) => (
                      <DevelopShot key={shot.src} {...shot} num={String(index + 1).padStart(2, "0")} />
                    ))}
                  </div>
                </section>
              ) : null}
            </div>

            <aside className="mt-10 lg:mt-0">
              <DataPlate card={card} />
              <div className="mt-4 flex flex-col gap-2">
                {card.href ? (
                  <a href={card.href} rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint underline-offset-4 hover:underline">
                    {card.hrefLabel} ↗
                  </a>
                ) : null}
                {card.liveHref ? (
                  <a href={card.liveHref} rel="noopener noreferrer" className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint underline-offset-4 hover:underline">
                    Live ↗
                  </a>
                ) : null}
              </div>
            </aside>
          </div>

          <ChapterFootNav
            className="mt-14"
            label="Elsewhere in the manual"
            items={[
              { kicker: "Builds", title: "The full fleet", href: "/builds" },
              card.chapterHref
                ? { kicker: "Chapter", title: "The system this build proves", href: card.chapterHref }
                : { kicker: "Work", title: "The systems, one chapter each", href: "/work" },
              { kicker: "Contact", title: "Email Connor", href: cta.href, external: true },
            ]}
          />
        </Sheet>
      </main>
      <ColophonFooter />
    </div>
  );
}
```

Create `components/figures/build-figures.ts` in this task with an empty typed map so the route compiles before Tasks 5–6:

```ts
import type { ComponentType } from "react";

/** Slug → architecture figure. Tasks 5-6 fill; absent means no figure. */
export const buildFigures: Record<string, ComponentType> = {};
```

- [ ] **Step 2: Cards become doors.** In `app/builds/page.tsx`, wrap each card `<li>`'s content in a `<Link href={`/builds/${card.slug}`}>` covering chip row, name, body, and PROVES line (keep the external repo link OUTSIDE the Link to avoid nested anchors). Add a mono "Open ↗" affordance on hover consistent with `/work` row styling.

- [ ] **Step 3: Contents and sitemap.** In `content/cover.ts` section 2, replace the single entry with one entry per build (`num` "01"–"08" in card order, `title` = card name, `href` = `/builds/<slug>`, `dek` = first sentence of the card body) plus keep `/builds` reachable as the section head link. In `app/sitemap.ts` add the eight `/builds/<slug>` routes at priority 0.6.

- [ ] **Step 4: Verify.** `npm run build` green with eight new routes; `npm run proof:guard` floor holds; `curl -s localhost:3100/builds/mcos | grep -o "Mission\|DataPlate\|Operator"` on a fresh prod server shows the plate rendering.

- [ ] **Step 5: Commit.** `git commit -m "feat(builds): product pages - data plates, doors, contents, sitemap"`

---

### Task 5: FIG_024, jobos pipeline figure

**Files:**
- Create: `components/figures/fig-024-jobos-pipeline.tsx`
- Modify: `components/figures/build-figures.ts`, `components/figures/index.ts`, `FIGURES.md`

**Interfaces:**
- Produces: `Fig024JobosPipeline` registered as `buildFigures.jobos`.

- [ ] **Step 1: Draw it.** Ground truth (verified from the jobos README locally): sources feed a scanner, deduplication and deterministic lead-quality gating, explainable scoring, a local store, a sync step, and the hosted dashboard. Use `IsoChain` (see `fig-002-signal-to-touch.tsx` for the idiom): six nodes — SOURCES, SCANNER, GATING, SCORER, STORE, DASHBOARD — with the gating node drawn as a held step (double outline, see `fig-005`'s gate) and `LeaderLabel` callouts on GATING ("deterministic reasons") and DASHBOARD ("reads the synced store"). Author the viewBox, then verify no label clips using the in-browser check: every `[data-leader-group] text` bbox inside the viewBox.

- [ ] **Step 2: Register it.** Append to the FIGURES.md registry table: `| FIG_024 | Jobos pipeline | /builds/jobos | The job-search system's real pipeline: sources, scanner, deduplication and lead-quality gating, scoring, local store, sync, hosted dashboard | Sequence with a held step. Gating drawn as the gate; labels name the deterministic-reasons contract and the synced dashboard. |` — number check first: FIG_024 must still be the next free number.

- [ ] **Step 3: Wire and verify.** Add to `build-figures.ts` (`jobos: Fig024JobosPipeline`) and `index.ts`. `npm run build`; visually confirm draw-on and reduced-motion complete render on `/builds/jobos`.

- [ ] **Step 4: Commit.** `git commit -m "feat(figures): FIG_024 jobos pipeline"`

---

### Task 6: FIG_025, mcOS mission control figure

**Files:**
- Create: `components/figures/fig-025-mcos-console.tsx`
- Modify: `components/figures/build-figures.ts`, `components/figures/index.ts`, `FIGURES.md`

- [ ] **Step 1: Draw it.** Ground truth (verify against the public mcOS repo README before drawing; adjust parts to what the README actually names): a mission-control console over agent squads — a `GridPlane` board with filled cells for active squads, an `IsoBox` console slab in front, `LeaderLabel`s naming BOARD, SQUAD, CONSOLE. If the README contradicts this composition, draw what the README says instead and update the registry wording to match.

- [ ] **Step 2: Register it** in FIGURES.md (same pattern as Task 5, page `/builds/mcos`).

- [ ] **Step 3: Wire and verify.** `buildFigures.mcos`, index export, build green, visual check.

- [ ] **Step 4: Commit.** `git commit -m "feat(figures): FIG_025 mcOS console"`

---

### Task 7: Public product shots

**Files:**
- Create: `public/builds/debtnext-rebuild/*.webp`, `public/builds/this-site/*.webp`
- Modify: `content/builds.ts` (fill `shots` for those builds)

- [ ] **Step 1: Capture DebtNext.** Browser-pane screenshots of `https://www.debtnext.com` (home, one interior page) at desktop width; save via the pane or `npx playwright screenshot` if available; convert to webp ≤ 300KB each (`sips -s format webp` does not exist on macOS — use `sips -s format jpeg` then `npx sharp-cli` or commit as jpeg/png if webp tooling is absent; `next/image` optimizes either way). Record real pixel dimensions in the `BuildShot` entries. Captions like `Homepage · debtnext.com` and honest alts.

- [ ] **Step 2: Capture this site.** Prod server on port 3100; screenshot the cover with x-ray mode ON (click `[ X-RAY ]` in the masthead first) — the x-ray shot IS the product shot. One more of `/builds` itself. Same file handling.

- [ ] **Step 3: Wire, verify, commit.** Fill `shots` arrays; `npm run build`; confirm the two pages render their Product plates sections and the internal builds still render without one. `git commit -m "feat(builds): public product shots for debtnext and this site"`.

- [ ] **Step 4 (blocked on G2, do not fake):** leave `shots: []` for the five internal builds. Note in the commit body which builds await Connor's sanitized captures.

---

### Task 8 (CONDITIONAL on gate G1): per-build telemetry

Skip entirely unless Connor's G1 approval exists as a story-bank entry (A9). If given:

**Files:**
- Modify: `scripts/builds-metadata.mjs` (emit `monthly: {"2026-04": 31, ...}` per git-backed build from `git log --format=%as`), regenerate `content/builds-metadata.json`
- Create: `components/manual/CommitSparkline.tsx` (SVG polyline in figure idiom: stroke `var(--blueprint)` 1.25, no fills, mono month labels at the ends, `aria-label` stating the shape in words)
- Modify: `components/manual/DataPlate.tsx` (sparkline row), `content/proof-metrics.ts` (one register row per released count, sourced to A9), `components/manual/index.ts`

- [ ] Steps follow the Task 1–2 pattern: extend script, regenerate, component, wire, `npm run build`, `npm run proof:guard` (the new rows must pass the show-posture checks), commit `feat(builds): per-build telemetry (A9)`.

---

### Task 9: Final verification, HANDOFF, preview

- [ ] **Step 1:** `npm run lint` (only the pre-existing proxy warning), `npm run build`, `npm run proof:guard`, `npm run words -- --json`.
- [ ] **Step 2:** `PORT=3100 npm run start` in background; `npm run voice:scan -- --base http://localhost:3100` must report 0 findings; `curl -sI http://localhost:3100/builds/jobos | head -8` shows the security headers.
- [ ] **Step 3:** Reduced-motion check on one product page (emulate `prefers-reduced-motion`; figure renders complete, develop toggles instantly).
- [ ] **Step 4:** Append a HANDOFF.md addendum (what shipped, gates G1/G2 state, what awaits Connor's captures).
- [ ] **Step 5:** Commit `feat(builds): product-page system complete`, then `vercel deploy -y --no-wait` and report the preview URL. Do not push, do not `--prod`.

---

## Self-review notes

- Spec coverage: data plates (T2), develop shots (T3, T7), product pages + doors (T4), figures (T5–T6), tier chips (T1, rendered via T4 header/DataPlate), telemetry behind its gate (T8), chapter crosslinks (T1 + T4 foot nav). Travel/journal/story are out of scope here by design.
- The `buildFigures` map ships empty in T4 so route and figures land independently; T5/T6 only add entries.
- `DevelopShot` prop names (`num`, `numPrefix`) match between T3's definition and T4's `<DevelopShot {...shot} num=…>` usage; `BuildShot` spreads cleanly into `DevelopShotProps` because field names are identical (`src`, `width`, `height`, `alt`, `caption`).
