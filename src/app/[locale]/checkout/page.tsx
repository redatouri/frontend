import { CodCheckoutForm } from "@/components/checkout/CodCheckoutForm";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "checkout" });
  return { title: `${t("title")} | Moviecam` };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("checkout");

  return (
    <section className="container-page py-10 md:py-16">
      <h1 className="font-display text-display-lg font-bold">{t("title")}</h1>
      <div className="mt-10">
        <CodCheckoutForm />
      </div>
      <div className="h-20 lg:hidden" aria-hidden />
    </section>
  );
}
