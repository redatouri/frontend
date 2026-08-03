import { ApiError } from "./client";

async function parseAdminResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    let body: { detail?: unknown; code?: string; message?: string } | undefined;
    try {
      body = await res.json();
    } catch {
      // ignore
    }
    throw new ApiError(res, body);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

export async function adminFetch<T>(
  path: string,
  token: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`/api/admin-proxy/${path.replace(/^\//, "")}`, {
    ...options,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
      Authorization: `Bearer ${token}`,
    },
  });
  return parseAdminResponse<T>(res);
}

export interface AdminCategoryOption {
  id: string;
  slug: string;
  name: string;
}

export interface AdminProductListItem {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  category_slug: string | null;
  category_name: string | null;
  price: number | null;
  stock: number | null;
  offer_id: string | null;
  is_active: boolean;
  is_featured: boolean;
  primary_image: string | null;
}

export interface AdminProductListResponse {
  items: AdminProductListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface AdminTranslation {
  locale: string;
  name: string;
  headline?: string;
  subheadline?: string;
  description?: string;
  short_description?: string;
  meta_title?: string;
  meta_description?: string;
}

export interface AdminOffer {
  id?: string;
  sku: string;
  label: string;
  price: number;
  compare_at_price?: number | null;
  stock: number;
  is_default?: boolean;
  badge?: string | null;
  sort_order?: number;
}

export interface AdminProductDetail {
  id: string;
  slug: string;
  category_id: string;
  category_slug: string | null;
  category_parent_id?: string | null;
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  translations: AdminTranslation[];
  offers: AdminOffer[];
  images: { url: string; alt_text?: string; sort_order?: number; is_lifestyle?: boolean }[];
  specs: { locale: string; spec_key: string; spec_value: string; sort_order?: number }[];
  cross_sell_ids: string[];
}

export async function getAdminCategories(token: string) {
  return adminFetch<AdminCategoryOption[]>("admin/categories", token);
}

export async function getAdminProducts(
  token: string,
  params?: { page?: number; search?: string; limit?: number },
) {
  const search = new URLSearchParams();
  if (params?.page) search.set("page", String(params.page));
  if (params?.limit) search.set("limit", String(params.limit));
  if (params?.search) search.set("search", params.search);
  const qs = search.toString();
  return adminFetch<AdminProductListResponse>(`admin/products${qs ? `?${qs}` : ""}`, token);
}

export async function getAdminProduct(token: string, id: string) {
  return adminFetch<AdminProductDetail>(`admin/products/${id}`, token);
}

export async function createAdminProduct(
  token: string,
  payload: Record<string, unknown>,
) {
  return adminFetch<AdminProductDetail>("admin/products", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateAdminProduct(
  token: string,
  id: string,
  payload: Record<string, unknown>,
) {
  return adminFetch<AdminProductDetail>(`admin/products/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function deactivateAdminProduct(token: string, id: string) {
  return adminFetch<void>(`admin/products/${id}`, token, { method: "DELETE" });
}

export async function uploadAdminProductImage(
  token: string,
  file: File,
  slug: string,
  index = 0,
) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("slug", slug);
  formData.append("index", String(index));

  const res = await fetch("/api/admin-proxy/admin/upload/product-image", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
    cache: "no-store",
  });
  return parseAdminResponse<{ url: string }>(res);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
