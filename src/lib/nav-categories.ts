import type { Category } from "@/types/category";

const HIDDEN_NAV_CATEGORY_SLUGS = new Set(["action-drones"]);

export function getNavCategories(categories: Category[]): Category[] {
  return categories.filter((category) => !HIDDEN_NAV_CATEGORY_SLUGS.has(category.slug));
}
