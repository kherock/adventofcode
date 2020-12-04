const input = await Deno.readTextFile("input.txt");
const numbers = input.split(/\s+/).map(Number).sort((a, b) => a - b);

let sum: number;
const remainders: Record<number, [number, number]> = Object.create(null);

let lIndex = 0;
let rIndex = 1;
while (lIndex < numbers.length - 2) {
  sum = numbers[lIndex] + numbers[rIndex];
  if (sum < 2020) {
    const remainder = 2020 - sum;
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
  } else if (sum >= 2020) {
    rIndex = ++lIndex + 1;
  }
}

for (const candidate of numbers) {
  if (candidate in remainders) {
    const [lValue, rValue] = remainders[candidate];
    console.log(
      `${lValue} * ${rValue} * ${candidate} = ${lValue * rValue * candidate}`,
    );
    Deno.exit(0);
  }
}

Deno.exit(1);

export {};
