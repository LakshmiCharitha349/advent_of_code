import { chunk, distinct, dropWhile } from "jsr:@std/collections";

const countZeroes = (layer) => {
  const count = layer.reduce(
    (count, num) => +num === 0 ? count + 1 : count,
    0,
  );

  return { layer, count };
};

const count1sand2s = (layer) => {
  return layer.reduce((count, num) => {
    if (num === "1" || num === "2") {
      count[num]++;
    }
    return count;
  }, { "1": 0, "2": 0 });
};

const multiplyNoOf0sAnd1s = (layers) => {
  const zeroesCount = layers.map((layer) => countZeroes(layer));

  const fewestZeroesLayer = zeroesCount.reduce(
    (layer, fewestCount) =>
      layer.count < fewestCount.count ? layer : fewestCount,
    zeroesCount[0],
  );
  const numberOf1sAnd2s = count1sand2s(fewestZeroesLayer.layer);

  return numberOf1sAnd2s["1"] * numberOf1sAnd2s["2"];
};

const part1 = (data) => {
  const layers = chunk(data, 6);
  return multiplyNoOf0sAnd1s(layers);
};

const selectPixel = (position) => {
  //console.log("pos", position);
  return dropWhile(position, (x) => x === "2")[0];
};
const part2 = (data) => {
  const layers = chunk(data, 150);
  const splitByPositions = [];
  console.log("layers", layers.length);
  for (let index = 0; index < layers[0].length; index++) {
    splitByPositions.push(layers.map((layer) => layer[index]));
  }

  const finalPixels = chunk(
    splitByPositions.map((position) =>
      selectPixel(position) === "0" ? "⬛️" : "⬜️"
    ),
    25,
  );

  return finalPixels.map((chunk) => chunk.join("")).join("\n");
};

const data = "0222112222120000".split("");

const input = Deno.readTextFileSync("../data/input.txt");

console.log(part2(input));

// ⬛️⬜️⬜️⬛️⬛️⬜️⬜️⬜️⬜️⬛️⬛️⬜️⬜️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬛️⬜️⬜️⬛️⬛️
// ⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️
// ⬜️⬛️⬛️⬛️⬛️⬜️⬜️⬜️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬛️⬛️
// ⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬜️⬜️⬛️
// ⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬛️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️
// ⬛️⬜️⬜️⬛️⬛️⬜️⬛️⬛️⬛️⬛️⬛️⬜️⬜️⬛️⬛️⬛️⬜️⬜️⬛️⬛️⬛️⬜️⬜️⬜️⬛️
//CFCUG
