// first wire path = R8,U5,L5,D3
// 2nd wire path = U7,R6,D4,L4
//point = (0,0)
import { intersect } from "@std/collections";
const deltas = {
  U: { deltaX: 0, deltaY: 1 },
  D: { deltaX: 0, deltaY: -1 },
  R: { deltaX: 1, deltaY: 0 },
  L: { deltaX: -1, deltaY: 0 },
};

const makeMove = ({ heading, steps }, { x, y, ordinates, wires }) => {
  /* console.log(
    "heading",
    heading,
    "steps",
    steps,
    "x",
    x,
    "y",
    y,
    "ordina",
    ordinates,
  );*/
  for (let i = 1; i <= steps; i++) {
    x = x + deltas[heading].deltaX;
    // console.log("heainf", heading, "delta", x + deltas[heading].deltaX);
    y = y + deltas[heading].deltaY;
    wires = wires + 1;
    ordinates.push({ axis: [x, y], wires });
  }
  return { x, y, ordinates, wires };
};

const findOrdinates = (path) => {
  const positions = path.map((movements) => ({
    heading: movements[0],
    steps: +movements.slice(1, movements.length + 1),
  }));
  //const origin = { x: 0, y: 0 };
  //console.log(data);

  return positions.reduce((result, position) => {
    //console.log(result, position);
    result = makeMove(position, result);
    return result;
  }, {
    ordinates: [],
    x: 0,
    y: 0,
    wires: 0,
  });
  // return positions.flatMap((position) => makeMove(position, origin));
};

const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) return false;
  }

  return true;
};

const sqr = (x) => x * x;
const deltaX = (x0, x) => Math.abs(x0) + Math.abs(x);
// //  Math.sqrt(sqr(deltaX(x[0], x[1])) + sqr(deltaX(y[0], y[1])));
const distance = (points) => Math.abs(points[1]) + Math.abs(points[2]);

const nearestPoint = (points) => {
  //const origin = [0, 0];
  let closest = points[0];
  let leastDistance = distance(points[0]);
  for (let index = 0; index < points.length; index++) {
    //console.log("d", distance(points[index]), points[index]);
    if (distance(points[index]) <= leastDistance) {
      leastDistance = distance(points[index]);
      closest = points[index];
    }
  }
  // console.log("point", closest, "leasr", leastDistance);
  return leastDistance;
};

const closestpath = (path1, path2) => {
  const firstPath = Deno.readTextFileSync("../data/input.txt").split(",");
  const secondPath = Deno.readTextFileSync("../data/input2.txt").split(",");
  // const firstPath = ["R8", "U5", "L5", "D3"];
  // const secondPath = ["U7", "R6", "D4", "L4"];
  /*const firstPath = [
    "R75",
    "D30",
    "R83",
    "U83",
    "L12",
    "D49",
    "R71",
    "U7",
    "L72",
  ];*/
  //const secondPath = ["U62", "R66", "U55", "R34", "D71", "R55", "D58", "R83"];

  const ordinatesOf1stPath = findOrdinates(firstPath).ordinates;
  const ordinatesOf2ndPath = findOrdinates(secondPath).ordinates;

  // console.log("1st", ordinatesOf1stPath);
  // console.log("2nd", ordinatesOf2ndPath);

  const points = ordinatesOf1stPath.reduce((final, ordinate1) => {
    for (let index = 0; index < ordinatesOf2ndPath.length; index++) {
      //console.log("1", ordinate1, "2", ordinatesOf2ndPath[index]);
      if (isEqual(ordinate1.axis, ordinatesOf2ndPath[index].axis)) {
        final.push([
          ordinate1.axis,
          ordinate1.wires,
          ordinatesOf2ndPath[index].wires,
        ]);
      }
    }
    // final.push(result);
    return final;
  }, []);
  // console.log("point", points);
  return nearestPoint(points);
};

console.log(closestpath());
