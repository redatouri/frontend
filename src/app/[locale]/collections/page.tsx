import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { CategoryCarousel } from "@/components/marketing/CategoryCarousel";
import { PageHero } from "@/components/marketing/PageHero";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import {
  buildCategoryCarouselItems,
  CATEGORY_CAROUSEL_ITEMS,
} from "@/lib/category-carousel";
import { groupProductsByBrand, normalizeBrandParam } from "@/lib/brands";
import { getMediaUrl } from "@/lib/utils";
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
  const tHome = await getTranslations("home");

  const [allProducts, categories] = await Promise.all([
    getProducts({ locale, limit: 100 }),
    getCategories({ locale, top: true }),
  ]);

  const overlays = Object.fromEntries(
    CATEGORY_CAROUSEL_ITEMS.map((item) => [
      item.overlayKey,
      tHome(`categoryCarousel.${item.overlayKey}.overlay`),
    ]),
  );
  const labels = Object.fromEntries(
    CATEGORY_CAROUSEL_ITEMS.map((item) => [
      item.labelKey,
      tHome(`categoryCarousel.${item.labelKey}.label`),
    ]),
  );
  const categoryItems = buildCategoryCarouselItems(
    categories,
    overlays,
    labels,
    (path) => getMediaUrl(path) ?? path,
  );

  let brandGroups = groupProductsByBrand(allProducts.items);
  if (brandParam) {
    const brand = normalizeBrandParam(brandParam);
    brandGroups = brandGroups.filter((group) => group.brand === brand);
  }

  return (
    <>
      <PageHero title={t("title")} subtitle={t("subtitle")} eyebrow="Moviecam" />

      {!brandParam && (
        <CategoryCarousel
          title={tHome("featuredCategories")}
          subtitle={tHome("flagshipSubtitle")}
          items={categoryItems}
          className="!pt-12 !pb-16"
        />
      )}

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
