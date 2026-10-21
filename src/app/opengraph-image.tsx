import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}, ${site.role}`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#f6f3ee",
          color: "#1c1a17",
        }}
      >
        <div style={{ fontSize: 34, color: "#6b665e" }}>{site.role}</div>
        <div style={{ fontSize: 96, lineHeight: 1.02, marginTop: 16 }}>{site.name}</div>
        <div style={{ fontSize: 34, marginTop: 28, maxWidth: 900, color: "#3d3a35" }}>
          I design calm products for busy people.
        </div>
      </div>
    ),
    size,
  );
}
