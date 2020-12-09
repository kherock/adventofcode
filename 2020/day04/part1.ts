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

if (import.meta.main) {
  let valid = 0;
  const currentPassport = new Map<string, string>();
  for await (const line of readLines(await Deno.open("input.txt"))) {
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
