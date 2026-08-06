"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { xrayDraw, xrayFadeOut } from "@/lib/motion-manual";

/**
 * X-ray mode.
 *
 * A mode in which the live page annotates itself like a technical drawing of
 * its own construction: crop marks on the viewport, dimension lines across the
 * sheet and the body measure, and leader labels on the chrome. The manual
 * documents systems Connor built; x-ray mode says the manual is one of them.
 *
 * Two rules govern everything here.
 *
 * First, every number on the overlay is measured at the moment it is drawn.
 * Widths come from `getBoundingClientRect`, the measure comes from a `1ch`
 * probe resolved in the body copy's own font, the type metrics come from
 * `getComputedStyle`, and the two grid pitches are parsed back out of the
 * stylesheet rules that paint them. Nothing on the overlay is a literal a
 * refactor could leave lying about the page.
 *
 * Second, the overlay is not part of the document. It renders client-side and
 * only while the mode is on, so it never reaches server HTML, never reaches a
 * crawler, and never reaches the voice scan. It is `aria-hidden`,
 * `pointer-events-none`, `position: fixed` in its own stacking context above
 * the ruler and below the skip link, so it costs no layout and takes no
 * interaction away from the page underneath.
 *
 * Below `MIN_WIDTH` the mode is unavailable: a phone column has no margins for
 * a leader to point into, and annotations drawn over the copy at that width
 * are a smear rather than a drawing. The affordance is hidden and the hotkey
 * is inert, and a mode left on across a resize turns itself off.
 */

/* ───────────────────────────────── store ───────────────────────────── */

/** Per-tab only. A returning visitor gets the clean manual back. */
const STORAGE_KEY = "cjl:xray";
/** Root class the stylesheet hangs the grid brighten off. */
const ROOT_CLASS = "xray";
/** Narrowest viewport with margins worth drawing a leader into. */
const MIN_WIDTH = 768;
/** Double-tap window for the `x` hotkey, milliseconds. */
const DOUBLE_TAP_MS = 400;
/** Most annotations drawn at once. A drawing that labels everything labels nothing. */
const MAX_NODES = 12;
/** Quiet after a scroll before the target set is resolved again, milliseconds. */
const SETTLE_MS = 140;
/** Closest two leader labels may print on the same side, px. */
const LABEL_GAP = 15;

let active = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot(): boolean {
  return active;
}

/* False on the server and on the first client render, which is the only value
   that can be true of both: the overlay has not mounted and read storage yet. */
function serverSnapshot(): boolean {
  return false;
}

function wideEnough(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(`(min-width: ${MIN_WIDTH}px)`).matches;
}

function setActive(next: boolean): void {
  if (active === next || typeof document === "undefined") return;
  active = next;
  document.documentElement.classList.toggle(ROOT_CLASS, next);
  try {
    if (next) window.sessionStorage.setItem(STORAGE_KEY, "on");
    else window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Storage denied. The mode still works, it just does not survive a nav. */
  }
  listeners.forEach((listener) => listener());
}

function useXRay(): boolean {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}

/* ──────────────────────────── masthead toggle ──────────────────────── */

/**
 * The masthead affordance, printed beside the light/dark switch and fenced off
 * from it by the same hairline, at the same 10px mono. Hidden below the width
 * the mode runs at, so the control is never offered where it does nothing.
 */
export function XRayToggle() {
  const on = useXRay();
  return (
    <button
      type="button"
      aria-pressed={on}
      aria-label="X-ray mode"
      onClick={() => setActive(!active)}
      className="manual-press group -my-2 hidden cursor-pointer items-center border-l border-rule-hair py-2 pl-4 font-mono text-[10px] uppercase leading-none tracking-[0.2em] transition-colors md:flex"
    >
      <span
        aria-hidden="true"
        className={
          on
            ? "text-blueprint"
            : "text-body-ink/60 transition-colors group-hover:text-body-ink"
        }
      >
        [ X-ray ]
      </span>
    </button>
  );
}

/* ──────────────────────────── measurement ──────────────────────────── */

type Dim = {
  id: string;
  x1: number;
  x2: number;
  y: number;
  label: string;
};

