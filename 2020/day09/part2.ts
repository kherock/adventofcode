import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { initializeWindow } from "./part1.ts";

if (import.meta.main) {
  const target = 675280050;

  const input = readLines(await Deno.open("input.txt"));
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
