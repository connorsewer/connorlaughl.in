import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Shared blueprint-manual system for the three `opengraph-image` routes
 * (spec §7 Phase 6a). One ground, one working ink, three type roles:
 *
 *   Geist Pixel  wordmark
 *   GT Sectra    serif title
 *   Geist Mono   meta line
 *
 * Every literal string rendered here comes from section 12 of the copy deck.
 * No claim numeral appears on any OG surface, so nothing in this module reads
 * from `content/proof-metrics.ts`.
 */

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/** Tokens mirrored from `app/globals.css` `:root` (satori has no CSS vars). */
const GROUND = "#FBFBFB";
const BODY_INK = "#171715";
const BLUEPRINT = "#2E47F1";
const GRID_LINE = "rgba(46, 71, 241, 0.07)";
const FRAME_LINE = "rgba(46, 71, 241, 0.32)";
const CHECKER_CELL = "rgba(46, 71, 241, 0.34)";

const GRID_STEP = 40;
const FRAME_INSET = 40;
const PAD_X = 96;
const PAD_Y = 84;

/**
 * Satori reads raw font binaries only, so every face is loaded as a TTF
 * ArrayBuffer. Geist Mono and GT Sectra already ship TTFs. Geist Pixel is
 * woff2-only in the package, so `public/fonts/geist-pixel/GeistPixel-Square.ttf`
 * is decompressed from it. Reproduce with:
 *
 *   uv run --with fonttools --with brotli python -c "from fontTools.ttLib.woff2 \
 *     import decompress; decompress( \
 *     'node_modules/geist/dist/fonts/geist-pixel/GeistPixel-Square.woff2', \
 *     'public/fonts/geist-pixel/GeistPixel-Square.ttf')"
 */
const FONT_FILES = {
  pixel: "public/fonts/geist-pixel/GeistPixel-Square.ttf",
  serif: "public/fonts/gt-sectra-fine/GTSectraFine-Regular.ttf",
  mono: "node_modules/geist/dist/fonts/geist-mono/GeistMono-Medium.ttf",
} as const;

type SatoriFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400;
  style: "normal";
};

let fontsPromise: Promise<SatoriFont[]> | undefined;

async function loadFont(name: string, rel: string): Promise<SatoriFont> {
  const buf = await readFile(path.join(process.cwd(), rel));
  const data = buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
  return { name, data, weight: 400, style: "normal" };
}

/** Cached across the OG routes so a build renders the fonts once. */
export function ogFonts(): Promise<SatoriFont[]> {
  fontsPromise ??= Promise.all([
    loadFont("GeistPixel", FONT_FILES.pixel),
    loadFont("GTSectra", FONT_FILES.serif),
    loadFont("GeistMono", FONT_FILES.mono),
  ]);
  return fontsPromise;
}

/** Graph-grid texture, drawn as hairlines because satori has no repeating gradients. */
function GridTexture() {
  const columns: number[] = [];
  for (let x = GRID_STEP; x < OG_SIZE.width; x += GRID_STEP) columns.push(x);
  const rows: number[] = [];
  for (let y = GRID_STEP; y < OG_SIZE.height; y += GRID_STEP) rows.push(y);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: OG_SIZE.width,
        height: OG_SIZE.height,
        display: "flex",
      }}
    >
      {columns.map((x) => (
        <div
          key={`c${x}`}
          style={{
            position: "absolute",
            top: 0,
            left: x,
            width: 1,
            height: OG_SIZE.height,
            backgroundColor: GRID_LINE,
          }}
        />
      ))}
      {rows.map((y) => (
        <div
          key={`r${y}`}
          style={{
            position: "absolute",
            top: y,
            left: 0,
            width: OG_SIZE.width,
            height: 1,
            backgroundColor: GRID_LINE,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Dither band, the cover's anatomy slot 2. `.manual-checker` is a
 * repeating-conic-gradient on the site; satori has neither, so the cells are
 * drawn. Kept to the content measure so it reads as a rule at thumbnail size.
 */
function CheckerBand({ cell = 12 }: { cell?: number }) {
  const width = OG_SIZE.width - PAD_X * 2;
  const cells = Math.floor(width / cell);
  const squares: Array<{ x: number; y: number }> = [];
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < cells; col += 1) {
      if ((row + col) % 2 === 0) squares.push({ x: col * cell, y: row * cell });
    }
  }
  return (
    <div
      style={{
        position: "relative",
        width: cells * cell,
        height: 2 * cell,
        display: "flex",
      }}
    >
      {squares.map((s) => (
        <div
          key={`${s.x}-${s.y}`}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: cell,
            height: cell,
            backgroundColor: CHECKER_CELL,
          }}
        />
      ))}
    </div>
  );
}

/** Serif titles set larger when they are short, so every card fills its measure. */
function titleSize(title: string): number {
  if (title.length > 52) return 60;
  if (title.length > 36) return 70;
  return 82;
}

export type ManualOgProps = {
  /** Pixel wordmark, top left. */
  wordmark: string;
  /** Serif title, the card's one sentence or chapter name. */
  title: string;
  /** Mono meta line, bottom, uppercase. */
  meta: string;
};

/**
 * The card itself. Callers pass literal strings from copy deck section 12 and
 * nothing else, which is what keeps the rasterized text inside the claim rules.
 */
export function ManualOgCard({ wordmark, title, meta }: ManualOgProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: GROUND,
      }}
    >
      <GridTexture />

      <div
        style={{
          position: "absolute",
          top: FRAME_INSET,
          left: FRAME_INSET,
          width: OG_SIZE.width - FRAME_INSET * 2,
          height: OG_SIZE.height - FRAME_INSET * 2,
          border: `1px solid ${FRAME_LINE}`,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: OG_SIZE.width,
          height: OG_SIZE.height,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: `${PAD_Y}px ${PAD_X}px`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontFamily: "GeistPixel",
              fontSize: 34,
              letterSpacing: 6,
              color: BLUEPRINT,
              textTransform: "uppercase",
            }}
          >
            {wordmark}
          </div>
          <CheckerBand />
        </div>

        <div
          style={{
            fontFamily: "GTSectra",
            fontSize: titleSize(title),
            lineHeight: 1.12,
            color: BODY_INK,
            maxWidth: 940,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            borderTop: `1px solid ${FRAME_LINE}`,
            paddingTop: 26,
            fontFamily: "GeistMono",
            fontSize: 20,
            letterSpacing: 4,
            color: BLUEPRINT,
            textTransform: "uppercase",
          }}
        >
          {meta}
        </div>
      </div>
    </div>
  );
}
