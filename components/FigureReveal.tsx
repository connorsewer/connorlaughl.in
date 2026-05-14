"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = { children: ReactNode };

/**
 * Wraps a frame and runs a single redaction-sweep reveal the first time the
 * wrapped frame enters the viewport. Respects prefers-reduced-motion.
 */
export function FigureReveal({ children }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reducedMotion || revealed) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion, revealed]);

  return (
    <div
      ref={ref}
      data-revealed={reducedMotion ? "true" : revealed ? "true" : "false"}
      className="figure-reveal"
    >
      {children}
    </div>
  );
}
