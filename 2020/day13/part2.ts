import { assertEquals } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { parseNotes } from "./part1.ts";

export type Congruence = { modulus: number; residue: number };

function multiplicativeInverse(n: number, modulus: number): number {
  // this should be an extended Euclidean algorithm impl but just wasn't feelin it
  for (let k = 1; k < modulus; k++) {
    if (n * k % modulus === 1) {
      return k;
    }
  }
  return Number.NaN;
}

// set up Chinese Remainder Theorem (my input numbers are all coprime)
export function chineseRemainderTheorem(congruences: Congruence[]): Congruence {
  const m = congruences.reduce((acc, { modulus }) => acc * BigInt(modulus), 1n);
  const t = congruences
    .map(({ modulus, residue }) => ({
      modulus: BigInt(modulus),
      residue: BigInt(residue),
    }))
    .map(({ modulus, residue }) => {
      const M = m / modulus;
      return residue * M *
        BigInt(multiplicativeInverse(Number(M % modulus), Number(modulus)));
    })
    .reduce((sum, value) => sum + value, 0n);
  return { modulus: Number(m), residue: Number(t % m) };
}

// redundant solution implemented while I was confused by CRT computing slightly incorrect answers
// https://math.stackexchange.com/questions/79282/solving-simultaneous-congruences/79334
export function solveCongruences(congruences: Congruence[]): Congruence {
  return congruences.reduce((system, congruence) => {
    let residue = (congruence.residue - system.residue) *
      multiplicativeInverse(system.modulus, congruence.modulus);
    residue %= congruence.modulus;
    // JS modulo operator is unfortunately the remainder operator
    residue = (residue + congruence.modulus) % congruence.modulus;
    return {
      modulus: system.modulus * congruence.modulus,
      residue: system.modulus * residue + system.residue,
    };
  }, { modulus: 1, residue: 0 });
}

if (import.meta.main) {
  const t0 = performance.now();
  const { buses } = parseNotes(await Deno.readTextFile("input.txt"));

  const congruences = buses
    .map((loop, index) => ({ modulus: loop, residue: loop - index }))
    .filter(({ modulus }) => Number.isInteger(modulus));

  const { residue: crtResidue } = chineseRemainderTheorem(congruences);
  const { residue } = solveCongruences(congruences);
  const t1 = performance.now();
  console.info(`part2: ${(t1 - t0).toFixed(2)}ms`);

  // JS's floating point precision in large numbers is disappointing
  // CRT cannot be trusted
  assertEquals(crtResidue, residue);
  console.log(residue);
}
