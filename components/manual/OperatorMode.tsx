"use client";

import { useEffect } from "react";

import { operatorModeSpec } from "@/lib/motion-manual";

/**
 * Operator mode: the manual's one undocumented state.
 *
 * The Konami code toggles it. Nothing is unlocked and no content changes; the
 * ambient loops that depict running systems run at double rate and the
 * masthead prints an `[ operator ]` chip so the state can be read off the page
 * instead of guessed at. It is discoverable because the terminal already
 * teaches a reader that this document takes input.
 *
 * Renders nothing. It owns one keydown listener and the flag on `<html>`;
 * everything the flag does is in app/globals.css and in the `signalPacket`
 * runner, which read the same attribute.
 *
 * Session-scoped, so a shared link never arrives in a state its sender was in.
 *
 * Reduced motion is handled downstream rather than here: the chip still
 * prints, `operatorRate()` returns 1, and the stylesheet's rate rule sits
 * inside the same `no-preference` query the drift animation does. A
 * reduced-motion reader gets the state and none of the speed.
 */

/** Up, up, down, down, left, right, left, right, b, a. */
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
] as const;

/** Where a keystroke belongs to a control rather than to the document. */
function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

function setOperator(on: boolean): void {
  const root = document.documentElement;
  if (on) root.setAttribute(operatorModeSpec.flag, "");
  else root.removeAttribute(operatorModeSpec.flag);
  window.dispatchEvent(new CustomEvent(operatorModeSpec.event));
}

export function OperatorMode() {
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.sessionStorage.getItem(operatorModeSpec.storageKey);
    } catch {
      /* Storage can be denied outright. The mode still works for this page. */
    }
    if (stored === "on") setOperator(true);

    let matched = 0;

    const onKey = (event: KeyboardEvent) => {
      /* The terminal is a real input and owns every key while it has focus. */
      if (isTyping(event.target)) {
        matched = 0;
        return;
      }
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      const want = SEQUENCE[matched];
      /* Case-insensitive on the letters only; the arrows are named keys. */
      const hit =
        want.length === 1
          ? event.key.toLowerCase() === want
          : event.key === want;

      if (!hit) {
        /* A miss restarts the sequence, and restarts it AT this key rather
           than at zero, so `up up up down down ...` still lands. */
        matched = event.key === SEQUENCE[0] ? 1 : 0;
        return;
      }

      matched += 1;
      if (matched < SEQUENCE.length) return;
      matched = 0;

      const next = !document.documentElement.hasAttribute(operatorModeSpec.flag);
      setOperator(next);
      try {
        window.sessionStorage.setItem(operatorModeSpec.storageKey, next ? "on" : "off");
      } catch {
        /* Denied storage costs the mode its persistence and nothing else. */
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
