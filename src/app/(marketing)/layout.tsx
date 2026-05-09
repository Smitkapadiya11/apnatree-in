import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--background)] text-[color:var(--foreground)]">
      <a
        href="#main-content"
        className="bg-[color:var(--brand-gold)] text-[color:var(--brand-forest)] focus-visible:ring-[color:var(--brand-gold)] sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="marketing-premium flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