type Leader = {
  id: string;
  /** Origin dot, on the part. */
  ox: number;
  oy: number;
  /** Elbow. */
  ex: number;
  ey: number;
  /** End of the horizontal run. */
  rx: number;
  /** Label baseline. */
  lx: number;
  ly: number;
  anchor: "start" | "end";
  label: string;
};

/**
 * One thing worth annotating, resolved once per scroll settle. `label` is the
 * finished string for a leader; the two dimension kinds compute theirs from
 * live geometry because that is what they are measuring.
 */
type Target = {
  id: string;
  el: Element;
  kind: "sheet" | "measure" | "ground" | "leader";
  label: string;
  /** `measure` only: width of one `ch` in the column's own font. */
  ch?: number;
};

type Plan = {
  w: number;
  h: number;
  dims: Dim[];
  leaders: Leader[];
  nodes: number;
};

function clamp(value: number, lo: number, hi: number): number {
  return value < lo ? lo : value > hi ? hi : value;
}

/** Every instance of a target that is on screen and has a box. */
function seen(selector: string): { el: Element; rect: DOMRect }[] {
  const out: { el: Element; rect: DOMRect }[] = [];
  for (const el of Array.from(document.querySelectorAll(selector))) {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    if (rect.bottom < 0 || rect.top > window.innerHeight) continue;
    out.push({ el, rect });
  }
  return out;
}

/** Distance from the middle of the viewport. The sort key for what to keep. */
function fromMiddle(rect: DOMRect): number {
  return Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
}

/**
 * Width of one `ch` in the target's own font.
 *
 * A hidden absolutely-positioned probe resolves the unit in the element that
 * actually sets the copy, so the measure is the measure the reader is reading
 * and not an assumption about which face won the font stack. The probe is out
 * of flow and is removed in the same synchronous block, so it moves nothing.
 */
function chPixels(el: Element): number {
  const probe = document.createElement("span");
  probe.setAttribute("aria-hidden", "true");
  probe.style.cssText =
    "position:absolute;visibility:hidden;pointer-events:none;width:10ch;height:0";
  el.appendChild(probe);
  const width = probe.getBoundingClientRect().width / 10;
  probe.remove();
  return width;
}

/**
 * A named face at the size it computes, read off the element inside that
 * actually sets it rather than the wrapper the annotation hangs on.
 */
function faceLabel(face: string, el: Element, inner?: string): string {
  const target = (inner ? el.querySelector(inner) : null) ?? el;
  const size = Number.parseFloat(getComputedStyle(target).fontSize);
  return Number.isFinite(size) ? `${face} ${Math.round(size)}px` : face;
}

/** Body type as it computes: family name, size over leading, and its rag. */
function typeLabel(el: Element): string {
  const style = getComputedStyle(el);
  const size = Number.parseFloat(style.fontSize);
  const leading = Number.parseFloat(style.lineHeight);
  const metric =
    Number.isFinite(leading) && Number.isFinite(size) && size > 0
      ? `${Math.round(size)}/${(leading / size).toFixed(2)}`
      : `${Math.round(size)}`;
  const rag = style.textAlign === "justify" ? "justified" : "ragged right";
  return `Newsreader ${metric} ${rag}`;
}

/**
 * Pitch of a repeating-linear-gradient rule, in px.
 *
 * The plate grid is painted by a gradient whose last stop is the pitch, so the
 * largest px length in the computed image is the drafting interval. Read back
 * rather than restated, so the annotation cannot outlive the rule.
 */
function gridPitch(el: Element): number | null {
  const image = getComputedStyle(el).backgroundImage;
  const lengths = Array.from(image.matchAll(/(\d+(?:\.\d+)?)px/g), (m) => Number(m[1]));
  const pitch = lengths.length > 0 ? Math.max(...lengths) : 0;
  return pitch > 1 ? Math.round(pitch) : null;
}

/** Pitch of the checker tile, read off the pseudo-element that paints it. */
function checkerPitch(el: Element): number | null {
  const size = getComputedStyle(el, "::before").backgroundSize;
  const pitch = Number.parseFloat(size);
  return Number.isFinite(pitch) && pitch > 0 ? Math.round(pitch) : null;
}

