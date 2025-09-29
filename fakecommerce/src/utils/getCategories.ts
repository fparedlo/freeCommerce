import type { Category } from "@/types";

export default async function getCategories(URL: string): Promise<Category[]> {
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const categories: Category[] = await response.json();
    return categories;
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
