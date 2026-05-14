"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  value: string;
  durationMs?: number;
  /** Delay before counting starts, in ms. Used to stagger groups. */
  delayMs?: number;
};

/**
 * Counts up to a numeric portion of a value string, holding the surrounding
 * text. "$159.4M" → counts the 159.4 part. "22-agent" → counts the 22.
 * Respects prefers-reduced-motion (renders the final string immediately).
 */
export function CountUp({ value, durationMs = 900, delayMs = 0 }: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const [hasRun, setHasRun] = useState(false);

  // Extract the first numeric run (with optional decimal) from the value
  const match = value.match(/-?\d+(?:[\.,]\d+)?/);
  const numeric = match ? Number(match[0].replace(/,/g, "")) : NaN;
  const prefix = match ? value.slice(0, match.index ?? 0) : value;
  const suffix = match
    ? value.slice((match.index ?? 0) + match[0].length)
    : "";

  useEffect(() => {
    if (reducedMotion || hasRun) return;
    if (!isFinite(numeric)) return;
    const el = ref.current;
    if (!el) return;

    let observed = false;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !observed) {
            observed = true;
            observer.disconnect();
            runAnimation();
          }
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);

    let raf = 0;
    let timeout = 0;

    const decimalsInValue = match && match[0].includes(".")
      ? (match[0].split(".")[1] ?? "").length
      : 0;

    const formatNumber = (n: number) => {
      if (decimalsInValue > 0) return n.toFixed(decimalsInValue);
      return Math.round(n).toLocaleString("en-US");
    };

    function runAnimation() {
      timeout = window.setTimeout(() => {
        const start = performance.now();
        function tick(now: number) {
          const t = Math.min(1, (now - start) / durationMs);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - t, 3);
          const current = numeric * eased;
          if (ref.current) {
            ref.current.textContent = `${prefix}${formatNumber(current)}${suffix}`;
          }
          if (t < 1) {
            raf = window.requestAnimationFrame(tick);
          } else {
            if (ref.current) {
              ref.current.textContent = value;
            }
            setHasRun(true);
          }
        }
        raf = window.requestAnimationFrame(tick);
      }, delayMs);
    }

    return () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(raf);
    };
  }, [reducedMotion, hasRun, numeric, prefix, suffix, value, durationMs, delayMs, match]);

  return (
    <span
      ref={ref}
      data-value={value}
      style={
        reducedMotion
          ? undefined
          : { fontVariantNumeric: "tabular-nums" }
      }
    >
      {value}
    </span>
  );
}
