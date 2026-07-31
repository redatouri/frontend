import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { STORE } from "./store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "https://api.moviecam.ma";
}

export function getMediaUrl(
  path: string | null | undefined,
  productSlug?: string,
): string | null {
  if (!path) {
    return productSlug ? `/products/${productSlug}-0.png` : null;
  }
  if (path.startsWith("http")) return path;

  // Seed/catalog images live in the frontend public folder, not on the API volume.
  if (path.startsWith("/media/placeholders/")) {
    const filename = path.slice("/media/placeholders/".length);
    const indexMatch = filename.match(/-(\d+)\.(webp|png|jpe?g)$/i);
    const index = indexMatch?.[1] ?? "0";
    const ext = indexMatch?.[2]?.toLowerCase() ?? "png";

    if (productSlug && !filename.startsWith(`${productSlug}-`)) {
      return `/products/${productSlug}-${index}.${ext}`;
    }

    return `/products/${filename}`;
  }

  if (
    path.startsWith("/products/") ||
    path.startsWith("/home/") ||
    path.startsWith("/about/") ||
    path.startsWith("/brands/") ||
    path.startsWith("/contact/")
  ) {
    return path;
  }

  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function imageBelongsToProduct(url: string, productSlug: string): boolean {
  const filename = url.split("/").pop() ?? "";
  return filename.startsWith(`${productSlug}-`) || filename.startsWith(`${productSlug}.`);
}

const EXCLUDED_PRODUCT_IMAGE_FILES: Record<string, string[]> = {
  "dji-mic-mini-2-combo": ["dji-mic-mini-2-combo-3.webp"],
};

function isExcludedProductImage(productSlug: string, url: string): boolean {
  const filename = url.split("/").pop() ?? "";
  return EXCLUDED_PRODUCT_IMAGE_FILES[productSlug]?.includes(filename) ?? false;
}

export function sanitizeProductImages<T extends { url: string; sort_order?: number }>(
  images: T[],
  productSlug?: string,
): T[] {
  if (!productSlug) return images;

  const seen = new Set<string>();
  return [...images]
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .filter((image) => {
      const url = getMediaUrl(image.url, productSlug);
      if (
        !url ||
        seen.has(url) ||
        !imageBelongsToProduct(url, productSlug) ||
        isExcludedProductImage(productSlug, url)
      ) {
        return false;
      }
      seen.add(url);
      return true;
    });
}

export function getWhatsAppUrl(message?: string): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? STORE.whatsapp).replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
