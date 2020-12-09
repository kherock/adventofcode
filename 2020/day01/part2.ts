export function trinomialSum(
  target: number,
  arr: number[],
): [number, number, number] | void {
  const numbers = [...arr].sort((a, b) => a - b);
  const remainders: Record<number, [number, number]> = Object.create(null);
  let sum: number;

  let lIndex = 0;
  let rIndex = 1;
  while (lIndex < numbers.length - 2) {
    sum = numbers[lIndex] + numbers[rIndex];
    if (sum < target) {
      const remainder = target - sum;
      if (
        remainder !== numbers[lIndex] &&
        remainder !== numbers[rIndex]
      ) {
        remainders[remainder] = [numbers[lIndex], numbers[rIndex]];
      }
      ++rIndex;
      if (rIndex === numbers.length) {
        rIndex = ++lIndex + 1;
      }
    } else if (sum >= target) {
      rIndex = ++lIndex + 1;
    }
  }

  for (const candidate of numbers) {
    if (candidate in remainders) {
      const [lValue, rValue] = remainders[candidate];
      return [lValue, rValue, candidate];
    }
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const numbers = input.split(/\s+/).map(Number);
  const terms = trinomialSum(2020, numbers);
  if (!terms) {
    Deno.exit(1);
  }
  console.log(
    `${terms.join(" * ")} = ${terms.reduce((prev, curr) => prev * curr, 1)}`,
  );
}
