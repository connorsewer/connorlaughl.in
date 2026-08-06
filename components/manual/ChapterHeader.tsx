import type { CSSProperties, ReactNode } from "react";

/**
 * The chapter title block, shared by every `ChapterLayout` consumer.
 *
 * One treatment, set once: centered on the sheet's measure, an optional mono
 * eyebrow, the title with the manual's trailing period, the dek centered on a
 * narrower measure, and the dinkus the reference sets under every dek.
 *
 * The eyebrow is decorative. It is a second reading of the title, so it is
 * hidden from assistive technology, which would otherwise hear the chapter
 * name twice.
 */

export type ChapterHeaderProps = {
  eyebrow?: string;
  title: string;
  dek?: ReactNode;
  /** Named for a view transition pair, when the route declares one. */
  titleStyle?: CSSProperties;
  /** Omit the dinkus where the next element is a rule of its own. */
  dinkus?: boolean;
};

/** Titles are set with a trailing period, the way the manual sets them. */
export function withPeriod(title: string): string {
  return /[.?!]$/.test(title) ? title : `${title}.`;
}

export function ChapterHeader({
  eyebrow,
  title,
  dek,
  titleStyle,
  dinkus = true,
}: ChapterHeaderProps) {
  return (
    <header className="mx-auto max-w-[68ch] text-center">
      {eyebrow ? (
        <p
          aria-hidden="true"
          className="font-mono text-[10px] uppercase tracking-[0.28em] text-blueprint"
        >
          {eyebrow}
        </p>
      ) : null}

      <h1
        className={`font-display text-[2rem] leading-tight text-body-ink sm:text-[2.75rem] ${
          eyebrow ? "mt-4" : ""
        }`}
        style={titleStyle}
      >
        {withPeriod(title)}
      </h1>

      {dek ? (
        <p className="mx-auto mt-5 max-w-[54ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
          {dek}
        </p>
      ) : null}

      {dinkus ? (
        <span
          aria-hidden="true"
          className="mt-7 block font-mono text-[11px] tracking-[0.5em] text-body-ink/60"
        >
          -----
        </span>
      ) : null}
    </header>
  );
}
