"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Ink crosshair + drifting label cursor.
 *
 * Tracks the pointer with a soft lerp so the cursor reads as "ink dragging
 * on paper" rather than rigid. Two layered glyphs:
 *   - A thin 10px ring with a 2px center dot (the crosshair).
 *   - A floating mono label that swaps based on the hovered element's
 *     `data-cursor` attribute. Common values:
 *       "open"      -> OPEN
 *       "read"      -> READ
 *       "file-NN"   -> READ FILE NN
 *       "scroll"    -> SCROLL
 *
 * Only active on devices with a fine pointer (mouse / trackpad), at lg+
 * widths, and when reduced-motion is off. Touch + reduced-motion render
 * nothing and the native cursor stays visible.
 *
 * The native cursor is hidden via a `data-custom-cursor="on"` class on
 * html that flips `cursor: none` on body. The component sets and
 * unsets the class on mount/unmount, so SSR + no-JS + reduced-motion
 * keep the default cursor.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLSpanElement | null>(null);
  const reduced = usePrefersReducedMotion();
  const isFinePointer = useMediaQuery("(pointer: fine)", false);
  const isLg = useMediaQuery("(min-width: 1024px)", false);
  const enabled = isFinePointer && isLg && !reduced;

  useEffect(() => {
    if (!enabled) return;
    const cursor = cursorRef.current;
    const ring = ringRef.current;
    const labelEl = labelRef.current;
    if (!cursor || !ring || !labelEl) return;

    document.documentElement.dataset.customCursor = "on";

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let cursorX = pointerX;
    let cursorY = pointerY;
    let scale = 1;
    let scaleTarget = 1;
    let labelText = "";

    function handleMove(e: PointerEvent) {
      pointerX = e.clientX;
      pointerY = e.clientY;
    }

    function handleOver(e: PointerEvent) {
      const target = (e.target as Element | null)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      const cursorAttr = target?.dataset.cursor ?? "";
      let nextLabel = "";
      let nextScale = 1;
      if (cursorAttr === "open") nextLabel = "Open";
      else if (cursorAttr === "read") nextLabel = "Read";
      else if (cursorAttr.startsWith("file-"))
        nextLabel = `Read ${cursorAttr.replace("file-", "Fig. ")}`;
      else if (cursorAttr === "scroll") nextLabel = "Scroll";
      else if (cursorAttr === "play") nextLabel = "Play";
      else if (cursorAttr === "talk") nextLabel = "Talk";
      else if (target) nextLabel = cursorAttr;
      if (target) nextScale = 2.6;
      if (nextLabel !== labelText) {
        labelText = nextLabel;
        labelEl!.textContent = nextLabel;
        labelEl!.dataset.shown = nextLabel ? "1" : "0";
      }
      scaleTarget = nextScale;
    }

    function handleDown() {
      scaleTarget = Math.max(0.7, scaleTarget * 0.8);
    }

    function handleUp() {
      scaleTarget = scaleTarget < 1.5 ? 1 : 2.6;
    }

    let rafId = 0;
    function tick() {
      cursorX += (pointerX - cursorX) * 0.22;
      cursorY += (pointerY - cursorY) * 0.22;
      scale += (scaleTarget - scale) * 0.18;
      cursor!.style.transform = `translate3d(${cursorX.toFixed(2)}px, ${cursorY.toFixed(2)}px, 0)`;
      ring!.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerover", handleOver, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerover", handleOver);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      delete document.documentElement.dataset.customCursor;
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-0 h-0 mix-blend-difference"
      style={{ willChange: "transform" }}
    >
      <span
        ref={ringRef}
        className="absolute block w-2.5 h-2.5 rounded-full border border-paper/80 bg-paper/0"
        style={{ willChange: "transform" }}
      />
      <span
        ref={labelRef}
        data-shown="0"
        className="absolute left-5 top-3 font-mono text-[10px] tracking-[0.2em] uppercase whitespace-nowrap text-paper/85 opacity-0 data-[shown=1]:opacity-100 transition-opacity duration-150"
      />
    </div>
  );
}
