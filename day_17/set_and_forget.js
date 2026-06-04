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

const read = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  computer.program[posOfArg1] = +readData();
};

const display = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  // displayData(computer.program[posOfArg1]);

  switch (computer.program[posOfArg1]) {
    case 35:
      computer.outPut.push("#");
      return;
    case 46:
      computer.outPut.push(".");
      return;
    case 10:
      computer.outPut.push("\n");
      return;
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
  // console.log({ opCode, modeOf1, modeOf2, modeOf3 });
  return { opCode, modeOf1, modeOf2, modeOf3 };
};
const executeIntructions = (computer) => {
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
  opCodeDetails.operation(computer, modes);
  computer.index += opCodeDetails.inc;
  // console.log("computer", computer, posOfPC);
};

export const intCode = (data) => {
  const computer = {
    program: data,
    isHalt: false,
    index: 0,
    relativeBase: 0,
    outPut: [],
  };

  while (!computer.isHalt) {
    executeIntructions(computer);
  }

  const parsedOutPut = computer.outPut.join("").split("\n");
  return parsedOutPut;
  // return part1(parsedOutPut);
};

const findIndexes = (x, y, image) => {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  let count = 0;
  for (const [dx, dy] of directions) {
    const next = [x + dx, y + dy];

    if (image[next[0]] === undefined || image[next[0]][next[1]] === undefined) {
      return 0;
    }
    // console.log("next", next);
    // prompt();
    if (image[next[0]][next[1]] === "#") {
      count++;
    }
  }
  console.log("count", count);
  if (count === 4) {
    return 1;
  }
  return 0;
};

const sumOf = (elements) => {
  return elements.reduce((sum, n) => sum + n, 0);
};

const part1 = (image) => {
  const postions = [];
  for (let row = 1; row < image.length; row++) {
    for (let clmn = 1; clmn < image[0].length; clmn++) {
      if (image[row][clmn] === "#" && findIndexes(row, clmn, image) === 1) {
        postions.push([row, clmn]);
      }
    }
  }
  const alignment = postions.map((position) => position[0] * position[1]);
  return sumOf(alignment);
};

const data = Deno.readTextFileSync("input.txt").split(",").map((x) => +x);

const input = [104, 1125899906842624, 99];

//console.log(data);

console.log(
  intCode(data),
);
