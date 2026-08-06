import Link from "next/link";
import type { ReactNode } from "react";

import { Breadcrumb } from "@/components/manual/Breadcrumb";
import { ChapterMeta } from "@/components/manual/ChapterMeta";
import { ColophonFooter } from "@/components/manual/ColophonFooter";
import { MANUAL_NAV, Masthead } from "@/components/manual/Masthead";
import { RulerRail } from "@/components/manual/RulerRail";
import { Sheet } from "@/components/manual/Sheet";
import { SidebarTOC, type TocSection } from "@/components/manual/SidebarTOC";

export type { TocEntry, TocSection, SidebarTOCProps } from "@/components/manual/SidebarTOC";

/**
 * Chapter page shell.
 *
 * Reference: `docs/superpowers/reference/chapter-1440.png`. Reading the frame
 * from the outside in: compact masthead at the top left, sticky sidebar TOC in
 * its own left column, a breadcrumb rail sitting directly above the sheet and
 * aligned to its left edge, the white sheet carrying the meta line and the
 * chapter body, the tick ruler pinned to the right edge, colophon at the foot.
 *
 * Everything lives inside `.manual-root`, which is the body-texture opt-out —
 * without it the page renders under the legacy grain and vignette.
 *
 * Responsive behaviour (binding fidelity notes):
 *   - below 768px the sheet is full bleed; the column adds no horizontal
 *     padding until `md`, and `Sheet` itself drops its border and shadow.
 *   - below xl the sidebar collapses into a `<details>` disclosure that sits
 *     above the breadcrumb, keyboard-native and closed by default.
 *   - the breadcrumb is its own rail and never folds into the masthead nav,
 *     so it stays a single line at 390.
 *
 * Keyboard: the masthead skip link targets `#main-content`, which is the sheet
 * itself (`tabIndex={-1}` so it can receive programmatic focus). Breadcrumb
 * chevrons, both sidebar instances and the disclosure summary are all in the
 * natural tab order; nothing here is focus-trapped or `tabIndex`-reordered.
 */

export type ChapterLayoutProps = {
  /** Parent section, e.g. "REVENUE SYSTEMS". */
  section: string;
  /** Chapter title for the breadcrumb, e.g. "Signal to revenue". */
  chapter: string;
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  /** Build-computed word count. Omit to render no meta line. */
  words?: number;
  /** In-page scroll-spy mode (/edge). Passed through to the sidebar. */
  anchors?: { id: string; label: string }[];
  children: ReactNode;

  // --- Additive, both optional: the sidebar needs data the literal
  // ChapterLayoutProps in the plan does not carry. Consumers that match the
  // plan's type exactly still compile; they simply render without a sidebar.
  /** Manual TOC. Supplied by the caller from `content/cover.ts`. */
  sections?: TocSection[];
  /** Route of the current chapter, used for the sidebar active state. */
  activeHref?: string;
  /** Optional link target for the section segment of the breadcrumb. */
  sectionHref?: string;
};

export function ChapterLayout({
  section,
  chapter,
  prev,
  next,
  words,
  anchors,
  children,
  sections,
  activeHref,
  sectionHref,
}: ChapterLayoutProps) {
  const tocSections = sections ?? [];
  const hasToc = tocSections.length > 0 || (anchors?.length ?? 0) > 0;

  const toc = hasToc ? (
    <SidebarTOC sections={tocSections} activeHref={activeHref ?? ""} anchors={anchors} />
  ) : null;

  return (
    <div className="manual-root min-h-screen bg-ground-grid">
      <Masthead compact />

      <div className="mx-auto flex w-full max-w-[84rem] gap-0 px-0 pb-16 md:px-6 lg:px-10 xl:gap-2">
        {toc ? (
          <aside
            aria-label="Manual contents"
            className="sticky top-24 hidden max-h-[calc(100vh-8rem)] w-[13rem] shrink-0 self-start overflow-y-auto pb-8 xl:block"
          >
            {toc}
          </aside>
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-[53rem] xl:mx-0">
            {/* One chrome band below xl: the contents disclosure and the
                breadcrumb share a row, and the standing nav links ride inside
                the disclosure since the compact masthead drops them there. */}
            <div className="flex items-center gap-4 px-4 py-3 md:px-0 md:py-4 xl:block">
              {toc ? (
                <details className="group relative shrink-0 xl:hidden">
                  <summary className="cursor-pointer list-none font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/70 transition-colors hover:text-blueprint">
                    Contents
                  </summary>
                  <div className="absolute left-0 right-0 top-full z-20 mt-3 w-[min(22rem,80vw)] border border-grid-line bg-sheet p-4 shadow-sm">
                    {toc}
                    <ul className="mt-5 flex flex-wrap gap-4 border-t border-grid-line pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/70">
                      {MANUAL_NAV.map(({ href, label }) => (
                        <li key={href}>
                          {href.startsWith("mailto:") ? (
                            <a href={href} className="transition-colors hover:text-blueprint">
                              {label}
                            </a>
                          ) : (
                            <Link href={href} className="transition-colors hover:text-blueprint">
                              {label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              ) : null}

              <div className="min-w-0 flex-1">
                <Breadcrumb
                  section={section}
                  chapter={chapter}
                  sectionHref={sectionHref}
                  prev={prev}
                  next={next}
                />
              </div>
            </div>

            {/* The skip target is the sheet's own landmark wrapper: focus lands
                here, which is visually the top of the sheet. `tabIndex={-1}`
                keeps it out of the tab order while still focusable. */}
            <main id="main-content" tabIndex={-1} className="block focus:outline-none">
              <Sheet as="article" className="px-5 py-10 sm:px-10 md:py-14 lg:px-16">
                {words === undefined ? null : (
                  <ChapterMeta words={words} className="mb-6 text-center" />
                )}
                {children}
              </Sheet>
            </main>
          </div>
        </div>
      </div>

      <ColophonFooter />
      <RulerRail />
    </div>
  );
}
