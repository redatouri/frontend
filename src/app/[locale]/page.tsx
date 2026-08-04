import { HeroSection } from "@/components/marketing/HeroSection";
import { HomeBelowFold } from "@/components/marketing/HomeBelowFold";
import { OrganizationJsonLd } from "@/components/seo/OrganizationJsonLd";
import { StoreJsonLd } from "@/components/seo/StoreJsonLd";
import { WebSiteJsonLd } from "@/components/seo/WebSiteJsonLd";
import { groupProductsByBrand } from "@/lib/brands";
import { getProducts } from "@/lib/api/products";
import { HOME_IMAGES } from "@/lib/home-images";
import { buildPageMetadata } from "@/lib/seo";
import { Camera, Headphones, Truck } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    title: t("homeTitle"),
    description: t("homeDescription"),
    locale,
    path: "",
    absoluteTitle: true,
    keywords: t("homeKeywords").split(", "),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tMeta = await getTranslations("metadata");

  const allProducts = await getProducts({ locale, limit: 60 });

  const brandGroups = groupProductsByBrand(allProducts.items);

  const bestSellers = [...allProducts.items]
    .sort((a, b) => b.review_count - a.review_count)
    .slice(0, 4);

  const services = [
    {
      icon: Camera,
      title: t("servicesExpertTitle"),
      description: t("servicesExpertDesc"),
    },
    {
      icon: Truck,
      title: t("servicesDeliveryTitle"),
      description: t("servicesDeliveryDesc"),
    },
    {
      icon: Headphones,
      title: t("servicesSupportTitle"),
      description: t("servicesSupportDesc"),
    },
  ];

  const testimonials = [
    {
      quote: t("testimonial1Quote"),
      author: t("testimonial1Author"),
      imageUrl: "/home/testimonials/reda.png",
      imageAlt: t("testimonial1Author"),
    },
    {
      quote: t("testimonial2Quote"),
      author: t("testimonial2Author"),
      imageUrl: "/home/testimonials/salma.png",
      imageAlt: t("testimonial2Author"),
    },
    {
      quote: t("testimonial3Quote"),
      author: t("testimonial3Author"),
      imageUrl: "/home/testimonials/bader-din.png",
      imageAlt: t("testimonial3Author"),
    },
  ];

  return (
    <>
      <OrganizationJsonLd locale={locale} description={tMeta("organizationDescription")} />
      <WebSiteJsonLd />
      <StoreJsonLd description={tMeta("storeDescription")} />
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("heroCtaPrimary")}
        ctaSecondary={t("heroCtaSecondary")}
        desktopTagline={t("heroDesktopTagline")}
        mobileSlides={HOME_IMAGES.hero.mobileSlides}
        desktopVideos={HOME_IMAGES.hero.desktopVideos}
        desktopPoster={HOME_IMAGES.hero.desktopPoster}
        mobileImageHasCopy
      />

      <Suspense fallback={null}>
        <HomeBelowFold
          bestSellers={bestSellers}
          brandGroups={brandGroups.slice(0, 3)}
          services={services}
          testimonials={testimonials}
          labels={{
            bestSellers: t("bestSellers"),
            bestSellersSubtitle: t("bestSellersSubtitle"),
            bestSellersCta: t("bestSellersCta"),
            featuredBrandsTitle: t("featuredBrandsTitle"),
            featuredBrandsSubtitle: t("featuredBrandsSubtitle"),
            brandsTitle: t("brandsTitle"),
            brandsSubtitle: t("brandsSubtitle"),
            brandLabel: t("brandLabel"),
            viewAllBrand: (brand) => t("viewAllBrand", { brand }),
            servicesTitle: t("servicesTitle"),
            servicesSubtitle: t("servicesSubtitle"),
            testimonials: t("testimonials"),
            instagramTitle: t("instagramTitle"),
            instagramSubtitle: t("instagramSubtitle"),
            instagramCta: t("instagramCta"),
          }}
        />
      </Suspense>
    </>
  );
}
