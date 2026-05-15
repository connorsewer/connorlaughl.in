"use client";

import { useEffect, useRef, useState } from "react";
import { softSkills } from "@/content/soft-skills";

/**
 * Mobile chapter chip + full-screen sheet for /edge.
 *
 * Sticks beneath the site header at narrow viewports; renders the
 * active chapter as "NN/11 · Title". Tap opens a native <dialog>
 * with all eleven chapters listed (escape closes, focus trapped).
 *
 * The same scroll spy as EdgeStickyTOC drives the active chapter
 * indicator.
 */
export function EdgeMobileChip() {
  const [activeIdx, setActiveIdx] = useState(0);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const sections = softSkills
      .map((s, i) => ({
        idx: i,
        el: document.getElementById(`${s.number}-${s.slug}`),
      }))
      .filter((x): x is { idx: number; el: HTMLElement } => x.el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length === 0) return;
        const winner = sections.find((s) => s.el === visible[0].target);
        if (winner) setActiveIdx(winner.idx);
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5],
      },
    );
    sections.forEach((s) => observer.observe(s.el));
    return () => observer.disconnect();
  }, []);

  const current = softSkills[activeIdx];

  function close() {
    dialogRef.current?.close();
  }

  return (
    <>
      <div className="lg:hidden sticky top-16 z-30 border-b border-rule bg-ink/85 backdrop-blur-md">
        <button
          type="button"
          onClick={() => dialogRef.current?.showModal()}
          className="flex items-center gap-3 w-full px-6 py-3 text-left"
          aria-haspopup="dialog"
          aria-label={`Edge chapters, currently chapter ${current.number}`}
        >
          <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-paper/60 shrink-0">
            {current.number}/11
          </span>
          <span aria-hidden="true" className="text-paper/30">
            ·
          </span>
          <span className="font-display text-sm text-paper/85 truncate">
            {current.name}
          </span>
          <span
            aria-hidden="true"
            className="ml-auto font-mono text-[10px] tracking-[0.22em] text-accent"
          >
            INDEX ↗
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Edge chapter index"
        className="bg-ink text-paper p-0 m-0 w-full max-w-none h-full max-h-none border-0 backdrop:bg-ink/85"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex flex-col h-full">
          <header className="flex items-center justify-between px-6 py-4 border-b border-rule">
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-accent">
              Edge — chapters
            </span>
            <button
              type="button"
              onClick={close}
              className="font-mono text-[10px] tracking-[0.25em] uppercase text-paper/70 hover:text-accent"
            >
              Close
            </button>
          </header>
          <ol className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-5">
            {softSkills.map((skill, i) => {
              const isActive = i === activeIdx;
              return (
                <li key={skill.slug} className="list-none">
                  <a
                    href={`#${skill.number}-${skill.slug}`}
                    onClick={close}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-baseline gap-3 transition-colors ${
                      isActive
                        ? "text-paper"
                        : "text-paper/55 hover:text-paper"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`shrink-0 w-3 ${isActive ? "text-accent" : ""}`}
                    >
                      {isActive ? "▌" : ""}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.22em] text-paper/55 shrink-0">
                      {skill.number}
                    </span>
                    <span
                      className={`font-display text-base ${isActive ? "font-medium" : ""}`}
                    >
                      {skill.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </dialog>
    </>
  );
}
