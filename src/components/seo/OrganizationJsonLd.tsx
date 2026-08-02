import { BRAND, getDefaultOgImage, getSiteUrl } from "@/lib/seo";
import { STORE } from "@/lib/store";

interface OrganizationJsonLdProps {
  locale: string;
  description: string;
}

export function OrganizationJsonLd({ locale, description }: OrganizationJsonLdProps) {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: BRAND.name,
    alternateName: [...BRAND.alternateNames],
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: getDefaultOgImage(),
    },
    description,
    email: STORE.email,
    telephone: STORE.phoneTel,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Agadir",
      addressCountry: "MA",
    },
    sameAs: [STORE.instagramUrl, STORE.facebookUrl],
    areaServed: {
      "@type": "Country",
      name: "Morocco",
    },
    knowsLanguage: ["fr", "ar", "en"],
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
