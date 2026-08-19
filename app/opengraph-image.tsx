import { ImageResponse } from "next/og";
import {
  ManualOgCard,
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogFonts,
} from "@/lib/og";

/** Strings: copy deck section 12.1. No claim numeral on any OG surface.
    Title swapped to the site line 2026-08-19 per ADR 0002: the site leads
    with the storyteller sentence; the systems sentence belongs to recruiter
    surfaces (resume, LinkedIn) and the /resume route. */
const WORDMARK = "CONNOR J. LAUGHLIN";
const TITLE = "I tell stories people remember, and I build the systems that make them true.";
const META = "MARKETING EXECUTIVE / GTM SYSTEMS ENGINEER / CHICAGO";

export const alt =
  "Connor J. Laughlin. I tell stories people remember, and I build the systems that make them true.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return new ImageResponse(
    <ManualOgCard wordmark={WORDMARK} title={TITLE} meta={META} />,
    { ...size, fonts: await ogFonts() },
  );
}
