import { readLines } from "https://deno.land/std/io/bufio.ts";

export interface Toboggan {
  readonly slope: [xDelta: number, yDelta: number];
  x: number;
  y: number;
  trees: number;
}

export function stepToboggan(toboggan: Toboggan, line: string): void {
  if (toboggan.y % toboggan.slope[1] === 0) {
    if (line[toboggan.x] === "#") toboggan.trees++;
    toboggan.x = (toboggan.x + toboggan.slope[0]) % line.length;
  }
  toboggan.y++;
}

if (import.meta.main) {
  const toboggan: Toboggan = { slope: [3, 1], x: 0, y: 0, trees: 0 };

  for await (const line of readLines(await Deno.open("input.txt"))) {
    stepToboggan(toboggan, line);
  }

  console.log(toboggan.trees);
}
