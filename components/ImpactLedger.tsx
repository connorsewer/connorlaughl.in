"use client";

import { animate, inView, stagger } from "motion";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { impactLedger } from "@/content/proof-metrics";
import { EASE, STAGGER } from "@/lib/motion";

/**
 * Impact ledger as a typeset table. Each group renders as one row:
 *   left rail   : group title in mono
 *   anchor cell : the first metric, rendered at display-stat size
 *                 (GT Sectra Fine Black) with label + context underneath
 *   support row : remaining metrics as a compact serif row with
 *                 smaller numbers and mono labels
 *
 * Rows reveal with a stagger-up on viewport entry. Reduced motion shows
 * the final state immediately.
 */
export function ImpactLedger() {
  const ref = useRef<HTMLDivElement | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const rows = Array.from(
      el.querySelectorAll<HTMLDivElement>("[data-row]"),
    );
    if (rows.length === 0) return;
    const stop = inView(
      el,
      () => {
        animate(
          rows,
          { opacity: 1, transform: "translateY(0px)" },
          {
            duration: 0.6,
            ease: EASE.outQuart,
            delay: stagger(STAGGER.med),
          },
        );
      },
      { amount: 0.15 },
    );
    return () => stop();
  }, [reducedMotion]);

  const initial = reducedMotion
    ? undefined
    : { opacity: 0, transform: "translateY(28px)", willChange: "transform, opacity" };

  return (
    <div ref={ref} className="divide-y divide-rule">
      {impactLedger.map((group) => {
        const [anchor, ...supporting] = group.metrics;
        return (
          <div
            key={group.id}
            data-row
            className="grid lg:grid-cols-12 gap-x-8 gap-y-6 py-12"
            style={initial}
          >
            <h3 className="lg:col-span-3 font-mono text-[11px] tracking-[0.3em] uppercase text-accent pt-3">
              {group.title}
            </h3>

            <div className="lg:col-span-9 flex flex-col gap-8">
              {anchor ? (
                <div className="flex flex-col gap-2">
                  <span className="font-display font-black text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] tabular-nums tracking-tight text-balance">
                    {anchor.value}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/70 leading-snug">
                    {anchor.label}
                  </span>
                  <p className="text-paper/60 text-sm leading-relaxed max-w-2xl">
                    {anchor.context}
                  </p>
                </div>
              ) : null}

              {supporting.length > 0 ? (
                <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 pt-2 border-t border-rule/70">
                  {supporting.map((m) => (
                    <div key={`${group.id}-${m.label}`} className="flex flex-col gap-1">
                      <dt className="sr-only">{m.label}</dt>
                      <dd className="font-display font-medium text-xl tabular-nums leading-tight">
                        {m.value}
                      </dd>
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/55 leading-snug">
                        {m.label}
                      </span>
                      <span className="text-paper/45 text-xs leading-relaxed">
                        {m.context}
                      </span>
                    </div>
                  ))}
                </dl>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
