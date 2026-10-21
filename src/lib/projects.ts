import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

export type ProjectMeta = {
  title: string;
  summary: string;
  client: string;
  role: string;
  year: number;
  tags: string[];
  cover: string;
  accent: string;
  featured?: boolean;
  order: number;
};

export type Project = {
  slug: string;
  meta: ProjectMeta;
  Content: ComponentType;
};

const contentDir = path.join(process.cwd(), "src", "content", "projects");

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!getProjectSlugs().includes(slug)) return null;
  const mod = await import(`@/content/projects/${slug}.mdx`);
  return { slug, meta: mod.metadata as ProjectMeta, Content: mod.default };
}

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(getProjectSlugs().map(getProject));
  return projects
    .filter((project): project is Project => project !== null)
    .sort((a, b) => a.meta.order - b.meta.order);
}
