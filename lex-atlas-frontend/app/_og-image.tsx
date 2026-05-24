/**
 * Shared OG image generator - 1200x630, rendered via Next.js's `next/og`
 * ImageResponse. Used by both `app/opengraph-image.tsx` and
 * `app/twitter-image.tsx` so the og:image and twitter:image stay
 * pixel-identical without a second JSX tree.
 *
 * The design pairs the serif RAGTAG headline with a minimal "constellation"
 * dot graph in the background - same visual vocabulary as the landing-page
 * topology canvas, but rendered as static JSX so it costs ~30 ms at edge.
 */

import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png" as const;
export const OG_ALT =
  "RAGTAG - Retrieval Augmented Graph Tax Answer Generator over Finnish tax law (Finlex + Vero).";

// Deterministic pseudo-random so the constellation stays stable build-to-build.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

export function renderOgImage() {
  const r = rng(20260524);
  const nodes: Array<{ x: number; y: number; r: number; bright: boolean }> = [];
  for (let i = 0; i < 70; i++) {
    nodes.push({
      x: Math.floor(r() * 1200),
      y: Math.floor(r() * 630),
      r: 2 + Math.floor(r() * 4),
      bright: r() < 0.18,
    });
  }
  const edges: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];
  const brights = nodes.filter((n) => n.bright);
  for (let i = 0; i < brights.length; i++) {
    const a = brights[i];
    let bestJ = -1;
    let bestD = Infinity;
    for (let j = 0; j < brights.length; j++) {
      if (i === j) continue;
      const b = brights[j];
      const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
      if (d < bestD) {
        bestD = d;
        bestJ = j;
      }
    }
    if (bestJ >= 0 && bestD < 70000) {
      const b = brights[bestJ];
      edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y });
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAF7F2",
          color: "#1A1A1A",
          fontFamily: "serif",
          position: "relative",
          padding: "64px",
        }}
      >
        <svg
          width={1200}
          height={630}
          style={{ position: "absolute", inset: 0, opacity: 0.55 }}
        >
          {edges.map((e, i) => (
            <line
              key={`e${i}`}
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              stroke="#C84A1E"
              strokeOpacity={0.18}
              strokeWidth={1}
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={`n${i}`}
              cx={n.x}
              cy={n.y}
              r={n.r}
              fill={n.bright ? "#C84A1E" : "#2E2A24"}
              fillOpacity={n.bright ? 0.85 : 0.35}
            />
          ))}
        </svg>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#5A5347",
            zIndex: 1,
          }}
        >
          <span>SYS.RAGTAG.v2.4</span>
          <span>FI - TAX - 2026</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 110,
            gap: 18,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontSize: 132,
              fontWeight: 600,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              color: "#1A1A1A",
            }}
          >
            RAGTAG
          </div>
          <div
            style={{
              fontSize: 56,
              fontStyle: "italic",
              fontWeight: 400,
              color: "#3D3933",
              letterSpacing: "-0.01em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            for Finnish tax law.
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#5A5347",
              maxWidth: 880,
              lineHeight: 1.4,
              marginTop: 28,
              fontFamily: "sans-serif",
            }}
          >
            Multi-agent GraphRAG over Finlex, Vero, and KHO case law.
            Typed temporal graph, agent debate, cited answers.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 64,
            right: 64,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "monospace",
            fontSize: 18,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#5A5347",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", gap: 24 }}>
            <span style={{ color: "#C84A1E" }}>1.97M nodes</span>
            <span>2.25M edges</span>
            <span>402K chunks</span>
          </div>
          <span>Aalto Prompt Finance Hackathon 2026</span>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