/**
 * Builds one leader: a dot on the part, an elbow, a short run, and a label.
 *
 * The leader points into whichever margin is wide enough to hold it. A part
 * that runs the full width has no margin, so the dot lands inside it instead,
 * which is what a callout on a full-bleed component does on a real drawing.
 */
function leader(id: string, rect: DOMRect, label: string, w: number, h: number): Leader {
  const leftRoom = rect.left;
  const rightRoom = w - rect.right;
  const dir = rightRoom >= leftRoom ? 1 : -1;
  const outside = Math.max(leftRoom, rightRoom) > 150;

  const ox = outside
    ? clamp(dir === 1 ? rect.right : rect.left, 14, w - 14)
    : clamp(rect.left + Math.min(rect.width * 0.22, 140), 14, w - 14);
  const oy = clamp(rect.top + Math.min(rect.height / 2, 20), 30, h - 30);

  /* Leaders rise away from the part, except near the top of the viewport,
     where there is nothing above to rise into. */
  const ey = oy > 72 ? oy - 12 : oy + 12;
  const ex = clamp(ox + dir * 14, 14, w - 14);
  const rx = clamp(ex + dir * 40, 14, w - 14);

  return {
    id,
    ox,
    oy,
    ex,
    ey,
    rx,
    lx: rx + dir * 5,
    ly: ey + 3,
    anchor: dir === 1 ? "start" : "end",
    label,
  };
}

/**
 * Resolves what is worth annotating right now. The expensive half.
 *
 * Everything that reads the stylesheet, computes type, or puts a probe in the
 * document happens here, and here runs once when the mode opens and once each
 * time a scroll settles. The cheap half, `layout`, re-reads only boxes.
 *
 * Every match on screen is a candidate, not just the first: the manual repeats
 * its sheet, its plates and its rules the whole way down, and a mode that
 * annotates one of each is a masthead gag rather than a mode. Candidates sort
 * by distance from the middle of the viewport and the nearest `MAX_NODES`
 * survive, so the drawing stays a drawing.
 */
