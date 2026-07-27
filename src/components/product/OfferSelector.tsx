"use client";

import { cn } from "@/lib/utils";
import { calcDiscount, formatPrice } from "@/lib/format";
import type { ProductOffer } from "@/types/product";
import { useLocale, useTranslations } from "next-intl";
import { Badge } from "@/components/ui/Badge";

interface OfferSelectorProps {
  offers: ProductOffer[];
  selectedId: string;
  onSelect: (offer: ProductOffer) => void;
}

export function OfferSelector({ offers, selectedId, onSelect }: OfferSelectorProps) {
  const t = useTranslations("product");
  const locale = useLocale();

  return (
    <div id="offers" className="grid gap-3 sm:grid-cols-2">
      {offers.map((offer) => {
        const selected = offer.id === selectedId;
        const discount = calcDiscount(offer.price, offer.compare_at_price);

        return (
          <button
            key={offer.id}
            type="button"
            onClick={() => onSelect(offer)}
            className={cn(
              "relative rounded-xl border p-4 text-start transition-colors",
              selected
                ? "border-accent bg-accent-muted"
                : "border-border bg-bg-elevated hover:border-accent/50",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium">{offer.label}</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="text-lg font-semibold text-accent">
                    {formatPrice(offer.price, locale)}
                  </span>
                  {offer.compare_at_price && offer.compare_at_price > offer.price && (
                    <span className="text-sm text-text-muted line-through">
                      {formatPrice(offer.compare_at_price, locale)}
                    </span>
                  )}
                </div>
              </div>
              <div
                className={cn(
                  "mt-1 size-4 shrink-0 rounded-full border-2",
                  selected ? "border-accent bg-accent" : "border-border",
                )}
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {discount && (
                <Badge variant="accent">-{discount}%</Badge>
              )}
              {offer.badge === "best_value" && (
                <Badge variant="success">{t("bestValue")}</Badge>
              )}
              {offer.badge === "limited" && (
                <Badge variant="scarcity">{t("limitedOffer")}</Badge>
              )}
              {offer.badge === "popular" && (
                <Badge variant="default">{t("popular")}</Badge>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
