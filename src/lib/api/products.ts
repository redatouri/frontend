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

function toNumber(value: unknown, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeOffer(offer: ProductListItem["default_offer"]) {
  return {
    ...offer,
    price: toNumber(offer.price),
    compare_at_price:
      offer.compare_at_price != null ? toNumber(offer.compare_at_price) : null,
    stock: toNumber(offer.stock),
  };
}

function normalizeProductListItem(item: ProductListItem): ProductListItem {
  return {
    ...item,
    rating: toNumber(item.rating),
    review_count: toNumber(item.review_count),
    default_offer: normalizeOffer(item.default_offer),
  };
}

function normalizeProductDetail(product: ProductDetail): ProductDetail {
  return {
    ...normalizeProductListItem(product),
    description: product.description,
    images: product.images,
    specs: product.specs,
    offers: product.offers.map(normalizeOffer),
    cross_sells: product.cross_sells?.map(normalizeProductListItem),
  };
}

function normalizeProductListResponse(data: ProductListResponse): ProductListResponse {
  return {
    ...data,
    items: data.items.map(normalizeProductListItem),
  };
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

    const data = await api<ProductListResponse>(`/products?${search}`, { cache: "no-store" });
    return normalizeProductListResponse(data);
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
    const product = await api<ProductDetail>(`/products/${slug}?locale=${locale}`, {
      cache: "no-store",
    });
    return normalizeProductDetail(product);
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
    return data.items.map(normalizeProductListItem);
  } catch {
    return [];
  }
}
