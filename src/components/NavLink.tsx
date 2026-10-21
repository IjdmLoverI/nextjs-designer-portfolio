"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3 py-1.5 transition-colors ${
        active ? "bg-ink text-paper" : "text-body hover:bg-surface hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}
