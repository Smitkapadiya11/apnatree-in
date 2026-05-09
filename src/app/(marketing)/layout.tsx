import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { KingsmanCursor } from "@/components/shared/KingsmanCursor";
import { SmoothScrollProvider } from "@/components/shared/SmoothScrollProvider";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="marketing-kingsman"
      className="marketing-premium flex min-h-screen flex-col bg-[var(--obsidian-950)] text-[color:var(--ivory-50)]"
    >
      <SmoothScrollProvider>
        <KingsmanCursor />
        <a
          href="#main-content"
          className="font-km-mono sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[10060] focus:rounded-[4px] focus:bg-[color:var(--gold-primary)] focus:px-4 focus:py-2 focus:text-[0.65rem] focus:tracking-[0.18em] focus:text-[color:var(--obsidian-950)] focus:outline-none focus:ring-2 focus:ring-[color:var(--gold-pale)] focus:ring-offset-2 focus:ring-offset-[var(--obsidian-950)]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </SmoothScrollProvider>
    </div>
  );
}
