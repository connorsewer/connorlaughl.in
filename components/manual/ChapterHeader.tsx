import type { CSSProperties, ReactNode } from "react";

/**
 * The chapter title block, shared by every `ChapterLayout` consumer.
 *
 * One treatment, set once: left-aligned to the body edge on the sheet's
 * reading measure, an optional mono eyebrow, the title with the manual's
 * trailing period, the dek on the annotation measure, and an ornament under
 * the dek.
 *
 * Alignment (audit #39). The block used to be centered while everything below
 * it was left-aligned, so the page changed alignment language 400px in. The
 * two-axis switch was not carrying meaning, so the header now sits on the body
 * edge: one axis, top to bottom.
 *
 * Ornament (audit #32). The old dinkus was five spaced hyphens, which read at
 * 10px as a broken dashed rule. It is now a drawn ornament — two short
 * blueprint rules around a centred middot — and it renders only when there is
 * a dek to close, because under a bare title it looked like an artifact.
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
  /** Omit the ornament where the next element is a rule of its own. */
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
    <header className="max-w-[68ch]">
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
        <p className="mt-5 max-w-[46ch] font-serif-body text-[1.0625rem] leading-relaxed text-body-ink/80">
          {dek}
        </p>
      ) : null}

      {dinkus && dek ? (
        <span aria-hidden="true" className="mt-7 flex items-center gap-2">
          <span className="h-px w-6 bg-blueprint/40" />
          <span className="font-mono text-[11px] leading-none text-blueprint/70">
            &middot;
          </span>
          <span className="h-px w-6 bg-blueprint/40" />
        </span>
      ) : null}
    </header>
  );
}
