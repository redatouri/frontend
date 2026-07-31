import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { BestSellersSection } from "@/components/marketing/BestSellersSection";
import { FeaturedBrandsStrip } from "@/components/marketing/FeaturedBrandsStrip";
import {
  ServicesSection,
  TestimonialsSection,
} from "@/components/marketing/HomeSections";
import { InstagramSection } from "@/components/marketing/InstagramSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { groupProductsByBrand } from "@/lib/brands";
import { getProducts } from "@/lib/api/products";
import { HOME_IMAGES } from "@/lib/home-images";
import { Camera, Headphones, Truck } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moviecam.ma";

  return {
    title: t("siteName"),
    description: t("homeDescription"),
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        fr: `${siteUrl}/fr`,
        ar: `${siteUrl}/ar`,
        en: `${siteUrl}/en`,
        "x-default": `${siteUrl}/fr`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");

  const allProducts = await getProducts({ locale, limit: 100 });

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
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("heroCtaPrimary")}
        ctaSecondary={t("heroCtaSecondary")}
        mobileSlides={HOME_IMAGES.hero.mobileSlides}
        mobileImageHasCopy
      />

      <BestSellersSection
        title={t("bestSellers")}
        subtitle={t("bestSellersSubtitle")}
        products={bestSellers}
        viewAllLabel={t("bestSellersCta")}
      />

      <FeaturedBrandsStrip
        title={t("featuredBrandsTitle")}
        subtitle={t("featuredBrandsSubtitle")}
      />

      <BrandShowcases
        title={t("brandsTitle")}
        subtitle={t("brandsSubtitle")}
        groups={brandGroups.slice(0, 3)}
        brandLabel={t("brandLabel")}
        viewAllLabel={(brand) => t("viewAllBrand", { brand })}
      />

      <ServicesSection
        title={t("servicesTitle")}
        subtitle={t("servicesSubtitle")}
        items={services}
      />

      <TestimonialsSection title={t("testimonials")} items={testimonials} />

      <InstagramSection
        title={t("instagramTitle")}
        subtitle={t("instagramSubtitle")}
        cta={t("instagramCta")}
      />
    </>
  );
}
