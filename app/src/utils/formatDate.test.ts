import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats date string correctly", () => {
    expect(formatDate("1990-12-25")).toBe("25 December 1990");
  });

  it("handles different locales", () => {
    expect(formatDate("1990-12-25", "en-US")).toBe("December 25, 1990");
  });
});
