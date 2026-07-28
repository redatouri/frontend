"use client";

import { Link } from "@/i18n/navigation";
import { CartButton } from "./CartButton";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/lib/stores/cart";
import type { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const t = useTranslations("nav");
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-white/95 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-3 md:h-[72px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex min-w-0 items-center gap-2">
          <MobileMenu categories={categories} />
          <Link
            href="/"
            className="transition-opacity hover:opacity-90"
            aria-label="Movie Cam home"
          >
            <Logo height={42} priority />
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          <Link
            href="/"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("home")}
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              {t("collections")}
              <ChevronDown
                className={cn("size-4 transition-transform", collectionsOpen && "rotate-180")}
              />
            </button>
            {collectionsOpen && (
              <div className="absolute start-1/2 top-full z-50 mt-2 min-w-[240px] -translate-x-1/2 rounded-xl border border-border bg-white py-2 shadow-xl">
                <Link
                  href="/collections"
                  onClick={() => setCollectionsOpen(false)}
                  className="block px-4 py-2 text-sm font-medium text-accent hover:bg-bg-subtle"
                >
                  {t("collections")}
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/collections/${cat.slug}`}
                    onClick={() => setCollectionsOpen(false)}
                    className="block px-4 py-2 text-sm text-text-secondary hover:bg-bg-subtle hover:text-text-primary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2 lg:justify-self-end">
          <LocaleSwitcher />
          <CartButton count={count} onClick={openCart} />
        </div>
      </div>
    </header>
  );
}
