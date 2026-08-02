import { ThankYouClient } from "@/components/checkout/ThankYouClient";
import { getOrderByNumber } from "@/lib/api/orders";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    title: t("thankYouTitle"),
    description: t("thankYouDescription"),
    locale,
    path: "/thank-you",
    noIndex: true,
  });
}

export default async function ThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { locale } = await params;
  const { order: orderNumber } = await searchParams;
  setRequestLocale(locale);

  const order = orderNumber ? await getOrderByNumber(orderNumber) : null;

  return <ThankYouClient order={order} />;
}
