import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { linePattern } from "./part1.ts";

export function validatePassword(line: string): boolean {
  const [, idx1, idx2, letter, password] = linePattern.exec(line)!;
  return !!(Number(password[Number(idx1) - 1] === letter) ^
    Number(password[Number(idx2) - 1] === letter));
}

if (import.meta.main) {
  let valid = 0;
  for await (const line of readLines(await Deno.open("input.txt"))) {
    if (!line) continue;
    if (validatePassword(line)) valid++;
  }

  console.log(valid);
}
