import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { getSiteUrl } from "@/lib/seo";
import { getMediaUrl } from "@/lib/utils";

export const revalidate = 3600;

const STATIC_PATHS = ["", "/products", "/collections", "/about", "/contact"];

function absoluteImage(siteUrl: string, slug: string, imagePath?: string | null): string[] {
  if (!imagePath) return [`${siteUrl}/opengraph-image`];
  const mediaPath = getMediaUrl(imagePath, slug);
  if (!mediaPath) return [`${siteUrl}/opengraph-image`];
  return [mediaPath.startsWith("http") ? mediaPath : `${siteUrl}${mediaPath}`];
}

async function getAllProducts(locale: string) {
  const items = [];
  let page = 1;
  let total = Number.POSITIVE_INFINITY;

  while (items.length < total) {
    const batch = await getProducts({ locale, limit: 100, page });
    items.push(...batch.items);
    total = batch.total;
    if (batch.items.length === 0) break;
    page += 1;
  }

  return items;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? ("daily" as const) : ("weekly" as const),
      priority: path === "" ? 1 : 0.8,
      images: [`${siteUrl}/opengraph-image`],
    })),
  );

  const [products, categories] = await Promise.all([
    getAllProducts(routing.defaultLocale),
    getCategories({ locale: routing.defaultLocale }),
  ]);

  const productEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    products.map((product) => ({
      url: `${siteUrl}/${locale}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: absoluteImage(siteUrl, product.slug, product.primary_image),
    })),
  );

  const categoryEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${siteUrl}/${locale}/collections/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [`${siteUrl}/opengraph-image`],
    })),
  );

  return [...staticEntries, ...productEntries, ...categoryEntries];
}
