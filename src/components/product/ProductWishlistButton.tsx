"use client";

import { useWishlistStore } from "@/lib/stores/wishlist";
import type { ProductDetail } from "@/types/product";
import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ProductWishlistButtonProps {
  product: ProductDetail;
  className?: string;
}

export function ProductWishlistButton({ product, className }: ProductWishlistButtonProps) {
  const t = useTranslations("wishlist");
  const { toggleItem, hasItem } = useWishlistStore();
  const offer = product.offers.find((o) => o.is_default) ?? product.offers[0];
  const saved = hasItem(product.id);

  if (!offer) return null;

  return (
    <button
      type="button"
      onClick={() =>
        toggleItem({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: offer.price,
          image: product.primary_image ?? product.images[0]?.url ?? "",
        })
      }
      className={cn(
        "inline-flex size-12 items-center justify-center border border-border transition-all hover:border-accent",
        saved && "border-accent bg-accent-muted text-accent",
        className,
      )}
      aria-label={saved ? t("remove") : t("add")}
    >
      <Heart className={cn("size-5", saved && "fill-current")} strokeWidth={1.5} />
    </button>
  );
}
