import { assert } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { validatePassport } from "./part1.ts";

Deno.test("day04 part1: sample input", () => {
  assert(
    validatePassport(
      new Map([
        ["ecl", "gry"],
        ["pid", "860033327"],
        ["eyr", "2020"],
        ["hcl", "#fffffd"],
        ["byr", "1937"],
        ["iyr", "2017"],
        ["cid", "147"],
        ["hgt", "183cm"],
      ]),
    ),
  );
  assert(
    !validatePassport(
      new Map([
        ["iyr", "2013"],
        ["ecl", "amb"],
        ["cid", "350"],
        ["eyr", "2023"],
        ["pid", "028048884"],
        ["hcl", "#cfa07d"],
        ["byr", "1929"],
      ]),
    ),
  );
  assert(
    validatePassport(
      new Map([
        ["hcl", "#ae17e1"],
        ["iyr", "2013"],
        ["eyr", "2024"],
        ["ecl", "brn"],
        ["pid", "760753108"],
        ["byr", "1931"],
        ["hgt", "179cm"],
      ]),
    ),
  );
  assert(
    !validatePassport(
      new Map([
        ["hcl", "#cfa07d"],
        ["eyr", "2025"],
        ["pid", "166559648"],
        ["iyr", "2011"],
        ["ecl", "brn"],
        ["hgt", "59in"],
      ]),
    ),
  );
});
