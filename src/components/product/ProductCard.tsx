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
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated transition-transform hover:scale-[1.02]">
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-bg-subtle">
        {discount && (
          <Badge variant="accent" className="absolute start-3 top-3 z-10">
            {tCommon("discount", { percent: discount })}
          </Badge>
        )}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-[filter] group-hover:brightness-110"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <ProductPlaceholder category="camera" label={product.name} />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <StarRating
          rating={product.rating}
          reviewCount={product.review_count}
          reviewLabel={t("reviews", { count: product.review_count })}
        />

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-2 font-display text-heading-md font-semibold leading-snug transition-colors group-hover:text-text-primary">
            {product.headline ?? product.name}
          </h3>
        </Link>

        {product.subheadline && (
          <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
            {product.subheadline}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="text-lg font-semibold text-price">
            {formatPrice(offer.price, locale)}
          </span>
          {offer.compare_at_price && offer.compare_at_price > offer.price && (
            <span className="text-sm text-text-muted line-through">
              {formatPrice(offer.compare_at_price, locale)}
            </span>
          )}
        </div>

        <ScarcityBadge stock={offer.stock} className="mt-2" />

        <Link
          href={`/products/${product.slug}#offers`}
          className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-lg border border-text-primary text-sm font-medium text-text-primary transition-colors hover:bg-bg-subtle"
        >
          {t("viewOffer")}
        </Link>
      </div>
    </article>
  );
}
