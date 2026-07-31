import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getCategories } from "@/lib/api/categories";
import { getProducts } from "@/lib/api/products";
import { getSiteUrl } from "@/lib/seo";

export const revalidate = 3600;

const STATIC_PATHS = ["", "/products", "/collections", "/about", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_PATHS.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "daily" : "weekly",
      priority: path === "" ? 1 : 0.8,
    })),
  );

  const [products, categories] = await Promise.all([
    getProducts({ locale: routing.defaultLocale, limit: 100 }),
    getCategories({ locale: routing.defaultLocale }),
  ]);

  const productEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    products.items.map((product) => ({
      url: `${siteUrl}/${locale}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  );

  const categoryEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    categories.map((category) => ({
      url: `${siteUrl}/${locale}/collections/${category.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  );

  return [...staticEntries, ...productEntries, ...categoryEntries];
}
