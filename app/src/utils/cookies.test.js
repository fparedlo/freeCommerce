import { expect, test, beforeEach, vi } from "vitest";
import { getCookie } from "./";

beforeEach(() => {
  Object.defineProperty(global, "document", {
    value: { cookie: "" },
    writable: true,
  });
});

test("getCookie returns null when cookie doesn't exist", () => {
  document.cookie = "";
  expect(getCookie("nonexistent")).toBe(null);
});

test("getCookie returns value when cookie exists", () => {
  document.cookie = "accessToken=abc123";
  expect(getCookie("accessToken")).toBe("abc123");
});
