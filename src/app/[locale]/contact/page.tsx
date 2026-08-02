import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/marketing/PageHero";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return buildPageMetadata({
    title: t("contactTitle"),
    description: t("contactDescription"),
    locale,
    path: "/contact",
  });
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
      <BreadcrumbJsonLd
        locale={locale}
        items={[
          { name: "MovieCam", path: "" },
          { name: t("title"), path: "/contact" },
        ]}
      />
      <PageHero title={t("title")} subtitle={t("subtitle")} />
      <section className="border-b border-border">
        <div className="container-page pb-10 md:pb-14">
          <div className="relative mx-auto aspect-[16/9] w-full max-w-3xl overflow-hidden md:max-w-4xl">
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
