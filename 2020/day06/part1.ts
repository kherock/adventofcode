import { readLines } from "https://deno.land/std/io/bufio.ts";

if (import.meta.main) {
  const currentForm = new Set<string>();
  let sum = 0;
  for await (const line of readLines(await Deno.open("input.txt"))) {
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
