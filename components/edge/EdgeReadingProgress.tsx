"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  /** Selector for the element to measure progress against. */
  targetSelector?: string;
};

/**
 * 1px walnut-toned vertical hair-rule glued to the right viewport
 * edge. Fills top-to-bottom as the user scrolls through the target
 * element. Almost invisible by design.
 *
 * Reduced-motion users get no listener and a static empty bar.
 */
export function EdgeReadingProgress({
  targetSelector = "main",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const bar = ref.current;
    if (!bar) return;
    const target = document.querySelector<HTMLElement>(targetSelector);
    if (!target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        bar.style.transform = "scaleY(0)";
        return;
      }
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / total));
      bar.style.transform = `scaleY(${progress.toFixed(4)})`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, targetSelector]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 bottom-0 z-20 w-px"
    >
      <div
        ref={ref}
        className="h-full bg-accent/30 origin-top"
        style={{ transform: "scaleY(0)", willChange: "transform" }}
      />
    </div>
  );
}
