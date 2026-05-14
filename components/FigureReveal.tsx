"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = { children: ReactNode };

/**
 * Wraps a frame and runs a single redaction-sweep reveal the first time the
 * wrapped frame enters the viewport. Respects prefers-reduced-motion.
 *
 * SSR ships data-js="inactive" so the blurred state CSS never applies to
 * crawlers, no-JS browsers, or pre-hydration paints. On mount, the data-js
 * attribute flips to "active" via the ref so the observer can take over.
 * The IntersectionObserver runs with a 200px bottom rootMargin so figures
 * start revealing a beat before they cross the fold.
 */
export function FigureReveal({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.js = "active";

    if (reducedMotion || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px 200px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, revealed]);

  return (
    <div
      ref={ref}
      data-js="inactive"
      data-revealed={reducedMotion || revealed ? "true" : "false"}
      className="figure-reveal"
    >
      {children}
    </div>
  );
}
