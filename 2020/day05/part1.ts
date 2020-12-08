import { readLines } from "https://deno.land/std/io/bufio.ts";

let max = -1;
for await (const line of readLines(await Deno.open("./input.txt"))) {
  let row = 0;
  for (let i = 0; i < 7; ++i) {
    const intervalLength = 2 ** (7 - i);
    if (line[i] === "B") {
      row += intervalLength / 2;
    }
  }
  let col = 0;
  for (let i = 0; i < 3; ++i) {
    const intervalLength = 2 ** (3 - i);
    if (line[i + 7] === "R") {
      col += intervalLength / 2;
    }
  }
  const seatId = 8 * row + col;
  max = Math.max(max, seatId);
}

console.log(max);

export {};
