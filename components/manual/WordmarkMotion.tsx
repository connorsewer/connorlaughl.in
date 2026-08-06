"use client";

import { useRef, type ReactNode } from "react";

import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";
import { wordmarkReveal, wordmarkScramble } from "@/lib/motion-manual";

/**
 * Client wrapper that brings the pixel wordmark up a glyph at a time.
 *
 * `Masthead` stays a server component and already ships the wordmark split
 * into `data-glyph` spans, so this adds no markup and re-renders nothing. It
 * is wired on the cover only: the chapter masthead runs the wordmark at link
 * size, where a per-glyph reveal reads as a flicker rather than as a title
 * arriving.
 *
 * The same split carries the hover scramble, so the two effects share one set
 * of glyphs and cannot disagree about what the wordmark says.
 *
 * Reduced motion: `wordmarkReveal` writes every glyph to its final state
 * immediately and registers nothing, and `wordmarkScramble` binds nothing.
 */
export function WordmarkMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    const wordmark = ref.current?.querySelector("[data-wordmark]");
    wordmarkReveal(wordmark);
    return wordmarkScramble(wordmark);
  }, []);

  return <div ref={ref}>{children}</div>;
}
