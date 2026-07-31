import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { getProduct } from "@/lib/api/products";
import { defaultOpenGraph, getSiteUrl, localeAlternates } from "@/lib/seo";
import { getMediaUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug, locale);
  if (!product) return { title: "Product | Moviecam" };

  const title = product.headline ?? product.name;
  const description = product.subheadline ?? product.headline ?? title;
  const imageUrl = getMediaUrl(product.primary_image ?? product.images[0]?.url, product.slug);
  const siteUrl = getSiteUrl();
  const path = `/products/${slug}`;

  return {
    title,
    description,
    alternates: localeAlternates(path, locale),
    openGraph: {
      ...defaultOpenGraph(title, description, locale, path),
      type: "website",
      images: imageUrl
        ? [{ url: imageUrl.startsWith("http") ? imageUrl : `${siteUrl}${imageUrl}` }]
        : undefined,
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
