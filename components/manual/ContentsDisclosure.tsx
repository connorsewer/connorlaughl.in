"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";

/**
 * The chapter shell's collapsed contents, below xl.
 *
 * It used to open as a ~310px unanchored panel with the chapter title, the
 * body and the figure showing through beside it and no way to dismiss it
 * except by finding the summary again. That reads as a rendering fault rather
 * than as a menu. Below sm it is now a bottom sheet — full width, capped at
 * 75vh with its own scroll, on `--sheet` over a ground-tinted scrim — and from
 * sm up it keeps the anchored panel, which is correct on a wide enough column.
 *
 * `<details>` still carries the state, so the markup is the same server-side
 * and the control is keyboard-native. What the client adds is the three ways a
 * sheet has to be dismissible: the scrim, Escape, and a printed close row.
 *
 * The panel is not animated. A `<details>` can only be transitioned by
 * animating a layout property, which this system does not do.
 */
export function ContentsDisclosure({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);

  const close = useCallback((focusSummary = false) => {
    const el = ref.current;
    if (!el?.open) return;
    el.removeAttribute("open");
    if (focusSummary) el.querySelector("summary")?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [close]);

  return (
    <details ref={ref} className="group relative shrink-0 xl:hidden">
      <summary className="-my-1.5 flex cursor-pointer list-none items-center gap-2 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/70 transition-colors marker:hidden hover:text-blueprint [&::-webkit-details-marker]:hidden">
        Contents
        <span aria-hidden="true" className="faq-mark text-[10px] leading-none text-label-muted" />
      </summary>

      {/* Dismiss target only. Escape and the printed close row are the
          keyboard paths, so the scrim carries no keyboard handler of its own
          and stays out of the accessibility tree. */}
      <div
        aria-hidden="true"
        onClick={() => close()}
        className="fixed inset-0 z-20 bg-ground/85 sm:hidden"
      />

      <div className="fixed inset-x-0 bottom-0 z-30 max-h-[75vh] overflow-y-auto border-t border-grid-line bg-sheet px-5 pb-8 pt-4 shadow-[var(--sheet-shadow)] sm:absolute sm:inset-x-auto sm:bottom-auto sm:left-0 sm:top-full sm:z-20 sm:mt-3 sm:max-h-[70vh] sm:w-[min(22rem,80vw)] sm:border sm:px-4 sm:py-4">
        <button
          type="button"
          onClick={() => close(true)}
          className="manual-press mb-4 flex w-full items-center justify-between border-b border-grid-line pb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/60 transition-colors hover:text-blueprint sm:hidden"
        >
          <span>Contents</span>
          <span aria-hidden="true">Close ×</span>
        </button>
        {children}
      </div>
    </details>
  );
}
