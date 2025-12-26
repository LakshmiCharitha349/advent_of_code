const findPositions = (computer, arg, modes) => {
  const posOfArgs = {
    modeOf1: computer.index + 1,
    modeOf2: computer.index + 2,
    modeOf3: computer.index + 3,
  };
  //console.log("modesarg", modes[arg]);
  return executeModes(posOfArgs[arg], computer, modes[arg]);
};

const executeModes = (position, computer, mode) => {
  const modeValues = {
    "0": computer.program[position],
    "1": position,
    "2": computer.relativeBase + computer.program[position],
  };
  //console.log("mode of 3", computer.relativeBase, position);
  return modeValues[mode];
};

const sum = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  const posOfArg2 = findPositions(computer, "modeOf2", modes);
  const posOfArg3 = findPositions(computer, "modeOf3", modes);

  computer.program[posOfArg3] = computer.program[posOfArg2] +
    computer.program[posOfArg1];
};

const product = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  const posOfArg2 = findPositions(computer, "modeOf2", modes);
  const posOfArg3 = findPositions(computer, "modeOf3", modes);

  computer.program[posOfArg3] = computer.program[posOfArg2] *
    computer.program[posOfArg1];
};
const copyOfRobot = (robot) => {
  return {
    lastMove: robot.lastMove,
    position: [...robot.position],
    target: [0, 0],
    ordinateDetails: robot.ordinateDetails,
  };
};
const createCopyOfComputer = (computer, program) => {
  return {
    program,
    isHalt: computer.isHalt,
    index: computer.index,
    relativeBase: computer.relativeBase,
    outPut: computer.outPut,
    isOutPut: computer.isOutPut,
    isDisplay: false,
  };
};

const copyOfIntCode = (computer) => {
  const copyOfProgram = [...computer.program];
  return createCopyOfComputer(computer, copyOfProgram);
};

const read = (computer, modes, robot, index) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  computer.program[posOfArg1] = index;
};

const deltas = {
  1: { deltaX: 0, deltaY: 1 },
  2: { deltaX: 0, deltaY: -1 },
  4: { deltaX: 1, deltaY: 0 },
  3: { deltaX: -1, deltaY: 0 },
};

const moveForward = (position, lastMove) => {
  position[0] = position[0] + deltas[lastMove].deltaX;
  position[1] = position[1] + deltas[lastMove].deltaY;
  return position;
};

const mapordinates = (ordinate, output, robot) => {
  if (ordinate in robot.ordinateDetails) {
    return;
  }
  robot.ordinateDetails[ordinate] = output;
};
const display = (computer, modes, robot) => {
  computer.isDisplay = true;

  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  computer.outPut = computer.program[posOfArg1];

  mapordinates(robot.target.toString(), computer.outPut, robot);

  // move ONLY if success
  if (computer.outPut === 1 || computer.outPut === 2) {
    robot.position = [...robot.target];
    if (computer.outPut === 2) {
      console.log("target", robot.position);
    }
  }
};

const jumpIfTrue = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  const posOfArg2 = findPositions(computer, "modeOf2", modes);

  computer.index = computer.program[posOfArg1] !== 0
    ? computer.program[posOfArg2]
    : computer.index + 3;
};

const jumpIfFalse = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  const posOfArg2 = findPositions(computer, "modeOf2", modes);

  computer.index = computer.program[posOfArg1] === 0
    ? computer.program[posOfArg2]
    : computer.index + 3;
};

const lessThan = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  const posOfArg2 = findPositions(computer, "modeOf2", modes);
  const posOfArg3 = findPositions(computer, "modeOf3", modes);

  computer.program[posOfArg3] =
    isLess(computer.program[posOfArg1], computer.program[posOfArg2]) ? 1 : 0;
};

const equals = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  const posOfArg2 = findPositions(computer, "modeOf2", modes);
  const posOfArg3 = findPositions(computer, "modeOf3", modes);
  computer.program[posOfArg3] =
    computer.program[posOfArg1] === computer.program[posOfArg2] ? 1 : 0;
};

