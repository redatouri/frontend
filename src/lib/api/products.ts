import { cache } from "react";
import { api, ApiError } from "./client";
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
  if (!offer) {
    throw new Error("Product offer is missing");
  }

  return {
    ...offer,
    price: toNumber(offer.price),
    compare_at_price:
      offer.compare_at_price != null ? toNumber(offer.compare_at_price) : null,
    stock: toNumber(offer.stock),
  };
}

function resolveDefaultOffer(product: {
  default_offer?: ProductListItem["default_offer"];
  offers?: ProductDetail["offers"];
}) {
  return (
    product.default_offer ??
    product.offers?.find((offer) => offer.is_default) ??
    product.offers?.[0] ??
    null
  );
}

function normalizeProductListItem(item: ProductListItem): ProductListItem {
  const defaultOffer = resolveDefaultOffer(item);
  if (!defaultOffer) {
    throw new Error(`Product ${item.slug} is missing a default offer`);
  }

  return {
    ...item,
    rating: toNumber(item.rating),
    review_count: toNumber(item.review_count),
    default_offer: normalizeOffer(defaultOffer),
  };
}

function normalizeProductDetail(product: ProductDetail): ProductDetail {
  const normalizedOffers = product.offers.map(normalizeOffer);
  const defaultOffer = resolveDefaultOffer(product);

  return {
    ...product,
    rating: toNumber(product.rating),
    review_count: toNumber(product.review_count),
    primary_image: product.primary_image ?? product.images[0]?.url ?? null,
    default_offer: defaultOffer
      ? normalizeOffer(defaultOffer)
      : normalizedOffers[0],
    description: product.description,
    images: product.images,
    specs: product.specs,
    offers: normalizedOffers,
    cross_sells: product.cross_sells?.map(normalizeProductListItem),
  };
}

function normalizeProductListResponse(data: ProductListResponse): ProductListResponse {
  return {
    ...data,
    items: data.items.map(normalizeProductListItem),
  };
}

function productQueryKey(params: ProductQuery): string {
  return JSON.stringify(params);
}

async function fetchProducts(params: ProductQuery): Promise<ProductListResponse> {
  if (isDemoModeEnabled()) {
    return getDemoProducts(params);
  }

  try {
    const search = new URLSearchParams({ locale: params.locale });
    if (params.category) search.set("category", params.category);
    if (params.featured) search.set("featured", "true");
    if (params.page) search.set("page", String(params.page));
    if (params.limit) search.set("limit", String(Math.min(params.limit, 100)));
    if (params.sort) search.set("sort", params.sort);
    if (params.min_price != null) search.set("min_price", String(params.min_price));
    if (params.max_price != null) search.set("max_price", String(params.max_price));
    if (params.in_stock != null) search.set("in_stock", String(params.in_stock));

    const data = await api<ProductListResponse>(`/products?${search}`);
    return normalizeProductListResponse(data);
  } catch (error) {
    if (isDemoModeEnabled()) {
      return getDemoProducts(params);
    }
    if (error instanceof ApiError && error.status >= 400 && error.status < 500) {
      return {
        items: [],
        total: 0,
        page: params.page ?? 1,
        limit: Math.min(params.limit ?? 20, 100),
      };
    }
    throw error;
  }
}

const getProductsCached = cache(async (key: string, params: ProductQuery) => {
  void key;
  return fetchProducts(params);
});

export function getProducts(params: ProductQuery): Promise<ProductListResponse> {
  return getProductsCached(productQueryKey(params), params);
}

const getProductCached = cache(async (slug: string, locale: string) => {
  if (isDemoModeEnabled()) {
    return getDemoProduct(slug);
  }

  try {
    const product = await api<ProductDetail>(`/products/${slug}?locale=${locale}`);
    return normalizeProductDetail(product);
  } catch (error) {
    if (isDemoModeEnabled()) {
      return getDemoProduct(slug);
    }
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
});

export function getProduct(
  slug: string,
  locale: string,
): Promise<ProductDetail | null> {
  return getProductCached(slug, locale);
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
