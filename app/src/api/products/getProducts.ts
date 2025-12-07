import type { Product } from "@/types";
import { z } from "zod";

const ReviewSchema = z.object({
  rating: z.number(),
  comment: z.string(),
  date: z.string().transform((str) => new Date(str)),
  reviewerName: z.string(),
  reviewerEmail: z.string(),
});

const MetaSchema = z.object({
  createdAt: z.string().transform((str) => new Date(str)),
  updatedAt: z.string().transform((str) => new Date(str)),
  barcode: z.string(),
  qrCode: z.string(),
});

const DimensionsSchema = z.object({
  width: z.number(),
  height: z.number(),
  depth: z.number(),
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  discountPercentage: z.number(),
  rating: z.number(),
  stock: z.number(),
  tags: z.array(z.string()),
  brand: z.string().optional(),
  sku: z.string(),
  weight: z.number(),
  dimensions: DimensionsSchema,
  warrantyInformation: z.string(),
  shippingInformation: z.string(),
  availabilityStatus: z.string(),
  reviews: z.array(ReviewSchema),
  returnPolicy: z.string(),
  minimumOrderQuantity: z.number(),
  meta: MetaSchema,
  images: z.array(z.string()),
  thumbnail: z.string(),
  category: z.string(),
});

const ProductsResponseSchema = z.object({
  products: z.array(ProductSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export type SortOption = "price-asc" | "price-desc" | "rating" | "name";

export type GetProductsParams = {
  limit?: number;
  skip?: number;
  category?: string;
  search?: string;
  // Client-side filtering and sorting
  sortBy?: SortOption;
  minRating?: number;
};

export async function getProducts({
  limit = 0,
  skip = 0,
  category,
  search,
  sortBy,
  minRating = 0,
}: GetProductsParams = {}): Promise<Product[]> {
  try {
    const baseUrl = import.meta.env.VITE_API_URL || "https://dummyjson.com";
    let url = `${baseUrl}/products`;

    if (search) {
      url += `/search?q=${encodeURIComponent(search)}`;
    } else if (category) {
      url += `/category/${encodeURIComponent(category)}`;
    }

    const separator = url.includes("?") ? "&" : "?";
    url += `${separator}limit=${limit}&skip=${skip}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
    const data = await response.json();

    const parsedData = ProductsResponseSchema.parse(data);
    let products = parsedData.products as Product[];

    // Apply client-side filters
    if (minRating > 0) {
      products = products.filter((p) => p.rating >= minRating);
    }

    // Apply sorting
    if (sortBy) {
      products = [...products].sort((a, b) => {
        switch (sortBy) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "rating":
            return b.rating - a.rating;
          case "name":
            return a.title.localeCompare(b.title);
          default:
            return 0;
        }
      });
    }

    return products;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Unknown error occurred";
    console.error("Error fetching products:", errorMessage);
    return [];
  }
}
