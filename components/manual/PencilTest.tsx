"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

/**
 * Pencil test: the blank plate at the back of the manual.
 *
 * The 404 is a page that never printed, so what is left where the drawing
 * would have been is an empty grid. Press a cell to ink it, drag to draw a
 * line, press an inked cell to lift it again. Nothing is scored, nothing is
 * stored, and nothing leaves the component.
 *
 * The whole block is hidden from assistive tech and takes no tab stop. It is a
 * drawing surface with no information behind it, so announcing it would offer
 * a screen-reader user an action with no outcome. That is also why the clear
 * control is `tabIndex={-1}`: a focusable node inside a hidden subtree is
 * worse than no node.
 *
 * No motion. State is a set of cell indices and the only animated-looking
 * thing is the colour transition every other control on the site already runs,
 * so reduced motion needs no branch here.
 */

/** Plate geometry. A wide, shallow plate: a margin, not a canvas. */
const COLS = 12;
const ROWS = 8;
const CELLS = Array.from({ length: COLS * ROWS }, (_, i) => i);

function cellAt(target: EventTarget | Element | null): number | null {
  if (!(target instanceof HTMLElement)) return null;
  const raw = target.dataset.cell;
  if (raw === undefined) return null;
  const index = Number(raw);
  return Number.isInteger(index) ? index : null;
}

export function PencilTest() {
  const [inked, setInked] = useState<ReadonlySet<number>>(() => new Set<number>());
  /* What the current drag is doing, decided by the cell it started on: press
     blank paper and the drag inks, press a mark and it lifts. Null between
     drags. A ref rather than state because no frame depends on it. */
  const stroke = useRef<boolean | null>(null);

  const paint = (index: number, ink: boolean) => {
    setInked((current) => {
      if (current.has(index) === ink) return current;
      const next = new Set(current);
      if (ink) next.add(index);
      else next.delete(index);
      return next;
    });
  };

  const onDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const index = cellAt(event.target);
    if (index === null) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const ink = !inked.has(index);
    stroke.current = ink;
    paint(index, ink);
  };

  const onMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (stroke.current === null) return;
    /* Capture is held by the grid, so the move event no longer targets the
       cell under the pointer and has to be asked for by position. This is
       pointer input, not a scroll callback: the read happens only while a
       finger or a button is down. */
    const index = cellAt(document.elementFromPoint(event.clientX, event.clientY));
    if (index === null) return;
    paint(index, stroke.current);
  };

  const onUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    stroke.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <section aria-hidden="true" className="mt-10">
      <h2 className="border-b border-grid-line pb-2 font-mono text-[10px] uppercase tracking-[0.28em] text-body-ink/60">
        Pencil test
      </h2>

      <p className="mt-4 max-w-[52ch] font-serif-body text-[0.9375rem] leading-relaxed text-body-ink/85">
        This is the blank plate the missing drawing would have sat on. Press a
        square to ink it, drag to draw a line, and sign it if you want to.
      </p>

      {/* Held to a measure that lands the cells near 28px: wide enough to
          press without aiming, small enough that the plate reads as ruled
          paper rather than as a panel of empty boxes. */}
      <div className="figure-plate mt-5 max-w-[22rem] p-3">
        <div
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          className="grid cursor-crosshair select-none gap-px"
          style={{
            gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
            touchAction: "none",
          }}
        >
          {CELLS.map((index) => (
            <span
              key={index}
              data-cell={index}
              className={`aspect-square border border-rule-hair transition-colors ${
                inked.has(index) ? "bg-blueprint/85" : "hover:bg-blueprint/20"
              }`}
            />
          ))}
        </div>
      </div>

      <button
        type="button"
        tabIndex={-1}
        onClick={() => setInked(new Set<number>())}
        className="mt-4 inline-flex items-center border border-rule-hair px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-body-ink/70 transition-colors hover:border-blueprint hover:text-blueprint"
      >
        Clear the plate
      </button>
    </section>
  );
}
