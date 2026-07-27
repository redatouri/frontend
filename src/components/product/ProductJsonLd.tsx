import type { ProductDetail } from "@/types/product";
import { getMediaUrl } from "@/lib/utils";

interface ProductJsonLdProps {
  product: ProductDetail;
  locale: string;
}

export function ProductJsonLd({ product, locale }: ProductJsonLdProps) {
  const offer = product.offers.find((o) => o.is_default) ?? product.offers[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://moviecam.ma";
  const imageUrl = getMediaUrl(product.primary_image ?? product.images[0]?.url);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.headline ?? product.subheadline,
    image: imageUrl ? [imageUrl] : undefined,
    sku: offer?.sku,
    brand: { "@type": "Brand", name: "Moviecam" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.review_count,
    },
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
        }
      : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
