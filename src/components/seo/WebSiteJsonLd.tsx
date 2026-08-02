import { BRAND, getSiteUrl } from "@/lib/seo";

export function WebSiteJsonLd() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: BRAND.name,
    alternateName: [...BRAND.alternateNames],
    url: siteUrl,
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: ["fr-MA", "ar-MA", "en-US"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
