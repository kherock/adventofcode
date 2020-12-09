import { readLines } from "https://deno.land/std/io/bufio.ts";

const bagPattern = /(\d+) (\w+ \w+) bags?/;
const linePattern = /^(.*) bags contain (?:no other bags|(.*)).$/;

export function parseBags(
  line: string,
): { bag: string; children: Array<{ count: number; bag: string }> } {
  const [, bag, children] = line.match(linePattern)!;
  return {
    bag,
    children: children
      ? children
        .split(", ")
        .map((childBag) => childBag.match(bagPattern)!)
        .map(([, count, bag]) => ({ count: Number(count), bag }))
      : [],
  };
}

if (import.meta.main) {
  const rules: Record<string, Set<string>> = {};

  for await (const line of readLines(await Deno.open("input.txt"))) {
    const { bag, children } = parseBags(line);
    for (const child of children) {
      rules[child.bag] ??= new Set();
      rules[child.bag].add(bag);
    }
  }

  const containers = new Set(["shiny gold"]);
  for (const node of containers) {
    for (const parent of rules[node] ?? []) {
      containers.add(parent);
    }
  }

  console.log(containers.size - 1);
}
