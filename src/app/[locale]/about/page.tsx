import { AlternatingSection } from "@/components/marketing/AlternatingSection";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: `${t("title")} | Moviecam`, description: t("subtitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  return (
    <>
      <section className="border-b border-border bg-bg-elevated py-16 md:py-24">
        <div className="container-page">
          <ScrollReveal>
            <h1 className="font-display text-display-lg font-bold">{t("title")}</h1>
            <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">{t("subtitle")}</p>
          </ScrollReveal>
        </div>
      </section>

      <AlternatingSection
        title={t("storyTitle")}
        description={t("storyBody")}
        imagePosition="left"
        category="camera"
      />

      <section className="section-padding">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="text-center font-display text-display-lg font-semibold">
              {t("valuesTitle")}
            </h2>
          </ScrollReveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { title: t("valueOriginal"), desc: t("valueOriginalDesc") },
              { title: t("valueExpertise"), desc: t("valueExpertiseDesc") },
              { title: t("valueService"), desc: t("valueServiceDesc") },
            ].map(({ title, desc }) => (
              <ScrollReveal key={title}>
                <div className="rounded-2xl border border-border bg-bg-elevated p-8">
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-text-secondary">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal className="container-page pb-20">
        <div className="grid grid-cols-3 gap-6 text-center">
          {[
            { value: "500+", label: t("statsClients") },
            { value: "20+", label: t("statsBrands") },
            { value: "15+", label: t("statsDelivery") },
          ].map(({ value, label }) => (
            <div key={label} className="rounded-xl border border-border bg-bg-elevated p-6">
              <p className="font-display text-3xl font-bold text-accent">{value}</p>
              <p className="mt-2 text-sm text-text-secondary">{label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </>
  );
}
