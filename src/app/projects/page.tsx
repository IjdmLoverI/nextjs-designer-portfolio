import type { Metadata } from "next";

import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/motion/Reveal";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Case studies in fintech, booking and B2B dashboards.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-8">
      <h1 className="font-display text-5xl text-ink sm:text-6xl">Work</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">
        Selected case studies. Each one covers the problem, how I got to the solution and what changed after launch.
      </p>
      <ul className="mt-12 grid gap-12 md:grid-cols-2 md:gap-8">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <Reveal delay={(index % 2) * 0.08}>
              <ProjectCard project={project} eager={index === 0} />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
