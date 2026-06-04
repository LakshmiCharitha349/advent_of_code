import { chunk } from "@std/collections/chunk";
import { equal } from "jsr:@std/assert";
const input = Deno.readTextFileSync("./input.txt").split("\n").map((t) =>
  t.split("")
);

const createEmptyGrid = () => Array.from({ length: 25 }, (_) => ".");
const createLevels = (grid) => {
  const emptyGrid = createEmptyGrid();
  const lowLevel = chunk([...emptyGrid], 5);
  const nextLevel = chunk([...emptyGrid], 5);

  return [lowLevel, grid, nextLevel];
};

const findBugs = (levels) => {
};

const part2 = (grid) => {
  const levels = createLevels(grid);
  for (let min = 0; min < 200; min++) {
    findBugs(levels);
  }
  console.log(levels);
};

part2(input);
