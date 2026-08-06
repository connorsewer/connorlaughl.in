/**
 * Chapter meta line.
 *
 * Reference crop: `docs/superpowers/reference/chapter-1440.png` at y≈174 —
 * a single centered mono line inside the sheet, above the chapter title,
 * reading `1384 WORDS | DAN MOLLICK`. Small, uppercase, wide tracking, muted
 * against the sheet.
 *
 * Word counts come from `lib/word-counts.ts` (build-computed from the rendered
 * public projection), so the numeral here is structural, not a claim. Routes
 * with no honest count — /resume, /about, TSX-authored pages — omit `words`
 * entirely and `ChapterLayout` then renders no meta line at all.
 */

export type ChapterMetaProps = {
  /** Build-computed word count for the chapter body. */
  words: number;
  /** Byline. Defaults to the site owner. */
  author?: string;
  /**
   * Reading axis. Left by default, matching `ChapterHeader` after audit #39.
   *
   * Applied as an inline style rather than a class on purpose: `ChapterLayout`
   * still passes a `text-center` utility in `className`, and a utility cannot
   * reliably outrank another utility of the same specificity. The inline value
   * settles it in one place while the chrome owner catches up.
   */
  align?: "left" | "center";
  className?: string;
};

export function ChapterMeta({
  words,
  author = "CONNOR J. LAUGHLIN",
  align = "left",
  className,
}: ChapterMetaProps) {
  return (
    <p
      style={{ textAlign: align }}
      className={`font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/60 ${
        className ?? ""
      }`}
    >
      {words.toLocaleString("en-US")} words
      <span aria-hidden="true" className="mx-2 text-body-ink/50">
        |
      </span>
      <span className="sr-only">by </span>
      {author}
    </p>
  );
}
