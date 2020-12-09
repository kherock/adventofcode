import { readLines } from "https://deno.land/std/io/bufio.ts";

export const linePattern = /^(\d+)-(\d+) ([a-z]): (.*)$/;

export function validatePassword(line: string): boolean {
  const [, min, max, letter, password] = linePattern.exec(line) ?? [];
  const matches = [...password.matchAll(new RegExp(letter, "g"))];
  return Number(min) <= matches.length && matches.length <= Number(max);
}

if (import.meta.main) {
  let valid = 0;
  for await (const line of readLines(await Deno.open("input.txt"))) {
    if (validatePassword(line)) valid++;
  }

  console.log(valid);
}
