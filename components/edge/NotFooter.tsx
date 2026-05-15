import { Fragment } from "react";

type Props = {
  items: string[];
};

/**
 * Single mono "NOT:" line that closes a chapter. Carries the
 * "avoid reducing this to" phrases joined by middot. A thin walnut
 * hairline below acts as the chapter's bottom rule.
 */
export function NotFooter({ items }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <p className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 font-mono text-[10px] tracking-[0.25em] uppercase">
        <span className="text-paper/45">NOT:</span>
        {items.map((s, i) => (
          <Fragment key={s}>
            <span className="normal-case tracking-wide text-paper/55">
              {s}
            </span>
            {i < items.length - 1 && (
              <span aria-hidden="true" className="text-paper/30">
                ·
              </span>
            )}
          </Fragment>
        ))}
      </p>
      <div aria-hidden="true" className="h-px bg-paper/15" />
    </div>
  );
}
