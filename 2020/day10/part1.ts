/**
 * Returns the list of joltage increases from each adapter in an input list
 */
export function computeJoltageChain(adapters: number[]): number[] {
  const sortedRatings = [0, ...adapters].sort((a, b) => a - b);
  sortedRatings.push(sortedRatings[sortedRatings.length - 1] + 3);
  return sortedRatings
    .slice(1)
    .map((rating, idx) => rating - sortedRatings[idx]);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const adapters = input.split("\n").map(Number);

  const counts = computeJoltageChain(adapters)
    .sort((a, b) => a - b)
    .reduce((acc, n) => (acc[n - 1]++, acc), Array<number>(3).fill(0));

  console.log(
    `${counts[0]} * ${counts[2]} = ${counts[0] * counts[2]}`,
  );
}
