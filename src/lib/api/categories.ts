import { cache } from "react";
import { api } from "./client";
import type { Category, CategoryListResponse } from "@/types/category";

const getCategoriesCached = cache(
  async (locale: string, top?: boolean): Promise<Category[]> => {
    try {
      const search = new URLSearchParams({ locale });
      if (top) search.set("top", "true");
      const data = await api<CategoryListResponse>(`/categories?${search}`);
      return data.items;
    } catch {
      return [];
    }
  },
);

export function getCategories(params: {
  locale: string;
  top?: boolean;
}): Promise<Category[]> {
  return getCategoriesCached(params.locale, params.top);
}

const getCategoryCached = cache(async (slug: string, locale: string) => {
  try {
    return await api<Category>(`/categories/${slug}?locale=${locale}`);
  } catch {
    return null;
  }
});

export function getCategory(
  slug: string,
  locale: string,
): Promise<Category | null> {
  return getCategoryCached(slug, locale);
}
