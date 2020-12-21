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

if (import.meta.main) {
  const input = readLines(await Deno.open("input.txt"));
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
