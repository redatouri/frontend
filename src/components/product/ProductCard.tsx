"use client";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { ScarcityBadge } from "./ScarcityBadge";
import { StarRating } from "./StarRating";
import { calcDiscount, formatPrice } from "@/lib/format";
import { cn, getMediaUrl } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const [pressed, setPressed] = useState(false);
  const offer = product.default_offer;
  const imageUrl = getMediaUrl(product.primary_image, product.slug);
  const discount = calcDiscount(offer.price, offer.compare_at_price);

  return (
    <article
      data-pressed={pressed ? "" : undefined}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onPointerCancel={() => setPressed(false)}
      className={cn(
        "group flex h-full touch-manipulation flex-col overflow-hidden border border-border bg-white transition-all duration-300",
        "hover:border-cyan hover:shadow-[0_20px_60px_rgb(0_0_0_/_10%)]",
        "active:border-cyan active:shadow-[0_20px_60px_rgb(0_0_0_/_10%)]",
        "focus-within:border-cyan focus-within:shadow-[0_20px_60px_rgb(0_0_0_/_10%)]",
        "data-pressed:border-cyan data-pressed:shadow-[0_20px_60px_rgb(0_0_0_/_10%)]",
      )}
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/5] overflow-hidden bg-white"
      >
        {discount && (
          <Badge variant="accent" className="absolute start-4 top-4 z-10">
            {tCommon("discount", { percent: discount })}
          </Badge>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105 group-data-pressed:scale-105 md:p-6"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <ProductPlaceholder category="camera" label={product.name} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-active:opacity-100 group-data-pressed:opacity-100" />
        <span className="absolute end-4 bottom-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-text-primary opacity-0 shadow-sm transition-all duration-500 group-hover:opacity-100 group-active:opacity-100 group-data-pressed:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col border-t border-border p-5 transition-colors duration-300 group-hover:border-t-cyan group-active:border-t-cyan group-data-pressed:border-t-cyan md:p-6">
        <StarRating
          rating={product.rating}
          reviewCount={product.review_count}
          reviewLabel={t("reviews", { count: product.review_count })}
        />

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-cyan group-active:text-cyan group-data-pressed:text-cyan">
            {product.headline ?? product.name}
          </h3>
        </Link>

        {product.subheadline && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {product.subheadline}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-xl font-semibold tracking-tight text-price">
            {formatPrice(offer.price, locale)}
          </span>
          {offer.compare_at_price && offer.compare_at_price > offer.price && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(offer.compare_at_price, locale)}
            </span>
          )}
        </div>

        <ScarcityBadge stock={offer.stock} className="mt-3" />

        <Link
          href={`/products/${product.slug}#offers`}
          className="mt-5 inline-flex h-11 w-full items-center justify-center border border-border text-sm font-semibold uppercase tracking-[0.1em] text-text-primary transition-all group-hover:border-cyan group-hover:bg-cyan group-hover:text-white group-active:border-cyan group-active:bg-cyan group-active:text-white group-data-pressed:border-cyan group-data-pressed:bg-cyan group-data-pressed:text-white hover:border-cyan hover:bg-cyan hover:text-white"
        >
          {t("viewOffer")}
        </Link>
      </div>
    </article>
  );
}
