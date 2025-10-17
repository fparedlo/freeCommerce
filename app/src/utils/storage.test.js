import { expect, test, afterAll, beforeAll } from "vitest";
import { getSessionStorageItem } from "./";

beforeAll(() => {
  const mockStorage = {
    getItem: (key) => mockStorage[key] || null,
    setItem: (key, value) => { mockStorage[key] = value; },
    removeItem: (key) => { delete mockStorage[key]; }
  };
  Object.defineProperty(global, "sessionStorage", {
    value: mockStorage,
    writable: true,
  });
});

afterAll(() => {
  sessionStorage.removeItem("storage-test");
});

test("getSessionStorageItem returns null when item doesn't exist", () => {
  expect(getSessionStorageItem("nonexistent")).toBe(null);
});

test("getSessionStorageItem returns value when item exists", () => {
  sessionStorage.setItem("storage-test", "abc123");
  expect(getSessionStorageItem("storage-test")).toBe("abc123");
});
