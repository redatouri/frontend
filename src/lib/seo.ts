import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

/** Primary brand — Google should treat MovieCam, Movie Cam, and moviecam.ma as one entity. */
export const BRAND = {
  name: "MovieCam",
  alternateNames: ["Movie Cam", "Moviecam", "moviecam.ma"] as const,
  domain: "moviecam.ma",
  instagram: "https://www.instagram.com/movie_camshop",
  facebook: "https://www.facebook.com/p/Movie-Cam-100076348809811",
} as const;

const META_DESCRIPTION_MAX = 160;

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://moviecam.ma";
}

export function getDefaultOgImage(): string {
  return `${getSiteUrl()}/opengraph-image`;
}

export function truncateMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  return `${normalized.slice(0, max - 1).trimEnd()}…`;
}

export function getOgLocale(locale: string): string {
  if (locale === "ar") return "ar_MA";
  if (locale === "en") return "en_US";
  return "fr_MA";
}

export function localeAlternates(
  path = "",
  locale: string = routing.defaultLocale,
): NonNullable<Metadata["alternates"]> {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";

  const languages: Record<string, string> = {
    "x-default": `${siteUrl}/fr${normalizedPath}`,
  };

  for (const loc of routing.locales) {
    languages[loc] = `${siteUrl}/${loc}${normalizedPath}`;
  }

  return {
    canonical: `${siteUrl}/${locale}${normalizedPath}`,
    languages,
  };
}

export function defaultOpenGraph(
  title: string,
  description: string,
  locale: string,
  path = "",
): NonNullable<Metadata["openGraph"]> {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";

  return {
    title,
    description,
    url: `${siteUrl}/${locale}${normalizedPath}`,
    siteName: BRAND.name,
    locale: getOgLocale(locale),
    type: "website",
  };
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  locale: string;
  path?: string;
  noIndex?: boolean;
  ogImage?: string | null;
  ogType?: "website" | "article";
  keywords?: string[];
  /** Use for home page to avoid the `%s | MovieCam` template. */
  absoluteTitle?: boolean;
}

export function buildPageMetadata({
  title,
  description,
  locale,
  path = "",
  noIndex = false,
  ogImage,
  ogType = "website",
  keywords,
  absoluteTitle = false,
}: PageMetadataOptions): Metadata {
  const trimmedDescription = truncateMetaDescription(description);
  const image = ogImage ?? getDefaultOgImage();
  const openGraph = defaultOpenGraph(title, trimmedDescription, locale, path);

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: trimmedDescription,
    keywords,
    applicationName: BRAND.name,
    alternates: localeAlternates(path, locale),
    robots: noIndex
      ? { index: false, follow: false, googleBot: { index: false, follow: false } }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-image-preview": "large" },
        },
    openGraph: {
      ...openGraph,
      type: ogType,
      images: [{ url: image, width: 1200, height: 630, alt: `${BRAND.name} — Camera Store Morocco` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: trimmedDescription,
      images: [image],
    },
  };
}

export function absolutePageTitle(title: string): Metadata["title"] {
  return { absolute: title };
}

export function getGoogleSiteVerification(): string | undefined {
  return process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined;
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
