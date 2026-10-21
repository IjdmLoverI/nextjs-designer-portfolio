import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
      <p className="text-sm tracking-wide text-muted uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl text-ink">This page doesn’t exist</h1>
      <p className="mt-4 text-lg text-body">The link may be old, or the case study was moved.</p>
      <Link href="/projects" className="mt-8 inline-block rounded-full bg-ink px-5 py-3 text-sm text-paper">
        Back to the work
      </Link>
    </section>
  );
}
