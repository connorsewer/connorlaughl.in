import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/content/case-studies";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study by Connor J. Laughlin";

export function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export default async function CaseStudyOG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  const title = cs?.title ?? "Case study";
  const hook = cs?.hook ?? "GTM systems Connor J. Laughlin built and ran.";
  const topMetrics = (cs?.proofMetrics ?? []).slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "radial-gradient(at 20% 10%, #1c1612 0%, #0d0a08 60%, #050403 100%)",
          color: "#f4ead5",
          padding: 72,
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "monospace",
            fontSize: 16,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#d6b773",
          }}
        >
          <span>Case study, Connor J. Laughlin</span>
          <span>{cs?.label ?? "GTM"}</span>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: title.length > 38 ? 64 : 84,
            lineHeight: 1.04,
            letterSpacing: -1,
            color: "#f4ead5",
            maxWidth: 1050,
          }}
        >
          {title}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            lineHeight: 1.4,
            maxWidth: 980,
            color: "rgba(244, 234, 213, 0.78)",
            fontStyle: "italic",
          }}
        >
          {hook}
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 56,
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(244, 234, 213, 0.78)",
            borderTop: "1px solid rgba(244, 234, 213, 0.18)",
            paddingTop: 28,
          }}
        >
          {topMetrics.length === 0 ? (
            <span>connorlaughl.in / case-studies</span>
          ) : (
            topMetrics.map((m) => (
              <div
                key={m.label}
                style={{ display: "flex", flexDirection: "column", gap: 6 }}
              >
                <span
                  style={{
                    fontFamily: "serif",
                    fontSize: 30,
                    color: "#f4ead5",
                    letterSpacing: 0,
                    textTransform: "none",
                  }}
                >
                  {m.value}
                </span>
                <span
                  style={{ color: "rgba(244, 234, 213, 0.55)", maxWidth: 220 }}
                >
                  {m.label}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    ),
    size,
  );
}
