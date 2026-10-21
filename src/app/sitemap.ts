import type { MetadataRoute } from "next";

import { getProjectSlugs } from "@/lib/projects";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/about", "/contact"];
  const projects = getProjectSlugs().map((slug) => `/projects/${slug}`);

  return [...pages, ...projects].map((path) => ({ url: `${siteUrl}${path}` }));
}
