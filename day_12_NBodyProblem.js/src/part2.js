const input =
  "<x=-1, y=0, z=2><x=2, y=-10, z=-7><x=4, y=-8, z=8><x=3, y=5, z=-1>";
//[-1,0,2][-2,-10, -7][4,-8,8][3,5,-1]
//[[1, 4, 4], [-4, -1, 19], [-15, -14, 12], [-17, 1, 10]]
// [[-8, -10, 0], [5, 5, 10], [2, -7, 3], [9, -8, -3]]

const parseInput = () => {
  // const positions = input.split("").filter((element) => Number(element));
  return [[1, 4, 4], [-4, -1, 19], [-15, -14, 12], [-17, 1, 10]];
};

const createMoons = (positions) => {
  const velocity = [0, 0, 0];

  const moons = [];
  for (let index = 0; index < positions.length; index++) {
    moons.push({ position: positions[index], velocity: [...velocity] });
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

const findPositions = (moons, positionX, positionY, positionZ) => {
  //const isXFind = findX();
  positionX.push(moons.map((moon) => moon.position[0]));
  positionY.push(moons.map((moon) => moon.position[1]));
  positionZ.push(moons.map((moon) => moon.position[2]));
  // moons.forEach((moon) => {
  //   positionX.push(moon.position[0]);
  //   positionY.push(moon.position[1]);
  //   positionZ.push(moon.position[2]);
  // });

  return { positionX, positionY, positionZ };
};

const findVelocities = (moons, velocityX, velocityY, velocityZ) => {
  //const isXFind = findX();
  velocityX.push(moons.map((moon) => moon.velocity[0]));
  velocityY.push(moons.map((moon) => moon.velocity[1]));
  velocityZ.push(moons.map((moon) => moon.velocity[2]));

  return { velocityX, velocityY, velocityZ };
};

const gcd = (a, b) => (b === 0n ? a : gcd(b, a % b));
const lcm = (a, b) => (a * b) / gcd(a, b);

const lcm1 = (num1, num2) => {
  let max = num1 > num2 ? num1 : num2;
  while (true) {
    if (max % num1 === 0 && max % num2 === 0) {
      return max;
    }
    max++;
  }
};

const findX = (position, initPositions, velocity) => {
  const initVelocity = [0, 0, 0, 0];
  for (let index = 1; index < position.length; index++) {
    // console.log(
    //   "positions",
    //   position[index],
    //   "init",
    //   initPositions,
    //   "initveloci",
    //   initVelocity,
    //   "vel",
    //   velocity[index],
    // );
    // prompt();
    if (
      velocity[index].every((v) => v === 0) &&
      position[index].every((p, i) => p === initPositions[i])
    ) {
      return index;
    }
  }
  return -1;
};

const timeStepsOf = (steps, moons) => {
  const positionX = [];
  const positionY = [];
  const positionZ = [];
  const velocityX = [];
  const velocityY = [];
  const velocityZ = [];

  const initValues = {
    positionX: [1, -4, -15, -17],
    positionY: [4, -1, -14, 1],
    positionZ: [4, 19, 12, 10],
  };

  for (let index = 0; index < steps; index++) {
    findPositions(moons, positionX, positionY, positionZ);
    findVelocities(moons, velocityX, velocityY, velocityZ);

    updateVelocity(moons);
    updatePosition(moons);
  }
  const indexOfZRepeats = findX(positionZ, initValues.positionZ, velocityZ);
  const indexOfYRepeats = findX(positionY, initValues.positionY, velocityY);
  const indexOfXRepeats = findX(positionX, initValues.positionX, velocityX);
  console.log(
    "XXX",
    indexOfXRepeats,
    "Y",
    indexOfYRepeats,
    "Z",
    indexOfZRepeats,
  );
  const lcmOf2Nums = lcm(indexOfXRepeats, indexOfYRepeats);
  const finalLcm = lcm(lcmOf2Nums, indexOfZRepeats);
  console.log("lcm", finalLcm);
  // console.log("positionx", positionX.toString());
  // console.log("postinonx",positionX.toString(),"position y",positionY.toString(),"position z",positionZ.toString(), );
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
  timeStepsOf(277100, moons, 10);
  //console.log(totalEnergy(moons));
  return moons;
};

const part2 = () => {
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
console.log(simulateMotionOfMoon());
