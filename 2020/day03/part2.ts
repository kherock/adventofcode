import { readLines } from "https://deno.land/std/io/bufio.ts";

const toboggans = [
  { slope: [1, 1], x: 0, y: 0, trees: 0 },
  { slope: [3, 1], x: 0, y: 0, trees: 0 },
  { slope: [5, 1], x: 0, y: 0, trees: 0 },
  { slope: [7, 1], x: 0, y: 0, trees: 0 },
  { slope: [1, 2], x: 0, y: 0, trees: 0 },
];

for await (const line of readLines(await Deno.open("./input.txt"))) {
  for (const toboggan of toboggans) {
    if (toboggan.y % toboggan.slope[1] === 0) {
      if (line[toboggan.x] === "#") {
        ++toboggan.trees;
      }
      toboggan.x = (toboggan.x + toboggan.slope[0]) % line.length;
    }
    ++toboggan.y;
  }
}

console.log(toboggans.reduce((acc, { trees }) => acc * trees, 1));

export {};
