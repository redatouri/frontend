import type { Locale } from "@/i18n/routing";

export function formatPrice(amount: number | string, locale: string): string {
  const value = Number(amount);
  const intlLocale =
    locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-MA" : "en-MA";

  return new Intl.NumberFormat(intlLocale, {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}

export function formatDate(date: string, locale: Locale): string {
  const intlLocale =
    locale === "ar" ? "ar-MA" : locale === "fr" ? "fr-MA" : "en-MA";

  return new Intl.DateTimeFormat(intlLocale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export function calcDiscount(
  price: number | string,
  compareAt?: number | string | null,
): number | null {
  const normalizedPrice = Number(price);
  const normalizedCompareAt =
    compareAt != null ? Number(compareAt) : null;

  if (
    !Number.isFinite(normalizedPrice) ||
    normalizedCompareAt == null ||
    !Number.isFinite(normalizedCompareAt) ||
    normalizedCompareAt <= normalizedPrice
  ) {
    return null;
  }

  return Math.round(
    ((normalizedCompareAt - normalizedPrice) / normalizedCompareAt) * 100,
  );
}
