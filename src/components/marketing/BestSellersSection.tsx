"use client";

import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { SectionHeading } from "@/components/marketing/SectionHeading";
import type { ProductListItem } from "@/types/product";

interface BestSellersSectionProps {
  title: string;
  subtitle?: string;
  products: ProductListItem[];
  viewAllLabel: string;
}

export function BestSellersSection({
  title,
  subtitle,
  products,
  viewAllLabel,
}: BestSellersSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="section-padding bg-bg-primary">
      <div className="container-page">
        <ScrollReveal>
          <SectionHeading title={title} subtitle={subtitle} />
        </ScrollReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {products.slice(0, 4).map((product, i) => (
            <ScrollReveal key={product.id} delay={i * 0.08}>
              <ProductCard product={product} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-12 text-center">
          <Link
            href="/collections?sort=popular"
            className="inline-flex h-12 items-center justify-center border border-border px-8 text-sm font-semibold uppercase tracking-[0.14em] text-text-primary transition-colors hover:border-accent hover:text-accent"
          >
            {viewAllLabel}
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
