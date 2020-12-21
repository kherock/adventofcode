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

export async function main(inputPath: string | URL): Promise<void> {
  const input = await Deno.readTextFile(inputPath);
  const simulation = new Simulation(input.split("\n").filter(Boolean)).run();
  let value: string[];
  let done: boolean | undefined;
  do ({ value, done } = simulation.next()); while (!done);
  console.log([...value.join("").matchAll(/#/g)].length);
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
