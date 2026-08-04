import { getImageProps } from "next/image";
import Image from "next/image";

const DESKTOP_LCP_QUALITY = 75;

export function heroDesktopPosterProps(src: string, alt: string) {
  return getImageProps({
    alt,
    src,
    width: 1920,
    height: 1080,
    quality: DESKTOP_LCP_QUALITY,
    priority: true,
  }).props;
}

/** Preload desktop hero poster — not mobile assets. */
export function HeroDesktopPosterPreload({ src, alt }: { src: string; alt: string }) {
  const props = heroDesktopPosterProps(src, alt);

  return (
    <link
      rel="preload"
      as="image"
      href={props.src}
      imageSrcSet={props.srcSet}
      imageSizes="100vw"
      media="(min-width: 768px)"
      fetchPriority="high"
    />
  );
}

/** Server-rendered desktop LCP poster while hero video loads. */
export function HeroDesktopPoster({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 hidden md:block">
      <Image
        src={src}
        alt={alt}
        fill
        priority
        fetchPriority="high"
        quality={DESKTOP_LCP_QUALITY}
        sizes="100vw"
        className="object-cover object-center"
      />
    </div>
  );
}
