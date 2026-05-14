"use client";

import { animate } from "motion";
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  /** Trigger value: any change re-fires the pulse. */
  value: string | number;
  children: ReactNode;
  className?: string;
};

/**
 * Wraps a node and fires a brief scale + opacity pulse whenever `value`
 * changes. Used on the RevOps planner output cells so an input change
 * registers visually even when the output number tweens are too short to
 * read.
 *
 * Reduced motion: no animation, no opacity dip, no scale.
 */
export function PulseOnChange({ value, children, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const lastRef = useRef<string | number>(value);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (lastRef.current === value) return;
    lastRef.current = value;
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;
    animate(
      el,
      {
        opacity: [0.55, 1],
        transform: ["scale(0.985)", "scale(1)"],
      },
      { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    );
  }, [value, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
