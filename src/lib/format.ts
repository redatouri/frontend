import type { Locale } from "@/i18n/routing";

export function formatPrice(amount: number, locale: string): string {
  const intlLocale =
    locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-MA" : "en-MA";

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string, locale: Locale): string {
  const intlLocale =
    locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-MA" : "en-MA";

  return new Intl.DateTimeFormat(intlLocale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function calcDiscount(price: number, compareAt?: number | null): number | null {
  if (!compareAt || compareAt <= price) return null;
  return Math.round(((compareAt - price) / compareAt) * 100);
}
