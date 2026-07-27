import { api } from "./client";
import type { Category, CategoryListResponse } from "@/types/category";

export async function getCategories(params: {
  locale: string;
  top?: boolean;
}): Promise<Category[]> {
  try {
    const search = new URLSearchParams({ locale: params.locale });
    if (params.top) search.set("top", "true");
    const data = await api<CategoryListResponse>(`/categories?${search}`);
    return data.items;
  } catch {
    return [];
  }
}

export async function getCategory(
  slug: string,
  locale: string,
): Promise<Category | null> {
  try {
    return await api<Category>(`/categories/${slug}?locale=${locale}`);
  } catch {
    return null;
  }
}
