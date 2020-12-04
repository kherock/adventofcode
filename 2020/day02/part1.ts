import { readLines } from "https://deno.land/std/io/bufio.ts";

const linePattern = /^(\d+)-(\d+) ([a-z]): (.*)$/;
let valid = 0;
for await (const line of readLines(await Deno.open("./input.txt"))) {
  const [, min, max, letter, password] = linePattern.exec(line) ?? [];
  const matches = [...password.matchAll(new RegExp(letter, "g"))];
  if (Number(min) <= matches.length && matches.length <= Number(max)) {
    valid++;
  }
}

console.log(valid);

export {};
