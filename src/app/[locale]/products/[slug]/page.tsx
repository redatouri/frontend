import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { getProduct } from "@/lib/api/products";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug, locale);
  if (!product) return { title: "Product | Moviecam" };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moviecam.ma";
  return {
    title: `${product.headline ?? product.name} | Moviecam`,
    description: product.subheadline ?? product.headline,
    alternates: {
      canonical: `${siteUrl}/${locale}/products/${slug}`,
      languages: {
        fr: `${siteUrl}/fr/products/${slug}`,
        ar: `${siteUrl}/ar/products/${slug}`,
        en: `${siteUrl}/en/products/${slug}`,
      },
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProduct(slug, locale);
  if (!product) notFound();

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />
      <ProductPageClient product={product} />
    </>
  );
}
