"use client";

import { useEffect, useState } from "react";
import { ACTS, softSkills, type ActSlug } from "@/content/soft-skills";
import { Magnetic } from "@/components/Magnetic";

const ACT_ORDER: ActSlug[] = ["move", "make-sense", "build-leverage"];

/**
 * Sticky chapter index for /edge.
 *
 * Reads as a film-reel: the active chapter is brighter and slightly
 * larger with a walnut tick glyph, prior chapters dim toward neutral,
 * upcoming chapters sit at standby. Inline act dividers separate the
 * three groups.
 *
 * Scroll spy: IntersectionObserver per chapter section with
 * rootMargin -40% 0px -55% 0px so the active flip happens at
 * commitment, not on entry. The active row gets <Magnetic>; everyone
 * else stays still.
 */
export function EdgeStickyTOC() {
  const [activeSlug, setActiveSlug] = useState<string>(softSkills[0].slug);

  useEffect(() => {
    const sections = softSkills
      .map((s) => ({
        slug: s.slug,
        el: document.getElementById(`${s.number}-${s.slug}`),
      }))
      .filter((x): x is { slug: string; el: HTMLElement } => x.el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const winner = sections.find((s) => s.el === visible[0].target);
        if (winner) setActiveSlug(winner.slug);
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );
    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  const activeIdx = softSkills.findIndex((s) => s.slug === activeSlug);

  return (
    <nav
      aria-label="Edge chapters"
      className="sticky top-24 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent">
          Edge
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-paper/45">
          11 chapters
        </span>
      </div>

      <ol className="flex flex-col gap-2.5 max-h-[70vh] overflow-y-auto pr-2 -mr-2">
        {ACT_ORDER.map((actSlug, actIndex) => {
          const act = ACTS[actSlug];
          const skillsInAct = softSkills.filter((s) => s.act === actSlug);
          return (
            <li key={actSlug} className="flex flex-col gap-2.5 list-none">
              <div
                className={`flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-paper/35 ${
                  actIndex > 0 ? "pt-3" : ""
                }`}
              >
                <span aria-hidden="true">───</span>
                <span>Act {act.number}</span>
                <span aria-hidden="true" className="flex-1 truncate">
                  ──────────
                </span>
              </div>
              {skillsInAct.map((skill) => {
                const idx = softSkills.findIndex((s) => s.slug === skill.slug);
                const isActive = skill.slug === activeSlug;
                const isPast = idx < activeIdx;
                const stateClass = isActive
                  ? "text-paper text-[15px]"
                  : isPast
                    ? "text-paper/35 text-[13px]"
                    : "text-paper/65 text-[13px]";
                const link = (
                  <a
                    href={`#${skill.number}-${skill.slug}`}
                    aria-current={isActive ? "location" : undefined}
                    data-cursor="read"
                    className={`flex items-baseline gap-2.5 leading-tight font-display transition-all duration-300 ease-out hover:text-paper hover:opacity-100 ${stateClass}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`shrink-0 -ml-1 w-2 ${isActive ? "text-accent" : ""}`}
                    >
                      {isActive ? "▌" : ""}
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.22em] text-paper/55 shrink-0 mt-[2px]">
                      {skill.number}
                    </span>
                    <span className="text-balance">{skill.name}</span>
                  </a>
                );
                return (
                  <li key={skill.slug} className="list-none">
                    {isActive ? <Magnetic max={4}>{link}</Magnetic> : link}
                  </li>
                );
              })}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
