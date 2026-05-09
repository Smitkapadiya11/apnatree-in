import type { ReactNode } from "react";

import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[color:var(--brand-cream)] text-[color:var(--brand-forest)] min-h-screen">
      <a
        href="#dashboard-content"
        className="bg-[color:var(--brand-gold)] text-[color:var(--brand-forest)] focus-visible:ring-[color:var(--brand-gold)] sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Skip to dashboard
      </a>
      <div className="flex flex-col lg:flex-row">
        <DashboardSidebar />
        <div className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">
          <div className="lg:hidden mb-6 flex justify-end">
            {/* mobile open trigger lives inside DashboardSidebar */}
          </div>
          <main id="dashboard-content">{children}</main>
        </div>
      </div>
    </div>
  );
}
