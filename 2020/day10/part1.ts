export function joltageChain(input: number[]): number[] {
  const joltages = [0, ...input].sort((a, b) => a - b);
  joltages.push(joltages[joltages.length - 1] + 3);
  return joltages
    .slice(1)
    .map((joltage, idx) => joltage - joltages[idx]);
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const diffs = joltageChain(input.split("\n").map(Number))
    .sort((a, b) => a - b);
  const threes = diffs.splice(diffs.indexOf(3));
  console.log(
    `${diffs.length} * ${threes.length} = ${diffs.length * threes.length}`,
  );
}
