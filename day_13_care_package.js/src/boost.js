import { chunk } from "@std/collections/chunk";
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
  const { paddleX, ballX } = part1(computer.outPut);
  let input = 0;
  if (paddleX === ballX) input = 0;
  if (paddleX > ballX) input = -1;
  if (paddleX < ballX) input = 1;
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  computer.program[posOfArg1] = input;
};

const display = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  //console.log("modes in display", modes);
  computer.outPut.push(computer.program[posOfArg1]);
  //displayData(computer.program[posOfArg1]);
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
  //console.log("opccodedeta", opCodeDetails, modes.opCode);
  opCodeDetails.operation(computer, modes);
  computer.index += opCodeDetails.inc;
  // console.log("prgmdetails", computer.index, posOfPC);
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
  console.log("score", segmentDisplay);
  return computer.outPut;
};

const part1 = (output) => {
  const chunks = chunk(output, 3);
  let paddleX = 0;
  let ballX = 0;

  for (let index = 0; index < chunks.length; index++) {
    if (chunks[index][2] === 3) paddleX = chunks[index][0];
    if (chunks[index][2] === 4) ballX = chunks[index][0];
  }

  return { paddleX, ballX };
};

const data = Deno.readTextFileSync("../data/input.txt").split(",").map((x) =>
  +x
);

console.log(
  intCode(data).toString(),
);
