"use client";

import { Link } from "@/i18n/navigation";
import { AccountMenu } from "./AccountMenu";
import { CartButton } from "./CartButton";
import { HeaderIconButton } from "./HeaderIconButton";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { useCartStore } from "@/lib/stores/cart";
import { useWishlistStore } from "@/lib/stores/wishlist";
import type { Category } from "@/types/category";
import { useTranslations } from "next-intl";
import { ChevronDown, Heart, Search } from "lucide-react";
import { usePathname } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

const SearchOverlay = dynamic(
  () => import("./SearchOverlay").then((m) => ({ default: m.SearchOverlay })),
  { ssr: false },
);

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const openCart = useCartStore((s) => s.openCart);
  const count = useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.quantity, 0),
  );
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const openWishlist = useWishlistStore((s) => s.openWishlist);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const atTop = isHome && !scrolled && !collectionsOpen;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
        atTop
          ? "border-b border-transparent bg-white/70 backdrop-blur-md"
          : "glass-panel border-b border-border shadow-[0_4px_24px_rgb(0_0_0_/_6%)]",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 md:h-[72px] lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        <div className="flex min-w-0 items-center gap-3 lg:justify-self-start">
          <Link
            href="/"
            className="transition-opacity hover:opacity-85"
            aria-label="Movie Cam home"
          >
            <Logo height={38} priority={!isHome} />
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-10 lg:flex">
          <Link
            href="/"
            className="text-[13px] font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("home")}
          </Link>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className={cn(
                "flex items-center gap-1.5 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors text-text-secondary hover:text-text-primary",
                collectionsOpen && "text-accent",
              )}
            >
              {t("collections")}
              <ChevronDown
                className={cn("size-3.5 transition-transform duration-300", collectionsOpen && "rotate-180")}
              />
            </button>

            {collectionsOpen && (
              <div className="absolute start-1/2 top-full z-50 mt-4 w-[min(92vw,720px)] -translate-x-1/2 overflow-hidden rounded-sm border border-border bg-bg-elevated shadow-2xl">
                <div className="border-b border-border px-6 py-4">
                  <p className="editorial-eyebrow text-text-muted">{t("collections")}</p>
                  <Link
                    href="/collections"
                    onClick={() => setCollectionsOpen(false)}
                    className="mt-2 inline-block font-display text-lg font-semibold text-text-primary hover:text-accent"
                  >
                    {t("viewAllCollections")}
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-px bg-border p-px md:grid-cols-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      onClick={() => setCollectionsOpen(false)}
                      className="bg-bg-elevated px-5 py-4 transition-colors hover:bg-bg-subtle"
                    >
                      <span className="text-sm font-medium text-text-primary">{cat.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/products"
                    onClick={() => setCollectionsOpen(false)}
                    className="bg-bg-elevated px-5 py-4 transition-colors hover:bg-bg-subtle"
                  >
                    <span className="text-sm font-medium text-text-primary">{t("allProducts")}</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/about"
            className="text-[13px] font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("about")}
          </Link>
          <Link
            href="/contact"
            className="text-[13px] font-medium uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-text-primary"
          >
            {t("contact")}
          </Link>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1 lg:justify-self-end">
          <HeaderIconButton
            label={t("search")}
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex"
          >
            <Search className="size-5" strokeWidth={1.5} />
          </HeaderIconButton>
          <AccountMenu />
          <HeaderIconButton
            label={t("wishlist")}
            count={wishlistCount}
            onClick={openWishlist}
            className="hidden sm:flex"
          >
            <Heart className="size-5" strokeWidth={1.5} />
          </HeaderIconButton>
          <LocaleSwitcher />
          <CartButton count={count} onClick={openCart} />
          <MobileMenu categories={categories} onSearch={() => setSearchOpen(true)} />
        </div>
      </div>
    </header>
    {searchOpen ? (
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    ) : null}
    </>
  );
}
