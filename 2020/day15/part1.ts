export function* createGame(init: number[], end = Infinity): Generator<number> {
  const state: Record<number, [lastSeen0: number, lastSeen1: number]> = {};

  const speak = (number: number, currentTurn: number): number => {
    state[number] = [currentTurn, state[number]?.[0] ?? currentTurn];
    return number;
  };

  let previous = Number.NaN;

  for (let turn = 0; turn < Math.min(init.length, end); turn++) {
    yield previous = speak(init[turn], turn);
  }

  for (let turn = init.length; turn < end; turn++) {
    const [lastSeen0, lastSeen1] = state[previous];
    yield previous = speak(lastSeen0 - lastSeen1, turn);
  }
}

if (import.meta.main) {
  const input = await Deno.readTextFile("input.txt");
  let lastNum = Number.NaN;
  for (const number of createGame(input.split(",").map(Number), 2020)) {
    lastNum = number;
  }
  console.log(lastNum);
}