function resolveTargets(): Target[] {
  const h = window.innerHeight;
  const found: { target: Target; dist: number }[] = [];
  const add = (target: Target, rect: DOMRect) => {
    found.push({ target, dist: fromMiddle(rect) });
  };

  /* The paper the whole manual prints on. It runs the length of the document,
     so it is the one annotation that holds wherever the reader has stopped,
     and it is sorted first for that reason. Its pitch is read back out of the
     gradient that paints it, like the others. */
  const ground = document.querySelector(".bg-ground-grid");
  if (ground) {
    const pitch = gridPitch(ground);
    found.push({
      target: {
        id: "ground",
        el: ground,
        kind: "ground",
        label: pitch ? `Paper grid / ${pitch}px` : "Paper grid",
      },
      dist: 0,
    });
  }

  /* Sheets are dimensioned off their top edge, so a sheet only gets the full
     dimension line while that edge is on screen and two readouts can never
     stack. A sheet the reader is inside still gets named, with a leader into
     the margin, because that is the part under everything else on the page. */
  for (const { el, rect } of seen('[data-xray="sheet"]')) {
    const edge = rect.top >= 24 && rect.top <= h - 24;
    add(
      edge
        ? { id: `sheet-${found.length}`, el, kind: "sheet", label: "" }
        : {
            id: `sheet-${found.length}`,
            el,
            kind: "leader",
            label: `Sheet / ${Math.round(rect.width)}px`,
          },
      rect,
    );
  }

  /* Body copy carries `.manual-body` on every paragraph, so the measure and the
     type spec go on the nearest column only. Printing one number a dozen times
     is not density. */
  const body = seen(".manual-body").sort((a, b) => fromMiddle(a.rect) - fromMiddle(b.rect))[0];
  if (body) {
    const ch = chPixels(body.el);
    if (ch > 0) add({ id: "measure", el: body.el, kind: "measure", label: "", ch }, body.rect);
    add({ id: "body", el: body.el, kind: "leader", label: typeLabel(body.el) }, body.rect);
  }

  for (const { el, rect } of seen('[data-xray="wordmark"]')) {
    add({ id: "wordmark", el, kind: "leader", label: "Geist Pixel / wordmark" }, rect);
  }

  for (const { el, rect } of seen('[data-xray="plate"]')) {
    const num = el.getAttribute("data-xray-plate");
    const name = num ? `FIG_${num}` : "Plate";
    const pitch = gridPitch(el);
    add(
      {
        id: `plate-${num ?? found.length}`,
        el,
        kind: "leader",
        label: pitch ? `${name} / ${pitch}px drafting grid` : name,
      },
      rect,
    );
  }

  /* Every caption states its plate's claim in words. Annotating it says which
     part of a figure is doing the load-bearing work. */
  let caption = 0;
  for (const { el, rect } of seen('[data-xray="caption"]')) {
    add({ id: `caption-${caption++}`, el, kind: "leader", label: "Caption / claim in words" }, rect);
  }

  for (const { el, rect } of seen('[data-xray="ruler"]')) {
    add({ id: "ruler", el, kind: "leader", label: "Reading progress" }, rect);
  }

  /* A band prints a tile either side of its label. Annotate the band. */
  const bands = new Set<number>();
  for (const { el, rect } of seen('[data-xray="checker"]')) {
    const band = Math.round(rect.top / 8);
    if (bands.has(band)) continue;
    bands.add(band);
    const pitch = checkerPitch(el);
    add(
      {
        id: `checker-${band}`,
        el,
        kind: "leader",
        label: pitch ? `Halftone rule / ${pitch}px pitch` : "Halftone rule",
      },
      rect,
    );
  }

  for (const { el, rect } of seen('[data-xray="toc"]')) {
    add({ id: "toc", el, kind: "leader", label: "Contents / dotted leaders" }, rect);
  }

  /* Section headers repeat down the contents, and a drawing that names the
     first one and skips the rest is not annotating the page it is on. */
  let section = 0;
  for (const { el, rect } of seen('[data-xray="section"]')) {
    add(
      {
        id: `section-${section++}`,
        el,
        kind: "leader",
        label: `${faceLabel("Geist Pixel", el)} / section header`,
      },
      rect,
    );
  }

  for (const { el, rect } of seen('[data-xray="stats"]')) {
    add(
      {
        id: `stats-${found.length}`,
        el,
        kind: "leader",
        label: `Stat table / ${faceLabel("Geist Mono", el, "dt")}`,
      },
      rect,
    );
  }

  for (const { el, rect } of seen('[data-xray="shell"]')) {
    add(
      {
        id: `shell-${found.length}`,
        el,
        kind: "leader",
        label: `Shell / ${faceLabel("Geist Mono", el, ".manual-shell-row")}`,
      },
      rect,
    );
  }

  return found
    .sort((a, b) => a.dist - b.dist)
    .slice(0, MAX_NODES)
    .map((entry) => entry.target);
}

/**
 * Pushes label rows apart so two leaders on the same side never print over each
 * other. The elbow lengthens and the dot stays where it is, which is how a real
 * drawing stacks callouts on a crowded part.
 */
function decollide(leaders: Leader[], h: number): Leader[] {
  const lanes = new Map<Leader["anchor"], number>();
  return [...leaders]
    .sort((a, b) => a.ey - b.ey)
    .map((line) => {
      const last = lanes.get(line.anchor);
      if (last === undefined || line.ey - last >= LABEL_GAP) {
        lanes.set(line.anchor, line.ey);
        return line;
      }
      const ey = clamp(last + LABEL_GAP, 30, h - 30);
      lanes.set(line.anchor, ey);
      return { ...line, ey, ly: ey + 3 };
    });
}

/**
 * Turns the resolved targets into a frame of geometry. The cheap half: one
 * read pass over boxes already known to be worth drawing, nothing written to
 * the document, no style resolved. This is what runs while a scroll is moving,
 * because an annotation pinned to the viewport has to follow the part it names.
 */
