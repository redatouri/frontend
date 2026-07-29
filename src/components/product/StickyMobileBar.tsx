"use client";

import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import type { ProductOffer } from "@/types/product";
import { Minus, Plus } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

interface StickyMobileBarProps {
  offer: ProductOffer;
  onAddToCart: (quantity: number) => void;
  disabled?: boolean;
}

export function StickyMobileBar({ offer, onAddToCart, disabled }: StickyMobileBarProps) {
  const t = useTranslations("product");
  const locale = useLocale();
  const [qty, setQty] = useState(1);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 glass-panel border-t border-border p-4 lg:hidden">
      <div className="flex items-center gap-3">
        <div className="shrink-0">
          <p className="text-lg font-semibold text-price">
            {formatPrice(offer.price, locale)}
          </p>
        </div>

        <div className="flex items-center rounded-lg border border-border">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex size-10 items-center justify-center text-text-secondary"
            aria-label="Decrease quantity"
          >
            <Minus className="size-4" />
          </button>
          <span className="min-w-8 text-center text-sm">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => q + 1)}
            className="flex size-10 items-center justify-center text-text-secondary"
            aria-label="Increase quantity"
          >
            <Plus className="size-4" />
          </button>
        </div>

        <Button
          className="flex-1"
          disabled={disabled || offer.stock <= 0}
          onClick={() => onAddToCart(qty)}
        >
          {offer.stock <= 0 ? t("outOfStock") : t("addToCart")}
        </Button>
      </div>
    </div>
  );
}
