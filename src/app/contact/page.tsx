import type { Metadata } from "next";

import { site } from "@/lib/site";

import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me about your project.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 pt-16 pb-24 sm:px-8 md:grid-cols-[1fr_1.2fr]">
      <div>
        <h1 className="font-display text-5xl text-ink sm:text-6xl">Let’s talk</h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-body">
          A short note about the product, the timeline and what you need help with is enough. I reply within one working day.
        </p>
        <p className="mt-8 text-sm text-muted">
          Prefer email? <span className="text-ink">{site.email}</span>
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
