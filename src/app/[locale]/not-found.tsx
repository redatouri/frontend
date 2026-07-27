import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export default async function NotFoundPage() {
  const t = await getTranslations("notFound");

  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="font-display text-8xl font-bold text-accent/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">{t("title")}</h1>
      <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      <Link
        href="/"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-on-accent hover:bg-accent-hover"
      >
        {t("cta")}
      </Link>
    </section>
  );
}
