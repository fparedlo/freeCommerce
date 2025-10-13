import { expect, test } from "vitest";
import previousPrice from "./previousPrice";

test("And item that cost 100 and was discounted by 50 used to cost 200", () => {
  expect(previousPrice(100, 50)).toBe(200);
});
