import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { fieldPattern, requiredFields } from "./part1.ts";

function inRange([min, max]: [number, number], value: string) {
  const number = Number(value);
  return min <= number && number <= max;
}

const validators: Record<
  (typeof requiredFields)[number],
  (value: string) => boolean
> = {
  byr: (birthYear) => inRange([1920, 2002], birthYear),
  iyr: (issueYear) => inRange([2010, 2020], issueYear),
  eyr: (expiration) => inRange([2020, 2030], expiration),
  hgt: (heightUnits) => {
    const [, height, units] = heightUnits.match(/^(\d+)(cm|in)$/) ?? [];
    switch (units) {
      case "cm":
        return inRange([150, 193], height);
      case "in":
        return inRange([59, 76], height);
      default:
        return false;
    }
  },
  hcl: (hairColor) => /^#[0-9a-f]{6}$/.test(hairColor),
  ecl: (eyeColor) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(eyeColor),
  pid: (passportId) => /^[0-9]{9}$/.test(passportId),
};

export function validatePassport(passport: Map<string, string>) {
  return requiredFields.every((field) =>
    validators[field](passport.get(field) ?? "")
  );
}

export async function main(inputPath: string | URL): Promise<void> {
  let valid = 0;
  const currentPassport = new Map<string, string>();
  for await (const line of readLines(await Deno.open(inputPath))) {
    if (line) {
      for (const [, field, value] of line.matchAll(fieldPattern)) {
        currentPassport.set(field, value);
      }
      continue;
    }
    if (validatePassport(currentPassport)) valid++;
    currentPassport.clear();
  }

  console.log(valid);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
