"use client";

import { Link } from "@/i18n/navigation";
import { Sheet } from "@/components/ui/Sheet";
import type { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { Menu, Phone } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { STORE } from "@/lib/store";

interface MobileMenuProps {
  categories: Category[];
}

export function MobileMenu({ categories }: MobileMenuProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center rounded-lg text-text-primary hover:bg-bg-subtle lg:hidden"
        aria-label={t("menu")}
        aria-expanded={open}
      >
        <Menu className="size-6" />
      </button>

      <Sheet open={open} onClose={close} side="start">
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <Logo height={38} />
          <button
            type="button"
            onClick={close}
            className="text-sm font-medium text-text-secondary hover:text-text-primary"
          >
            {t("closeMenu")}
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-4">
          <nav className="flex flex-col gap-1">
            {[
              { href: "/", label: t("home") },
              { href: "/collections", label: t("collections") },
              { href: "/about", label: t("about") },
              { href: "/contact", label: t("contact") },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="rounded-lg px-4 py-3.5 text-base font-medium text-text-primary hover:bg-bg-subtle"
              >
                {label}
              </Link>
            ))}
          </nav>

          {categories.length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <p className="px-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
                {t("collections")}
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {categories.slice(0, 8).map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/collections/${cat.slug}`}
                    onClick={close}
                    className="rounded-lg px-4 py-2.5 text-sm text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-auto border-t border-border pt-6">
            <Link
              href="/contact"
              onClick={close}
              className="flex items-center gap-3 rounded-xl bg-accent px-4 py-4 text-on-accent transition-colors hover:bg-accent-hover"
            >
              <Phone className="size-5 shrink-0" />
              <div>
                <p className="text-sm font-semibold">{t("contact")}</p>
                <p className="text-sm opacity-90">{STORE.phone}</p>
              </div>
            </Link>
          </div>
        </div>
      </Sheet>
    </>
  );
}
