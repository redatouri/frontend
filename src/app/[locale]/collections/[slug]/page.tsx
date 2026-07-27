import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Link } from "@/i18n/navigation";
import { getCategory } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const category = await getCategory(slug, locale);
  if (!category) return { title: "Collection | Moviecam" };
  return {
    title: `${category.name} | Moviecam`,
    description: category.description,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ sort?: string; in_stock?: string }>;
}) {
  const { locale, slug } = await params;
  const { sort, in_stock } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("collections");

  const category = await getCategory(slug, locale);
  if (!category) notFound();

  const products = await getProducts({
    locale,
    category: slug,
    sort: (sort as "popular" | "price_asc" | "price_desc" | "newest") ?? "popular",
    in_stock: in_stock === "true" ? true : undefined,
    limit: 50,
  });

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-12 md:py-16">
        <div className="container-page">
          <nav className="mb-4 text-sm text-text-muted">
            <Link href="/collections" className="hover:text-accent">
              {t("title")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-text-secondary">{category.name}</span>
          </nav>
          <ScrollReveal>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h1 className="font-display text-display-lg font-bold">{category.name}</h1>
                {category.description && (
                  <p className="mt-4 text-text-secondary">{category.description}</p>
                )}
                <p className="mt-2 text-sm text-accent">
                  {t("products", { count: products.total })}
                </p>
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-bg-subtle">
                <ProductPlaceholder category="camera" label={category.name} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <span className="text-sm text-text-muted">{t("filters")}:</span>
            {(["popular", "price_asc", "price_desc", "newest"] as const).map((s) => (
              <Link
                key={s}
                href={`/collections/${slug}?sort=${s}`}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  (sort ?? "popular") === s
                    ? "bg-accent text-bg-primary"
                    : "border border-border text-text-secondary hover:border-accent"
                }`}
              >
                {t(`sort${s === "popular" ? "Popular" : s === "price_asc" ? "PriceAsc" : s === "price_desc" ? "PriceDesc" : "Newest"}`)}
              </Link>
            ))}
          </div>

          {products.items.length === 0 ? (
            <p className="py-16 text-center text-text-secondary">{t("empty")}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.items.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {category.description && (
            <ScrollReveal className="mt-16 max-w-3xl">
              <div className="prose prose-invert text-text-secondary">
                <p>{category.description}</p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
