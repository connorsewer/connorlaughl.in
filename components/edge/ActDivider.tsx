"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import type { Act } from "@/content/soft-skills";

type Props = {
  act: Act;
};

/**
 * Full-bleed act divider plate. Roman numeral in GT Sectra Black at
 * a large display size, act title in GT Sectra Medium, mono subtitle
 * underneath. Stippled dither pattern over the band so it reads as
 * letterpress, not chrome.
 *
 * The inner content parallax-translates at 0.85x scroll for a
 * weighted feel. Reduced-motion users get a static plate.
 */
export function ActDivider({ act }: Props) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = outer.getBoundingClientRect();
      const vp = window.innerHeight;
      const denom = vp + rect.height;
      if (denom <= 0) return;
      const progress = 1 - rect.bottom / denom;
      const clamped = Math.max(0, Math.min(1, progress));
      const offset = (clamped - 0.5) * 60;
      inner.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <div
      ref={outerRef}
      className="relative -mx-6 lg:mx-0 my-6 md:my-10 overflow-hidden border-y border-rule"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--dither-shadow) 1px, transparent 1.5px)",
        backgroundSize: "8px 8px",
        backgroundColor: "color-mix(in oklab, var(--paper) 3%, transparent)",
      }}
    >
      <div
        ref={innerRef}
        className="px-6 py-16 md:py-24 mx-auto max-w-6xl"
        style={{ willChange: "transform" }}
      >
        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent">
              Act {act.number}
            </span>
            <span
              aria-hidden="true"
              className="block font-display font-black leading-[0.85] text-[clamp(5.5rem,12vw,8.5rem)] text-paper"
            >
              {act.number}
            </span>
          </div>
          <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-3 self-end">
            <h2 className="font-display font-medium text-3xl md:text-4xl leading-[1.1] text-balance text-paper">
              {act.title}
            </h2>
            <p className="font-display italic text-base md:text-lg text-paper/65 max-w-[52ch]">
              {act.subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
