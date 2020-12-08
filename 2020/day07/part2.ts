import { readLines } from "https://deno.land/std/io/bufio.ts";

const rules: Record<string, Map<string, number>> = {};

const bagPattern = /(\d+) (\w+ \w+) bags?/;
const linePattern = /^(.*) bags contain (?:no other bags|(.*)).$/;
for await (const line of readLines(await Deno.open("./input.txt"))) {
  const [, headBag, childBags] = line.match(linePattern)!;
  rules[headBag] ??= new Map();
  if (childBags) {
    const nodes = childBags.split(", ").map((childBag) =>
      childBag.match(bagPattern)!.slice(1)
    );
    for (const [count, bag] of nodes) {
      rules[headBag].set(bag, Number(count));
    }
  }
}

const containers = ["shiny gold"];
for (const node of containers) {
  for (const [bag, count] of rules[node] ?? []) {
    containers.push(...Array(count).fill(bag));
  }
}

console.log(containers.length - 1);

export {};
