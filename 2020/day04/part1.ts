import { readLines } from "https://deno.land/std/io/bufio.ts";

const requiredFields = [
  "byr",
  "iyr",
  "eyr",
  "hgt",
  "hcl",
  "ecl",
  "pid",
  // 'cid',
] as const;

const fieldPattern = /([a-z]{3}):(\S+)/g;

let valid = 0;
const currentPassport = new Map<string, string>();
for await (const line of readLines(await Deno.open("./input.txt"))) {
  if (line) {
    for (const [, field, value] of line.matchAll(fieldPattern)) {
      currentPassport.set(field, value);
    }
  } else {
    if (requiredFields.every((field) => currentPassport.has(field))) {
      valid++;
    }
    currentPassport.clear();
  }
}

console.log(valid);

export {};
