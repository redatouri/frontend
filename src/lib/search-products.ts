import type { ProductListItem } from "@/types/product";

export function filterProductsByQuery(
  items: ProductListItem[],
  query: string,
  limit = 8,
): ProductListItem[] {
  const q = query.toLowerCase().trim();
  if (!q || q.length < 2) return [];

  return items
    .filter((product) => {
      const haystack = [
        product.name,
        product.slug,
        product.headline,
        product.subheadline,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .slice(0, limit);
}
