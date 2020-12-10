import { assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { stepToboggan, Toboggan } from "./part1.ts";

const input = [
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

const tests: Array<{ slope: Toboggan["slope"]; expected: number }> = [
  { slope: [1, 1], expected: 2 },
  { slope: [3, 1], expected: 7 },
  { slope: [5, 1], expected: 3 },
  { slope: [7, 1], expected: 4 },
  { slope: [1, 2], expected: 2 },
];

for (const { slope, expected } of tests) {
  Deno.test(`day03 part2: sample input slope ${slope[1]}/${slope[0]}`, () => {
    const toboggan: Toboggan = { slope, x: 0, y: 0, trees: 0 };

    for (const line of input) {
      stepToboggan(toboggan, line);
    }

    assertEquals(toboggan.trees, expected);
  });
}
