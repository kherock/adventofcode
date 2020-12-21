export function binomialSum(
  target: number,
  arr: number[],
): [number, number] | undefined {
  const numbers = [...arr].sort((a, b) => a - b);
  let lIndex = 0;
  let rIndex = numbers.length - 1;

  let sum: number;
  while (lIndex < rIndex) {
    sum = numbers[lIndex] + numbers[rIndex];
    if (sum < target) {
      ++lIndex;
    } else if (sum > target) {
      --rIndex;
    } else {
      return [numbers[lIndex], numbers[rIndex]];
    }
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const numbers = input.split(/\s+/).filter(Boolean).map(Number);

  const terms = binomialSum(2020, numbers);
  if (!terms) {
    Deno.exit(1);
  }
  console.log(
    `${terms.join(" * ")} = ${terms.reduce((prev, curr) => prev * curr, 1)}`,
  );
}
