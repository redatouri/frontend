"use client";

import { Link } from "@/i18n/navigation";
import type { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  categories: Category[];
}

export function MobileMenu({ categories }: MobileMenuProps) {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-12 items-center justify-center rounded-full text-text-secondary hover:bg-bg-subtle hover:text-text-primary lg:hidden"
        aria-label={t("menu")}
      >
        <Menu className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-label={t("closeMenu")}
          />
          <nav className="absolute end-0 top-0 flex h-full w-full max-w-sm flex-col bg-bg-elevated shadow-2xl">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <span className="font-display text-lg font-semibold">Moviecam</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex size-10 items-center justify-center rounded-full hover:bg-bg-subtle"
                aria-label={t("closeMenu")}
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base hover:bg-bg-subtle"
              >
                {t("home")}
              </Link>
              <Link
                href="/collections"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base hover:bg-bg-subtle"
              >
                {t("collections")}
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-6 py-2 text-sm text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                >
                  {cat.name}
                </Link>
              ))}
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base hover:bg-bg-subtle"
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base hover:bg-bg-subtle"
              >
                {t("contact")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
