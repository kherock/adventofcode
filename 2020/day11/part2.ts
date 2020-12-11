import { Simulation as Part1Simulation } from "./part1.ts";

export class Simulation extends Part1Simulation {
  protected adjacentSeats(seats: string[], row: number, col: number): string[] {
    return [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ].map(([deltaX, deltaY]) => {
      let [rowRay, colRay] = [row, col];
      let seat: string;
      do {
        rowRay += deltaX;
        colRay += deltaY;
        seat = seats[rowRay]?.[colRay] ?? "L";
      } while (seat === ".");
      return seat;
    });
  }

  protected shouldEmpty(seats: string[], row: number, col: number): boolean {
    return this.adjacentSeats(seats, row, col)
      .filter((seat) => seat === "#")
      .length >= 5;
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  const simulation = new Simulation(input.split("\n")).run();
  let value: string[];
  let done: boolean | undefined;
  do ({ value, done } = simulation.next()); while (!done);
  console.log([...value.join("").matchAll(/#/g)].length);
}
