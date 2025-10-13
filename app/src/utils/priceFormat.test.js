import { expect, test } from "vitest";
import priceFormat from "./priceFormat";

test("to format 50 to £50.00", () => {
  expect(priceFormat(50)).toBe("£50.00");
});
