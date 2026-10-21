import Link from "next/link";

import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/lib/projects";
import { site } from "@/lib/site";

export default async function HomePage() {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.meta.featured);

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-20 sm:px-8 sm:pt-24">
        <p className="text-sm tracking-wide text-muted uppercase">{site.role}</p>
        <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-ink sm:text-7xl">
          I design calm products for busy people.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
          Eight years of product design across fintech, booking and logistics. I turn messy flows into
          interfaces people finish without thinking about them.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/projects" className="rounded-full bg-ink px-5 py-3 text-sm text-paper transition-opacity hover:opacity-85">
            See the work
          </Link>
          <Link href="/contact" className="rounded-full border border-line px-5 py-3 text-sm text-ink transition-colors hover:bg-surface">
            Get in touch
          </Link>
        </div>
      </section>

      <section aria-labelledby="featured" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 border-t border-line pt-8">
          <h2 id="featured" className="font-display text-3xl text-ink">
            Featured projects
          </h2>
          <Link href="/projects" className="text-sm text-ink underline decoration-1 underline-offset-4">
            All projects
          </Link>
        </div>
        <ul className="grid gap-12 md:grid-cols-2 md:gap-8">
          {featured.map((project, index) => (
            <li key={project.slug}>
              <Reveal delay={index * 0.08}>
                <ProjectCard project={project} eager={index === 0} />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
