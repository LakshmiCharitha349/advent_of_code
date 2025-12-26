const findPositions = (prgmDetails, arg, modes) => {
  const posOfArgs = {
    modeOf1: prgmDetails.index + 1,
    modeOf2: prgmDetails.index + 2,
    modeOf3: prgmDetails.index + 3,
  };
  //console.log("modesarg", modes[arg]);
  return executeModes(posOfArgs[arg], prgmDetails, modes[arg]);
};

const executeModes = (position, prgmDetails, mode) => {
  const modeValues = {
    "0": prgmDetails.program[position],
    "1": position,
    "2": prgmDetails.relativeBase + prgmDetails.program[position],
  };
  //console.log("mode of 3", prgmDetails.relativeBase, position);
  return modeValues[mode];
};

const sum = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  const posOfArg2 = findPositions(prgmDetails, "modeOf2", modes);
  const posOfArg3 = findPositions(prgmDetails, "modeOf3", modes);

  prgmDetails.program[posOfArg3] = prgmDetails.program[posOfArg2] +
    prgmDetails.program[posOfArg1];
};

const product = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  const posOfArg2 = findPositions(prgmDetails, "modeOf2", modes);
  const posOfArg3 = findPositions(prgmDetails, "modeOf3", modes);

  prgmDetails.program[posOfArg3] = prgmDetails.program[posOfArg2] *
    prgmDetails.program[posOfArg1];
};

const read = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  prgmDetails.program[posOfArg1] = +readData();
};

const display = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  //console.log("modes in display", modes);
  displayData(prgmDetails.program[posOfArg1]);
};

const jumpIfTrue = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  const posOfArg2 = findPositions(prgmDetails, "modeOf2", modes);

  prgmDetails.index = prgmDetails.program[posOfArg1] !== 0
    ? prgmDetails.program[posOfArg2]
    : prgmDetails.index + 3;
};

const jumpIfFalse = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  const posOfArg2 = findPositions(prgmDetails, "modeOf2", modes);

  prgmDetails.index = prgmDetails.program[posOfArg1] === 0
    ? prgmDetails.program[posOfArg2]
    : prgmDetails.index + 3;
};

const lessThan = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  const posOfArg2 = findPositions(prgmDetails, "modeOf2", modes);
  const posOfArg3 = findPositions(prgmDetails, "modeOf3", modes);

  prgmDetails.program[posOfArg3] =
    isLess(prgmDetails.program[posOfArg1], prgmDetails.program[posOfArg2])
      ? 1
      : 0;
};

const equals = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  const posOfArg2 = findPositions(prgmDetails, "modeOf2", modes);
  const posOfArg3 = findPositions(prgmDetails, "modeOf3", modes);
  prgmDetails.program[posOfArg3] =
    prgmDetails.program[posOfArg1] === prgmDetails.program[posOfArg2] ? 1 : 0;
};

const setRBaseOffset = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  prgmDetails.relativeBase += prgmDetails.program[posOfArg1];
};

const isTerminate = (prgmDetails, modes) => {
  prgmDetails.isHalt = true;
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
const executeIntructions = (prgmDetails) => {
  const posOfPC = prgmDetails.index;
  const modes = splitInstructions(prgmDetails.program[posOfPC]);

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
  opCodeDetails.operation(prgmDetails, modes);
  prgmDetails.index += opCodeDetails.inc;
  // console.log("prgmdetails", prgmDetails, posOfPC);
};

export const intCode = (data) => {
  const prgmDetails = {
    program: data,
    isHalt: false,
    index: 0,
    relativeBase: 0,
  };

  while (!prgmDetails.isHalt) {
    executeIntructions(prgmDetails);
  }

  return prgmDetails;
};

const data = Deno.readTextFileSync("../data/input.txt").split(",").map((x) =>
  +x
);

const input = [104, 1125899906842624, 99];

//console.log(data);

console.log(
  intCode(data),
);
