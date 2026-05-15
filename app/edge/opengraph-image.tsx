import { ImageResponse } from "next/og";

export const alt =
  "Edge — Taste applied at velocity. Eleven operating-edge skills by Connor J. Laughlin.";
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
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#d6b773",
          }}
        >
          <span>[Fig. 40] · Edge · 2026</span>
          <span>Connor J. Laughlin</span>
        </div>

        <div
          style={{
            marginTop: 80,
            fontSize: 124,
            lineHeight: 0.95,
            letterSpacing: -2,
            color: "#f4ead5",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span style={{ fontWeight: 900 }}>Taste applied</span>
          <span>
            <span style={{ fontStyle: "italic", fontWeight: 300, opacity: 0.8 }}>
              at{" "}
            </span>
            <span style={{ fontWeight: 900 }}>velocity.</span>
          </span>
        </div>

        <div
          style={{
            marginTop: 44,
            fontSize: 28,
            lineHeight: 1.4,
            maxWidth: 1000,
            color: "rgba(244, 234, 213, 0.78)",
            fontFamily: "serif",
            fontStyle: "italic",
          }}
        >
          Generation is cheap. The bottleneck is recognition.
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontFamily: "monospace",
            fontSize: 14,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(244, 234, 213, 0.7)",
            borderTop: "1px solid rgba(244, 234, 213, 0.18)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <span>11 chapters</span>
            <span style={{ color: "rgba(244, 234, 213, 0.35)" }}>·</span>
            <span>3 acts</span>
            <span style={{ color: "rgba(244, 234, 213, 0.35)" }}>·</span>
            <span>One operating thesis</span>
          </div>
          <span style={{ color: "rgba(244, 234, 213, 0.55)" }}>
            connorlaughl.in/edge
          </span>
        </div>
      </div>
    ),
    size,
  );
}
