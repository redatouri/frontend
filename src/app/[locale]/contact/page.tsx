import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/marketing/PageHero";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

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
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="border-b border-border">
        <div className="container-page pb-10 md:pb-14">
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src="/contact/store.png"
              alt={t("storeImageAlt")}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
          </div>
        </div>
      </section>
      <ContactForm />
    </>
  );
}
