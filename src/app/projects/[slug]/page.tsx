import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, getProjects, getProjectSlugs } from "@/lib/projects";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.meta.title,
    description: project.meta.summary,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: "article",
      title: project.meta.title,
      description: project.meta.summary,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { meta, Content } = project;
  const projects = await getProjects();
  const next = projects[(projects.findIndex((item) => item.slug === slug) + 1) % projects.length];

  return (
    <article className="pb-24">
      <header className="mx-auto max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <Link href="/projects" className="text-sm text-muted hover:text-ink">
          ← All projects
        </Link>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.05] text-ink sm:text-6xl">{meta.title}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-body">{meta.summary}</p>
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm sm:grid-cols-4">
          <div>
            <dt className="text-muted">Client</dt>
            <dd className="mt-1 text-ink">{meta.client}</dd>
          </div>
          <div>
            <dt className="text-muted">Role</dt>
            <dd className="mt-1 text-ink">{meta.role}</dd>
          </div>
          <div>
            <dt className="text-muted">Year</dt>
            <dd className="mt-1 text-ink">{meta.year}</dd>
          </div>
          <div>
            <dt className="text-muted">Scope</dt>
            <dd className="mt-1 text-ink">{meta.tags.join(", ")}</dd>
          </div>
        </dl>
      </header>

      <div className="mx-auto mt-12 max-w-6xl px-5 sm:px-8">
        <Image
          src={meta.cover}
          alt=""
          width={1600}
          height={1000}
          unoptimized
          loading="eager"
          fetchPriority="high"
          className="aspect-[16/10] w-full rounded-3xl object-cover"
        />
      </div>

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Content />
      </div>

      {next && next.slug !== slug && (
        <nav aria-label="Next project" className="mx-auto mt-20 max-w-6xl px-5 sm:px-8">
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-2 rounded-3xl p-8 transition-colors"
            style={{ backgroundColor: next.meta.accent }}
          >
            <span className="text-sm text-white">Next project</span>
            <span className="font-display text-3xl text-white sm:text-4xl">
              {next.meta.title}
              <span aria-hidden className="ml-3 inline-block transition-transform group-hover:translate-x-2">
                →
              </span>
            </span>
          </Link>
        </nav>
      )}
    </article>
  );
}
