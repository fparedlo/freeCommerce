import type { Category } from "@/types";
import { z } from "zod";

const CategorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string(),
});

export async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "https://dummyjson.com";
    const url = `${baseUrl}/products/categories`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data: unknown = await response.json();

    const parsedData = z.array(CategorySchema).parse(data);
    return parsedData as Category[];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}
