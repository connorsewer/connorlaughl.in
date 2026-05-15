"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { renderProofAnchor, type ProofAnchor } from "@/content/soft-skills";

type Props = {
  proof: ProofAnchor[];
};

/**
 * Proof block. Walnut hairline above (animated draw on chapter entry),
 * mono "PROOF" label, and a typeset list of anchors. Each anchor is
 * rendered through renderProofAnchor() so the posture model decides
 * whether to show the internal name or the categorical phrase.
 *
 * Anchors with a deep-link href become quiet underline-on-hover links
 * to the matching case study or longform piece. data-cursor="open"
 * triggers the site's cursor "Open" label on hover.
 */
export function ProofBlock({ proof }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const [observed, setObserved] = useState(false);
  const revealed = reduced || observed;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || observed) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setObserved(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [reduced, observed]);

  const items = proof
    .map((p) => ({ key: p.internalName, rendered: renderProofAnchor(p) }))
    .filter(
      (p): p is { key: string; rendered: NonNullable<ReturnType<typeof renderProofAnchor>> } =>
        p.rendered !== null,
    );

  return (
    <div ref={ref} className="flex flex-col gap-5">
      <div
        aria-hidden="true"
        className="h-px bg-paper/30 origin-left"
        style={{
          transform: revealed ? "scaleX(1)" : "scaleX(0)",
          transition: reduced
            ? "none"
            : "transform 700ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-paper/55">
        Proof
      </span>
      <ul className="flex flex-col gap-2.5">
        {items.map((p) => (
          <li
            key={p.key}
            className="flex items-baseline gap-3 font-display text-base md:text-[1.0625rem] leading-relaxed"
          >
            <span aria-hidden="true" className="text-paper/35 shrink-0">
              ·
            </span>
            {p.rendered.href ? (
              <Link
                href={p.rendered.href}
                data-cursor="open"
                className="text-paper/85 hover:text-accent border-b border-transparent hover:border-accent/60 transition-colors"
              >
                {p.rendered.text}
              </Link>
            ) : (
              <span className="text-paper/80">{p.rendered.text}</span>
            )}
          </li>
        ))}
      </ul>
      <Fragment />
    </div>
  );
}
