interface CommerceAsset {
  image_dimensions: { width: number; height: number };
  description: string | null;
  id: string;
  url: string;
}

export interface Category {
  description: string | null;
  id: string;
  name: string;
  products: number;
  slug: string;
  assets: CommerceAsset[];
}
interface ProductData {
  categories: Array<{ id: string; name: string; slug: string }>;
  checkout_url: { checkout: string; display: string };
  description: string;
  id: string;
  media: { source: string; type: string };
  name: string;
  permalink: string;
  price: {
    raw: number;
    formatted: string;
    formatted_with_symbol: string;
    formatted_with_code: string;
  };
  related_products: Array<unknown>;
  sku: unknown;
  variant_groups: Array<unknown>;
  quantity?: number; //not sure about this here
}

export type Product = Partial<ProductData>;
