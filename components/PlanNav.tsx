"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Matrix" },
  { href: "/plan/fill", label: "Fill the four" },
  { href: "/plan/line", label: "One line" },
  { href: "/plan/several", label: "Several meals" },
  { href: "/plan/pinned", label: "Pinned" },
  { href: "/plan/rail", label: "Rail" },
  { href: "/plan/open", label: "One open" },
  { href: "/plan/views", label: "Two views" },
] as const;

export function PlanNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Versions"
      className="flex shrink-0 flex-wrap gap-x-6 gap-y-2 border-b border-sx-surface-muted bg-sx-canvas px-8 py-3 text-sm"
    >
      {LINKS.map((link) => {
        const current = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={current ? "page" : undefined}
            className={
              current
                ? "font-medium text-sx-text-primary underline underline-offset-4"
                : "text-sx-text-secondary hover:text-sx-text-primary"
            }
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
