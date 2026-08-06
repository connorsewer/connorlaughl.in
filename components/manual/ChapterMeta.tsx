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
  className?: string;
};

export function ChapterMeta({
  words,
  author = "Connor Laughlin",
  className,
}: ChapterMetaProps) {
  return (
    <p
      className={`font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/55 ${
        className ?? ""
      }`}
    >
      {words.toLocaleString("en-US")} words
      <span aria-hidden="true" className="mx-2 text-body-ink/30">
        |
      </span>
      <span className="sr-only">by </span>
      {author}
    </p>
  );
}
