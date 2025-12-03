import { fuelRequirment, requiredFuelOf } from "../src/rocket_eq.js";
import { assertEquals } from "@std/assert";

Deno.test("fuel required to module of mass ---> 12", () => {
  assertEquals(requiredFuelOf(12), 2);
});

Deno.test("fuel required to module of small mass ---> 14", () => {
  assertEquals(requiredFuelOf(14), 2);
});

Deno.test("fuel required to module of average mass ---> 1969", () => {
  assertEquals(requiredFuelOf(1969), 654);
});

Deno.test("fuel required to module of high  mass ---> 100756", () => {
  assertEquals(requiredFuelOf(100756), 33583);
});

Deno.test("fuel required to entire spaceCraft ---> 100756", () => {
  const input = `14\n14\n14`;
  assertEquals(fuelRequirment(input), 6);
});
Deno.test("fuel required to entire spaceCraft ---> 100756", () => {
  const input = Deno.readTextFileSync("./data/input.txt");
  assertEquals(fuelRequirment(input), 3325347);
});

Deno.test("part-2 fuel required to single module ---> 100756", () => {
  const input = 12;
  assertEquals(fuelRequirment(input), 2);
});
