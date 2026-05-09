import Link from "next/link";

import type { ReactNode } from "react";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/trees", label: "Trees" },
  { href: "/admin/contracts", label: "Contracts" },
  { href: "/admin/media-upload", label: "Media Upload" },
  { href: "/admin/users", label: "Users" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/40 flex min-h-screen flex-col lg:flex-row">
      <aside className="border-border bg-background lg:border-border lg:w-72 lg:border-r">
        <div className="flex flex-col gap-8 px-6 py-10">
          <div>
            <p className="text-muted-foreground text-xs tracking-[0.35em] uppercase">Administration</p>
            <p className="font-[family-name:var(--font-heading)] text-2xl">Field control room</p>
          </div>
          <nav aria-label="Admin" className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-foreground text-muted-foreground rounded-xl px-3 py-2 transition-colors duration-200 hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
      <div className="flex-1 px-4 py-10 sm:px-8">{children}</div>
    </div>
  );
}
