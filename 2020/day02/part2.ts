import { readLines } from "https://deno.land/std/io/bufio.ts";

const linePattern = /^(\d+)-(\d+) ([a-z]): (.*)$/;
let valid = 0;
for await (const line of readLines(await Deno.open("./input.txt"))) {
  const [, idx1, idx2, letter, password] = linePattern.exec(line) ?? [];
  if (
    Number(password[Number(idx1) - 1] === letter) ^
    Number(password[Number(idx2) - 1] === letter)
  ) {
    valid++;
  }
}

console.log(valid);

export {};
