import type { ElementType, ReactNode } from "react";

/**
 * White content sheet on the graph-paper ground.
 *
 * Reference crop: `docs/superpowers/reference/chapter-1440.png` — the chapter
 * body sits on a white card with a hairline border and a shadow soft enough
 * that it reads as a sheet resting on paper rather than as a floating panel.
 *
 * The sheet carries no measure cap of its own; body copy inside it is capped
 * by `.manual-body` and the page's own column width.
 */

export type SheetProps = {
  children: ReactNode;
  /** Element to render. Use `main` or `article` when the sheet is the page body. */
  as?: ElementType;
  className?: string;
  id?: string;
};

export function Sheet({ children, as, className, id }: SheetProps) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      id={id}
      // Full bleed below 768px: no border, no shadow, no ground showing at the
      // edges. A phone screen is the sheet.
      className={`bg-sheet max-md:border-0 max-md:shadow-none md:border md:border-grid-line md:shadow-[0_1px_2px_rgba(23,23,21,0.04),0_12px_32px_-24px_rgba(23,23,21,0.35)] ${
        className ?? ""
      }`}
    >
      {children}
    </Tag>
  );
}
