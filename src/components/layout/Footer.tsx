import { Link } from "@/i18n/navigation";
import { Separator } from "@/components/ui/Separator";
import type { Category } from "@/types/category";
import { getTranslations } from "next-intl/server";
import { Banknote, Phone, ShieldCheck, Truck } from "lucide-react";
import { Logo } from "./Logo";
import { STORE } from "@/lib/store";

interface FooterProps {
  categories: Category[];
}

export async function Footer({ categories }: FooterProps) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="container-page py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Logo height={64} />
            <p className="mt-4 max-w-xs text-sm text-text-secondary">{t("tagline")}</p>
            <a
              href={`tel:${STORE.phoneTel}`}
              className="mt-4 inline-flex items-center gap-2 text-sm text-accent hover:underline"
            >
              <Phone className="size-4" />
              {STORE.phone}
            </a>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-muted">
              {t("shop")}
            </h3>
            <ul className="mt-4 space-y-2">
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

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-text-muted">
              {t("support")}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-text-secondary hover:text-accent">
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href={`tel:${STORE.phoneTel}`}
                  className="text-sm text-text-secondary hover:text-accent"
                >
                  {STORE.phone}
                </a>
              </li>
              <li>
                <span className="text-sm text-text-secondary">{t("shipping")}</span>
              </li>
              <li>
                <span className="text-sm text-text-secondary">{t("returns")}</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-muted px-4 py-2 text-sm text-accent">
            <Banknote className="size-4" />
            {t("codBadge")}
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-text-secondary">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" />
              {t("trustOriginal")}
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-accent" />
              {t("trustWarranty")}
            </span>
            <span className="flex items-center gap-2">
              <Truck className="size-4 text-accent" />
              {t("trustDelivery")}
            </span>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted md:text-start">
          © {year} Moviecam · moviecam.ma · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
