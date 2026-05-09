type MarketingPlaceholderProps = {
  title: string;
  description: string;
};

export function MarketingPlaceholder({ title, description }: MarketingPlaceholderProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="text-primary text-xs tracking-[0.35em] uppercase">ApnaTree.in</p>
      <h1 className="font-[family-name:var(--font-heading)] mt-4 text-4xl tracking-tight sm:text-5xl">{title}</h1>
      <p className="text-muted-foreground mt-6 text-lg leading-relaxed">{description}</p>
    </section>
  );
}
