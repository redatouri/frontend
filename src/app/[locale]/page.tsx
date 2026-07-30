import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { BestSellersSection } from "@/components/marketing/BestSellersSection";
import { FeaturedBrandsStrip } from "@/components/marketing/FeaturedBrandsStrip";
import {
  ArticlesSection,
  NewsletterSection,
  RentalCtaSection,
  ServicesSection,
  TestimonialsSection,
} from "@/components/marketing/HomeSections";
import { InstagramSection } from "@/components/marketing/InstagramSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ShowcaseBanner } from "@/components/marketing/ShowcaseBanner";
import { groupProductsByBrand } from "@/lib/brands";
import { getProducts } from "@/lib/api/products";
import { HOME_IMAGES } from "@/lib/home-images";
import { STORE } from "@/lib/store";
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

  const articles = [
    {
      tag: t("article1Tag"),
      title: t("article1Title"),
      excerpt: t("article1Excerpt"),
    },
    {
      tag: t("article2Tag"),
      title: t("article2Title"),
      excerpt: t("article2Excerpt"),
    },
    {
      tag: t("article3Tag"),
      title: t("article3Title"),
      excerpt: t("article3Excerpt"),
    },
  ];

  const testimonials = [
    { quote: t("testimonial1Quote"), author: t("testimonial1Author") },
    { quote: t("testimonial2Quote"), author: t("testimonial2Author") },
    { quote: t("testimonial3Quote"), author: t("testimonial3Author") },
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

      <ShowcaseBanner
        title={t("showcaseCameraTitle")}
        subtitle={t("showcaseCameraSubtitle")}
        cta={t("showcaseCameraCta")}
        href="/collections/stabilization"
        imageSrc="/home/hero-gimbal.webp"
        imageAlt={t("showcaseCameraTitle")}
        theme="dark"
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

      <RentalCtaSection
        rentalTitle={t("rentalTitle")}
        rentalSubtitle={t("rentalSubtitle")}
        rentalCta={t("rentalCta")}
        salesTitle={t("salesTitle")}
        salesSubtitle={t("salesSubtitle")}
        salesCta={t("salesCta")}
      />

      <TestimonialsSection title={t("testimonials")} items={testimonials} />

      <ArticlesSection
        title={t("articlesTitle")}
        subtitle={t("articlesSubtitle")}
        articles={articles}
        readMoreLabel={t("articlesReadMore")}
      />

      <NewsletterSection
        title={t("newsletterTitle")}
        subtitle={t("newsletterSubtitle")}
        cta={t("newsletterCta")}
        phone={STORE.phone}
      />

      <InstagramSection
        title={t("instagramTitle")}
        subtitle={t("instagramSubtitle")}
        cta={t("instagramCta")}
      />
    </>
  );
}
