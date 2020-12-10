import { assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { trinomialSum } from "./part2.ts";

const sampleInput = [
  1721,
  979,
  366,
  299,
  675,
  1456,
];

Deno.test("day01 part2: sample input", () => {
  const terms = new Set(trinomialSum(2020, sampleInput) ?? []);
  assertEquals(terms, new Set([979, 366, 675]));
});
