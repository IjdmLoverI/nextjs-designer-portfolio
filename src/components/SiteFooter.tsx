import Link from "next/link";

import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name}. Demo portfolio: the designer and the case studies are fictional.
        </p>
        <Link href="/contact" className="text-ink underline decoration-1 underline-offset-4">
          Start a project
        </Link>
      </div>
    </footer>
  );
}
