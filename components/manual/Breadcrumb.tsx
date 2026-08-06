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

/* `-my-1.5 py-1.5 px-1 -mx-1` takes a 9×12 glyph to a ≥24px pointer target
   without moving the trail a pixel. */
const CHEVRON_BASE =
  "-my-1.5 -mx-1 inline-block px-1 py-1.5 font-mono text-[12px] leading-none text-body-ink/60 transition-colors hover:text-blueprint";

/**
 * The chapter a chevron leads to, revealed on hover and focus.
 *
 * The title is already in the chevron's `aria-label`, so a screen reader knew
 * where the arrow went and a sighted reader did not. Absolutely positioned, so
 * naming the target never reflows the rail.
 */
function ChevronPeek({ title }: { title: string }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-full z-10 mt-2 hidden max-w-[22ch] translate-y-1 truncate whitespace-nowrap border border-grid-line bg-sheet px-2 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-body-ink/70 opacity-0 transition-[opacity,transform] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:block"
    >
      {title}
    </span>
  );
}

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
          <span className="group relative">
            <Link href={prev.href} aria-label={`Previous chapter: ${prev.title}`} className={CHEVRON_BASE}>
              &lsaquo;
            </Link>
            <ChevronPeek title={prev.title} />
          </span>
        ) : (
          <span aria-hidden="true" className={`${CHEVRON_BASE} opacity-40`}>
            &lsaquo;
          </span>
        )}
        {next ? (
          <span className="group relative">
            <Link href={next.href} aria-label={`Next chapter: ${next.title}`} className={CHEVRON_BASE}>
              &rsaquo;
            </Link>
            <ChevronPeek title={next.title} />
          </span>
        ) : (
          <span aria-hidden="true" className={`${CHEVRON_BASE} opacity-40`}>
            &rsaquo;
          </span>
        )}
      </span>

      {/* Below sm the parent crumb and its separator drop out entirely. The
          leaf is the one segment a reader needs and it truncates rather than
          running off the viewport, which is what `shrink-0` on it used to do:
          at 390 the chapter ended at x=430 and printed half a word. */}
      <span className="flex min-w-0 items-center gap-2">
        <span className="hidden min-w-0 truncate text-body-ink/60 sm:inline">
          {sectionHref ? (
            <Link href={sectionHref} className="manual-link transition-colors hover:text-blueprint">
              {section}
            </Link>
          ) : (
            section
          )}
        </span>
        <span aria-hidden="true" className="hidden shrink-0 text-body-ink/50 sm:inline">
          /
        </span>
        <span className="min-w-0 truncate text-body-ink" aria-current="page">
          {chapter}
        </span>
      </span>
    </nav>
  );
}
