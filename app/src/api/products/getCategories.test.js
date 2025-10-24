import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCategories } from "./getCategories";

global.fetch = vi.fn();

describe("getCategories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return categories when fetch is successful", async () => {
    const mockCategories = ["electronics", "clothing", "books"];

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCategories,
    });

    const result = await getCategories("https://api.example.com/categories");

    expect(fetch).toHaveBeenCalledWith("https://api.example.com/categories");
    expect(result).toEqual(mockCategories);
  });

  it("should return empty array when response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    // amazonq-ignore-next-line
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await getCategories("https://api.example.com/categories");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching categories:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });

  it("should return empty array when fetch throws an error", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const result = await getCategories("https://api.example.com/categories");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching categories:",
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

    const result = await getCategories("https://api.example.com/categories");

    expect(result).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching categories:",
      expect.any(Error),
    );

    consoleSpy.mockRestore();
  });
});
