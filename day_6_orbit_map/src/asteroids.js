//const data = Deno.readTextFileSync("../data/input.txt").split("\n");

const data = [
  "COM)B",
  "B)C",
  "C)D",
  "D)E",
  "E)F",
  "B)G",
  "G)H",
  "D)I",
  "E)J",
  "J)K",
  "K)L",
  "K)YOU",
  "I)SAN",
];

const findIndex = (currValue, values) =>
  values.findIndex((value) => value.includes(currValue));

const flatValues = (values) => [...values].flatMap((x) => x);

const findLength = (values, keys, currVal, count) => {
  //console.log("value", flatValues(values), "curr", currVal);
  // console.log("inclids", flatValues(values).includes(currVal));
  if (!flatValues(values).includes(currVal)) {
    return count;
  }
  //console.log("count", count);
  return findLength(values, keys, keys[findIndex(currVal, values)], count + 1);
};

const increaseCount = (map) => {
  const keys = Object.keys(map);
  const values = Object.values(map);
  let total = 0;
  const mappedValues = flatValues(values);
  //console.log("v", mappedValues);
  for (let index = 0; index < mappedValues.length; index++) {
    //console.log("value", mappedValues[index]);
    total += findLength(values, keys, mappedValues[index], 0);
  }
  return total;
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
    // console.log("out for", map);
    return map;
  }, {});
  //console.log("total", increaseCount(result));
  // console.log("count", count);
  return result;
};

console.log("orbti map", orbit_map(data));
