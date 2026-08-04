import type { HeroMobileSlide } from "@/components/marketing/HeroMobileCarousel";
import { getImageProps } from "next/image";
import Image from "next/image";

const LCP_WIDTH = 828;
const LCP_HEIGHT = 1100;
const LCP_QUALITY = 75;

export function heroLcpImageProps(slide: HeroMobileSlide) {
  return getImageProps({
    alt: slide.alt,
    src: slide.src,
    width: LCP_WIDTH,
    height: LCP_HEIGHT,
    quality: LCP_QUALITY,
    priority: true,
  }).props;
}

/** Preload the mobile hero LCP image with the same URL/srcset as next/image. */
export function HeroImagePreload({ slide }: { slide: HeroMobileSlide }) {
  const props = heroLcpImageProps(slide);

  return (
    <link
      rel="preload"
      as="image"
      href={props.src}
      imageSrcSet={props.srcSet}
      imageSizes="100vw"
      fetchPriority="high"
    />
  );
}

/** Server-rendered LCP image — paints before client JS hydrates. */
export function HeroLcpImage({ slide }: { slide: HeroMobileSlide }) {
  return (
    <div className="absolute inset-0 z-0 md:hidden">
      <Image
        src={slide.src}
        alt={slide.alt}
        fill
        priority
        fetchPriority="high"
        quality={LCP_QUALITY}
        sizes="100vw"
        className="object-cover object-top"
      />
    </div>
  );
}
