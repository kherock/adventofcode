const input = await Deno.readTextFile("input.txt");
const numbers = input.split(/\s+/).map(Number).sort((a, b) => a - b);

let lIndex = 0;
let rIndex = numbers.length - 1;

let sum: number;
while (lIndex < rIndex) {
  sum = numbers[lIndex] + numbers[rIndex];
  if (sum < 2020) {
    ++lIndex;
  } else if (sum > 2020) {
    --rIndex;
  } else {
    console.log(
      `${numbers[lIndex]} * ${numbers[rIndex]} = ${numbers[lIndex] *
        numbers[rIndex]}`,
    );
    Deno.exit(0);
  }
}

Deno.exit(1);

export {};
