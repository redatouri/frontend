import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/Separator";
import type { Category } from "@/types/category";
import { getTranslations } from "next-intl/server";
import { Phone, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { FooterSocialLinks } from "./FooterSocialLinks";
import { STORE } from "@/lib/store";

interface FooterProps {
  categories: Category[];
}

export async function Footer({ categories }: FooterProps) {
  const t = await getTranslations("footer");

  return (
    <footer className="border-t border-border bg-bg-primary">
      <div className="container-page py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo height={56} />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-text-secondary">
              {t("tagline")}
            </p>
            <ul className="mt-6 space-y-3">
              {STORE.phones.map(({ display, tel }) => (
                <li key={tel}>
                  <a
                    href={`tel:${tel}`}
                    className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                  >
                    <Phone className="size-4 shrink-0" />
                    {display}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${STORE.email}`}
                  className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                >
                  <Mail className="size-4 shrink-0" />
                  {STORE.email}
                </a>
              </li>
            </ul>
            <FooterSocialLinks />
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <h3 className="editorial-eyebrow text-text-muted">{t("shop")}</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/collections" className="text-sm text-text-secondary hover:text-accent">
                  {t("shop")}
                </Link>
              </li>
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/collections/${cat.slug}`}
                    className="text-sm text-text-secondary hover:text-accent"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="editorial-eyebrow text-text-muted">{t("support")}</h3>
            <ul className="mt-6 space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${STORE.email}`}
                  className="text-sm text-text-secondary hover:text-accent"
                >
                  {STORE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-12 bg-border" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-text-muted">powerd by Reda LLc</p>
          <p className="text-xs text-text-muted">{t("codBadge")}</p>
        </div>
      </div>
    </footer>
  );
}
