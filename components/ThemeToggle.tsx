"use client";

/**
 * Hidden for the manual redesign transition: `ThemeProvider` sets
 * `forcedTheme="light"`, so a toggle would be a control that does nothing.
 * Callers keep the mount point; only the render is suppressed.
 *
 * Restored in Task 18, re-skinned mono, alongside the cyanotype dark theme.
 */
export function ThemeToggle() {
  return null;
}
