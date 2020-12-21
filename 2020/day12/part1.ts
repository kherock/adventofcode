import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

export const orientations: Record<"N" | "S" | "E" | "W", [number, number]> = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

export function add<T extends number[]>(initial: T, ...terms: T[]): T {
  return terms.reduce(
    (acc, arr) => acc.map((ele, idx) => ele + arr[idx]) as T,
    initial,
  );
}

export function dotProduct<T extends number[]>(initial: T, ...terms: T[]): T {
  return terms.reduce(
    (acc, arr) => acc.map((ele, idx) => ele * arr[idx]) as T,
    initial,
  );
}

export function rotate(
  point: [number, number],
  /** an integer coefficient of pi */
  coefficient: number,
): [number, number] {
  const [x, y] = point;
  switch (((coefficient % 4) + 4) % 4) {
    case 1:
      return [-y, x];
    case 2:
      return [-x, -y];
    case 3:
      return [y, -x];
    default:
      return point;
  }
}

export const linePattern = /^([NSEWLRF])(\d+)$/;

export async function main(inputPath: string | URL): Promise<void> {
  let position: [number, number] = [0, 0];
  let theta = orientations.E;

  for await (const line of readLines(await Deno.open(inputPath))) {
    if (!line) continue;
    const [, direction, distance] = line.match(linePattern)!;
    const value = Number(distance);
    switch (direction) {
      case "N":
      case "S":
      case "E":
      case "W":
        position = add(
          position,
          dotProduct(orientations[direction], [value, value]),
        );
        break;
      case "L":
        theta = rotate(theta, value / 90);
        break;
      case "R":
        theta = rotate(theta, -value / 90);
        break;
      case "F":
        position = add(
          position,
          dotProduct(theta, [value, value]),
        );
        break;
    }
  }

  console.log(Math.abs(position[0]) + Math.abs(position[1]));
}

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
