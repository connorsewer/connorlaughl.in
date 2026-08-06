import type { Metadata } from "next";
import Link from "next/link";

import {
  CheckerBand,
  ColophonFooter,
  Breadcrumb,
  Masthead,
  RulerRail,
  Sheet,
  StatTable,
  type StatRow,
} from "@/components/manual";
import {
  ExplodedStack,
  Figure,
  GridPlane,
  LeaderLabel,
  type StackLayer,
} from "@/components/figures";

/**
 * Specimen sheet for the manual system (plan Task 7).
 *
 * Temporary route. It exists so the Phase 2 primitives can be seen together
 * on one chapter-shaped page and compared against
 * `docs/superpowers/reference/chapter-1440.png`. Deleted in Task 19.
 *
 * Copy here is placeholder. Nothing on this page states an outcome, so no
 * value on it needs to resolve through `content/proof-metrics.ts`. The only
 * numbers present are the figure's registry number and the layer ordering.
 */

export const metadata: Metadata = {
  title: "Type and figure specimen",
  description: "Working specimen sheet for the manual type roles and figure primitives.",
  robots: { index: false, follow: false, nocache: true },
};

/** Ground truth: the layers this repository actually builds with. */
const STACK_LAYERS: StackLayer[] = [
  { label: "App Router routes", fill: "blue" },
  { label: "React components", fill: "lavender" },
  { label: "Tailwind token layer", fill: "teal" },
  { label: "Prerendered HTML", fill: "none", h: 16 },
];

/** Placeholder rows: type and surface names, not results. */
const SPECIMEN_ROWS: StatRow[] = [
  { label: "Display face", value: "GT Sectra Fine" },
  { label: "Body face", value: "Newsreader" },
  { label: "Label face", value: "Geist Mono" },
  { label: "Wordmark face", value: "Geist Pixel" },
  { label: "Working ink", value: "Blueprint blue" },
  { label: "Ground", value: "Graph paper" },
];

export default function DevSamplePage() {
  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      {/* Right padding clears the fixed RulerRail, which overlaps the nav at lg. */}
      <Masthead compact className="lg:pr-14" />

      <CheckerBand label="Specimen sheet" />

      <RulerRail />

      <main className="mx-auto w-full max-w-[64rem] py-10 sm:px-6 lg:px-10 lg:py-16">
        <Breadcrumb section="Appendix" chapter="Specimen" className="mb-3 px-4 sm:px-0" />

        <Sheet id="main-content" as="article" className="px-5 py-10 sm:px-10 lg:px-16 lg:py-16">
          <div className="text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/55">
              Specimen | Connor Laughlin
            </p>

            <h1 className="mt-4 font-display text-[2.4rem] leading-[1.08] text-body-ink sm:text-[3.1rem]">
              Type and figure specimen.
            </h1>

            <p className="mx-auto mt-4 max-w-[46ch] font-display text-[1.15rem] leading-snug text-body-ink/75">
              A working page for the manual system: ground, sheet, type roles, and one
              figure drawn from the stack that renders it.
            </p>

            <p
              aria-hidden="true"
              className="mt-8 font-mono text-[12px] tracking-[0.4em] text-body-ink/35"
            >
              ***
            </p>
          </div>

          <div className="mt-10 max-w-[68ch]">
            <p className="manual-body manual-dropcap">
              This page checks the system against itself. It carries the same furniture
              a chapter carries, so a change to the ground, the sheet, or the type roles
              shows up here before it reaches a page a reader can find. The words are
              placeholder. The components are the shipping ones.
            </p>

            <p className="manual-body mt-5">
              Body copy runs justified with hyphenation once the measure is wide enough
              to set cleanly, and ragged right below that. The drop cap opens the page
              once and does not repeat.
            </p>

            <p className="manual-body mt-5">
              Mono type does the labelling. Breadcrumbs, captions, leader lines, stat
              rows, and buttons all sit in the same uppercase voice, which leaves the
              serif free to do nothing but read.
            </p>
          </div>

          <h2 className="mt-14 font-serif-body text-[1.0625rem] font-semibold leading-snug text-body-ink">
            The stack that renders this page.
          </h2>

          <div className="mt-8">
            <Figure
              num={0}
              title="Site stack"
              groundTruth="The build layers of this repository: Next.js App Router routes, React components, the Tailwind v4 token layer, and the prerendered HTML the build writes out."
              caption="Placeholder plate. Each slab names a layer present in this repository's build, and the lattice below stands for the route files the build writes to disk."
              viewBox="-330 -45 700 620"
            >
              <ExplodedStack layers={STACK_LAYERS} gap={92} labelSide="left" />

              {/* Dashed ties carry the eye from the bottom slab down to the
                  lattice, the way the exploded slabs tie to each other. */}
              <line
                data-no-draw
                x1={-95}
                y1={331}
                x2={-95}
                y2={455}
                stroke="var(--blueprint)"
                strokeWidth={1.25}
                strokeDasharray="5 6"
                strokeOpacity={0.7}
              />
              <line
                data-no-draw
                x1={130}
                y1={351}
                x2={130}
                y2={475}
                stroke="var(--blueprint)"
                strokeWidth={1.25}
                strokeDasharray="5 6"
                strokeOpacity={0.7}
              />

              <GridPlane x={0} y={400} cols={6} rows={6} cell={24} fill="blue" />

              <LeaderLabel
                x={250}
                y={456}
                dx={-90}
                dy={0}
                text="Route output"
                dashed
              />
            </Figure>
          </div>

          <div className="mt-14 max-w-[68ch]">
            <p className="manual-body">
              The plate above is drawn from the repository it lives in. Every label
              names something that is really there, which is the rule the rest of the
              figures follow.
            </p>
          </div>

          <h2 className="mt-14 font-serif-body text-[1.0625rem] font-semibold leading-snug text-body-ink">
            Specimen table.
          </h2>

          <div className="mt-8 max-w-[46rem]">
            <StatTable
              rows={SPECIMEN_ROWS}
              caption="Type roles and surfaces used on this page"
            />
          </div>

          <div className="mt-12">
            <Link
              href="/#contents"
              className="inline-flex items-center border border-blueprint px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-blueprint transition-colors hover:bg-blueprint hover:text-sheet"
            >
              Back to contents
            </Link>
          </div>
        </Sheet>
      </main>

      <CheckerBand />

      <ColophonFooter />
    </div>
  );
}
