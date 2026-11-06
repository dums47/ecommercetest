export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sku: string;
  stockCount: number;
  imageUrl: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
