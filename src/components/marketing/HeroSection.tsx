import { HeroImagePreload, HeroLcpImage } from "@/components/marketing/HeroLcpImage";
import { HeroSectionClient } from "@/components/marketing/HeroSectionClient";
import type { HeroDesktopVideo } from "@/components/marketing/HeroDesktopVideoCarousel";
import type { HeroMobileSlide } from "@/components/marketing/HeroMobileCarousel";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageDesktop?: string;
  mobileSlides?: HeroMobileSlide[];
  desktopVideos?: HeroDesktopVideo[];
  desktopTagline?: string;
  imageAlt?: string;
  /** When true, mobile slides include their own headline — hide overlay text below md */
  mobileImageHasCopy?: boolean;
}

export function HeroSection({
  mobileSlides = [],
  ...props
}: HeroSectionProps) {
  const firstMobileSlide = mobileSlides[0];

  return (
    <>
      {firstMobileSlide ? <HeroImagePreload slide={firstMobileSlide} /> : null}
      <HeroSectionClient
        {...props}
        mobileSlides={mobileSlides}
        lcpBackground={
          firstMobileSlide ? <HeroLcpImage slide={firstMobileSlide} /> : undefined
        }
      />
    </>
  );
}
