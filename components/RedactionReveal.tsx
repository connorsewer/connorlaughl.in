"use client";

import { PropsWithChildren, useState } from "react";

/**
 * Click-to-reveal redaction. Children are obscured with a redaction overlay
 * (full coverage, blurred + black-bar texture) until the user reveals.
 *
 * Accessible by default: works with mouse, keyboard, and touch. The reveal
 * is a real button. Children are aria-hidden when redacted so screen readers
 * don't announce hidden content.
 */
export function RedactionReveal({
  label = "CONFIDENTIAL",
  children,
}: PropsWithChildren<{ label?: string }>) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative rounded-2xl border border-rule bg-ink/35 p-5 overflow-hidden">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="font-mono text-[11px] tracking-[0.28em] text-paper/70">
          {label}
        </div>
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-pressed={revealed}
          className="font-mono text-[11px] tracking-[0.28em] text-accent hover:text-paper transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded"
        >
          {revealed ? "Hide" : "Reveal"}
        </button>
      </div>

      <div
        className="relative text-paper/80 leading-relaxed"
        aria-hidden={!revealed}
      >
        <div
          className={`transition-[filter,opacity] duration-500 ease-out ${
            revealed ? "opacity-100 blur-0" : "opacity-30 blur-[6px] select-none"
          }`}
        >
          {children}
        </div>

        {/* Redaction bars overlay. Fades out on reveal. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out ${
            revealed ? "opacity-0" : "opacity-90"
          }`}
        >
          <RedactionBars />
        </div>
      </div>
    </div>
  );
}

/**
 * Generates a deterministic set of black bars with varied widths/heights,
 * so each instance looks like a real redaction, not a CSS pattern.
 */
function RedactionBars() {
  // Pseudo-random but deterministic widths between 35% and 92%
  const bars = [
    { top: "8%", height: "1.05em", width: "62%", left: "0%" },
    { top: "22%", height: "1.05em", width: "84%", left: "0%" },
    { top: "36%", height: "1.05em", width: "48%", left: "0%" },
    { top: "50%", height: "1.05em", width: "76%", left: "0%" },
    { top: "64%", height: "1.05em", width: "40%", left: "0%" },
    { top: "78%", height: "1.05em", width: "58%", left: "0%" },
  ];
  return (
    <>
      {bars.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-[2px] bg-black/85"
          style={{ top: b.top, left: b.left, width: b.width, height: b.height }}
        />
      ))}
    </>
  );
}
