import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import {
  ManualOgCard,
  OG_CONTENT_TYPE,
  OG_SIZE,
  ogFonts,
} from "@/lib/og";

/**
 * Strings: copy deck section 12.2. The title is the chapter title from
 * `content/case-studies.ts`, which carries no numerals, so the template stays
 * claim-safe. Every case-study chapter sits in section 1 of the manual
 * (`tocSections` in `content/cover.ts`), so the meta line is a constant.
 */
const WORDMARK = "CONNOR J. LAUGHLIN";
const META = "SECTION 1 / REVENUE SYSTEMS";
const FALLBACK_TITLE = "Revenue systems";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Connor J. Laughlin. Section 1, revenue systems.";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const title = getCaseStudy(slug)?.title ?? FALLBACK_TITLE;

  return new ImageResponse(
    <ManualOgCard wordmark={WORDMARK} title={title} meta={META} />,
    { ...size, fonts: await ogFonts() },
  );
}
