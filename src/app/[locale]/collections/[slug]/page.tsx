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

  const sortOptions = ["popular", "price_asc", "price_desc", "newest"] as const;

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-14 md:py-20">
        <div className="container-page">
          <nav className="mb-6 text-xs font-medium uppercase tracking-[0.14em] text-text-muted">
            <Link href="/collections" className="transition-colors hover:text-accent">
              {t("title")}
            </Link>
            <span className="mx-3">/</span>
            <span className="text-text-secondary">{category.name}</span>
          </nav>
          <ScrollReveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="editorial-eyebrow">{t("title")}</p>
                <h1 className="mt-4 font-display text-display-lg font-semibold">{category.name}</h1>
                {category.description && (
                  <p className="mt-5 text-body-lg text-text-secondary">{category.description}</p>
                )}
                <p className="mt-4 text-sm font-medium text-cyan">
                  {t("products", { count: products.total })}
                </p>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-bg-subtle">
                <ProductPlaceholder category="camera" label={category.name} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <div className="mb-10 flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-center md:justify-between">
            <span className="editorial-eyebrow text-text-muted">{t("filters")}</span>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map((s) => (
                <Link
                  key={s}
                  href={`/collections/${slug}?sort=${s}${in_stock === "true" ? "&in_stock=true" : ""}`}
                  className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                    (sort ?? "popular") === s
                      ? "bg-accent text-on-accent"
                      : "border border-border text-text-secondary hover:border-accent hover:text-accent"
                  }`}
                >
                  {t(`sort${s === "popular" ? "Popular" : s === "price_asc" ? "PriceAsc" : s === "price_desc" ? "PriceDesc" : "Newest"}`)}
                </Link>
              ))}
              <Link
                href={`/collections/${slug}?sort=${sort ?? "popular"}&in_stock=true`}
                className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] transition-colors ${
                  in_stock === "true"
                    ? "bg-accent text-on-accent"
                    : "border border-border text-text-secondary hover:border-accent hover:text-accent"
                }`}
              >
                {t("inStock")}
              </Link>
            </div>
          </div>

          {products.items.length === 0 ? (
            <p className="py-20 text-center text-text-secondary">{t("empty")}</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {products.items.map((product, i) => (
                <ScrollReveal key={product.id} delay={i * 0.05}>
                  <ProductCard product={product} />
                </ScrollReveal>
              ))}
            </div>
          )}

          {category.description && (
            <ScrollReveal className="mt-20 max-w-3xl border-t border-border pt-12">
              <p className="text-body-lg leading-relaxed text-text-secondary">{category.description}</p>
            </ScrollReveal>
          )}
        </div>
      </section>
    </>
  );
}
