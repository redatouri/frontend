import { ContactForm } from "@/components/contact/ContactForm";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: `${t("title")} | Moviecam`, description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-16">
        <div className="container-page">
          <h1 className="font-display text-display-lg font-bold">{t("title")}</h1>
          <p className="mt-4 max-w-2xl text-text-secondary">{t("subtitle")}</p>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
