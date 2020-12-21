import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { inRanges, ParseMode, parseRule, parseTicket, Rule } from "./part1.ts";

export function* markInvalid(
  rules: Rule[],
  values: number[],
): Generator<{ name: string; index: number }> {
  const invalidRules = values.map((value) =>
    rules.filter((rule) => !inRanges(rule.ranges, value))
  );
  if (invalidRules.every((arr) => arr.length < rules.length)) {
    for (let index = 0; index < invalidRules.length; index++) {
      for (const { name } of invalidRules[index]) {
        yield { name, index };
      }
    }
  }
}

if (import.meta.main) {
  const notes = readLines(await Deno.open("input.txt"));
  const rules: Rule[] = [];
  const decoder = new Map<string, Set<number>>();
  const myTicket: number[] = [];

  let mode = ParseMode.RULES;
  for await (const line of notes) {
    if (!line) {
      if (mode++ === ParseMode.RULES) {
        for (const rule of rules) {
          decoder.set(rule.name, new Set(Array(rules.length).keys()));
        }
      }
      await notes.next();
      continue;
    }
    switch (mode) {
      case ParseMode.RULES:
        rules.push(parseRule(line));
        break;
      case ParseMode.MY_TICKET:
        myTicket.push(...parseTicket(line));
        break;
      case ParseMode.NEARBY_TICKETS: {
        for (const { name, index } of markInvalid(rules, parseTicket(line))) {
          decoder.get(name)!.delete(index);
        }
        break;
      }
    }
  }

  const entries = [...decoder];
  do {
    entries.sort((a, b) => a[1].size - b[1].size);
    const [name, candidates] = entries.shift()!;
    if (candidates.size !== 1) {
      throw new Error(`Could not deduce a single candidate for ${name}`);
    }
    const [knownIndex] = candidates;
    for (const [, otherCandidates] of entries) {
      otherCandidates.delete(knownIndex);
    }
  } while (entries.length);
  const departureProduct = [...decoder].reduce((acc, [name, [index]]) => {
    return name.startsWith("departure") ? acc * myTicket[index] : acc;
  }, 1);
  console.log(departureProduct);
}
