"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { PropsWithChildren, useCallback } from "react";

/**
 * Luxury-friendly “public-safe / deep-dive” reveal.
 * Default: subtle redaction bars. On hover/focus: bars slide to expose content.
 */
export function RedactionReveal({
  label = "DEEP DIVE",
  children,
}: PropsWithChildren<{ label?: string }>) {
  const x = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 30 });

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      x.set(px);
    },
    [x]
  );

  return (
    <div
      onMouseMove={onMove}
      className="relative rounded-2xl border border-rule bg-ink/35 p-5 overflow-hidden"
      tabIndex={0}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="font-mono text-[11px] tracking-[0.28em] text-paper/70">
          {label}
        </div>
        <div className="font-mono text-[11px] tracking-[0.28em] text-accent/90">
          HOVER TO REVEAL
        </div>
      </div>

      <div className="mt-4 text-paper/80 leading-relaxed">{children}</div>

      {/* Redaction bars layer */}
      <motion.div
        aria-hidden
        style={{ translateX: sx }}
        className="pointer-events-none absolute inset-0 opacity-[0.92]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink to-transparent" />
        <div className="absolute left-[-35%] top-0 h-full w-[70%]">
          <div className="absolute left-0 top-[28%] h-8 w-full rounded-xl bg-black/70" />
          <div className="absolute left-0 top-[47%] h-6 w-full rounded-xl bg-black/65" />
          <div className="absolute left-0 top-[62%] h-7 w-full rounded-xl bg-black/60" />
        </div>
      </motion.div>
    </div>
  );
}
