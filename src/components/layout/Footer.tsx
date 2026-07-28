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
            <a
              href={STORE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm text-text-secondary hover:text-accent"
            >
              Instagram · {STORE.instagramHandle}
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

        <div className="overflow-hidden rounded-2xl bg-text-primary shadow-lg ring-1 ring-black/10">
          <div className="flex flex-col gap-5 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8 md:py-6">
            <div className="inline-flex w-fit items-center gap-3 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(227,24,55,0.35)]">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
                <Banknote className="size-4" aria-hidden />
              </span>
              {t("codBadge")}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-6">
              {[
                { icon: ShieldCheck, label: t("trustOriginal") },
                { icon: ShieldCheck, label: t("trustWarranty") },
                { icon: Truck, label: t("trustDelivery") },
              ].map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-3 text-sm font-medium text-white/90"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/40">
                    <Icon className="size-4 text-accent" aria-hidden />
                  </span>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-text-muted md:text-start">
          © {year} Moviecam · moviecam.ma · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
