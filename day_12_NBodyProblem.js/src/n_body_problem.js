import { equal } from "@std/assert";

const input =
  "<x=-1, y=0, z=2><x=2, y=-10, z=-7><x=4, y=-8, z=8><x=3, y=5, z=-1>";
//[-1,0,2][-2,-10, -7][4,-8,8][3,5,-1]
//[[1, 4, 4], [-4, -1, 19], [-15, -14, 12], [-17, 1, 10]]
// [[-8, -10, 0], [5, 5, 10], [2, -7, 3], [9, -8, -3]]

const parseInput = () => {
  // const positions = input.split("").filter((element) => Number(element));
  return [[-1, 0, 2], [2, -10, -7], [4, -8, 8], [3, 5, -1]];
};

const createMoons = (positions) => {
  const velocity = [0, 0, 0];

  const moons = [];
  for (let index = 0; index < positions.length; index++) {
    moons.push({ position: positions[index], velocity });
  }

  return moons;
};

const gravityValues = (pos1, pos2) => {
  if (pos1 < pos2) return 1;
  if (pos1 === pos2) return 0;
  if (pos1 > pos2) return -1;
};

const applyGravity = (moon, nextMoon) => {
  const gravity = moon.position.map((pos, index) =>
    gravityValues(pos, nextMoon.position[index])
  );

  moon.velocity = moon.velocity.map((v, index) => v + gravity[index]);
  nextMoon.velocity = nextMoon.velocity.map((v, index) => v - gravity[index]);
  return moon;
};

const updateVelocity = (moons) => {
  for (let index = 0; index < moons.length; index++) {
    moons[index] = moons.slice(index + 1).reduce(
      (finalMoon, moon) => applyGravity(finalMoon, moon),
      moons[index],
    );
  }
};

const applyVelocity = (moon) => {
  moon.position = moon.position.map((pos, index) => pos + moon.velocity[index]);
  return moon;
};

const updatePosition = (moons) => {
  moons = moons.map((moon) => applyVelocity(moon));
};

const findX = (position = [1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1]) => {
  let index = 0;
  const startingElement = position[0];

  while (index < position.length) {
    let nextIndex = position.indexOf(startingElement, index + 1);
    nextIndex = nextIndex === -1 ? position.length : nextIndex;
    const chunk1 = position.slice(0, nextIndex);
    const chunk2 = position.slice(nextIndex, nextIndex + chunk1.length);

    if (equal(chunk1, chunk2)) {
      return chunk1.length;
    }
    index += nextIndex;
  }
  return -1;
};

console.log("result", findX());

const findPositions = (moons) => {
  const positionX = [];
  const positionY = [];
  const positionZ = [];
  moons.forEach((moon) => {
    positionX.push(moon.position[0]);
    positionY.push(moon.position[1]);
    positionZ.push(moon.position[2]);
  });

  console.log("XXX", findX(positionX));
  return { positionX, positionY, positionZ };
};

const timeStepsOf = (steps, moons) => {
  for (let index = 0; index < steps; index++) {
    updateVelocity(moons);
    updatePosition(moons);
  }
};

const sumOf = (data) => data.reduce((sum, num) => sum + Math.abs(num), 0);

const totalEnergy = (moons) => {
  return moons.reduce((total, moon) => {
    const potentialEnergy = sumOf(moon.position);
    const kineticEnergy = sumOf(moon.velocity);
    total += potentialEnergy * kineticEnergy;
    return total;
  }, 0);
};

const simulateMotionOfMoon = () => {
  const moons = createMoons(parseInput());
  timeStepsOf(2772, moons, 10);
  console.log(totalEnergy(moons));
  return moons;
};

// const isMatchFind = (moons1, moons2) => {
//   return moons1.every((moon) => equal(moon));
// };

const copyArray = (moons) => {
  const copy = [];
  for (let index = 0; index < moons.length; index++) {
    copy.push(data);
  }

  return copy;
};

const copyPart2 = () => {
  const positionX = [];
  const positionY = [];
  const positionZ = [];
  moons.forEach((moon) => {
    positionX.push(moon.position[0]);
    positionY.push(moon.position[1]);
    positionZ.push(moon.position[2]);
  });

  return { positionX, positionY, positionZ };
};

const part2 = () => {
  const moons = createMoons(parseInput(input));
  let isMatch = false;
  let totalSteps = 0;
  let currMoons = createMoons(parseInput(input));
  console.log("currmoon", currMoons);
  while (!isMatch) {
    updateVelocity(currMoons);
    updatePosition(currMoons);
    //console.log("moons", moons, "curr", currMoons);
    isMatch = equal(currMoons, moons) ? true : false;
    console.log("steps", totalSteps);
    totalSteps++;
    //prompt();
  }
  console.log("steps", totalSteps);
};

//console.log(simulateMotionOfMoon());
console.log(simulateMotionOfMoon());
