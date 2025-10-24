import type { Product } from "@/types";

export async function getProducts(url: string): Promise<Product[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    const products = data?.products || [];
    return products;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error fetching products:", errorMessage);
    return [];
  }
}
