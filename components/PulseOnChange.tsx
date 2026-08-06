"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { valuePulse } from "@/lib/motion-manual";

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
 * `inline-block` is load-bearing, not spacing: `transform` does not apply to a
 * non-replaced inline box, so on a bare `<span>` the scale leg of the pulse
 * silently did nothing and only the opacity ran.
 *
 * Reduced motion: no animation, no opacity dip, no scale.
 */
export function PulseOnChange({ value, children, className }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const lastRef = useRef<string | number>(value);

  useEffect(() => {
    if (lastRef.current === value) return;
    lastRef.current = value;
    return valuePulse(ref.current);
  }, [value]);

  return (
    <span ref={ref} className={`inline-block ${className ?? ""}`}>
      {children}
    </span>
  );
}
