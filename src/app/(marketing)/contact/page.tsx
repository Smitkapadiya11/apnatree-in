import { ContactForm } from "@/components/contact/ContactForm";
import { CopyAddressButton } from "@/components/contact/CopyAddressButton";

export const revalidate = 86400;

const FARM_ADDRESS = "ApnaTree Grove · Talala Taluka, Gir Somnath, Gujarat, India";

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_E164;
  const whatsappHref = whatsappNumber ? `https://wa.me/${whatsappNumber.replace(/[^\d]/g, "")}` : undefined;

  return (
    <article className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <p className="text-primary text-xs tracking-[0.35em] uppercase">Concierge routing</p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl tracking-tight sm:text-5xl">Talk with the grove desk</h1>
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          Messages persist to our database and notify <strong>support@apnatree.in</strong> via Resend.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr,1.1fr]">
        <aside className="space-y-6 rounded-3xl border border-border/70 bg-[color-mix(in_oklab,var(--accent)_8%,transparent)] p-6">
          <div>
            <p className="text-muted-foreground text-xs uppercase tracking-[0.35em]">Farm address</p>
            <p className="mt-2 text-base leading-relaxed">{FARM_ADDRESS}</p>
          </div>
          <CopyAddressButton text={FARM_ADDRESS} />
        </aside>

        <ContactForm whatsappHref={whatsappHref} />
      </div>
    </article>
  );
}
