import { Link } from "@/i18n/navigation";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { ProductCard } from "@/components/product/ProductCard";
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
    <ScrollReveal className="border-b border-border py-10 md:py-14">
      <div className="container-page">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-text-muted">
            {brandLabel}
          </p>
          {brandLogo ? (
            <div className="mt-3 flex justify-center">
              <Image
                src={brandLogo}
                alt={brand}
                width={160}
                height={64}
                className="h-12 w-auto object-contain md:h-14"
              />
            </div>
          ) : (
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
              {brand}
            </h2>
          )}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!expanded && (
          <div className="mt-8 text-center">
            <Link
              href={`/collections?brand=${encodeURIComponent(brand)}`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-6 text-sm font-semibold text-text-primary transition-colors hover:border-text-primary hover:bg-bg-subtle"
            >
              {viewAllLabel}
            </Link>
          </div>
        )}
      </div>
    </ScrollReveal>
  );
}

interface BrandShowcasesProps {
  groups: { brand: string; products: ProductListItem[] }[];
  brandLabel: string;
  viewAllLabel: (brand: string) => string;
  title?: string;
  expanded?: boolean;
}

export function BrandShowcases({
  groups,
  brandLabel,
  viewAllLabel,
  title,
  expanded = false,
}: BrandShowcasesProps) {
  if (groups.length === 0) return null;

  return (
    <section className="bg-bg-elevated">
      {title && (
        <div className="container-page pt-10 md:pt-12">
          <h2 className="font-display text-display-lg font-semibold">{title}</h2>
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
