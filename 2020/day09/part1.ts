import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { binomialSum } from "../day01/part1.ts";

export async function initializeWindow(
  size: number,
  input: AsyncIterableIterator<string>,
): Promise<number[]> {
  const window: number[] = [];
  for (const _ of Array(size)) {
    const { value } = await input.next();
    window.push(Number(value));
  }
  return window;
}

export async function main(inputPath: string | URL): Promise<void> {
  const input = readLines(await Deno.open(inputPath));
  const window = await initializeWindow(25, input);

  for await (const line of input) {
    if (!line) continue;
    const number = Number(line);

    if (!binomialSum(number, window)) {
      console.log(number);
      Deno.exit(0);
    }
    window.shift();
    window.push(number);
  }

  Deno.exit(1);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
