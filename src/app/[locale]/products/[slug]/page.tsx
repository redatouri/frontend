import { ProductJsonLd } from "@/components/product/ProductJsonLd";
import { ProductPageClient } from "@/components/product/ProductPageClient";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { FaqJsonLd } from "@/components/seo/FaqJsonLd";
import { getProductBrand } from "@/lib/brands";
import { getProduct } from "@/lib/api/products";
import { BRAND, buildPageMetadata, getSiteUrl, stripHtml } from "@/lib/seo";
import { getMediaUrl } from "@/lib/utils";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await getProduct(slug, locale);
  if (!product) {
    return buildPageMetadata({
      title: "Product Not Found",
      description: `Product not found on ${BRAND.name} (moviecam.ma).`,
      locale,
      path: `/products/${slug}`,
      noIndex: true,
    });
  }

  const brand = getProductBrand(product);
  const title = product.headline ?? product.name;
  const plainDescription = product.description ? stripHtml(product.description) : "";
  const description =
    (product.subheadline ??
      product.headline ??
      plainDescription) ||
    `${product.name} — ${brand} at ${BRAND.name}, Morocco camera store. Nationwide delivery, cash on delivery.`;
  const imagePath = getMediaUrl(product.primary_image ?? product.images[0]?.url, product.slug);
  const siteUrl = getSiteUrl();
  const path = `/products/${slug}`;
  const ogImage = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${siteUrl}${imagePath}`
    : undefined;

  return buildPageMetadata({
    title: `${title} — ${brand} Maroc`,
    description,
    locale,
    path,
    ogImage,
    keywords: [
      BRAND.name,
      "Movie Cam",
      "moviecam.ma",
      product.name,
      brand,
      `${brand} Morocco`,
      `${brand} Maroc`,
      "camera store Morocco",
      `${product.name} Morocco`,
    ],
  });
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

  const tCollections = await getTranslations("collections");
  const tProduct = await getTranslations("product");

  const faqItems = [
    { question: tProduct("faq1Q"), answer: tProduct("faq1A") },
    { question: tProduct("faq2Q"), answer: tProduct("faq2A") },
    { question: tProduct("faq3Q"), answer: tProduct("faq3A") },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "MovieCam", path: "" },
          { name: tCollections("title"), path: "/collections" },
          ...(product.category
            ? [{ name: product.category.name, path: `/collections/${product.category.slug}` }]
            : []),
          { name: product.name, path: `/products/${slug}` },
        ]}
      />
      <ProductJsonLd product={product} locale={locale} />
      <FaqJsonLd items={faqItems} />
      <ProductPageClient product={product} />
    </>
  );
}
