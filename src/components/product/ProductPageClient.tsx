"use client";

import { AlternatingSection } from "@/components/marketing/AlternatingSection";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { OfferSelector } from "@/components/product/OfferSelector";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ScarcityBadge } from "@/components/product/ScarcityBadge";
import { StarRating } from "@/components/product/StarRating";
import { StickyMobileBar } from "@/components/product/StickyMobileBar";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/stores/cart";
import { formatPrice } from "@/lib/format";
import { getMediaUrl } from "@/lib/utils";
import type { ProductDetail, ProductOffer } from "@/types/product";
import { Banknote, Minus, Package, Plus, ShieldCheck, Truck } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";

interface ProductPageClientProps {
  product: ProductDetail;
}

export function ProductPageClient({ product }: ProductPageClientProps) {
  const t = useTranslations("product");
  const locale = useLocale();
  const { addItem, openCart } = useCartStore();

  const defaultOffer =
    product.offers.find((o) => o.is_default) ?? product.offers[0];

  const [selectedOffer, setSelectedOffer] = useState<ProductOffer | undefined>(defaultOffer);
  const [qty, setQty] = useState(1);

  const featureSections = useMemo(() => {
    const bullets = product.specs.slice(0, 3);
    return bullets.map((spec, i) => ({
      title: spec.key,
      description: spec.value,
      position: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    }));
  }, [product.specs]);

  if (!defaultOffer || !selectedOffer) {
    return (
      <div className="container-page py-20 text-center text-text-secondary">
        Product unavailable
      </div>
    );
  }

  const handleAddToCart = (quantity = qty) => {
    addItem({
      productId: product.id,
      slug: product.slug,
      offerId: selectedOffer.id,
      name: product.name,
      variantLabel: selectedOffer.label,
      price: selectedOffer.price,
      compareAtPrice: selectedOffer.compare_at_price ?? undefined,
      image: product.primary_image ?? product.images[0]?.url ?? "",
      quantity,
    });
    openCart();
  };

  return (
    <>
      <section className="container-page py-8 md:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="lg:sticky lg:top-24 lg:self-start">
            <StarRating
              rating={product.rating}
              reviewCount={product.review_count}
              reviewLabel={t("reviews", { count: product.review_count })}
              size="md"
            />

            <h1 className="mt-4 font-display text-display-lg font-bold">
              {product.headline ?? product.name}
            </h1>
            {product.subheadline && (
              <p className="mt-2 text-body-lg text-text-secondary">{product.subheadline}</p>
            )}

            <div className="mt-6">
              <OfferSelector
                offers={product.offers}
                selectedId={selectedOffer.id}
                onSelect={setSelectedOffer}
              />
            </div>

            <ScarcityBadge stock={selectedOffer.stock} className="mt-4 inline-flex" />

            <div className="mt-6 hidden items-center gap-4 lg:flex">
              <div className="flex items-center rounded-lg border border-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-12 items-center justify-center"
                  aria-label="Decrease"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-12 items-center justify-center"
                  aria-label="Increase"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                className="flex-1"
                disabled={selectedOffer.stock <= 0}
                onClick={() => handleAddToCart()}
              >
                {selectedOffer.stock <= 0 ? t("outOfStock") : t("addToCart")}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <Banknote className="size-3.5 text-accent" /> {t("cod")}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="size-3.5 text-accent" /> {t("delivery")}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3.5 text-accent" /> {t("original")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal className="container-page pb-12">
        <h2 className="font-display text-xl font-semibold">{t("benefits")}</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {product.specs.slice(0, 3).map((spec) => (
            <div
              key={spec.key}
              className="rounded-xl border border-border bg-bg-elevated p-5"
            >
              <Package className="size-6 text-accent" />
              <h3 className="mt-3 font-medium">{spec.key}</h3>
              <p className="mt-1 text-sm text-text-secondary">{spec.value}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {featureSections.map((section, i) => (
        <AlternatingSection
          key={`${section.title}-${i}`}
          title={section.title}
          description={section.description}
          imagePosition={section.position}
          imageUrl={getMediaUrl(product.images[i + 1]?.url ?? product.images[0]?.url)}
          category="camera"
        />
      ))}

      {product.specs.length > 0 && (
        <ScrollReveal className="container-page section-padding">
          <h2 className="font-display text-xl font-semibold">{t("specs")}</h2>
          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.key} className="border-b border-border last:border-0">
                    <td className="bg-bg-elevated px-4 py-3 font-medium text-text-secondary">
                      {spec.key}
                    </td>
                    <td className="px-4 py-3">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      )}

      {product.cross_sells && product.cross_sells.length > 0 && (
        <section className="section-padding bg-bg-elevated">
          <div className="container-page">
            <ScrollReveal>
              <h2 className="font-display text-xl font-semibold">{t("crossSells")}</h2>
            </ScrollReveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {product.cross_sells.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ScrollReveal className="container-page section-padding">
        <div className="rounded-2xl border border-accent/30 bg-accent-muted p-8 text-center">
          <p className="text-2xl font-semibold text-accent">
            {formatPrice(selectedOffer.price, locale)}
          </p>
          <Button
            className="mt-4"
            disabled={selectedOffer.stock <= 0}
            onClick={() => handleAddToCart()}
          >
            {t("addToCart")}
          </Button>
        </div>
      </ScrollReveal>

      <StickyMobileBar
        offer={selectedOffer}
        onAddToCart={handleAddToCart}
        disabled={selectedOffer.stock <= 0}
      />

      <div className="h-24 lg:hidden" aria-hidden />
    </>
  );
}
