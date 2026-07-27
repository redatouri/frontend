import { CategoryCarousel } from "@/components/marketing/CategoryCarousel";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { getCategories } from "@/lib/api/categories";
import { buildCategoryCarouselItems } from "@/lib/category-carousel";
import { getMediaUrl } from "@/lib/utils";
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
  const tHome = await getTranslations("home");
  const categories = await getCategories({ locale });

  const carouselItems = buildCategoryCarouselItems(
    categories,
    {
      lighting: tHome("categoryCarousel.lighting.overlay"),
      memoryStorage: tHome("categoryCarousel.memoryStorage.overlay"),
      batteriesPower: tHome("categoryCarousel.batteriesPower.overlay"),
      bagsCases: tHome("categoryCarousel.bagsCases.overlay"),
      filters: tHome("categoryCarousel.filters.overlay"),
      accessories: tHome("categoryCarousel.accessories.overlay"),
      cameras: tHome("categoryCarousel.cameras.overlay"),
      lenses: tHome("categoryCarousel.lenses.overlay"),
      audio: tHome("categoryCarousel.audio.overlay"),
      stabilization: tHome("categoryCarousel.stabilization.overlay"),
      studioPacks: tHome("categoryCarousel.studioPacks.overlay"),
    },
    {
      lighting: tHome("categoryCarousel.lighting.label"),
      memoryStorage: tHome("categoryCarousel.memoryStorage.label"),
      batteriesPower: tHome("categoryCarousel.batteriesPower.label"),
      bagsCases: tHome("categoryCarousel.bagsCases.label"),
      filters: tHome("categoryCarousel.filters.label"),
      accessories: tHome("categoryCarousel.accessories.label"),
      cameras: tHome("categoryCarousel.cameras.label"),
      lenses: tHome("categoryCarousel.lenses.label"),
      audio: tHome("categoryCarousel.audio.label"),
      stabilization: tHome("categoryCarousel.stabilization.label"),
      studioPacks: tHome("categoryCarousel.studioPacks.label"),
    },
    (path) => getMediaUrl(path) ?? path,
  );

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

      <CategoryCarousel title={tHome("allCategories")} items={carouselItems} />
    </>
  );
}
