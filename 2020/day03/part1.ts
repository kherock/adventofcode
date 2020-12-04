import { readLines } from "https://deno.land/std/io/bufio.ts";

let x = 0;
let trees = 0;

for await (const line of readLines(await Deno.open("./input.txt"))) {
  if (line[x] === "#") {
    ++trees;
  }
  x = (x + 3) % line.length;
}

console.log(trees);

export {};
