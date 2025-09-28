import type { Product } from "@/types";

export default async function getAllProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const { products }: { products: Product[] } = await response.json();
    return products;
  } catch (err) {
    console.error("Error fetching all products:", err);
    return [];
  }
}
