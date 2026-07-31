import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGrid, ProductGridItem } from "@/components/product/ProductGrid";
import { getBrandLogo } from "@/lib/brands";
import type { ProductListItem } from "@/types/product";
import Image from "next/image";

interface BrandShowcaseProps {
  brand: string;
  products: ProductListItem[];
  brandLabel: string;
  viewAllLabel: string;
  expanded?: boolean;
}

export function BrandShowcase({
  brand,
  products,
  brandLabel,
  viewAllLabel,
  expanded = false,
}: BrandShowcaseProps) {
  if (products.length === 0) return null;

  const visibleProducts = expanded ? products : products.slice(0, 4);
  const brandLogo = getBrandLogo(brand);

  return (
    <ScrollReveal className="border-b border-border py-16 md:py-20">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="editorial-eyebrow text-text-muted">{brandLabel}</p>
            {brandLogo ? (
              <div className="mt-4">
                <Image
                  src={brandLogo}
                  alt={brand}
                  width={180}
                  height={72}
                  className="h-10 w-auto object-contain md:h-12"
                />
              </div>
            ) : (
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                {brand}
              </h2>
            )}
          </div>
          {!expanded && (
            <Link
              href={`/collections?brand=${encodeURIComponent(brand)}`}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan transition-colors hover:text-accent"
            >
              {viewAllLabel}
            </Link>
          )}
        </div>

        <ProductGrid columns={4} className="mt-10">
          {visibleProducts.map((product) => (
            <ProductGridItem key={product.id}>
              <ProductCard product={product} />
            </ProductGridItem>
          ))}
        </ProductGrid>
      </div>
    </ScrollReveal>
  );
}

interface BrandShowcasesProps {
  groups: { brand: string; products: ProductListItem[] }[];
  brandLabel: string;
  viewAllLabel: (brand: string) => string;
  title?: string;
  subtitle?: string;
  expanded?: boolean;
}

export function BrandShowcases({
  groups,
  brandLabel,
  viewAllLabel,
  title,
  subtitle,
  expanded = false,
}: BrandShowcasesProps) {
  if (groups.length === 0) return null;

  return (
    <section className="bg-bg-primary">
      {title && (
        <div className="container-page pt-16 md:pt-20">
          <h2 className="font-display text-display-lg font-semibold text-text-primary">{title}</h2>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-text-secondary">{subtitle}</p>
          )}
        </div>
      )}
      {groups.map(({ brand, products }) => (
        <BrandShowcase
          key={brand}
          brand={brand}
          products={products}
          brandLabel={brandLabel}
          viewAllLabel={viewAllLabel(brand)}
          expanded={expanded}
        />
      ))}
    </section>
  );
}
