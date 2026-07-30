"use client";

import { Link } from "@/i18n/navigation";
import { Input } from "@/components/ui/Input";
import { filterProductsByQuery } from "@/lib/search-products";
import { getProducts } from "@/lib/api/products";
import { formatPrice } from "@/lib/format";
import { getMediaUrl } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import { Search, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const t = useTranslations("search");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [catalog, setCatalog] = useState<ProductListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    setLoading(true);
    getProducts({ locale, limit: 100 })
      .then((data) => setCatalog(data.items))
      .finally(() => setLoading(false));
  }, [open, locale]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const results = filterProductsByQuery(catalog, query, 8);

  const handleClose = useCallback(() => {
    onClose();
    setQuery("");
  }, [onClose]);

  if (!open || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[300]" role="dialog" aria-modal="true" aria-label={t("title")}>
      <button
        type="button"
        className="absolute inset-0 bg-white/95 backdrop-blur-xl"
        onClick={handleClose}
        aria-label={t("close")}
      />
      <div className="relative mx-auto max-w-3xl px-6 pt-[12vh]">
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <Search className="size-6 shrink-0 text-cyan" />
          <Input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="h-14 border-0 bg-transparent px-0 text-xl focus-visible:ring-0"
          />
          <button
            type="button"
            onClick={handleClose}
            className="flex size-12 shrink-0 items-center justify-center text-text-muted hover:text-text-primary"
            aria-label={t("close")}
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="mt-8 max-h-[50vh] overflow-y-auto">
          {loading && (
            <p className="text-sm text-text-muted">{t("loading")}</p>
          )}
          {!loading && query.length >= 2 && results.length === 0 && (
            <p className="text-text-secondary">{t("noResults")}</p>
          )}
          {!loading && query.length < 2 && (
            <p className="text-sm text-text-muted">{t("hint")}</p>
          )}
          <ul className="space-y-1">
            {results.map((product) => {
              const imageUrl = getMediaUrl(product.primary_image, product.slug);
              return (
                <li key={product.id}>
                  <Link
                    href={`/products/${product.slug}`}
                    onClick={handleClose}
                    className="flex items-center gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-bg-elevated"
                  >
                    <div className="relative size-14 shrink-0 overflow-hidden bg-bg-subtle">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-text-primary">
                        {product.headline ?? product.name}
                      </p>
                      <p className="truncate text-sm text-text-muted">{product.name}</p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-price">
                      {formatPrice(product.default_offer.price, locale)}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  );
}
