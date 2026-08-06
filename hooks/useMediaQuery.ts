"use client";

import { useCallback, useSyncExternalStore } from "react";

type Subscribe = (onChange: () => void) => () => void;

/**
 * One `MediaQueryList` per query string, for the life of the document.
 *
 * `useSyncExternalStore` compares the `subscribe` identity on every render and
 * tears the listener down and back up whenever it changes, so both `subscribe`
 * and the list it reads have to be stable. Without the cache every render of
 * every consumer re-ran `matchMedia`.
 */
const lists = new Map<string, MediaQueryList>();

function listFor(query: string): MediaQueryList | null {
  if (typeof window === "undefined" || !window.matchMedia) return null;
  let mql = lists.get(query);
  if (!mql) {
    mql = window.matchMedia(query);
    lists.set(query, mql);
  }
  return mql;
}

/**
 * Returns whether a CSS media query currently matches.
 * Uses useSyncExternalStore for SSR safety and to avoid setState-in-effect.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe: Subscribe = useCallback(
    (onChange) => {
      const mql = listFor(query);
      if (!mql) return () => {};
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => listFor(query)?.matches ?? serverFallback,
    [query, serverFallback],
  );

  const getServerSnapshot = useCallback(() => serverFallback, [serverFallback]);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
