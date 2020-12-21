import { createGame } from "./part1.ts";

export async function main(inputPath: string | URL): Promise<void> {
  const input = await Deno.readTextFile(inputPath);
  let lastNum = Number.NaN;
  // it's slow :(
  for (const number of createGame(input.split(",").map(Number), 30000000)) {
    lastNum = number;
  }
  console.log(lastNum);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
