import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "Background, how I work and the tools I use.",
  alternates: { canonical: "/about" },
};

const experience = [
  { years: "2023 – now", role: "Lead product designer", place: "Paylane, payments for small businesses" },
  { years: "2020 – 2023", role: "Product designer", place: "Cragly and other clients, freelance" },
  { years: "2018 – 2020", role: "UI designer", place: "Routeline, logistics software" },
];

const skills = ["Product strategy", "User research", "Interaction design", "Design systems", "Prototyping", "Figma, FigJam, Framer"];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-24 sm:px-8">
      <h1 className="font-display text-5xl text-ink sm:text-6xl">About</h1>
      <div className="mt-10 grid gap-12 md:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-body">
          <p>
            I start every project by sitting next to the people who will use it: dispatchers on a night shift, climbers at the
            front desk, owners filling in tax forms at midnight. Most of my work is removing steps, not adding screens.
          </p>
          <p>
            I work best with small product teams where design, engineering and support talk every day. I prototype early,
            test with real users every couple of weeks and hand off files that developers can build without guessing.
          </p>
          <p>
            Open to freelance projects and part-time roles from January.{" "}
            <Link href="/contact" className="text-ink underline decoration-1 underline-offset-4">
              Tell me about yours
            </Link>
            .
          </p>
        </div>
        <div className="space-y-10">
          <div>
            <h2 className="text-sm tracking-wide text-muted uppercase">Experience</h2>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {experience.map((item) => (
                <li key={item.years} className="py-4">
                  <p className="text-sm text-muted">{item.years}</p>
                  <p className="mt-1 text-ink">{item.role}</p>
                  <p className="text-sm text-body">{item.place}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm tracking-wide text-muted uppercase">Skills</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li key={skill} className="rounded-full border border-line px-3 py-1.5 text-sm text-ink">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
