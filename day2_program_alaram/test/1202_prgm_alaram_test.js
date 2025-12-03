import { intCode } from "../src/1202_prgm_alaram.js";
import { assertEquals } from "@std/assert";

Deno.test.ignore("int code ", () => {
  assertEquals(intCode([1, 0, 0, 0, 99]), [2, 0, 0, 0, 99]);
});

Deno.test.ignore("int code of 2 ", () => {
  assertEquals(intCode([2, 3, 0, 3, 99]), [2, 3, 0, 6, 99]);
});

Deno.test.ignore("int code of 2 ", () => {
  assertEquals(intCode([2, 4, 4, 5, 99, 0]), [2, 4, 4, 5, 99, 9801]);
});

Deno.test("int code of 2 ", () => {
  const input = Deno.readTextFileSync("./data/input.txt").split(",");
  const data = input.map((x) => parseInt(x));
  assertEquals(intCode(data), 5482655);
});

Deno.test.ignore("int code of 2 ", () => {
  assertEquals(intCode([1, 1, 1, 4, 99, 5, 6, 0, 99]), [
    30,
    1,
    1,
    4,
    2,
    5,
    6,
    0,
    99,
  ]);
});

Deno.test.ignore("int code of 2 ", () => {
  assertEquals(intCode([1, 1, 1, 4, 99, 5, 6, 0, 99]), [
    30,
    1,
    1,
    4,
    2,
    5,
    6,
    0,
    99,
  ]);
});
