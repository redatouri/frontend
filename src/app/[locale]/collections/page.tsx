import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Link } from "@/i18n/navigation";
import { getCategories } from "@/lib/api/categories";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  return { title: `${t("title")} | Moviecam`, description: t("subtitle") };
}

export default async function CollectionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("collections");
  const categories = await getCategories({ locale });

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-16 md:py-20">
        <div className="container-page">
          <ScrollReveal>
            <h1 className="font-display text-display-lg font-bold">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-text-secondary">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <ScrollReveal key={cat.slug} delay={i * 0.08}>
              <Link
                href={`/collections/${cat.slug}`}
                className="group block overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-transform hover:scale-[1.02]"
              >
                <div className="relative aspect-[16/10] bg-bg-subtle">
                  <ProductPlaceholder category="camera" label={cat.name} />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold group-hover:text-accent">
                    {cat.name}
                  </h2>
                  {cat.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                      {cat.description}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-accent">
                    {t("products", { count: cat.product_count })}
                  </p>
                  {cat.children && cat.children.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cat.children.slice(0, 4).map((child) => (
                        <span
                          key={child.slug}
                          className="rounded-full bg-bg-subtle px-2.5 py-0.5 text-xs text-text-muted"
                        >
                          {child.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
