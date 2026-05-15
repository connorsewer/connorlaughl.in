"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const AXES = [
  { label: "EXECUTIVE GTM JUDGMENT", y: 56 },
  { label: "SYSTEMS FLUENCY", y: 130 },
  { label: "AI-NATIVE OPERATING FLUENCY", y: 204 },
] as const;

type Leader = {
  d: string;
  delayMs: number;
};

const LEADERS: Leader[] = [
  { d: "M 308 56 L 460 130", delayMs: 0 },
  { d: "M 308 130 L 460 130", delayMs: 180 },
  { d: "M 308 204 L 460 130", delayMs: 360 },
  { d: "M 460 130 L 488 130", delayMs: 540 },
];

const DRAW_DURATION_MS = 720;
const CAPTION_DELAY_MS = 880;
const CAPTION_DURATION_MS = 600;
const EASING = "cubic-bezier(0.4, 0, 0.2, 1)";

/**
 * Typeset thesis diagram for the /edge hero. Three operating axes
 * converge on the central thesis "judgment at speed."
 *
 * On viewport entry, four leader lines draw in staggered sequence
 * (0ms, 180ms, 360ms, 540ms), then the right caption fades in at
 * ~880ms. Reduced-motion users get the final state on mount.
 *
 * Pure typography. No raster image required.
 */
export function EdgeThesisDiagram() {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [observedReveal, setObservedReveal] = useState(false);
  const revealed = reduced || observedReveal;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || observedReveal) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setObservedReveal(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.3, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, observedReveal]);

  return (
    <figure ref={ref} className="flex flex-col gap-3 w-full">
      <div className="dither-frame w-full">
        <div
          className="frame-well bg-ink overflow-hidden flex items-center"
          style={{
            aspectRatio: "640 / 260",
            padding: "20px 24px",
            backgroundImage:
              "radial-gradient(circle, color-mix(in oklab, var(--paper) 22%, transparent) 1px, transparent 1.6px)",
            backgroundSize: "9px 9px",
            backgroundPosition: "0 0",
          }}
        >
          <svg
            viewBox="0 0 640 260"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="edge-thesis-title edge-thesis-desc"
            className="w-full h-full"
          >
            <title id="edge-thesis-title">
              Three operating axes converging on judgment at speed
            </title>
            <desc id="edge-thesis-desc">
              Executive GTM judgment, systems fluency, and AI-native operating
              fluency converge on the central thesis: judgment at speed.
            </desc>

            {AXES.map(({ label, y }) => (
              <text
                key={label}
                x={296}
                y={y}
                textAnchor="end"
                dominantBaseline="middle"
                fill="var(--paper)"
                fillOpacity={0.85}
                style={{
                  fontFamily:
                    "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                }}
              >
                {label}
              </text>
            ))}

            <g
              fill="none"
              stroke="var(--paper)"
              strokeOpacity={0.7}
              strokeWidth={1}
              strokeLinecap="round"
            >
              {LEADERS.map(({ d, delayMs }) => (
                <path
                  key={d}
                  d={d}
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: revealed ? 0 : 1,
                    transition: reduced
                      ? "none"
                      : `stroke-dashoffset ${DRAW_DURATION_MS}ms ${EASING} ${delayMs}ms`,
                  }}
                />
              ))}
            </g>

            <circle
              cx={460}
              cy={130}
              r={3.5}
              fill="var(--accent)"
              style={{
                opacity: revealed ? 1 : 0,
                transition: reduced
                  ? "none"
                  : `opacity 320ms ${EASING} ${CAPTION_DELAY_MS - 120}ms`,
              }}
            />

            <text
              x={500}
              y={130}
              dominantBaseline="middle"
              fill="var(--paper)"
              style={{
                fontFamily:
                  "var(--font-display), 'GT Sectra Fine', Georgia, serif",
                fontSize: 22,
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: -0.3,
                opacity: revealed ? 1 : 0,
                transition: reduced
                  ? "none"
                  : `opacity ${CAPTION_DURATION_MS}ms ${EASING} ${CAPTION_DELAY_MS}ms`,
              }}
            >
              judgment at speed
            </text>
          </svg>
        </div>
      </div>
      <figcaption className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55">
        <span className="fig-num">[Fig. 40]</span>
        <span aria-hidden="true">·</span>
        <span className="normal-case tracking-wide text-paper/65">
          Three operating axes converging on the thesis
        </span>
      </figcaption>
    </figure>
  );
}
