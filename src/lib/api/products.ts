import { api } from "./client";
import { getDemoProduct, getDemoProducts, isDemoModeEnabled } from "@/lib/demo-products";
import type {
  ProductDetail,
  ProductListItem,
  ProductListResponse,
} from "@/types/product";

export interface ProductQuery {
  locale: string;
  category?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
  sort?: "popular" | "price_asc" | "price_desc" | "newest";
  min_price?: number;
  max_price?: number;
  in_stock?: boolean;
}

export async function getProducts(
  params: ProductQuery,
): Promise<ProductListResponse> {
  if (isDemoModeEnabled()) {
    return getDemoProducts(params);
  }

  try {
    const search = new URLSearchParams({ locale: params.locale });
    if (params.category) search.set("category", params.category);
    if (params.featured) search.set("featured", "true");
    if (params.page) search.set("page", String(params.page));
    if (params.limit) search.set("limit", String(Math.min(params.limit, 50)));
    if (params.sort) search.set("sort", params.sort);
    if (params.min_price != null) search.set("min_price", String(params.min_price));
    if (params.max_price != null) search.set("max_price", String(params.max_price));
    if (params.in_stock != null) search.set("in_stock", String(params.in_stock));

    return await api<ProductListResponse>(`/products?${search}`, { cache: "no-store" });
  } catch {
    if (isDemoModeEnabled()) {
      return getDemoProducts(params);
    }
    return { items: [], total: 0, page: 1, limit: 20 };
  }
}

export async function getProduct(
  slug: string,
  locale: string,
): Promise<ProductDetail | null> {
  if (isDemoModeEnabled()) {
    return getDemoProduct(slug);
  }

  try {
    return await api<ProductDetail>(`/products/${slug}?locale=${locale}`, {
      cache: "no-store",
    });
  } catch {
    if (isDemoModeEnabled()) {
      return getDemoProduct(slug);
    }
    return null;
  }
}

export async function getCrossSells(
  productIds: string[],
  locale: string,
  limit = 4,
): Promise<ProductListItem[]> {
  if (productIds.length === 0) return [];
  try {
    const search = new URLSearchParams({ locale, limit: String(limit) });
    productIds.forEach((id) => search.append("product_ids", id));
    const data = await api<{ items: ProductListItem[] }>(`/cross-sells?${search}`);
    return data.items;
  } catch {
    return [];
  }
}
