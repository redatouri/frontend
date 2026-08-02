import { BRAND, getDefaultOgImage, getSiteUrl } from "@/lib/seo";
import { STORE } from "@/lib/store";

interface StoreJsonLdProps {
  description: string;
}

export function StoreJsonLd({ description }: StoreJsonLdProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${siteUrl}/#store`,
    name: BRAND.name,
    alternateName: [...BRAND.alternateNames],
    url: siteUrl,
    image: getDefaultOgImage(),
    description,
    email: STORE.email,
    telephone: STORE.phoneTel,
    priceRange: "$$",
    currenciesAccepted: "MAD",
    paymentAccepted: "Cash",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Agadir",
      addressLocality: "Agadir",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STORE.lat,
      longitude: STORE.lng,
    },
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    sameAs: [STORE.instagramUrl, STORE.facebookUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
