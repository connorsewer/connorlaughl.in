---
version: alpha
name: Connor Laughlin portfolio visual system
description: Editorial GTM portfolio with tactile generated imagery, restrained motion, ASCII texture, and dithered proof artifacts.
colors:
  primary: "#070707"
  primary-inverse: "#FAF7EF"
  secondary: "#F6F1E7"
  secondary-ink: "#070707"
  accent: "#D2C27C"
  accent-strong: "#746A43"
  rule-dark: "#2F2C24"
  rule-light: "#D8D0C0"
  muted-dark: "#C7BFAF"
  muted-light: "#4D483E"
  clay: "#A66A48"
  oxblood: "#5E1F24"
  graphite: "#1B1B1B"
  film-cream: "#EFE6D2"
typography:
  display-xl:
    fontFamily: Instrument Serif
    fontSize: 6.5rem
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: "-0.03em"
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 4.5rem
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-0.025em"
  heading-md:
    fontFamily: Instrument Serif
    fontSize: 2.5rem
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
  body-lg:
    fontFamily: IBM Plex Sans
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  body-md:
    fontFamily: IBM Plex Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  label-caps:
    fontFamily: IBM Plex Mono
    fontSize: 0.75rem
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0.22em"
rounded:
  none: 0px
  sm: 2px
  md: 12px
  lg: 24px
  xl: 32px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  4xl: 96px
components:
  page-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-inverse}"
  page-light:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-ink}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "{spacing.lg}"
    typography: "{typography.label-caps}"
  button-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-inverse}"
    rounded: "{rounded.full}"
    padding: "{spacing.lg}"
    typography: "{typography.label-caps}"
  editorial-card:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.primary-inverse}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  generated-image-frame:
    backgroundColor: "{colors.graphite}"
    textColor: "{colors.primary-inverse}"
    rounded: "{rounded.lg}"
    padding: "{spacing.md}"
  artifact-strip:
    backgroundColor: "{colors.film-cream}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: "{spacing.md}"
  dark-rule-panel:
    backgroundColor: "{colors.rule-dark}"
    textColor: "{colors.primary-inverse}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  light-rule-panel:
    backgroundColor: "{colors.rule-light}"
    textColor: "{colors.secondary-ink}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  muted-dark-caption:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.muted-dark}"
    typography: "{typography.label-caps}"
  muted-light-caption:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.muted-light}"
    typography: "{typography.label-caps}"
  clay-image-plate:
    backgroundColor: "{colors.clay}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
  oxblood-mark:
    backgroundColor: "{colors.oxblood}"
    textColor: "{colors.primary-inverse}"
    rounded: "{rounded.full}"
    padding: "{spacing.sm}"
  light-accent-label:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.accent-strong}"
    typography: "{typography.label-caps}"
---

## Overview

This portfolio should feel like an editorial field file from a marketing executive who also builds systems. The visual world is matte, tactile, and slightly analog. It should have the restraint of a serious executive portfolio with the strange texture of a builder's workbench.

The next image pass should add visual memory without turning the site into a glossy startup landing page. Generated images should feel like photographed objects, archival scans, terminal output, print artifacts, and dithered machine texture. They should support the writing, never fight it.

Primary audience: founders, CEOs, CMOs, revenue leaders, recruiters, and operators evaluating Connor as a GTM leader who can also build working systems.

Desired response: "This person thinks clearly, has taste, has range, and can make messy work legible."

## Colors

The core palette already exists in the site and should remain stable.

