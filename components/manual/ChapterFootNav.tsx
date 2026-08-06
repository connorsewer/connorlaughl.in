import Link from "next/link";

/**
 * Chapter foot navigation: the printed manual's "continues" band.
 *
 * Audit finding #2. Every reading path on the site used to dead-end — the only
 * prev/next affordance was a 9x12px chevron at the top of the page, and
 * `/edge`, `/about` and `/resume` offered nothing at all. This is the band that
 * closes a chapter: a hairline, a mono caption, then one full-width row per
 * exit, each row a link across its whole width rather than a few glyphs.
 *
 * Two shapes, one component. A chapter passes `prev`/`next` and gets the
 * continues band. A page with no neighbours passes `items` and gets the same
 * rows carrying its own exits (contents, resume, contact). Both may be passed.
 *
 * Every row is mono chrome. Nothing here renders a claim numeral, so the band
 * needs no gate.
 */

export type FootNavItem = {
  /** Mono kicker in the left column, e.g. `CONTENTS`. */
  kicker: string;
  /** The row's own line, set in serif at reading weight. */
  title: string;
  href: string;
  /** `mailto:` and other off-router targets render as a plain anchor. */
  external?: boolean;
};

export type ChapterFootNavProps = {
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
  /** Extra exits, rendered under the neighbour rows in the order given. */
  items?: FootNavItem[];
  /** Mono caption over the band. */
  label?: string;
  className?: string;
};

const ROW_CLASS =
  "group grid grid-cols-[1fr] gap-x-6 gap-y-1 border-b border-grid-line py-4 transition-colors hover:bg-blueprint/[0.04] sm:grid-cols-[9rem_1fr_auto] sm:items-baseline";

const KICKER_CLASS =
  "font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/55 transition-colors group-hover:text-blueprint";

const TITLE_CLASS =
  "font-serif-body text-[1.0625rem] leading-snug text-body-ink transition-colors group-hover:text-blueprint";

const MARK_CLASS =
  "hidden font-mono text-[11px] text-body-ink/40 transition-colors group-hover:text-blueprint sm:block";

function Row({
  kicker,
  title,
  href,
  external,
  mark,
}: FootNavItem & { mark: string }) {
  const inner = (
    <>
      <span className={KICKER_CLASS}>{kicker}</span>
      <span className={TITLE_CLASS}>{title}</span>
      <span aria-hidden="true" className={MARK_CLASS}>
        {mark}
      </span>
    </>
  );

  if (external) {
    return (
      <a href={href} className={ROW_CLASS}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={ROW_CLASS}>
      {inner}
    </Link>
  );
}

export function ChapterFootNav({
  prev,
  next,
  items,
  label = "Continues",
  className,
}: ChapterFootNavProps) {
  const rows: Array<FootNavItem & { mark: string }> = [];

  if (prev) {
    rows.push({ kicker: "Previous", title: prev.title, href: prev.href, mark: "‹" });
  }
  if (next) {
    rows.push({ kicker: "Next", title: next.title, href: next.href, mark: "›" });
  }
  for (const item of items ?? []) {
    rows.push({ ...item, mark: "›" });
  }

  if (rows.length === 0) return null;

  return (
    <nav
      aria-label="Chapter navigation"
      className={`border-t border-blueprint/40 pt-5 ${className ?? ""}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/55">
        {label}
      </p>
      <div className="mt-3">
        {rows.map((row) => (
          <Row key={`${row.kicker}-${row.href}`} {...row} />
        ))}
      </div>
    </nav>
  );
}
