import { createGame } from "./part1.ts";

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  let lastNum = Number.NaN;
  // it's slow :(
  for (const number of createGame(input.split(",").map(Number), 30000000)) {
    lastNum = number;
  }
  console.log(lastNum);
}
