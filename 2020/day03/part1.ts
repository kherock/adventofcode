import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

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

export async function main(inputPath: string | URL): Promise<void> {
  const toboggan: Toboggan = { slope: [3, 1], x: 0, y: 0, trees: 0 };

  for await (const line of readLines(await Deno.open(inputPath))) {
    if (!line) continue;
    stepToboggan(toboggan, line);
  }

  console.log(toboggan.trees);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
