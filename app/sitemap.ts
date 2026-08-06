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

  const longformRoutes: MetadataRoute.Sitemap = caseStudies
    .filter((cs) => cs.longformHref?.startsWith("/longform/"))
    .map((cs) => ({
      url: `${SITE}${cs.longformHref}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    }));

  return [...staticRoutes, ...caseStudyRoutes, ...longformRoutes];
}
