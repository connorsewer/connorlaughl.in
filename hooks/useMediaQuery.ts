"use client";

import { useSyncExternalStore } from "react";

type Subscribe = (onChange: () => void) => () => void;

/**
 * Returns whether a CSS media query currently matches.
 * Uses useSyncExternalStore for SSR safety and to avoid setState-in-effect.
 */
export function useMediaQuery(query: string, serverFallback = false): boolean {
  const subscribe: Subscribe = (onChange) => {
    if (typeof window === "undefined") return () => {};
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return serverFallback;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => serverFallback;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)", false);
}
