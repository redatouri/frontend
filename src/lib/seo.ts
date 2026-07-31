import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://moviecam.ma";
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
): Metadata["openGraph"] {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : path ? `/${path}` : "";

  return {
    title,
    description,
    url: `${siteUrl}/${locale}${normalizedPath}`,
    siteName: "Moviecam",
    locale: locale === "ar" ? "ar_MA" : locale === "en" ? "en_US" : "fr_MA",
    type: "website",
  };
}
