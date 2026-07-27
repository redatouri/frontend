import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { AlternatingSection } from "@/components/marketing/AlternatingSection";
import { HeroSection } from "@/components/marketing/HeroSection";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Link } from "@/i18n/navigation";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  Banknote,
  Headphones,
  ShieldCheck,
  Sparkles,
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
    getCategories({ locale, top: true }),
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

  return (
    <>
      <HeroSection
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        ctaPrimary={t("heroCtaPrimary")}
        ctaSecondary={t("heroCtaSecondary")}
      />

      <ScrollReveal className="border-y border-border bg-bg-elevated py-8">
        <div className="container-page grid grid-cols-2 gap-6 md:grid-cols-4">
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon className="size-5 shrink-0 text-accent" />
              <span className="text-sm text-text-secondary">{label}</span>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <section className="section-padding">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="font-display text-display-lg font-semibold">
              {t("featuredCategories")}
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => (
              <ScrollReveal key={cat.slug} delay={i * 0.1}>
                <Link
                  href={`/collections/${cat.slug}`}
                  className="group block overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-transform hover:scale-[1.02]"
                >
                  <div className="relative aspect-[16/10] bg-bg-subtle">
                    <ProductPlaceholder category="camera" label={cat.name} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold group-hover:text-accent">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">
                      {cat.product_count} produits
                    </p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <AlternatingSection
        title={t("flagshipTitle")}
        description={t("flagshipSubtitle")}
        imagePosition="left"
        category="camera"
      />

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

      <ScrollReveal className="container-page section-padding">
        <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-bg-elevated to-bg-subtle p-10 md:p-16">
          <Sparkles className="absolute end-8 top-8 size-12 text-accent/30" />
          <h2 className="font-display text-display-lg font-semibold">{t("studioPacks")}</h2>
          <Link
            href="/collections"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-bg-primary hover:bg-accent-hover"
          >
            {t("studioPacksCta")}
          </Link>
        </div>
      </ScrollReveal>

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
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex h-12 items-center justify-center rounded-lg border border-accent px-6 text-sm font-semibold text-accent hover:bg-accent-muted"
          >
            WhatsApp
          </a>
        </div>
      </ScrollReveal>
    </>
  );
}
