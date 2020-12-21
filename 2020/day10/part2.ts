import { computeJoltageChain } from "./part1.ts";

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

// n_k = n_(k-3) + n(k-2) + n_(k-1)
export function joltagePermutations(k: number): number {
  if (k < 0) {
    return 0;
  }
  if (k < 2) {
    return 1;
  }
  return joltagePermutations(k - 3) +
    joltagePermutations(k - 2) +
    joltagePermutations(k - 1);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const adapters = input.split("\n").filter(Boolean).map(Number);

  const arrangements = computeJoltageChain(adapters)
    .reduce((acc, diff) => {
      if (diff === 1) {
        acc[acc.length - 1]++;
      } else {
        acc.push(0);
      }
      return acc;
    }, [0] as number[])
    .map((length) => joltagePermutations(length))
    .reduce((acc, p) => acc * p, 1);

  console.log(arrangements);
}
