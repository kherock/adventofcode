import { assertObjectMatch } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { chineseRemainderTheorem, solveCongruences } from "./part2.ts";

Deno.test("day13 part2: sample system", () => {
  const congruences = [
    { modulus: 7, residue: 0 },
    { modulus: 13, residue: 13 - 1 },
    { modulus: 59, residue: 59 - 4 },
    { modulus: 31, residue: 31 - 6 },
    { modulus: 19, residue: 19 - 7 },
  ];
  const expected = { residue: 1068781 };

  assertObjectMatch(chineseRemainderTheorem(congruences), expected);
  assertObjectMatch(solveCongruences(congruences), expected);
});

Deno.test("day13 part2: other systems", () => {
  const tests = [
    {
      congruences: [
        { modulus: 17, residue: 0 },
        { modulus: 13, residue: 13 - 2 },
        { modulus: 19, residue: 19 - 3 },
      ],
      expected: { residue: 3417 },
    },
    {
      congruences: [
        { modulus: 67, residue: 0 },
        { modulus: 7, residue: 7 - 1 },
        { modulus: 59, residue: 59 - 2 },
        { modulus: 61, residue: 61 - 3 },
      ],
      expected: { residue: 754018 },
    },
    {
      congruences: [
        { modulus: 67, residue: 0 },
        { modulus: 7, residue: 7 - 2 },
        { modulus: 59, residue: 59 - 3 },
        { modulus: 61, residue: 61 - 4 },
      ],
      expected: { residue: 779210 },
    },
    {
      congruences: [
        { modulus: 67, residue: 0 },
        { modulus: 7, residue: 7 - 1 },
        { modulus: 59, residue: 59 - 3 },
        { modulus: 61, residue: 61 - 4 },
      ],
      expected: { residue: 1261476 },
    },
    {
      congruences: [
        { modulus: 1789, residue: 0 },
        { modulus: 37, residue: 37 - 1 },
        { modulus: 47, residue: 47 - 2 },
        { modulus: 1889, residue: 1889 - 3 },
      ],
      expected: { residue: 1202161486 },
    },
  ];

  for (const { congruences, expected } of tests) {
    assertObjectMatch(chineseRemainderTheorem(congruences), expected);
    assertObjectMatch(solveCongruences(congruences), expected);
  }
});