- Primary black (#070707) is the default dark canvas.
- Warm paper (#FAF7EF and #F6F1E7) keeps the site from feeling like a cold terminal skin.
- Accent gold (#D2C27C) is the main interaction color in dark mode.
- Accent strong (#746A43) keeps small labels readable in light mode.
- Clay, oxblood, graphite, and film cream are image palette support colors. Use them inside generated images, dither passes, and editorial frames.

Generated imagery should stay within this family: black, cream, tobacco paper, old gold, muted red, graphite, and occasional soft blue gray. Avoid neon palettes, saturated SaaS gradients, pure white backgrounds, and stock photo color grading.

## Typography

Instrument Serif owns the large emotional moments. It should stay loose, oversized, and editorial.

IBM Plex Sans is the working voice for body copy. It should stay readable and plain.

IBM Plex Mono is for labels, proof metadata, file names, artifact captions, and ASCII treatments. Use it to create the feeling of a system log or archive label, but keep labels large enough to read.

Do not render meaningful generated text inside images. If an image needs a label, add real HTML text next to it so it remains readable, accessible, and easy to edit.

## Layout

The site should keep its generous editorial rhythm: large sections, clear borders, strong vertical spacing, and fewer objects per screen. Visuals should be placed as moments, not wallpaper.

Recommended image placements:

1. Homepage hero side panel or background specimen, kept secondary to the exact hero headline.
2. A personal object collage on About.
3. Small artifact panels inside case study cards.
4. A proof index texture that hints at tabs, notes, routing diagrams, and shipped work.
5. A final contact image that feels like a workbench closing for the day.

Mobile rules:

- Images stack below headings unless they are decorative background texture.
- Image frames should never create horizontal scroll.
- Crop for clarity. Tiny detailed collages fail on mobile.
- Prefer one strong object cluster over many small objects.

## Elevation & Depth

Depth should come from borders, shadow, grain, scanning artifacts, and layered paper. Avoid glassmorphism, glossy reflections, floating 3D blobs, and heavy drop shadows.

Use generated images as flat editorial plates. If animation is added, it should feel like scanning, revealing, dithering, or gentle parallax. Respect reduced motion.

## Shapes

Use rectangles, clipped editorial frames, rounded cards, circular tags, grids, and thin rules. The current rounded card language can stay. Image masks may use rounded 24px or sharp 2px corners depending on context.

ASCII and dithered images should sit in monospaced frames or artifact strips. They should feel intentionally processed, not broken.

## Components

Primary visual components for the next pass:

- Generated image frame: a bordered panel with a source image, dithered variant, or ASCII variant.
- Artifact strip: a horizontal or vertical band of small generated fragments, labels, and proof objects.
- Personal still life: About page image with objects from Connor's life, kept symbolic and privacy safe.
- Case study specimen: a generated abstract artifact for each work type, such as routing map, content system, buyer intelligence board, or AI review gate.
- ASCII caption block: a small mono block that can animate between glyph density levels.

Accessibility rules:

- Decorative images use empty alt text.
- Meaningful images get direct alt text that describes the idea, not every small object.
- Motion must respect reduced motion.
- No essential copy inside image pixels.

## Do's and Don'ts

Do:

- Keep the homepage hero headline spans exact: Marketing executive. and GTM systems engineer.
- Use generated images as editorial artifacts, not literal proof documents.
- Use warm black, cream, old gold, clay, graphite, and muted red.
- Make each image feel photographed, scanned, printed, or processed.
- Use ASCII and dithering as texture, not as a gimmick.
- Leave room for the writing.

Don't:

- Use real logos, private photos, proprietary diagrams, or literal client materials.
- Put readable claims, metrics, or names inside generated images.
- Make Connor look like an avatar, superhero, founder bro, or cyberpunk character.
- Use glossy SaaS gradients, fake dashboards, or generic laptop stock art.
- Add motion that distracts from reading.
- Change the homepage hero headline spans.

## Image prompt system

Every gpt-image-2 prompt should use this base direction unless a prompt says otherwise:

Create a high taste editorial image for Connor Laughlin's personal GTM portfolio. Matte black and warm cream palette with old gold accents, graphite shadows, clay paper, subtle oxblood details, scanned print texture, visible grain, and gentle halftone or ordered dithering. The image should feel like an artifact from a working system: tactile, restrained, intelligent, and slightly analog. No readable text. No logos. No faces. No private documents. No fake charts with legible numbers. No glossy SaaS dashboard style. No neon. No photorealistic celebrity likeness. Leave negative space for web layout.

Processing direction after generation:

1. Keep the best source image untouched in a raw asset folder.
2. Create a dithered variant with a limited palette.
3. Create an ASCII or glyph density variant for at least the homepage and About images.
4. Export web sizes for desktop and mobile.
5. Add captions in HTML, not inside image pixels.

Motion direction:

- Preferred: slow opacity reveal, scanline pass, crossfade from source to dither, or subtle glyph density shift.
- Avoid: fast loops, glitch spam, scroll hijacking, heavy canvas effects, and motion that affects reading.
