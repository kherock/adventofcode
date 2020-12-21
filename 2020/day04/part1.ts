import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // 'cid',
] as const;

export const fieldPattern = /([a-z]{3}):(\S+)/g;

export function validatePassport(passport: Map<string, string>): boolean {
  return requiredFields.every((field) => passport.has(field));
}

export async function main(inputPath: string | URL): Promise<void> {
  let valid = 0;
  const currentPassport = new Map<string, string>();
  for await (const line of readLines(await Deno.open(inputPath))) {
    if (line) {
      for (const [, field, value] of line.matchAll(fieldPattern)) {
        currentPassport.set(field, value);
      }
    } else {
      if (validatePassport(currentPassport)) valid++;
      currentPassport.clear();
    }
  }

  console.log(valid);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
