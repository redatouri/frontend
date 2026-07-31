import { getSiteUrl } from "@/lib/seo";

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Moviecam",
    url: siteUrl,
    logo: `${siteUrl}/brands/dji.webp`,
    description:
      "Matériel audiovisuel professionnel au Maroc — caméras, audio, lumière et stabilisation.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "MA",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
