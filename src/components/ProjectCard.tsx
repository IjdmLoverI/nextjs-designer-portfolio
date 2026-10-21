import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects";

export function ProjectCard({ project, eager = false }: { project: Project; eager?: boolean }) {
  const { slug, meta } = project;

  return (
    <Link
      href={`/projects/${slug}`}
      className="group block rounded-3xl focus-visible:outline-offset-4"
      data-testid="project-card"
    >
      <div className="overflow-hidden rounded-3xl bg-surface">
        <Image
          src={meta.cover}
          alt=""
          width={1600}
          height={1000}
          unoptimized
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl text-ink">{meta.title}</h3>
          <p className="mt-1 text-sm text-muted">
            {meta.role} · {meta.year}
          </p>
        </div>
        <span
          aria-hidden
          className="mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 group-hover:translate-x-1 group-hover:bg-ink group-hover:text-paper"
        >
          →
        </span>
      </div>
    </Link>
  );
}
