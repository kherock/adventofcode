import { joltageChain } from "./part1.ts";

/*

1 // 1! = 1
  // total: 1

1 1 // 2!/2! = 1
2   // 1! = 1
    // total: 2

1 1 1 // 3!/3! = 1
2 1   // 2! = 2
3     // 1! = 1
      // total: 4

1 1 1 1 // 4!/4! = 1
2 1 1   // 3!/2! = 3
2 2     // 2!/2! = 2
3 1     // 2! = 2
        // total: 7

*/

function joltagePermutations(n: number): number {
  // n_k = n_(k-3) + n(k-2) + n_(k-1)
  if (n < 0) {
    return 0;
  }
  if (n === 0 || n === 1) {
    return 1;
  }
  return joltagePermutations(n - 3) +
    joltagePermutations(n - 2) +
    joltagePermutations(n - 1);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const diffs = joltageChain(input.split("\n").map(Number));

  const ones: number[] = [];
  let cursor = diffs.indexOf(1);
  while (cursor !== -1 && cursor < diffs.length) {
    const rangeEnd = diffs.indexOf(3, cursor);
    ones.push((rangeEnd === -1 ? diffs.length : rangeEnd) - cursor);
    cursor = diffs.indexOf(1, rangeEnd);
  }
  console.log(
    ones
      .map((length) => joltagePermutations(length))
      .reduce((acc, p) => acc * p, 1),
  );
}
