"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { wordmarkReveal } from "@/lib/motion-manual";

/**
 * Client wrapper that brings the pixel wordmark up a glyph at a time.
 *
 * `Masthead` stays a server component and already ships the wordmark split
 * into `data-glyph` spans, so this adds no markup and re-renders nothing. It
 * is wired on the cover only: the chapter masthead runs the wordmark at link
 * size, where a per-glyph reveal reads as a flicker rather than as a title
 * arriving.
 *
 * Reduced motion: `wordmarkReveal` writes every glyph to its final state
 * immediately and registers nothing.
 */
export function WordmarkMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => wordmarkReveal(ref.current?.querySelector("[data-wordmark]")), []);

  return <div ref={ref}>{children}</div>;
}
