"use client";

import { ScrollReveal } from "@/components/marketing/ScrollReveal";

const FEATURED_BRANDS = [
  "DJI",
  "Canon",
  "Sony",
  "Nikon",
  "Fujifilm",
  "Sigma",
  "Tamron",
  "GoPro",
  "Insta360",
  "Blackmagic",
] as const;

interface FeaturedBrandsStripProps {
  title: string;
  subtitle?: string;
}

export function FeaturedBrandsStrip({ title, subtitle }: FeaturedBrandsStripProps) {
  return (
    <section className="overflow-hidden border-y border-border bg-bg-elevated py-14 md:py-16">
      <div className="container-page">
        <ScrollReveal className="text-center">
          <p className="editorial-eyebrow">{title}</p>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-sm text-text-secondary">{subtitle}</p>
          )}
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.1} className="mt-10">
        <div className="relative">
          <div className="flex animate-marquee gap-16 whitespace-nowrap px-6 md:gap-24">
            {[...FEATURED_BRANDS, ...FEATURED_BRANDS].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="font-display text-2xl font-semibold tracking-tight text-text-primary/20 md:text-4xl"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
