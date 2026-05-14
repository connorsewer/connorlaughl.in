import { ImageResponse } from "next/og";

export const alt =
  "Connor J. Laughlin, VP of Marketing & GTM (acting CMO), GTM Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
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
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#d6b773",
          }}
        >
          <span>Connor J. Laughlin</span>
          <span>Chicago</span>
        </div>

        <div
          style={{
            marginTop: 56,
            fontSize: 96,
            lineHeight: 1.02,
            letterSpacing: -1,
            color: "#f4ead5",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Marketing executive.</span>
          <span>GTM systems engineer.</span>
        </div>

        <div
          style={{
            marginTop: 36,
            fontSize: 22,
            lineHeight: 1.45,
            maxWidth: 1000,
            color: "rgba(244, 234, 213, 0.78)",
            fontFamily: "serif",
          }}
        >
          GTM infrastructure behind $159.4M in marketing-influenced pipeline at
          a roughly $460M PE-backed enterprise.
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 48,
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(244, 234, 213, 0.78)",
            borderTop: "1px solid rgba(244, 234, 213, 0.18)",
            paddingTop: 28,
          }}
        >
          <Stat value="$159.4M" label="influenced pipeline" />
          <Stat value="22-agent" label="AI GTM OS" />
          <Stat value="35+" label="KPI framework" />
          <Stat value="7" label="acquisitions" />
          <Stat value="near $0" label="to board-backed" />
        </div>
      </div>
    ),
    size,
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span
        style={{
          fontFamily: "serif",
          fontSize: 36,
          color: "#f4ead5",
          letterSpacing: 0,
          textTransform: "none",
        }}
      >
        {value}
      </span>
      <span style={{ color: "rgba(244, 234, 213, 0.55)" }}>{label}</span>
    </div>
  );
}
