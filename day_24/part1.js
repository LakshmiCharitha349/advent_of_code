import { chunk } from "@std/collections/chunk";
import { equal } from "jsr:@std/assert";
const input = Deno.readTextFileSync("./input.txt").split("\n").map((t) =>
  t.split("")
);

const isEmptyTile = (tile) => tile === ".";
const isBug = (tile) => tile === "#";

const countOfBugsOfAdjTiles = (grid, row, clmn) => {
  let countOfBugs = 0;

  for (const [dx, dy] of directions) {
    const nextRow = grid[row + dx];
    if (!nextRow) {
      continue;
    }
    // console.log(nextRow);
    const adjacentTile = grid[row + dx][clmn + dy];

    if (!adjacentTile) {
      continue;
    }

    if (isBug(adjacentTile)) {
      countOfBugs++;
    }
  }
  return countOfBugs;
};

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const createCopy = (grid) => grid.map((g) => [...g]);
const scanTiles = (grid) => {
  const copyOfGrid = createCopy(grid);

  for (let row = 0; row < grid.length; row++) {
    for (let clmn = 0; clmn < grid[0].length; clmn++) {
      const tile = grid[row][clmn];

      const count = countOfBugsOfAdjTiles(grid, row, clmn);
      // console.log(count);
      // prompt();
      if (!isEmptyTile(tile)) {
        copyOfGrid[row][clmn] = count !== 1 ? "." : "#";
      } else {
        copyOfGrid[row][clmn] = count === 1 || count === 2 ? "#" : ".";
      }
    }
  }

  // console.log(copyOfGrid);
  return copyOfGrid;
};

const findBugIndexes = (grid) => {
  const bugIndexes = [];

  for (let row = 0; row < grid.length; row++) {
    for (let clmn = 0; clmn < grid[0].length; clmn++) {
      const tile = grid[row][clmn];
      if (isBug(tile)) {
        bugIndexes.push((row * 5) + clmn);
      }
    }
  }
  console.log(grid);
  console.log(bugIndexes);
  return bugIndexes;
};

const rating = (indexes) => {
  const addPowerOf2 = indexes.map((i) => Math.pow(2, i));
  return addPowerOf2.reduce((sum, p) => sum + p);
};

const part1 = (grid) => {
  const grids = [[...grid]];
  while (true) {
    const newGrid = scanTiles(grid);
    const repeatedGridIndex = grids.findIndex((g) => equal(g, newGrid));
    // console.log(grids[index++]);
    // prompt();
    if (repeatedGridIndex >= 0) {
      console.log(repeatedGridIndex);
      // console.log(grids[repeatedGridIndex]);
      const bugIndexes = findBugIndexes(grids[repeatedGridIndex]);
      const totalRating = rating(bugIndexes);
      console.log(totalRating);
      break;
    }
    grids.push(newGrid);
    grid = newGrid;
  }
};

part2(input);
