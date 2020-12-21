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

export async function main(inputPath: string | URL): Promise<void> {
  const { departureTime, buses } = parseNotes(
    await Deno.readTextFile(inputPath),
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

if (import.meta.main) await main(new URL("input.txt", import.meta.url));
