import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { ProductCard } from "@/components/product/ProductCard";
import { getProducts } from "@/lib/api/products";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: `${t("title")} | Moviecam`, description: t("subtitle") };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("products");

  const products = await getProducts({
    locale,
    sort: "popular",
    limit: 50,
  });

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-14 md:py-20">
        <div className="container-page">
          <ScrollReveal>
            <div>
              <p className="editorial-eyebrow">Moviecam</p>
              <h1 className="mt-4 font-display text-display-lg font-semibold">{t("title")}</h1>
              <p className="mt-5 text-body-lg text-text-secondary">{t("subtitle")}</p>
              <p className="mt-4 text-sm font-medium text-cyan">
                {t("products", { count: products.total })}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
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
        </div>
      </section>
    </>
  );
}
