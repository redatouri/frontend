import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { PageHero } from "@/components/marketing/PageHero";
import { getProducts } from "@/lib/api/products";
import { groupProductsByBrand, normalizeBrandParam } from "@/lib/brands";
import { defaultOpenGraph, localeAlternates } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "collections" });
  const title = t("title");
  const description = t("subtitle");

  return {
    title,
    description,
    alternates: localeAlternates("/collections", locale),
    openGraph: defaultOpenGraph(title, description, locale, "/collections"),
  };
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
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Moviecam" />

      <BrandShowcases
        title={brandParam ? undefined : t("brandsTitle")}
        subtitle={brandParam ? undefined : t("brandsSubtitle")}
        groups={brandGroups}
        brandLabel={t("brandLabel")}
        viewAllLabel={(brand) => t("viewAllBrand", { brand })}
        expanded={Boolean(brandParam)}
      />
    </>
  );
}
