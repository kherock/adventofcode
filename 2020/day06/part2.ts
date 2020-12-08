import { readLines } from "https://deno.land/std/io/bufio.ts";

const currentForm = new Set<Set<string>>();
let sum = 0;
for await (const line of readLines(await Deno.open("./input.txt"))) {
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

export {};
