import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { initializeWindow } from "./part1.ts";

export async function main(inputPath: string | URL): Promise<void> {
  const target = 675280050;

  const input = readLines(await Deno.open(inputPath));
  const window = await initializeWindow(2, input);

  while (window[window.length - 1] < target) {
    const sum = window.reduce((acc, value) => acc + value);
    if (sum === target) {
      console.info(window);
      window.sort((a, b) => a - b);
      console.log(
        `${window[0]} + ${window[window.length - 1]} = ${window[0] +
          window[window.length - 1]}`,
      );
      Deno.exit(0);
    }
    if (sum < target) {
      const { value } = await input.next();
      if (!value) continue;
      value.push(Number(value));
    } else if (sum > target) {
      window.shift();
    }
  }

  Deno.exit(1);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
