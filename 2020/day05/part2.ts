import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { toOrderedPair, toSeatId } from "./part1.ts";

if (import.meta.main) {
  const seats: "X"[][] = [];

  for await (const line of readLines(await Deno.open("input.txt"))) {
    const [row, col] = toOrderedPair(line);
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
      console.log(toSeatId([row, emptySeats[0]]));
      Deno.exit(0);
    }
  });

  Deno.exit(1);
}
