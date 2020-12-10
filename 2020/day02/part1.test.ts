import { assert } from "https://deno.land/std@0.80.0/testing/asserts.ts";

import { validatePassword } from "./part1.ts";

Deno.test("day02 part1: sample input", () => {
  assert(validatePassword("1-3 a: abcde"));
  assert(!validatePassword("1-3 b: cdefg"));
  assert(validatePassword("2-9 c: ccccccccc"));
});
