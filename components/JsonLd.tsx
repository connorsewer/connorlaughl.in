type JsonLdProps = { data: unknown };

/**
 * Renders a JSON-LD <script type="application/ld+json"> with safe
 * stringification. JSON-LD scripts are not executed, only parsed; the
 * production CSP uses strict-dynamic alongside unsafe-inline so modern
 * browsers ignore unsafe-inline for executable scripts but allow the
 * non-executable JSON-LD payload through.
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

const SITE = "https://www.connorlaughl.in";

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Connor J. Laughlin",
  givenName: "Connor",
  familyName: "Laughlin",
  jobTitle: "VP of Marketing & GTM (acting CMO), GTM Engineer",
  description:
    "Chicago-based VP of Marketing & GTM (acting CMO) and GTM Engineer. Built revenue infrastructure, RevOps systems, governed AI workflows, and executive reporting behind $159.4M in influenced pipeline.",
  url: SITE,
  email: "mailto:connor.laughlin@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chicago",
    addressRegion: "IL",
    addressCountry: "US",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Santa Clara University",
      department: "Leavey School of Business",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Northwestern University",
      department: "Medill School of Journalism",
    },
  ],
  knowsAbout: [
    "GTM strategy",
    "revenue operations",
    "marketing leadership",
    "AI workflow design",
    "demand generation",
    "RevOps",
    "post-acquisition GTM",
    "programmatic SEO",
    "sales enablement",
    "executive reporting",
  ],
  sameAs: ["https://linkedin.com/in/connorlaughlin"],
};

export function caseStudyArticleSchema(input: {
  title: string;
  hook: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.hook,
    author: {
      "@type": "Person",
      name: "Connor J. Laughlin",
      url: SITE,
    },
    publisher: {
      "@type": "Person",
      name: "Connor J. Laughlin",
      url: SITE,
    },
    mainEntityOfPage: `${SITE}/case-studies/${input.slug}`,
    inLanguage: "en-US",
  };
}

export const breadcrumbSchema = (
  trail: Array<{ name: string; href: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: trail.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: `${SITE}${c.href}`,
  })),
});
