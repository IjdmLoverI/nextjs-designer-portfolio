import Link from "next/link";

import { NavLink } from "@/components/NavLink";
import { site } from "@/lib/site";

const links = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link href="/" className="font-display text-2xl text-ink">
          {site.name}
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1 text-sm sm:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href}>{link.label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
