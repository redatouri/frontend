export interface ProductOffer {
  id: string;
  sku?: string;
  label: string;
  price: number;
  compare_at_price?: number | null;
  stock: number;
  is_default: boolean;
  badge?: "best_value" | "limited" | "popular" | null;
}

export interface ProductImage {
  url: string;
  alt_text?: string;
  is_lifestyle?: boolean;
  sort_order?: number;
}

export interface ProductCategoryRef {
  slug: string;
  name: string;
}

export interface ProductListItem {
  id: string;
  slug: string;
  name: string;
  headline?: string;
  subheadline?: string;
  rating: number;
  review_count: number;
  primary_image?: string | null;
  default_offer: ProductOffer;
  category?: ProductCategoryRef;
}

export interface ProductListResponse {
  items: ProductListItem[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductSpec {
  key: string;
  value: string;
}

export interface ProductDetail extends ProductListItem {
  description?: string;
  images: ProductImage[];
  offers: ProductOffer[];
  specs: ProductSpec[];
  cross_sells?: ProductListItem[];
}
