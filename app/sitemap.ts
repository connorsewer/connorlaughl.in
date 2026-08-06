import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";

const SITE = "https://www.connorlaughl.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/edge`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/case-studies/strategy-memo`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/tools/revops-capacity-planner`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${SITE}/case-studies/${cs.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: cs.signature ? 0.85 : 0.6,
  }));

  /* More than one chapter can point at the same longform piece, so the hrefs
     are deduped before they become sitemap entries. */
  const longformHrefs = Array.from(
    new Set(
      caseStudies
        .map((cs) => cs.longformHref)
        .filter((href): href is string => Boolean(href?.startsWith("/longform/"))),
    ),
  );

  const longformRoutes: MetadataRoute.Sitemap = longformHrefs.map((href) => ({
    url: `${SITE}${href}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...caseStudyRoutes, ...longformRoutes];
}
