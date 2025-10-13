import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts } from "./getProducts";

// Mock fetch globally
global.fetch = vi.fn();

describe("getProducts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return products when fetch is successful", async () => {
    const mockProducts = [
      { id: 1, title: "Product 1", price: 10.99 },
      { id: 2, title: "Product 2", price: 20.99 },
    ];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ products: mockProducts }),
    });

    const result = await getProducts("https://api.example.com/products");

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/products");
    expect(result).toEqual(mockProducts);
  });

  it("should return empty array when response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await getProducts("https://api.example.com/products");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching products:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should return empty array when fetch throws an error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await getProducts("https://api.example.com/products");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching products:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should return empty array when JSON parsing fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await getProducts("https://api.example.com/products");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching products:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
