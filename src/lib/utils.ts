import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { STORE } from "./store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL ?? "https://api.moviecam.ma";
}

export function getMediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  if (path.startsWith("/products/") || path.startsWith("/home/") || path.startsWith("/about/") || path.startsWith("/brands/")) {
    return path;
  }
  return `${getApiBaseUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getWhatsAppUrl(message?: string): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? STORE.whatsapp).replace(/\D/g, "");
  const base = `https://wa.me/${number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
