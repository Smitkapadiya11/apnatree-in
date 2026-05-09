import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Leaf, MapPin } from "lucide-react";

import { FARM_MEDIA, FARM_MEDIA_FALLBACKS } from "@/lib/farm-media";
import { cn } from "@/lib/utils";

export type TreeCardProps = {
  treeCode: string;
  tierLabel: string;
  status?: "Stewarding" | "Pre-booked" | "Harvest" | "Reserved";
  contractNumber?: string;
  zone?: string;
  yieldEstimateKg?: number | null;
  imageSrc?: string;
  href?: string;
  className?: string;
};

const STATUS_TONE: Record<NonNullable<TreeCardProps["status"]>, string> = {
  Stewarding: "bg-[color:var(--brand-forest)]/90 text-[color:var(--brand-cream)]",
  "Pre-booked": "bg-[color:var(--brand-gold)] text-[color:var(--brand-forest)]",
  Harvest: "bg-[color:var(--brand-earth)] text-[color:var(--brand-cream)]",
  Reserved: "bg-[color:var(--brand-cream-dark)] text-[color:var(--brand-forest)]",
};

export function TreeCard({
  treeCode,
  tierLabel,
  status = "Stewarding",
  contractNumber,
  zone,
  yieldEstimateKg,
  imageSrc,
  href,
  className,
}: TreeCardProps) {
  const fallback = FARM_MEDIA.orchard[0] ?? FARM_MEDIA_FALLBACKS.gallery;
  const image = imageSrc ?? fallback;
  const Wrapper: React.ElementType = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-2xl)] border border-[color:var(--brand-gold)]/15 bg-[color:var(--brand-ivory)] shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-luxe)]",
        className
      )}
    >
      <div className="relative aspect-[5/3] overflow-hidden">
        <Image
          src={image}
          alt={`Tree ${treeCode} canopy frame`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-[color:var(--brand-forest)]/80 via-transparent to-transparent" />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 text-[color:var(--brand-cream)]">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--brand-gold-light)]">{tierLabel}</p>
            <p className="font-[family-name:var(--font-heading)] text-2xl">{treeCode}</p>
          </div>
          <span className={cn("rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em]", STATUS_TONE[status])}>
            {status}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <dl className="grid grid-cols-2 gap-3 text-xs uppercase tracking-[0.18em] text-[color:var(--brand-forest)]/55">
          <div>
            <dt>Contract</dt>
            <dd className="mt-1 font-[family-name:var(--font-heading)] text-base tracking-normal text-[color:var(--brand-forest)]">
              {contractNumber ?? "—"}
            </dd>
          </div>
          <div>
            <dt>Yield estimate</dt>
            <dd className="mt-1 font-[family-name:var(--font-heading)] text-base tracking-normal text-[color:var(--brand-forest)]">
              {yieldEstimateKg ? `${yieldEstimateKg} kg` : "Pending"}
            </dd>
          </div>
        </dl>

        <div className="flex flex-wrap items-center gap-3 text-xs text-[color:var(--muted-foreground)]">
          {zone ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand-cream)] px-3 py-1">
              <MapPin className="size-3" aria-hidden />
              {zone}
            </span>
          ) : null}
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--brand-cream)] px-3 py-1">
            <Leaf className="size-3" aria-hidden /> Kesar canopy
          </span>
        </div>

        {href ? (
          <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-[color:var(--brand-gold-dark)] transition-colors group-hover:text-[color:var(--brand-forest)]">
            View tree dossier <ArrowUpRight className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
    </Wrapper>
  );
}
