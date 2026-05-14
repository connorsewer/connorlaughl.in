"use client";

import { animate, inView, stagger } from "motion";
import { Fragment, useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { splitTextChars, splitTextWords } from "@/lib/motion";

type Granularity = "word" | "char";
type Tag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

type Props = {
  children: string;
  as?: Tag;
  className?: string;
  /** Split granularity. Char is for the hero only. */
  granularity?: Granularity;
  /** Extra delay before the stagger begins, in seconds. */
  delay?: number;
  /** Trigger only the first time the element enters the viewport. */
  once?: boolean;
  /** Style the rendered element. Passes through to the outer Tag. */
  style?: React.CSSProperties;
};

/**
 * SplitText. Renders the source string as a flat sequence of per-word or
 * per-char spans during render so SSR ships the pre-set DOM. Each span is
 * initially translateY/opacity 0. On mount, a `motion.dev` `inView`
 * subscription animates the spans into place with a stagger.
 *
 * Reduced motion: the spans are rendered at their final position and full
 * opacity from the first paint. No animation runs.
 *
 * Accessibility: the outer tag carries the full string as `aria-label`,
 * every span carries `aria-hidden` so screen readers announce the source
 * string once.
 */
export function SplitText({
  children,
  as = "span",
  className = "",
  granularity = "word",
  delay = 0,
  once = true,
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  // Split during render so SSR has the final DOM.
  const tokens =
    granularity === "char" ? Array.from(children) : children.split(/(\s+)/);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) return;

    const spans = Array.from(
      el.querySelectorAll<HTMLSpanElement>("span[data-anim='1']"),
    );
    if (spans.length === 0) return;

    const spec = granularity === "char" ? splitTextChars : splitTextWords;

    const stop = inView(
      el,
      () => {
        animate(
          spans,
          { opacity: 1, transform: "translateY(0px)" },
          {
            ...spec.options,
            delay: stagger(spec.stagger, { startDelay: delay }),
          },
        );
      },
      { amount: 0.25 },
    );

    return () => {
      if (once) stop();
    };
  }, [children, granularity, delay, once, reduced]);

  const Tag = as;
  const initialSpanStyle: React.CSSProperties = reduced
    ? { display: "inline-block" }
    : {
        display: "inline-block",
        opacity: 0,
        transform: "translateY(24px)",
        willChange: "transform, opacity",
      };

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      aria-label={children}
      className={className}
      style={style}
    >
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return <Fragment key={i}>{token}</Fragment>;
        }
        return (
          <span
            key={i}
            data-anim="1"
            aria-hidden="true"
            style={initialSpanStyle}
          >
            {token}
          </span>
        );
      })}
    </Tag>
  );
}
