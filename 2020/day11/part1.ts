export class Simulation {
  constructor(private intial: string[]) {}

  protected adjacentSeats(seats: string[], row: number, col: number): string[] {
    return [
      seats[row - 1]?.[col - 1],
      seats[row - 1]?.[col],
      seats[row - 1]?.[col + 1],
      seats[row][col - 1],
      seats[row][col + 1],
      seats[row + 1]?.[col - 1],
      seats[row + 1]?.[col],
      seats[row + 1]?.[col + 1],
    ].filter((seat) => (seat ?? ".") !== ".");
  }

  protected shouldEmpty(seats: string[], row: number, col: number): boolean {
    return this.adjacentSeats(seats, row, col)
      .filter((seat) => seat === "#")
      .length >= 4;
  }

  protected shouldOccupy(seats: string[], row: number, col: number): boolean {
    return this.adjacentSeats(seats, row, col)
      .every((seat) => seat === "L");
  }

  *run(): Generator<string[], string[]> {
    let seats = this.intial;
    let unstable = true;
    while (unstable) {
      unstable = false;
      seats = seats.map((currentRow, row) =>
        [...currentRow].reduce((nextRow, seat, col) => {
          if (seat === ".") {
            return nextRow + ".";
          }
          if (this.shouldOccupy(seats, row, col)) {
            unstable ||= seat !== "#";
            return nextRow + "#";
          }
          if (this.shouldEmpty(seats, row, col)) {
            unstable ||= seat !== "L";
            return nextRow + "L";
          }
          return nextRow + seat;
        }, "")
      );
      yield seats;
    }
    return seats;
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
