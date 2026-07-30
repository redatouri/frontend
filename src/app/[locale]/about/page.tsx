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
  return { title: `${t("storyTitle")} | Moviecam`, description: t("storyBody") };
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
      <AlternatingSection
        title={t("storyTitle")}
        description={t("storyBody")}
        imageUrl="/about/store.webp"
        imageAlt="Magasin Movie Cam à Agadir"
        imagePosition="left"
        imageAspect="aspect-[3/4] max-h-[560px] w-full max-w-md mx-auto lg:mx-0"
      />

      <section className="section-padding border-t border-border">
        <div className="container-page">
          <ScrollReveal>
            <h2 className="text-center font-display text-display-lg font-semibold">
              {t("valuesTitle")}
            </h2>
          </ScrollReveal>
          <div className="mt-14 grid gap-px bg-border md:grid-cols-3">
            {[
              { title: t("valueOriginal"), desc: t("valueOriginalDesc") },
              { title: t("valueExpertise"), desc: t("valueExpertiseDesc") },
              { title: t("valueService"), desc: t("valueServiceDesc") },
            ].map(({ title, desc }) => (
              <ScrollReveal key={title}>
                <div className="h-full bg-bg-primary p-10">
                  <h3 className="font-display text-xl font-semibold">{title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal className="container-page pb-24">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-3">
          {[
            { value: "500+", label: t("statsClients") },
            { value: "20+", label: t("statsBrands") },
            { value: "15+", label: t("statsDelivery") },
          ].map(({ value, label }) => (
            <div key={label} className="bg-bg-elevated px-8 py-12 text-center">
              <p className="font-display text-4xl font-semibold text-accent">{value}</p>
              <p className="mt-3 text-sm uppercase tracking-[0.12em] text-text-muted">{label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </>
  );
}
