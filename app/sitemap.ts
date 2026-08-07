import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { journalSlugs } from "@/lib/journal";

const SITE = "https://www.connorlaughl.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE}/work`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/builds`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/writing`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/story`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/edge`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/case-studies/strategy-memo`, lastModified: now, changeFrequency: "monthly", priority: 0.65 },
    { url: `${SITE}/resume`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/now`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${SITE}/plates`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
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

  const journalRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/journal`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...journalSlugs().map((slug) => ({
      url: `${SITE}/journal/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];

  return [...staticRoutes, ...caseStudyRoutes, ...longformRoutes, ...journalRoutes];
}