function layout(targets: Target[]): Plan {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const dims: Dim[] = [];
  const leaders: Leader[] = [];

  for (const target of targets) {
    /* The ground has no edge in the viewport to point at, so its callout is
       placed in the left margin at reading height, which is where a drawing
       puts a note about the material rather than about a part. */
    if (target.kind === "ground") {
      leaders.push(
        leader(target.id, new DOMRect(0, h * 0.62, 96, 40), target.label, w, h),
      );
      continue;
    }

    const rect = target.el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    if (rect.bottom < 0 || rect.top > h) continue;

    /* The sheet, dimensioned above itself the way a drawing dimensions a part:
       extension ticks at both ends, arrowheads turned inward, readout centred
       over the run. */
    if (target.kind === "sheet") {
      dims.push({
        id: target.id,
        x1: clamp(rect.left, 12, w - 12),
        x2: clamp(rect.right, 12, w - 12),
        y: clamp(rect.top - 14, 28, h - 28),
        label: `${Math.round(rect.width)}px`,
      });
      continue;
    }

    if (target.kind === "measure") {
      const ch = target.ch ?? 0;
      if (ch <= 0) continue;
      dims.push({
        id: target.id,
        x1: clamp(rect.left, 12, w - 12),
        x2: clamp(rect.right, 12, w - 12),
        /* Floored below the sheet's own dimension so the two never stack. */
        y: clamp(rect.top - 10, 48, h - 28),
        label: `${Math.round(rect.width / ch)}ch`,
      });
      continue;
    }

    leaders.push(leader(target.id, rect, target.label, w, h));
  }

  const spread = decollide(leaders, h);
  return { w, h, dims, leaders: spread, nodes: dims.length + spread.length };
}

/* ───────────────────────────── overlay draw ────────────────────────── */

