import type { ProductDetail } from "@/types/product";
import { getProductBrand } from "@/lib/brands";
import { BRAND, getSiteUrl } from "@/lib/seo";
import { getMediaUrl } from "@/lib/utils";

interface ProductJsonLdProps {
  product: ProductDetail;
  locale: string;
}

export function ProductJsonLd({ product, locale }: ProductJsonLdProps) {
  const offer = product.offers.find((o) => o.is_default) ?? product.offers[0];
  const siteUrl = getSiteUrl();
  const brandName = getProductBrand(product);
  const imagePath = getMediaUrl(product.primary_image ?? product.images[0]?.url, product.slug);
  const imageUrl = imagePath
    ? imagePath.startsWith("http")
      ? imagePath
      : `${siteUrl}${imagePath}`
    : undefined;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description:
      product.subheadline ??
      product.headline ??
      product.description ??
      `${product.name} — ${brandName} at ${BRAND.name}, Morocco camera store.`,
    image: imageUrl ? [imageUrl] : undefined,
    sku: offer?.sku ?? product.slug,
    brand: { "@type": "Brand", name: brandName },
    category: product.category?.name,
    offers: offer
      ? {
          "@type": "Offer",
          price: offer.price,
          priceCurrency: "MAD",
          availability:
            offer.stock > 0
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          url: `${siteUrl}/${locale}/products/${product.slug}`,
          seller: { "@id": `${siteUrl}/#organization` },
          itemCondition: "https://schema.org/NewCondition",
        }
      : undefined,
  };

  if (product.review_count > 0 && product.rating > 0) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.review_count,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
