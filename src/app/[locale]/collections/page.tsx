import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getProducts } from "@/lib/api/products";
import { groupProductsByBrand, normalizeBrandParam } from "@/lib/brands";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ brand?: string }>;
}) {
  const { locale } = await params;
  const { brand: brandParam } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("collections");

  const allProducts = await getProducts({ locale, limit: 100 });

  let brandGroups = groupProductsByBrand(allProducts.items);

  if (brandParam) {
    const brand = normalizeBrandParam(brandParam);
    brandGroups = brandGroups.filter((group) => group.brand === brand);
  }

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-12 md:py-16">
        <div className="container-page">
          <ScrollReveal>
            <h1 className="font-display text-display-lg font-bold">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-text-secondary">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <BrandShowcases
        title={brandParam ? undefined : t("brandsTitle")}
        groups={brandGroups}
        brandLabel={t("brandLabel")}
        viewAllLabel={(brand) => t("viewAllBrand", { brand })}
        expanded={Boolean(brandParam)}
      />
    </>
  );
}
