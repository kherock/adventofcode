import { assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { binomialSum } from "./part1.ts";

// https://github.com/denoland/deno/issues/4644 would nice to have

const sampleInput = [
  1721,
  979,
  366,
  299,
  675,
  1456,
];

Deno.test("day01 part1: sample input", () => {
  const terms = new Set(binomialSum(2020, sampleInput) ?? []);
  assertEquals(terms, new Set([1721, 299]));
});
