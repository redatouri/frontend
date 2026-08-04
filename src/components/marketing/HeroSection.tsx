import {
  HeroDesktopPosterPreload,
  HeroDesktopPoster,
} from "@/components/marketing/HeroDesktopLcpPoster";
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
  desktopPoster?: { src: string; alt: string };
  desktopTagline?: string;
  imageAlt?: string;
  /** When true, mobile slides include their own headline — hide overlay text below md */
  mobileImageHasCopy?: boolean;
}

export function HeroSection({
  mobileSlides = [],
  desktopPoster,
  desktopVideos = [],
  ...props
}: HeroSectionProps) {
  const firstMobileSlide = mobileSlides[0];
  const hasDesktopVideos = desktopVideos.length > 0;

  return (
    <>
      {firstMobileSlide ? <HeroImagePreload slide={firstMobileSlide} /> : null}
      {hasDesktopVideos && desktopPoster ? (
        <HeroDesktopPosterPreload src={desktopPoster.src} alt={desktopPoster.alt} />
      ) : null}
      <HeroSectionClient
        {...props}
        desktopVideos={desktopVideos}
        mobileSlides={mobileSlides}
        desktopPoster={desktopPoster}
        lcpBackground={
          firstMobileSlide ? <HeroLcpImage slide={firstMobileSlide} /> : undefined
        }
        desktopLcpBackground={
          hasDesktopVideos && desktopPoster ? (
            <HeroDesktopPoster src={desktopPoster.src} alt={desktopPoster.alt} />
          ) : undefined
        }
      />
    </>
  );
}
