import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { applyMask, Mask, maskPattern, memPattern } from "./part1.ts";

function generateMasks(mask: string): Mask[] {
  return mask
    .split("")
    .reduce(
      (masks, bit) => {
        // this is written imperatively for performance reasons
        switch (bit) {
          case "0":
          case "1":
            for (const { AND, OR } of masks) {
              AND.push("1");
              OR.push(bit);
            }
            break;
          case "X": {
            // create masks where the bit is written as 1
            const newMasks = masks.map(({ AND, OR }) => ({
              AND: [...AND, "0"],
              OR: [...OR, "1"],
            }));
            // write bit as 0
            for (const { AND, OR } of masks) {
              AND.push("0");
              OR.push("0");
            }
            masks.push(...newMasks);
            break;
          }
        }
        return masks;
      },
      [{ AND: [], OR: [] } as { [k in keyof Mask]: string[] }],
    )
    .map(({ AND, OR }) => ({
      AND: Number.parseInt(AND.join(""), 2),
      OR: Number.parseInt(OR.join(""), 2),
    }));
}

if (import.meta.main) {
  let masks: Mask[] = [{ AND: 2 ** 36 - 1, OR: 0 }];
  const mem = new Map<number, number>();
  for await (const line of readLines(await Deno.open("input.txt"))) {
    let match;
    if ((match = line.match(maskPattern))) {
      masks = generateMasks(match[1]);
    } else if ((match = line.match(memPattern))) {
      const [, addressStr, value] = match;
      for (const mask of masks) {
        const decodedAddress = applyMask(mask, Number(addressStr));
        mem.set(decodedAddress, Number(value));
      }
    }
  }
  console.log(
    [...mem.values()].reduce((sum, value) => sum + value, 0).toString(),
  );
}
