"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

type Props = {
  children: ReactNode;
  /** Pixels of mouse proximity that pull the child. Defaults to 110. */
  radius?: number;
  /** Maximum pixel displacement of the child along each axis. */
  max?: number;
  /** Spring damping; higher = snappier, lower = floaty. */
  damping?: number;
  className?: string;
};

/**
 * Pulls a wrapped child toward the cursor when the mouse enters its
 * proximity radius. Uses a per-instance pointermove handler scoped to
 * `window` so the magnetism activates even when the cursor is outside
 * the child but inside the radius.
 *
 * Reduced motion: no listener attached, the child renders untransformed.
 *
 * Spec source: lib/motion.ts `magnetic`.
 */
export function Magnetic({
  children,
  radius = 110,
  max = 6,
  damping = 0.16,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = ref.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    function handle(e: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        targetX = 0;
        targetY = 0;
      } else {
        const intensity = 1 - dist / radius;
        targetX = (dx / radius) * max * intensity;
        targetY = (dy / radius) * max * intensity;
      }
    }

    function tick() {
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;
      el!.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handle, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", handle);
      cancelAnimationFrame(rafId);
      el.style.transform = "";
    };
  }, [radius, max, damping, reducedMotion]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-block", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
