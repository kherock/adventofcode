import { readLines } from "https://deno.land/std/io/bufio.ts";

const rules: Record<string, Set<string>> = {};

const bagPattern = /(\d+) (\w+ \w+) bags?/;
const linePattern = /^(.*) bags contain (?:no other bags|(.*)).$/;
for await (const line of readLines(await Deno.open("./input.txt"))) {
  const [, headBag, childBags] = line.match(linePattern)!;
  if (childBags) {
    const nodes = childBags.split(", ").map((childBag) =>
      childBag.match(bagPattern)!.slice(1)
    );
    for (const [count, bag] of nodes) {
      rules[bag] ??= new Set();
      rules[bag].add(headBag);
    }
  }
}

const containers = new Set(["shiny gold"]);
for (const node of containers) {
  for (const parent of rules[node] ?? []) {
    containers.add(parent);
  }
}

console.log(containers.size - 1);

export {};
