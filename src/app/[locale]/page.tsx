import { CategoryCarousel } from "@/components/marketing/CategoryCarousel";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ShowcaseBanner } from "@/components/marketing/ShowcaseBanner";
import { ProductCard } from "@/components/product/ProductCard";
import { Link } from "@/i18n/navigation";
import { getCategories } from "@/lib/api/categories";
import { buildCategoryCarouselItems } from "@/lib/category-carousel";
import { getProducts } from "@/lib/api/products";
import { HOME_IMAGES, HOME_SHOWCASES } from "@/lib/home-images";
import { getMediaUrl } from "@/lib/utils";
import {
  Banknote,
  Headphones,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

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

  const [categories, featured, bestSellers] = await Promise.all([
    getCategories({ locale }),
    getProducts({ locale, featured: true, limit: 6 }),
    getProducts({ locale, sort: "popular", limit: 8 }),
  ]);

  const trustItems = [
    { icon: ShieldCheck, label: t("trustBar.original") },
    { icon: Truck, label: t("trustBar.delivery") },
    { icon: Banknote, label: t("trustBar.cod") },
    { icon: Headphones, label: t("trustBar.support") },
  ];

  const products =
    bestSellers.items.length > 0 ? bestSellers.items : featured.items;

  const carouselItems = buildCategoryCarouselItems(
    categories,
    {
      lighting: t("categoryCarousel.lighting.overlay"),
      memoryStorage: t("categoryCarousel.memoryStorage.overlay"),
      batteriesPower: t("categoryCarousel.batteriesPower.overlay"),
      bagsCases: t("categoryCarousel.bagsCases.overlay"),
      filters: t("categoryCarousel.filters.overlay"),
      accessories: t("categoryCarousel.accessories.overlay"),
      cameras: t("categoryCarousel.cameras.overlay"),
      lenses: t("categoryCarousel.lenses.overlay"),
      audio: t("categoryCarousel.audio.overlay"),
      stabilization: t("categoryCarousel.stabilization.overlay"),
      studioPacks: t("categoryCarousel.studioPacks.overlay"),
    },
    {
      lighting: t("categoryCarousel.lighting.label"),
      memoryStorage: t("categoryCarousel.memoryStorage.label"),
      batteriesPower: t("categoryCarousel.batteriesPower.label"),
      bagsCases: t("categoryCarousel.bagsCases.label"),
      filters: t("categoryCarousel.filters.label"),
      accessories: t("categoryCarousel.accessories.label"),
      cameras: t("categoryCarousel.cameras.label"),
      lenses: t("categoryCarousel.lenses.label"),
      audio: t("categoryCarousel.audio.label"),
      stabilization: t("categoryCarousel.stabilization.label"),
      studioPacks: t("categoryCarousel.studioPacks.label"),
    },
    (path) => getMediaUrl(path) ?? path,
  );

  return (
    <>
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("heroCtaPrimary")}
        ctaSecondary={t("heroCtaSecondary")}
        imageSrc={HOME_IMAGES.hero.src}
        imageAlt={HOME_IMAGES.hero.alt}
      />

      <ScrollReveal className="border-y border-border bg-white py-5">
        <div className="container-page grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg px-2 py-1">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-muted">
                <Icon className="size-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <CategoryCarousel title={t("allCategories")} items={carouselItems} />

      {HOME_SHOWCASES.map((showcase) => (
        <ShowcaseBanner
          key={showcase.id}
          title={t(showcase.titleKey)}
          subtitle={t(showcase.subtitleKey)}
          cta={t(showcase.ctaKey)}
          href={showcase.href}
          imageSrc={showcase.image.src}
          imageAlt={showcase.image.alt}
          align={showcase.align}
          theme={showcase.theme}
        />
      ))}

      <section className="section-padding bg-bg-elevated">
        <div className="container-page">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-display-lg font-semibold">
                {t("bestSellers")}
              </h2>
              <Link href="/collections" className="text-sm text-accent hover:underline">
                Voir tout
              </Link>
            </div>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, i) => (
              <ScrollReveal key={product.id} delay={i * 0.08}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="text-center font-display text-display-lg font-semibold">
              {t("whyTitle")}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { title: t("whyOriginal"), desc: t("whyOriginalDesc"), icon: ShieldCheck },
              { title: t("whyExpert"), desc: t("whyExpertDesc"), icon: Users },
              { title: t("whyCod"), desc: t("whyCodDesc"), icon: Banknote },
            ].map(({ title, desc, icon: Icon }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div className="rounded-2xl border border-border bg-bg-elevated p-8 text-center">
                  <Icon className="mx-auto size-10 text-accent" />
                  <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-text-secondary">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal className="border-y border-border bg-bg-elevated section-padding">
        <div className="container-page text-center">
          <h2 className="font-display text-display-lg font-semibold">{t("testimonials")}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              "« Matériel original, livraison rapide à Casablanca. » — Youssef K.",
              "« Conseils pro pour mon setup YouTube. » — Sara M.",
              "« Paiement à la livraison, zéro stress. » — Karim B.",
            ].map((quote) => (
              <blockquote
                key={quote}
                className="rounded-xl border border-border bg-bg-primary p-6 text-sm text-text-secondary italic"
              >
                {quote}
              </blockquote>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="container-page section-padding text-center">
        <p className="font-display text-2xl font-semibold text-balance md:text-3xl">
          {t("brandStatement")}
        </p>
      </ScrollReveal>

      <ScrollReveal className="container-page pb-20">
        <div className="rounded-2xl border border-border bg-bg-elevated p-8 text-center md:p-12">
          <h2 className="font-display text-xl font-semibold">{t("newsletterTitle")}</h2>
          <p className="mt-2 text-text-secondary">{t("newsletterSubtitle")}</p>
          <Link
            href="/contact"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg border border-accent px-6 text-sm font-semibold text-accent hover:bg-accent-muted"
          >
            0630960711
          </Link>
        </div>
      </ScrollReveal>
    </>
  );
}
