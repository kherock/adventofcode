import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { stepToboggan, Toboggan } from "./part1.ts";

if (import.meta.main) {
  const toboggans: Toboggan[] = [
    { slope: [1, 1], x: 0, y: 0, trees: 0 },
    { slope: [3, 1], x: 0, y: 0, trees: 0 },
    { slope: [5, 1], x: 0, y: 0, trees: 0 },
    { slope: [7, 1], x: 0, y: 0, trees: 0 },
    { slope: [1, 2], x: 0, y: 0, trees: 0 },
  ];

  for await (const line of readLines(await Deno.open("input.txt"))) {
    for (const toboggan of toboggans) {
      stepToboggan(toboggan, line);
    }
  }

  console.log(toboggans.reduce((acc, { trees }) => acc * trees, 1));
}
