import { ImageResponse } from "next/og";
import {
  ManualOgCard,
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogFonts,
} from "@/lib/og";

/** Strings: copy deck section 12.3. No claim numeral on any OG surface. */
const WORDMARK = "CONNOR J. LAUGHLIN";
const TITLE = "How I move, make ambiguity legible, and scale judgment";
const META = "SECTION 2 / THE OPERATOR";

export const alt =
  "Connor J. Laughlin. How I move, make ambiguity legible, and scale judgment.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return new ImageResponse(
    <ManualOgCard wordmark={WORDMARK} title={TITLE} meta={META} />,
    { ...size, fonts: await ogFonts() },
  );
}
