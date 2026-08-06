import Link from "next/link";

/**
 * Chapter breadcrumb rail.
 *
 * Reference crop: `docs/superpowers/reference/chapter-1440.png` at y≈70 — the
 * trail sits on its own line directly above the sheet, left-aligned to the
 * sheet edge, with prev/next chevrons ahead of it. It is not part of the
 * masthead.
 *
 * Newsreader carries no arrow glyphs, so the chevrons are mono characters.
 * At 390 the trail stays one line: the parent segment truncates and the
 * chapter keeps its full width.
 *
 * Minimal version, built here so Task 6's chrome is complete. Task 11
 * composes it inside ChapterLayout.
 */

export type BreadcrumbProps = {
  /** Parent section, e.g. "REVENUE SYSTEMS". Rendered muted. */
  section: string;
  /** Current chapter. Rendered in body ink. */
  chapter: string;
  /** Optional link for the section segment. */
  sectionHref?: string;
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  className?: string;
};

const CHEVRON_BASE =
  "font-mono text-[12px] leading-none text-body-ink/45 transition-colors hover:text-blueprint";

export function Breadcrumb({
  section,
  chapter,
  sectionHref,
  prev,
  next,
  className,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex min-w-0 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] ${
        className ?? ""
      }`}
    >
      <span className="flex shrink-0 items-center gap-2">
        {prev ? (
          <Link href={prev.href} aria-label={`Previous chapter: ${prev.title}`} className={CHEVRON_BASE}>
            &lsaquo;
          </Link>
        ) : (
          <span aria-hidden="true" className={`${CHEVRON_BASE} opacity-40`}>
            &lsaquo;
          </span>
        )}
        {next ? (
          <Link href={next.href} aria-label={`Next chapter: ${next.title}`} className={CHEVRON_BASE}>
            &rsaquo;
          </Link>
        ) : (
          <span aria-hidden="true" className={`${CHEVRON_BASE} opacity-40`}>
            &rsaquo;
          </span>
        )}
      </span>

      <span className="flex min-w-0 items-center gap-2">
        <span className="min-w-0 truncate text-body-ink/45">
          {sectionHref ? (
            <Link href={sectionHref} className="transition-colors hover:text-blueprint">
              {section}
            </Link>
          ) : (
            section
          )}
        </span>
        <span aria-hidden="true" className="shrink-0 text-body-ink/30">
          /
        </span>
        <span className="shrink-0 text-body-ink" aria-current="page">
          {chapter}
        </span>
      </span>
    </nav>
  );
}
