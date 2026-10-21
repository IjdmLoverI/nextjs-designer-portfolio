import { ImageResponse } from "next/og";

import { getProject, getProjectSlugs } from "@/lib/projects";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Case study cover";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);
  const title = project?.meta.title ?? site.name;
  const accent = project?.meta.accent ?? "#1c1a17";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: accent,
          color: "#ffffff",
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.8 }}>
          {`${site.name} · ${project ? project.meta.role : site.role}`}
        </div>
        <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 1000 }}>{title}</div>
        <div style={{ fontSize: 26, opacity: 0.8 }}>{project ? project.meta.tags.join("  ·  ") : ""}</div>
      </div>
    ),
    size,
  );
}
