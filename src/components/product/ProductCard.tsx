"use client";

import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/Badge";
import { ProductPlaceholder } from "@/components/ui/ProductPlaceholder";
import { ScarcityBadge } from "./ScarcityBadge";
import { StarRating } from "./StarRating";
import { calcDiscount, formatPrice } from "@/lib/format";
import { getMediaUrl } from "@/lib/utils";
import type { ProductListItem } from "@/types/product";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProductCardProps {
  product: ProductListItem;
}

export function ProductCard({ product }: ProductCardProps) {
  const t = useTranslations("product");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const offer = product.default_offer;
  const imageUrl = getMediaUrl(product.primary_image);
  const discount = calcDiscount(offer.price, offer.compare_at_price);

  return (
    <article className="group flex h-full flex-col bg-white transition-all duration-500 hover:shadow-[0_20px_60px_rgb(0_0_0_/_10%)]">
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
            className="object-contain p-4 transition-transform duration-700 ease-out group-hover:scale-105 md:p-6"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <ProductPlaceholder category="camera" label={product.name} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute end-4 bottom-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/90 text-text-primary opacity-0 shadow-sm transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </Link>

      <div className="flex flex-1 flex-col border border-t-0 border-border p-5 md:p-6">
        <StarRating
          rating={product.rating}
          reviewCount={product.review_count}
          reviewLabel={t("reviews", { count: product.review_count })}
        />

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-text-primary transition-colors group-hover:text-accent">
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
          className="mt-5 inline-flex h-11 w-full items-center justify-center border border-border text-sm font-semibold uppercase tracking-[0.1em] text-text-primary transition-all hover:border-accent hover:bg-accent hover:text-on-accent"
        >
          {t("viewOffer")}
        </Link>
      </div>
    </article>
  );
}
