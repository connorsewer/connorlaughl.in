import type { MetadataRoute } from "next";

const SITE = "https://www.connorlaughl.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/proof", "/_next/", "/api/"],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
