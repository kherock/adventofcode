import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export async function main(inputPath: string | URL): Promise<void> {
  const currentForm = new Set<string>();
  let sum = 0;
  for await (const line of readLines(await Deno.open(inputPath))) {
    if (line) {
      for (const response of line.split("")) {
        currentForm.add(response);
      }
    } else {
      sum += currentForm.size;
      currentForm.clear();
    }
  }

  console.log(sum);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
