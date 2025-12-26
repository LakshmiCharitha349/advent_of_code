import { equal } from "@std/assert/equal";

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

  const copyOfDroid = () => {
    return {
      prevPos: [...repairDroid.prevPos],
      position: [...repairDroid.position],
      heading: repairDroid.heading,
      isOxygenFind: repairDroid.isOxygenFind,
    };
  };
  export const copyOfIntCode = (program) => {
    const amplifiers = [];
    const copyOfProgram = [...program];
    amplifiers.push(createComputer(copyOfProgram));

    return amplifiers;
  };

const prevHeadings = {
  1: 2,
  2: 1,
  4: 3,
  3: 4,
};

const copyOfRead = (computer, modes) => {
  const copyOfDroid2 = createRepairDroid();
  const outPutOf2 = copyOfIntCode(computer, copyOfDroid2);
  const copyOfDroid3 = createRepairDroid();
  const outPutOf3 = copyOfIntCode(computer, copyOfDroid3);
  const copyOfDroid4 = createRepairDroid();
  const outPutOf4 = copyOfIntCode(computer, copyOfDroid4);
  const ob = {};

  for (let index = 1; index <= 4; index++) {
    const copyOfDroid = createRepairDroid();
    const outPutOf1 = copyOfIntCode(computer, copyOfDroid);
    ob.push({ input: index, outPutOf1: outPutOf1 });
  }
};

const read = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);

  computer.program[posOfArg1] = repairDroid.heading + 1;

  repairDroid.heading = computer.program[posOfArg1];
  console.log("input", computer.program[posOfArg1]);
  //prompt();
};

const add = (x, deltaX) => parseInt(x) + deltaX;

const deltas = {
  1: { deltaX: 0, deltaY: 1 },
  2: { deltaX: 0, deltaY: -1 },
  4: { deltaX: 1, deltaY: 0 },
  3: { deltaX: -1, deltaY: 0 },
};

const roverPath = (repairDroid) => {
  repairDroid.position[0] = repairDroid.position[0] +
    deltas[repairDroid.heading].deltaX;
  repairDroid.position[1] = repairDroid.position[1] +
    deltas[repairDroid.heading].deltaY;
};

const display = (computer, modes) => {
  computer.isOutPut = true;
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  //console.log("modes in display", modes);
  computer.outPut = computer.program[posOfArg1];
  repairDroid.prevPos = [...repairDroid.position];
  displayData(computer.program[posOfArg1]);
  switch (computer.outPut) {
    case 0:
      //console.log("zerooo");
      return;
    case 1:
      roverPath(repairDroid);
      //console.log("outpu onee", { repairDroid });
      break;
    case 2:
      // console.log("findd");
      // prompt();
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

const readData = () => {
};
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
const executeIntructions = (computer, repairDroid) => {
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
  opCodeDetails.operation(computer, modes, repairDroid);
  computer.index += opCodeDetails.inc;
  // console.log("computer", computer, posOfPC);
};

const createRepairDroid = () => {
  return {
    prevPos: [0, 0],
    position: [0, 0],
    heading: 0,
    isOxygenFind: false,
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
  };
};

export const executeForCopy = (computer) => {
  while (!computer.isOutPut) {
    executeIntructions(computer);
  }

  return computer.outPut;
};

export const intCode = (data) => {
  const computer = createComputer(data);
  const repairDroid = createRepairDroid();

  while (!computer.isHalt) {
    executeIntructions(computer, repairDroid);
  }

  return computer;
};

const data = Deno.readTextFileSync("input.txt").split(",").map((x) => +x);

const input = [3, 0, 104, 1, 3, 0, 104, 0, 99];
console.log(
  intCode(input),
);
