import { ImageResponse } from "next/og";
import {
  ManualOgCard,
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogFonts,
} from "@/lib/og";

/** Strings: copy deck section 12.1. No claim numeral on any OG surface. */
const WORDMARK = "CONNOR J. LAUGHLIN";
const TITLE = "I build the revenue systems that make GTM strategy real.";
const META = "MARKETING EXECUTIVE / GTM SYSTEMS ENGINEER / CHICAGO";

export const alt =
  "Connor J. Laughlin. I build the revenue systems that make GTM strategy real.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return new ImageResponse(
    <ManualOgCard wordmark={WORDMARK} title={TITLE} meta={META} />,
    { ...size, fonts: await ogFonts() },
  );
}
