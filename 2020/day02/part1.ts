import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export const linePattern = /^(\d+)-(\d+) ([a-z]): (.*)$/;

export function validatePassword(line: string): boolean {
  const [, min, max, letter, password] = linePattern.exec(line) ?? [];
  const matches = [...password.matchAll(new RegExp(letter, "g"))];
  return Number(min) <= matches.length && matches.length <= Number(max);
}

export async function main(inputPath: string | URL): Promise<void> {
  let valid = 0;
  for await (const line of readLines(await Deno.open(inputPath))) {
    if (!line) continue;
    if (validatePassword(line)) valid++;
  }

  console.log(valid);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
