import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export interface Rule {
  name: string;
  ranges: [start: number, end: number][];
}

export enum ParseMode {
  RULES = 0,
  MY_TICKET = 1,
  NEARBY_TICKETS = 2,
}

const rulePattern = /^([\w\s]+): (\d+)-(\d+) or (\d+)-(\d+)$/;

export function parseRule(input: string): Rule {
  const [, name, ...ranges] = input.match(rulePattern)!;
  const [start0, end0, start1, end1] = ranges.map(Number);
  return {
    name,
    ranges: [[start0, end0], [start1, end1]],
  };
}

export function parseTicket(input: string): number[] {
  return input.split(",").map(Number);
}

export function inRanges(ranges: Rule["ranges"], value: number): boolean {
  return ranges.some(([start, end]) => start <= value && value <= end);
}

if (import.meta.main) {
  const notes = readLines(await Deno.open("input.txt"));
  const rules: Rule[] = [];

  let mode = ParseMode.RULES;
  let errorRate = 0;
  for await (const line of notes) {
    if (!line) {
      mode++;
      await notes.next();
      continue;
    }
    switch (mode) {
      case ParseMode.RULES:
        rules.push(parseRule(line));
        break;
      case ParseMode.MY_TICKET:
        break;
      case ParseMode.NEARBY_TICKETS: {
        for (const value of parseTicket(line)) {
          if (!rules.some(({ ranges }) => inRanges(ranges, value))) {
            errorRate += value;
          }
        }
        break;
      }
    }
  }
  console.log(errorRate);
}
