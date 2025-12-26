const data = Deno.readTextFileSync("../data/input.txt").split("\n");
import { intersect } from "jsr:@std/collections";

// const data = [
//   "COM)B",
//   "B)C",
//   "C)D",
//   "D)E",
//   "E)F",
//   "B)G",
//   "G)H",
//   "D)I",
//   "E)J",
//   "J)K",
//   "K)L",
//   "K)YOU",
//   "I)SAN",
// ];

const findIndex = (currValue, values) =>
  values.findIndex((value) => value.includes(currValue));

const flatValues = (values) => [...values].flatMap((x) => x);

const findLength = (values, keys, currVal, path) => {
  if (!flatValues(values).includes(currVal)) {
    path.push(currVal);
    return path;
  }
  //console.log("count", count);
  path.push(currVal);
  return findLength(values, keys, keys[findIndex(currVal, values)], path);
};

const increaseCount = (map) => {
  const keys = Object.keys(map);
  const values = Object.values(map);
  const sanPath = findLength(values, keys, "SAN", []);
  const yourPath = findLength(values, keys, "YOU", []);

  return [sanPath, yourPath];
};

const orbits = (string) => string.match(/[^)]+/g);
const addOrbits = (map, lOrbit, rOrbit) => {
  map[lOrbit] = map[lOrbit] || [];
  map[lOrbit].push(rOrbit);
  return map;
};

const orbit_map = (data) => {
  const result = data.reduce((map, currOrbit) => {
    map = addOrbits(map, ...orbits(currOrbit));
    return map;
  }, {});

  let [sanPath, yourPath] = increaseCount(result);
  const commonPoints = intersect(sanPath, yourPath);
  console.log("san", sanPath, "you", yourPath);
  console.log(commonPoints);
  sanPath = sanPath.slice(0, sanPath.indexOf(commonPoints[0]));
  yourPath = yourPath.slice(0, yourPath.indexOf(commonPoints[0]));
  const minLength = sanPath.length + yourPath.length - 2;

  return minLength;
};

console.log("orbti map", orbit_map(data));
