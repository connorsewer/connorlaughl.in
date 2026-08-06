"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` in the browser, `useEffect` on the server.
 *
 * Every motion runner on the site parks its target before animating it, and
 * the server ships that target already drawn, already opaque, already in
 * place. A park that runs in `useEffect` lands after the browser has painted
 * the finished state, so a cold load reads as finished → blank → reveal.
 * Committing the park in a layout effect closes that window; the server's
 * frame is never shown.
 *
 * `useLayoutEffect` warns during SSR, hence the branch.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;
