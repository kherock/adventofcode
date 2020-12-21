import { readLines } from "https://deno.land/std@0.80.0/io/bufio.ts";

import { add, dotProduct, linePattern, orientations, rotate } from "./part1.ts";

if (import.meta.main) {
  let position: [number, number] = [0, 0];
  let waypoint: [number, number] = [10, 1];

  for await (const line of readLines(await Deno.open("input.txt"))) {
    if (!line) continue;
    const [, direction, distance] = line.match(linePattern)!;
    const value = Number(distance);
    switch (direction) {
      case "N":
      case "S":
      case "E":
      case "W":
        waypoint = add(
          waypoint,
          dotProduct(orientations[direction], [value, value]),
        );
        break;
      case "L":
        waypoint = rotate(waypoint, value / 90);
        break;
      case "R":
        waypoint = rotate(waypoint, -value / 90);
        break;
      case "F":
        position = add(position, dotProduct(waypoint, [value, value]));
        break;
    }
  }

  console.log(Math.abs(position[0]) + Math.abs(position[1]));
}