const STROKE = {
  fill: "none",
  stroke: "var(--blueprint)",
  strokeWidth: 1.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const INK = {
  fill: "var(--blueprint)",
  fontSize: 10,
  letterSpacing: "0.18em",
} as const;

/** Viewport corner marks. Registration for a page that is being printed. */
function CropMarks({ w, h }: { w: number; h: number }) {
  const a = 8;
  const arm = 24;
  const marks = [
    `M ${a} ${a + arm} L ${a} ${a} L ${a + arm} ${a}`,
    `M ${w - a - arm} ${a} L ${w - a} ${a} L ${w - a} ${a + arm}`,
    `M ${a} ${h - a - arm} L ${a} ${h - a} L ${a + arm} ${h - a}`,
    `M ${w - a - arm} ${h - a} L ${w - a} ${h - a} L ${w - a} ${h - a - arm}`,
  ];
  return (
    <g data-xray-anno>
      {marks.map((d) => (
        <path key={d} d={d} {...STROKE} />
      ))}
    </g>
  );
}

function DimLine({ dim }: { dim: Dim }) {
  const { x1, x2, y, label } = dim;
  const tick = 5;
  const head = 7;
  return (
    <g data-xray-anno>
      <path d={`M ${x1} ${y - tick} L ${x1} ${y + tick}`} {...STROKE} />
      <path d={`M ${x2} ${y - tick} L ${x2} ${y + tick}`} {...STROKE} />
      <path d={`M ${x1} ${y} L ${x2} ${y}`} {...STROKE} />
      <path d={`M ${x1 + head} ${y - 3} L ${x1} ${y} L ${x1 + head} ${y + 3}`} {...STROKE} />
      <path d={`M ${x2 - head} ${y - 3} L ${x2} ${y} L ${x2 - head} ${y + 3}`} {...STROKE} />
      <text
        data-xray-ink
        x={(x1 + x2) / 2}
        y={y - 8}
        textAnchor="middle"
        className="font-mono uppercase"
        {...INK}
      >
        {label}
      </text>
    </g>
  );
}

function LeaderLine({ line }: { line: Leader }) {
  return (
    <g data-xray-anno>
      <circle cx={line.ox} cy={line.oy} r={2} fill="var(--blueprint)" data-no-draw />
      <path
        d={`M ${line.ox} ${line.oy} L ${line.ex} ${line.ey} L ${line.rx} ${line.ey}`}
        {...STROKE}
      />
      <text
        data-xray-ink
        x={line.lx}
        y={line.ly}
        textAnchor={line.anchor}
        className="font-mono uppercase"
        {...INK}
      >
        {line.label}
      </text>
    </g>
  );
}

/* ─────────────────────────────── overlay ───────────────────────────── */

function isTypingTarget(node: EventTarget | null): boolean {
  if (!(node instanceof HTMLElement)) return false;
  if (node.isContentEditable) return true;
  const tag = node.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  return node.closest("[contenteditable='true'], [contenteditable='']") !== null;
}

/**
 * The overlay itself, plus the hotkey and the per-tab restore. Mounted once,
 * in the root layout, so every route has the mode and none of them ship it.
 */
export function XRayOverlay() {
  const on = useXRay();
  /* The plan IS the mount state. It is written when the mode turns on and
     cleared only once the exit fade has finished, so there is no second flag
     to keep in step with the store and nothing to unmount mid-fade. */
  const [plan, setPlan] = useState<Plan | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  /* Restore and hotkey. Registered once; the store is what everything reads. */
  useEffect(() => {
    let stored = false;
    try {
      stored = window.sessionStorage.getItem(STORAGE_KEY) === "on";
    } catch {
      stored = false;
    }
    if (stored && wideEnough()) setActive(true);

    let lastTap = 0;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "x" && event.key !== "X") return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      /* The terminal, the planner inputs, and anything editable own the key
         while they have focus. Both the event target and the focused element
         are checked, because a handler higher up can retarget the first. */
      if (isTypingTarget(event.target) || isTypingTarget(document.activeElement)) return;
      const now = event.timeStamp;
      if (lastTap > 0 && now - lastTap < DOUBLE_TAP_MS) {
        lastTap = 0;
        if (wideEnough()) setActive(!active);
        return;
      }
      lastTap = now;
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Measurement, split in two so scrolling stays cheap.

     Resolving what to annotate reads the stylesheet, computes type and puts a
     probe in the document, so it runs once on open and once per scroll settle.
     Between settles only `layout` runs: one coalesced read pass over the boxes
     already chosen, no style resolved and nothing written, which is what keeps
     an annotation on the part it names while the page is moving. The whole
     thing stops the moment the mode is off. */
  useEffect(() => {
    if (!on) return;
    let targets: Target[] = [];
    let frame = 0;
    let settle = 0;

    const paint = () => {
      frame = 0;
      if (!wideEnough()) {
        setActive(false);
        return;
      }
      setPlan(layout(targets));
    };

    const request = () => {
      if (frame === 0) frame = window.requestAnimationFrame(paint);
    };

    const resolve = () => {
      targets = resolveTargets();
      request();
    };

    const later = () => {
      window.clearTimeout(settle);
      settle = window.setTimeout(resolve, SETTLE_MS);
    };

    const onMove = () => {
      request();
      later();
    };

    resolve();
    window.addEventListener("resize", onMove, { passive: true });
    window.addEventListener("scroll", onMove, { passive: true });
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.clearTimeout(settle);
      window.removeEventListener("resize", onMove);
      window.removeEventListener("scroll", onMove);
    };
  }, [on]);

  /* Draw-in, once per activation. Keyed on `on` alone so a scroll re-measure
     does not tear down a cascade that is still running. The rAF waits for the
     annotations the measure effect just committed to be in the DOM. */
  useEffect(() => {
    if (!on) return;
    let stop: (() => void) | undefined;
    const frame = window.requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      /* A previous exit left the overlay faded out. */
      root.style.opacity = "";
      stop = xrayDraw(root);
    });
    return () => {
      window.cancelAnimationFrame(frame);
      stop?.();
    };
  }, [on]);

  /* Exit. The overlay stays mounted for the fade and drops its plan with it. */
  useEffect(() => {
    if (on || plan === null) return;
    return xrayFadeOut(rootRef.current, () => setPlan(null));
  }, [on, plan]);

  if (!plan) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 select-none overflow-hidden"
    >
      <svg
        width="100%"
        height="100%"
        aria-hidden="true"
        focusable="false"
        className="block h-full w-full"
      >
        <CropMarks w={plan.w} h={plan.h} />
        {plan.dims.map((dim) => (
          <DimLine key={dim.id} dim={dim} />
        ))}
        {plan.leaders.map((line) => (
          <LeaderLine key={line.id} line={line} />
        ))}
      </svg>

      <div data-xray-anno className="absolute bottom-4 left-4">
        <span
          data-xray-ink
          className="block border border-blueprint/40 bg-sheet/90 px-2.5 py-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.18em] text-blueprint"
        >
          X-ray / on · {plan.nodes} nodes annotated
        </span>
      </div>
    </div>
  );
}
