export interface IProduct {
  _id: string;
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>; // Dynamic key-value pairs
  inStock: boolean;
  stockCount: number;
  category: string;
  brand: string;
  sku: string;
}
export interface IProductsState {
  products: IProduct[];
  loading: boolean;
  error: string | null;
}