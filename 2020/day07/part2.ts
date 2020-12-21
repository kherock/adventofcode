import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { parseBags } from "./part1.ts";

export async function main(inputPath: string | URL): Promise<void> {
  const rules: Record<string, Map<string, number>> = {};

  for await (const line of readLines(await Deno.open(inputPath))) {
    if (!line) continue;
    const { bag, children } = parseBags(line);
    rules[bag] = new Map();
    for (const child of children) {
      rules[bag].set(child.bag, child.count);
    }
  }

  const containers = ["shiny gold"];
  for (const node of containers) {
    for (const [bag, count] of rules[node] ?? []) {
      containers.push(...Array(count).fill(bag));
    }
  }

  console.log(containers.length - 1);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
