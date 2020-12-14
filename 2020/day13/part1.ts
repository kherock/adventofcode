export function parseNotes(
  input: string,
): { departureTime: number; buses: number[] } {
  const [departureTime, buses] = input.split("\n");
  return {
    departureTime: Number(departureTime),
    buses: buses.split(",").map(Number),
  };
}

export function getDepartureAfter(time: number, loopTime: number) {
  return loopTime * Math.ceil(time / loopTime) - time;
}

if (import.meta.main) {
  const { departureTime, buses } = parseNotes(
    await Deno.readTextFile("input.txt"),
  );

  const sorted = buses
    .filter(Number.isInteger)
    .sort((a, b) =>
      getDepartureAfter(departureTime, a) - getDepartureAfter(departureTime, b)
    );
  console.log(
    sorted[0] * (getDepartureAfter(departureTime, sorted[0])),
  );
}
