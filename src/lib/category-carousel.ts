export interface CategoryCarouselItemConfig {
  slug: string;
  overlayKey: string;
  labelKey: string;
  /** Local path under /public — add .webp files later */
  imageSrc?: string;
  gradient: string;
}

export const CATEGORY_CAROUSEL_ITEMS: CategoryCarouselItemConfig[] = [
  {
    slug: "lighting",
    overlayKey: "lighting",
    labelKey: "lighting",
    imageSrc: "/categories/lighting.webp",
    gradient: "from-neutral-700 to-neutral-900",
  },
  {
    slug: "memory-storage",
    overlayKey: "memoryStorage",
    labelKey: "memoryStorage",
    imageSrc: "/categories/memory-storage.webp",
    gradient: "from-stone-600 to-stone-800",
  },
  {
    slug: "batteries-power",
    overlayKey: "batteriesPower",
    labelKey: "batteriesPower",
    imageSrc: "/categories/batteries-power.webp",
    gradient: "from-zinc-600 to-zinc-800",
  },
  {
    slug: "bags-cases",
    overlayKey: "bagsCases",
    labelKey: "bagsCases",
    imageSrc: "/categories/bags-cases.webp",
    gradient: "from-gray-600 to-gray-800",
  },
  {
    slug: "accessories-filters",
    overlayKey: "filters",
    labelKey: "filters",
    imageSrc: "/categories/accessories-filters.webp",
    gradient: "from-slate-600 to-slate-800",
  },
  {
    slug: "accessories",
    overlayKey: "accessories",
    labelKey: "accessories",
    imageSrc: "/categories/accessories.webp",
    gradient: "from-neutral-600 to-neutral-800",
  },
  {
    slug: "cameras",
    overlayKey: "cameras",
    labelKey: "cameras",
    imageSrc: "/categories/cameras.webp",
    gradient: "from-zinc-700 to-black",
  },
  {
    slug: "lenses",
    overlayKey: "lenses",
    labelKey: "lenses",
    imageSrc: "/categories/lenses.webp",
    gradient: "from-stone-700 to-stone-900",
  },
  {
    slug: "audio",
    overlayKey: "audio",
    labelKey: "audio",
    imageSrc: "/categories/audio.webp",
    gradient: "from-gray-700 to-gray-900",
  },
  {
    slug: "stabilization",
    overlayKey: "stabilization",
    labelKey: "stabilization",
    imageSrc: "/categories/stabilization.webp",
    gradient: "from-neutral-800 to-black",
  },
  {
    slug: "studio-packs",
    overlayKey: "studioPacks",
    labelKey: "studioPacks",
    imageSrc: "/categories/studio-packs.webp",
    gradient: "from-zinc-600 to-zinc-900",
  },
];

export function resolveCategoryImage(
  slug: string,
  apiImageUrl: string | null | undefined,
  fallbackSrc?: string,
): string | null {
  if (apiImageUrl) return apiImageUrl;
  return fallbackSrc ?? null;
}

export interface CategoryCarouselItemData {
  slug: string;
  overlay: string;
  label: string;
  imageSrc: string | null;
  gradient: string;
}

export function buildCategoryCarouselItems(
  categories: { slug: string; image_url?: string | null; children?: { slug: string }[] }[],
  overlays: Record<string, string>,
  labels: Record<string, string>,
  getImageUrl: (path: string) => string,
): CategoryCarouselItemData[] {
  const findApiImage = (slug: string): string | null => {
    for (const category of categories) {
      if (category.slug === slug && category.image_url) {
        return getImageUrl(category.image_url);
      }
    }
    return null;
  };

  return CATEGORY_CAROUSEL_ITEMS.map((item) => ({
    slug: item.slug,
    overlay: overlays[item.overlayKey] ?? item.overlayKey,
    label: labels[item.labelKey] ?? item.labelKey,
    imageSrc: resolveCategoryImage(item.slug, findApiImage(item.slug), item.imageSrc),
    gradient: item.gradient,
  }));
}
