"use client";

import { motion } from "framer-motion";
import { KeyboardEvent, PropsWithChildren, useState } from "react";

/**
 * Public-safe artifact preview.
 * Default: lightly redacted. Hover, focus, click, Enter, or Space reveal it.
 */
export function RedactionReveal({
  label = "Deep dive",
  children,
}: PropsWithChildren<{ label?: string }>) {
  const [revealed, setRevealed] = useState(false);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setRevealed(true);
    }
  };

  return (
    <div
      aria-expanded={revealed}
      aria-label={`${revealed ? "Hide" : "Reveal"} artifact examples`}
      className="group relative overflow-hidden rounded-2xl border border-rule bg-ink/35 p-6 transition-colors hover:border-accent/70 focus-visible:border-accent"
      onBlur={() => setRevealed(false)}
      onClick={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      role="button"
      tabIndex={0}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="meta-label-muted">{label}</div>
        <div className="meta-label-accent">
          {revealed ? "Shown" : "Focus or hover to reveal artifacts"}
        </div>
      </div>

      <div className={`mt-4 min-h-14 pb-1 leading-relaxed transition-colors ${revealed ? "text-paper/82" : "text-paper/52"}`}>
        {children}
      </div>

      <motion.div
        animate={{ opacity: revealed ? 0 : 0.86 }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-2 top-[3.9rem]"
        initial={false}
        transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
      >
        <div className="absolute inset-0 bg-ink/88 backdrop-blur-[1px]" />
        <div className="absolute inset-x-5 top-0 h-full">
          <div className="absolute left-0 right-0 top-[18%] h-7 rounded-xl bg-paper/18" />
          <div className="absolute left-0 right-10 top-[44%] h-6 rounded-xl bg-paper/16" />
          <div className="absolute left-0 right-24 top-[66%] h-7 rounded-xl bg-paper/14" />
        </div>
      </motion.div>
    </div>
  );
}
