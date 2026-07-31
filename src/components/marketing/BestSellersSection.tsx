"use client";

import { Link } from "@/i18n/navigation";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGrid, ProductGridItem } from "@/components/product/ProductGrid";
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

        <ProductGrid columns={4} className="mt-14">
          {products.slice(0, 4).map((product, i) => (
            <ProductGridItem key={product.id}>
              <ScrollReveal delay={i * 0.08}>
                <ProductCard product={product} />
              </ScrollReveal>
            </ProductGridItem>
          ))}
        </ProductGrid>

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