const setRBaseOffset = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  computer.relativeBase += computer.program[posOfArg1];
};

const isTerminate = (computer, modes) => {
  computer.isHalt = true;
};

const readData = () => prompt("Ener num");
const displayData = (data) => console.log("num", data);
const isLess = (num1, num2) => num1 < num2;

const splitInstructions = (instruction) => {
  const opCode = instruction % 100;
  //console.log("ins", instruction);
  const paddedInstruction = instruction.toString().padStart(5, 0);

  const modeOf1 = paddedInstruction[2];
  const modeOf2 = paddedInstruction[1];
  const modeOf3 = paddedInstruction[0];
  //console.log({ opCode, modeOf1, modeOf2, modeOf3 });
  return { opCode, modeOf1, modeOf2, modeOf3 };
};
const executeIntructions = (computer, robot, index) => {
  const posOfPC = computer.index;
  const modes = splitInstructions(computer.program[posOfPC]);

  const selectOpcode = {
    99: { operation: isTerminate, inc: 0 },
    1: { operation: sum, inc: 4 },
    2: { operation: product, inc: 4 },
    3: { operation: read, inc: 2 },
    4: { operation: display, inc: 2 },
    5: { operation: jumpIfTrue, inc: 0 },
    6: { operation: jumpIfFalse, inc: 0 },
    7: { operation: lessThan, inc: 4 },
    8: { operation: equals, inc: 4 },
    9: { operation: setRBaseOffset, inc: 2 },
  };

  const opCodeDetails = selectOpcode[modes.opCode];
  opCodeDetails.operation(computer, modes, robot, index);
  computer.index += opCodeDetails.inc;
  // console.log("computer", computer, posOfPC);
};

const createRobot = () => {
  return {
    position: [0, 0],
    lastMove: 0,
    target: [0, 0],
    ordinateDetails: { "0,0": 1 },
  };
};

const createComputer = (program) => {
  return {
    program,
    isHalt: false,
    index: 0,
    relativeBase: 0,
    outPut: 0,
    isOutPut: false,
    isDisplay: false,
  };
};
const dfs = (computer, robot) => {
  for (let direction = 1; direction <= 4; direction++) {
    const nextPos = moveForward([...robot.position], direction);

    if (nextPos.toString() in robot.ordinateDetails) continue;

    const compCopy = copyOfIntCode(computer);
    const robotCopy = copyOfRobot(robot);

    robotCopy.lastMove = direction;
    robotCopy.target = nextPos;
    compCopy.isDisplay = false;

    while (!compCopy.isDisplay && !compCopy.isHalt) {
      executeIntructions(compCopy, robotCopy, direction);
    }

    if (compCopy.outPut === 0) continue;

    dfs(compCopy, robotCopy);
  }
};
export const intCode = (data) => {
  const computer = createComputer(data);
  const robot = createRobot();

  dfs(computer, robot);
  return bfs(robot.ordinateDetails);
};

const bfs = (ordinates) => {
  const queue = [["0,0", 0]];
  const visited = { "0,0": true };

  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  while (queue.length > 0) {
    const [pos, steps] = queue.shift();

    if (ordinates[pos] === 2) {
      return steps;
    }

    const [x, y] = pos.split(",").map(Number);

    for (const [dx, dy] of directions) {
      const next = `${x + dx},${y + dy}`;

      if (
        ordinates[next] !== undefined &&
        ordinates[next] !== 0 &&
        !visited[next]
      ) {
        visited[next] = true;
        console.log("ordinates", [next, steps + 1]);
        queue.push([next, steps + 1]);
      }
    }
  }
};

const data = Deno.readTextFileSync("input.txt").split(",").map((x) => +x);

const input = [3, 0, 4, 0, 99];

const simpleMazeProgram = [
  3,
  100,
  1008,
  100,
  1,
  101,
  1005,
  101,
  14,
  1008,
  100,
  4,
  101,
  1005,
  101,
  14,
  104,
  0,
  1105,
  1,
  0,
  104,
  1,
  1105,
  1,
  0,
];

console.log(
  intCode(data),
);
