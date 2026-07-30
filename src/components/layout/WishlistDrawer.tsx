"use client";

import { Link } from "@/i18n/navigation";
import { Sheet } from "@/components/ui/Sheet";
import { useWishlistStore } from "@/lib/stores/wishlist";
import { formatPrice } from "@/lib/format";
import { getMediaUrl } from "@/lib/utils";
import { Heart, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export function WishlistDrawer() {
  const t = useTranslations("wishlist");
  const locale = useLocale();
  const { items, isOpen, closeWishlist, removeItem } = useWishlistStore();

  return (
    <Sheet open={isOpen} onClose={closeWishlist} title={t("title")} className="max-w-[420px]!">
      <div className="flex flex-1 flex-col overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
            <Heart className="size-10 text-text-muted" strokeWidth={1.25} />
            <p className="mt-4 text-text-secondary">{t("empty")}</p>
            <Link
              href="/collections"
              onClick={closeWishlist}
              className="mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-cyan hover:text-accent"
            >
              {t("browse")}
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((item) => {
              const imageUrl = getMediaUrl(item.image, item.slug);
              return (
                <li
                  key={item.productId}
                  className="flex gap-4 border border-border bg-bg-subtle p-3"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    onClick={closeWishlist}
                    className="relative size-20 shrink-0 overflow-hidden bg-bg-elevated"
                  >
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : null}
                  </Link>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${item.slug}`}
                      onClick={closeWishlist}
                      className="line-clamp-2 text-sm font-medium text-text-primary hover:text-accent"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm font-semibold text-price">
                      {formatPrice(item.price, locale)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.productId)}
                    className="flex size-10 shrink-0 items-center justify-center text-text-muted hover:text-error"
                    aria-label={t("remove")}
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </Sheet>
  );
}
