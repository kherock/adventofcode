import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export async function main(inputPath: string | URL): Promise<void> {
  const currentForm = new Set<Set<string>>();
  let sum = 0;
  for await (const line of readLines(await Deno.open(inputPath))) {
    if (line) {
      currentForm.add(new Set(line.split("")));
    } else {
      const answerPool = new Set([...currentForm].flatMap((set) => [...set]));
      for (const answer of answerPool) {
        for (const answerSet of currentForm) {
          if (!answerSet.has(answer)) {
            answerPool.delete(answer);
          }
        }
      }
      sum += answerPool.size;
      currentForm.clear();
    }
  }

  console.log(sum);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
