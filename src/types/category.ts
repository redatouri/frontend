export interface CategoryChild {
  slug: string;
  name: string;
  product_count: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image_url?: string | null;
  product_count: number;
  children?: CategoryChild[];
}

export interface CategoryListResponse {
  items: Category[];
}
