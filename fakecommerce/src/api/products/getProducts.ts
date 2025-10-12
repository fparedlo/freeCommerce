import type { Product } from "@/types";

export async function getProducts(URL: string): Promise<Product[]> {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const { products }: { products: Product[] } = await response.json();
    return products;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}
