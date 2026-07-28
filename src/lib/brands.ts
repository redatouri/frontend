import type { ProductListItem } from "@/types/product";

export const BRAND_ORDER = [
  "DJI",
  "Sony",
  "GoPro",
  "Rode",
  "Aputure",
  "SanDisk",
  "SmallRig",
  "Movie Cam",
] as const;

const SLUG_BRAND_MAP: Record<string, string> = {
  dji: "DJI",
  sony: "Sony",
  gopro: "GoPro",
  rode: "Rode",
  aputure: "Aputure",
  sandisk: "SanDisk",
  smallrig: "SmallRig",
  pack: "Movie Cam",
};

export function getProductBrand(product: ProductListItem): string {
  const slugKey = product.slug.split("-")[0]?.toLowerCase();
  if (slugKey && SLUG_BRAND_MAP[slugKey]) {
    return SLUG_BRAND_MAP[slugKey];
  }

  const name = product.name.trim();
  if (name.toLowerCase().startsWith("dji ")) return "DJI";
  if (name.toLowerCase().startsWith("sony ")) return "Sony";
  if (name.toLowerCase().startsWith("gopro ")) return "GoPro";
  if (name.toLowerCase().startsWith("rode ")) return "Rode";
  if (name.toLowerCase().startsWith("aputure ")) return "Aputure";
  if (name.toLowerCase().startsWith("sandisk ")) return "SanDisk";
  if (name.toLowerCase().startsWith("smallrig ")) return "SmallRig";
  if (name.toLowerCase().startsWith("pack ")) return "Movie Cam";

  return name.split(" ")[0] ?? "Autre";
}

export function groupProductsByBrand(
  products: ProductListItem[],
): { brand: string; products: ProductListItem[] }[] {
  const map = new Map<string, ProductListItem[]>();

  for (const product of products) {
    const brand = getProductBrand(product);
    const list = map.get(brand) ?? [];
    list.push(product);
    map.set(brand, list);
  }

  const ordered: { brand: string; products: ProductListItem[] }[] = [];

  for (const brand of BRAND_ORDER) {
    const items = map.get(brand);
    if (items?.length) {
      ordered.push({ brand, products: items });
      map.delete(brand);
    }
  }

  for (const [brand, items] of map.entries()) {
    if (items.length) ordered.push({ brand, products: items });
  }

  return ordered;
}

export const BRAND_LOGOS: Record<string, string> = {
  DJI: "/brands/dji.webp",
};

export function getBrandLogo(brand: string): string | null {
  return BRAND_LOGOS[brand] ?? null;
}

export function normalizeBrandParam(value: string): string {
  const decoded = decodeURIComponent(value).trim();
  const lower = decoded.toLowerCase();
  if (lower === "dji") return "DJI";
  if (lower === "sony") return "Sony";
  if (lower === "gopro") return "GoPro";
  if (lower === "rode") return "Rode";
  if (lower === "aputure") return "Aputure";
  if (lower === "sandisk") return "SanDisk";
  if (lower === "smallrig") return "SmallRig";
  return decoded;
}
