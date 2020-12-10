import { assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { stepToboggan, Toboggan } from "./part1.ts";

const sampleInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

Deno.test("day03 part1: sample input", () => {
  const toboggan: Toboggan = { slope: [3, 1], x: 0, y: 0, trees: 0 };

  for (const line of sampleInput) {
    stepToboggan(toboggan, line);
  }

  assertEquals(toboggan.trees, 7);
});
