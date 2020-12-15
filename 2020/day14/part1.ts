import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export const maskPattern = /^mask = ([X\d]{36})$/;
export const memPattern = /^mem\[(\d+)\] = (\d+)$/;

export type Mask = { AND: number; OR: number };

export function applyMask(mask: Mask, value: number): number {
  return Number(BigInt(value) & BigInt(mask.AND) | BigInt(mask.OR));
}

if (import.meta.main) {
  const mask: Mask = {
    AND: 2 ** 36 - 1,
    OR: 0,
  };
  const mem = new Map<number, number>();
  for await (const line of readLines(await Deno.open("input.txt"))) {
    let match;
    if ((match = line.match(maskPattern))) {
      mask.AND = Number.parseInt(match[1].replaceAll("X", "1"), 2);
      mask.OR = Number.parseInt(match[1].replaceAll("X", "0"), 2);
    } else if ((match = line.match(memPattern))) {
      const [, address, value] = match;
      mem.set(Number(address), applyMask(mask, Number(value)));
    }
  }

  console.log(
    [...mem.values()].reduce((sum, value) => sum + value, 0).toString(),
  );
}
