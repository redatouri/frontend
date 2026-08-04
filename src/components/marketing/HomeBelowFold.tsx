import { BrandShowcases } from "@/components/marketing/BrandShowcases";
import { BestSellersSection } from "@/components/marketing/BestSellersSection";
import { FeaturedBrandsStrip } from "@/components/marketing/FeaturedBrandsStrip";
import {
  ServicesSection,
  TestimonialsSection,
} from "@/components/marketing/HomeSections";
import { InstagramSection } from "@/components/marketing/InstagramSection";
import type { ProductListItem } from "@/types/product";
import type { LucideIcon } from "lucide-react";

interface HomeBelowFoldProps {
  bestSellers: ProductListItem[];
  brandGroups: { brand: string; products: ProductListItem[] }[];
  services: { icon: LucideIcon; title: string; description: string }[];
  testimonials: { quote: string; author: string; imageUrl: string; imageAlt: string }[];
  labels: {
    bestSellers: string;
    bestSellersSubtitle: string;
    bestSellersCta: string;
    featuredBrandsTitle: string;
    featuredBrandsSubtitle: string;
    brandsTitle: string;
    brandsSubtitle: string;
    brandLabel: string;
    viewAllBrand: (brand: string) => string;
    servicesTitle: string;
    servicesSubtitle: string;
    testimonials: string;
    instagramTitle: string;
    instagramSubtitle: string;
    instagramCta: string;
  };
}

export function HomeBelowFold({
  bestSellers,
  brandGroups,
  services,
  testimonials,
  labels,
}: HomeBelowFoldProps) {
  return (
    <>
      <BestSellersSection
        title={labels.bestSellers}
        subtitle={labels.bestSellersSubtitle}
        products={bestSellers}
        viewAllLabel={labels.bestSellersCta}
      />

      <FeaturedBrandsStrip
        title={labels.featuredBrandsTitle}
        subtitle={labels.featuredBrandsSubtitle}
      />

      <BrandShowcases
        title={labels.brandsTitle}
        subtitle={labels.brandsSubtitle}
        groups={brandGroups}
        brandLabel={labels.brandLabel}
        viewAllLabel={labels.viewAllBrand}
      />

      <ServicesSection
        title={labels.servicesTitle}
        subtitle={labels.servicesSubtitle}
        items={services}
      />

      <TestimonialsSection title={labels.testimonials} items={testimonials} />

      <InstagramSection
        title={labels.instagramTitle}
        subtitle={labels.instagramSubtitle}
        cta={labels.instagramCta}
      />
    </>
  );
}
