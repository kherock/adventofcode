import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

if (import.meta.main) {
  const currentForm = new Set<Set<string>>();
  let sum = 0;
  for await (const line of readLines(await Deno.open("input.txt"))) {
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
