import { readLines } from "https://deno.land/std/io/bufio.ts";

const seats: "X"[][] = [];
for await (const line of readLines(await Deno.open("./input.txt"))) {
  let row = 0;
  for (let i = 0; i < 7; ++i) {
    const intervalLength = 2 ** (7 - i);
    if (line[i] === "B") {
      row += intervalLength / 2;
    }
  }
  let col = 0;
  for (let i = 0; i < 3; ++i) {
    const intervalLength = 2 ** (3 - i);
    if (line[i + 7] === "R") {
      col += intervalLength / 2;
    }
  }
  seats[row] ??= [];
  seats[row][col] = "X";
}

// forEach will skip over empty items for sparse arrays
seats.forEach((seats, row) => {
  const emptySeats = Object.keys([...Array(8)])
    .map(Number)
    .filter((col) => !(col in seats));
  if (emptySeats.length === 1) {
    console.log(row, emptySeats[0]);
    console.log(row * 8 + emptySeats[0]);
    Deno.exit(0);
  }
});

Deno.exit(1);

export {};
