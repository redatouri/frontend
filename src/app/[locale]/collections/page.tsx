import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { PageHero } from "@/components/marketing/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getProducts } from "@/lib/api/products";
import { groupProductsByBrand, normalizeBrandParam } from "@/lib/brands";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    title: t("collectionsTitle"),
    description: t("collectionsDescription"),
    locale,
    path: "/collections",
  });
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
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "MovieCam", path: "" },
          { name: t("title"), path: "/collections" },
        ]}
      />
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="MovieCam" />

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
