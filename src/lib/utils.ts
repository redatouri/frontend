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

    if (productSlug && !filename.startsWith(`${productSlug}-`)) {
      return `/products/${productSlug}-${index}.png`;
    }

    if (/\.webp$/i.test(filename)) {
      return `/products/${filename.replace(/\.webp$/i, ".png")}`;
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

export function getWhatsAppUrl(message?: string): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? STORE.whatsapp).replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
