"use client";

import { AlternatingSection } from "@/components/marketing/AlternatingSection";
import { ScrollReveal } from "@/components/marketing/ScrollReveal";
import { InTheBox } from "@/components/product/InTheBox";
import { OfferSelector } from "@/components/product/OfferSelector";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductGrid, ProductGridItem } from "@/components/product/ProductGrid";
import { ProductComparison } from "@/components/product/ProductComparison";
import { ProductFaq } from "@/components/product/ProductFaq";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductTrustBadges } from "@/components/product/ProductTrustBadges";
import { ProductWishlistButton } from "@/components/product/ProductWishlistButton";
import { ScarcityBadge } from "@/components/product/ScarcityBadge";
import { StarRating } from "@/components/product/StarRating";
import { StickyMobileBar } from "@/components/product/StickyMobileBar";
import { Button } from "@/components/ui/Button";
import { useCartStore } from "@/lib/stores/cart";
import { formatPrice } from "@/lib/format";
import { getMediaUrl } from "@/lib/utils";
import type { ProductDetail, ProductOffer } from "@/types/product";
import { Minus, Package, Plus } from "lucide-react";
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
    return product.specs.slice(0, 3).map((spec, i) => ({
      title: spec.key,
      description: spec.value,
      position: (i % 2 === 0 ? "left" : "right") as "left" | "right",
    }));
  }, [product.specs]);

  const inTheBoxItems = useMemo(() => {
    const fromSpecs = product.specs
      .filter((s) => /box|contenu|included/i.test(s.key))
      .flatMap((s) => s.value.split(/[,·]/).map((x) => x.trim()))
      .filter(Boolean);
    if (fromSpecs.length > 0) return fromSpecs.slice(0, 6);
    return [t("inTheBoxDefault1"), t("inTheBoxDefault2"), t("inTheBoxDefault3")];
  }, [product.specs, t]);

  const faqItems = useMemo(
    () => [
      { question: t("faq1Q"), answer: t("faq1A") },
      { question: t("faq2Q"), answer: t("faq2A") },
      { question: t("faq3Q"), answer: t("faq3A") },
    ],
    [t],
  );

  const reviewItems = useMemo(
    () => [
      { author: t("review1Author"), quote: t("review1Quote"), rating: 5 },
      { author: t("review2Author"), quote: t("review2Quote"), rating: 5 },
      { author: t("review3Author"), quote: t("review3Quote"), rating: 4 },
    ],
    [t],
  );

  const compareProduct = product.cross_sells?.[0];

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
      <section className="container-page py-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <ProductGallery images={product.images} productName={product.name} productSlug={product.slug} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-start justify-between gap-4">
              <StarRating
                rating={product.rating}
                reviewCount={product.review_count}
                reviewLabel={t("reviews", { count: product.review_count })}
                size="md"
              />
              <ProductWishlistButton product={product} />
            </div>

            <p className="editorial-eyebrow mt-6 text-text-muted">{t("original")}</p>
            <h1 className="mt-3 font-display text-display-lg font-semibold text-balance">
              {product.headline ?? product.name}
            </h1>
            {product.subheadline && (
              <p className="mt-4 text-body-lg text-text-secondary">{product.subheadline}</p>
            )}

            <p className="mt-6 font-display text-3xl font-semibold tracking-tight text-price md:text-4xl">
              {formatPrice(selectedOffer.price, locale)}
            </p>

            <div className="mt-8">
              <OfferSelector
                offers={product.offers}
                selectedId={selectedOffer.id}
                onSelect={setSelectedOffer}
              />
            </div>

            <ScarcityBadge stock={selectedOffer.stock} className="mt-5 inline-flex" />

            <div className="mt-8 hidden items-stretch gap-3 lg:flex">
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex size-12 items-center justify-center text-text-secondary hover:text-text-primary"
                  aria-label="Decrease"
                >
                  <Minus className="size-4" />
                </button>
                <span className="min-w-10 text-center font-medium">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="flex size-12 items-center justify-center text-text-secondary hover:text-text-primary"
                  aria-label="Increase"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <Button
                className="flex-1"
                size="lg"
                disabled={selectedOffer.stock <= 0}
                onClick={() => handleAddToCart()}
              >
                {selectedOffer.stock <= 0 ? t("outOfStock") : t("addToCart")}
              </Button>
            </div>

            <ProductTrustBadges
              className="mt-8"
              cod={t("cod")}
              chooseCarefully={t("chooseCarefully")}
              delivery={t("delivery")}
            />
          </div>
        </div>
      </section>

      <InTheBox items={inTheBoxItems} />

      <ScrollReveal className="container-page pb-12">
        <p className="editorial-eyebrow">{t("benefits")}</p>
        <h2 className="mt-4 font-display text-2xl font-semibold">{t("benefitsTitle")}</h2>
        <div className="mt-8 grid gap-px bg-border md:grid-cols-3">
          {product.specs.slice(0, 3).map((spec) => (
            <div key={spec.key} className="bg-bg-primary p-8">
              <Package className="size-6 text-cyan" strokeWidth={1.25} />
              <h3 className="mt-4 font-display text-lg font-semibold">{spec.key}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">{spec.value}</p>
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
          imageUrl={getMediaUrl(product.images[i + 1]?.url ?? product.images[0]?.url, product.slug)}
          category="camera"
        />
      ))}

      {product.specs.length > 0 && (
        <ScrollReveal className="container-page section-padding">
          <p className="editorial-eyebrow">{t("specsEyebrow")}</p>
          <h2 className="mt-4 font-display text-display-lg font-semibold">{t("specs")}</h2>
          <div className="mt-10 overflow-hidden border border-border">
            <table className="w-full text-sm">
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.key} className="border-b border-border last:border-0">
                    <td className="w-2/5 bg-bg-elevated px-5 py-4 font-medium text-text-secondary">
                      {spec.key}
                    </td>
                    <td className="px-5 py-4 text-text-primary">{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      )}

      <ProductComparison
        specs={product.specs}
        compareSpecs={compareProduct ? [] : []}
        compareLabel={compareProduct?.name}
      />

      {product.cross_sells && product.cross_sells.length > 0 && (
        <section className="section-padding border-t border-border bg-bg-elevated">
          <div className="container-page">
            <ScrollReveal>
              <p className="editorial-eyebrow">{t("accessoriesEyebrow")}</p>
              <h2 className="mt-4 font-display text-display-lg font-semibold">{t("crossSells")}</h2>
            </ScrollReveal>
            <ProductGrid columns={4} className="mt-12">
              {product.cross_sells.map((p, i) => (
                <ProductGridItem key={p.id}>
                  <ScrollReveal delay={i * 0.08}>
                    <ProductCard product={p} />
                  </ScrollReveal>
                </ProductGridItem>
              ))}
            </ProductGrid>
          </div>
        </section>
      )}

      <ProductReviews
        rating={product.rating}
        reviewCount={product.review_count}
        reviews={reviewItems}
      />

      <ProductFaq items={faqItems} />

      <StickyMobileBar
        offer={selectedOffer}
        onAddToCart={handleAddToCart}
        disabled={selectedOffer.stock <= 0}
      />

      <div className="h-24 lg:hidden" aria-hidden />
    </>
  );
}
