export function trinomialSum(
  target: number,
  arr: number[],
): [number, number, number] | undefined {
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

export async function main(inputPath: string | URL): Promise<void> {
  const input = await Deno.readTextFile(inputPath);
  const numbers = input.split(/\s+/).filter(Boolean).map(Number);

  const terms = trinomialSum(2020, numbers);
  if (!terms) {
    Deno.exit(1);
  }
  console.log(
    `${terms.join(" * ")} = ${terms.reduce((prev, curr) => prev * curr, 1)}`,
  );
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
