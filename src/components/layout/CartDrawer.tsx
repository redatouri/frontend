"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { Sheet } from "@/components/ui/Sheet";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { Separator } from "@/components/ui/Separator";
import { getCrossSells } from "@/lib/api/products";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/stores/cart";
import { getMediaUrl } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

export function CartDrawer() {
  const t = useTranslations("cart");
  const locale = useLocale();
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQty,
    addItem,
    openCart,
    total,
    itemCount,
  } = useCartStore();
  const [crossSells, setCrossSells] = useState<ProductListItem[]>([]);

  useEffect(() => {
    if (!isOpen || items.length === 0) {
      setCrossSells([]);
      return;
    }

    const ids = items.map((i) => i.productId);
    getCrossSells(ids, locale, 4).then(setCrossSells);
  }, [isOpen, items, locale]);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  const handleQuickAdd = (product: ProductListItem) => {
    const offer = product.default_offer;
    addItem({
      productId: product.id,
      slug: product.slug,
      offerId: offer.id,
      name: product.name,
      variantLabel: offer.label,
      price: offer.price,
      compareAtPrice: offer.compare_at_price ?? undefined,
      image: product.primary_image ?? "",
    });
    openCart();
  };

  return (
    <Sheet
      open={isOpen}
      onClose={closeCart}
      title={`${t("title")}${itemCount() > 0 ? ` (${itemCount()})` : ""}`}
      side={locale === "ar" ? "start" : "end"}
    >
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <p className="py-12 text-center text-text-secondary">{t("empty")}</p>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => {
                const imageUrl = getMediaUrl(item.image);
                return (
                  <li
                    key={item.offerId}
                    className="flex gap-3 rounded-xl border border-border bg-bg-primary p-3"
                  >
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-bg-subtle">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <ProductPlaceholder category="camera" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-text-muted">{item.variantLabel}</p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded border border-border">
                          <button
                            type="button"
                            onClick={() => updateQty(item.offerId, item.quantity - 1)}
                            className="flex size-8 items-center justify-center"
                            aria-label="Decrease"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="min-w-6 text-center text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.offerId, item.quantity + 1)}
                            className="flex size-8 items-center justify-center"
                            aria-label="Increase"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-accent">
                          {formatPrice(item.price * item.quantity, locale)}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(item.offerId)}
                      className="shrink-0 text-text-muted hover:text-error"
                      aria-label={t("remove")}
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {crossSells.length > 0 && items.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold">{t("crossSells")}</h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                {crossSells.map((product) => {
                  const imageUrl = getMediaUrl(product.primary_image);
                  return (
                    <div
                      key={product.id}
                      className="w-36 shrink-0 rounded-xl border border-border bg-bg-primary p-2"
                    >
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-bg-subtle">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="144px"
                          />
                        ) : (
                          <ProductPlaceholder category="camera" />
                        )}
                      </div>
                      <p className="mt-2 line-clamp-2 text-xs">{product.headline ?? product.name}</p>
                      <p className="mt-1 text-xs font-semibold text-accent">
                        {formatPrice(product.default_offer.price, locale)}
                      </p>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="mt-2 h-8 w-full text-xs"
                        onClick={() => handleQuickAdd(product)}
                      >
                        {t("add")}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-border p-4">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">{t("subtotal")}</span>
              <span className="font-semibold">{formatPrice(total(), locale)}</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-text-secondary">{t("shipping")}</span>
              <span className="text-text-muted">{t("shippingNote")}</span>
            </div>
            <p className="mt-3 rounded-lg bg-accent-muted px-3 py-2 text-xs text-accent">
              💵 {t("codNotice")}
            </p>
            <Separator className="my-4" />
            <Button className="w-full" onClick={handleCheckout}>
              {t("checkout")}
            </Button>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full py-2 text-center text-sm text-text-secondary hover:text-text-primary"
            >
              {t("continue")}
            </button>
          </div>
        )}
      </div>
    </Sheet>
  );
}
