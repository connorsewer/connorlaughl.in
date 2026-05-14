"use client";

import { useEffect, useState } from "react";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "reading-tldr-summary", label: "TLDR" },
  { id: "case-logic-heading", label: "5-part case" },
  { id: "proof-heading", label: "Proof" },
  { id: "systems-heading", label: "Systems" },
  { id: "artifacts-heading", label: "Artifacts" },
  { id: "interview-heading", label: "Interview" },
  { id: "deep-dive-heading", label: "Deep dive" },
];

/**
 * Fixed left-rail table of contents for case-study detail pages. Uses an
 * IntersectionObserver per section, with a `-30% 0% -60% 0%` rootMargin so
 * the active state lights up when a section is roughly in the upper third
 * of the viewport (a natural reading position).
 *
 * Visible on xl screens (>=1280px) only; the case article is centered at
 * max-w-4xl so the rail has its own column. On smaller screens, this
 * component renders nothing — the Reading-Path-Jump pills inside the
 * article carry the navigation load.
 */
export function CaseStudyTOC() {
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActive(id);
            }
          }
        },
        { rootMargin: "-30% 0px -60% 0px" },
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <aside
      className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-40 max-w-[12rem]"
      aria-label="Case study sections"
    >
      <ol className="flex flex-col gap-3 font-mono text-[10px] tracking-[0.2em] uppercase">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`group flex items-center gap-3 py-1 transition-colors ${
                  isActive ? "text-accent" : "text-paper/40 hover:text-paper"
                }`}
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`block h-px transition-all duration-300 ${
                    isActive ? "w-8 bg-accent" : "w-3 bg-paper/30 group-hover:w-5"
                  }`}
                />
                <span>{label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
