import type { Category } from "@/types";

export async function getCategories(apiUrl: string): Promise<Category[]> {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected array");
    }
    return data as Category[];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
