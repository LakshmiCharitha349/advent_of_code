import { distinct, intersect } from "jsr:@std/collections";

const findPositions = (prgmDetails, arg, modes) => {
  const posOfArgs = {
    modeOf1: prgmDetails.index + 1,
    modeOf2: prgmDetails.index + 2,
    modeOf3: prgmDetails.index + 3,
  };
  //console.log("modesarg", modes[arg]);
  return executeModes(posOfArgs[arg], prgmDetails.program, modes[arg]);
};

const executeModes = (position, program, mode) => {
  const modeValues = {
    "0": program[position],
    "1": position,
  };
  // console.log("mode of 3", mode);
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
  prgmDetails.program[posOfArg1] = +readData(prgmDetails);
};

const display = (prgmDetails, modes) => {
  const posOfArg1 = findPositions(prgmDetails, "modeOf1", modes);
  prgmDetails.outPut.push(prgmDetails.program[posOfArg1]);
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

const isTerminate = (prgmDetails, modes) => {
  prgmDetails.isHalt = true;
};

const readData = (prgmDetails) => {
  //console.log("output", prgmDetails.outPut);
  if (!prgmDetails.isPhase) {
    console.log("phase", prgmDetails.input, "op");
    prgmDetails.isPhase = true;
    return prgmDetails.input;
  }
  const value = prgmDetails.outPut.pop();
  console.log("value", value);
  return value;
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
  //console.log({ opCode, modeOf1, modeOf2, modeOf3 });
  return { opCode, modeOf1, modeOf2, modeOf3 };
};

const executeIntructions = (prgmDetails) => {
  const posOfPC = prgmDetails.index;
  //console.log("prgmdetails", prgmDetails, posOfPC);
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
  };

  const opCodeDetails = selectOpcode[modes.opCode];
  opCodeDetails.operation(prgmDetails, modes);
  prgmDetails.index += opCodeDetails.inc;
};

export const intCode = (data, phase, final) => {
  const prgmDetails = {
    program: data,
    isHalt: false,
    index: 0,
    outPut: final,
    isPhase: false,
    input: phase,
  };

  while (!prgmDetails.isHalt) {
    executeIntructions(prgmDetails);
  }

  return prgmDetails;
};

export const executeAmplifier = (data, phase) => {
  //const signals = {};
  let op = [0];
  for (let index = 0; index < phase.length; index++) {
    op = intCode(data, phase[index], op).outPut;
  }

  //console.log("op", op);
  return op;
};

export const part2 = (data, phases) => {
  const outPutSignal = [];

  for (let index = 0; index < phases.length; index++) {
    const result = executeAmplifier(data, phases[index]);
    outPutSignal.push({ phase: phases[index], signal: result });
  }
  console.log("op signal", outPutSignal);
  return outPutSignal.reduce((max, currSignal) => {
    return currSignal.signal[0] > max.signal[0] ? currSignal : max;
  });
  //return outPutSignal;
};

const data = Deno.readTextFileSync("../data/input.txt").split(",").map((x) =>
  +x
);

const input = [
  3,
  31,
  3,
  32,
  1002,
  32,
  10,
  32,
  1001,
  31,
  -2,
  31,
  1007,
  31,
  0,
  33,
  1002,
  33,
  7,
  33,
  1,
  33,
  31,
  31,
  1,
  32,
  31,
  31,
  4,
  31,
  99,
  0,
  0,
  0,
];

const list = () => {
  const result = [];
  for (let start = 1234; start <= 43210; start++) {
    result.push(start);
  }
  const mappedList = result.map((x) => x.toString().padStart(5, 0));
  const trtheValues = ["1", "2", "3", "4", "0"];
  const filterdData = mappedList.filter((x) => {
    // console.log(intersect(x.split(""), trtheValues).length);
    return intersect(x.split(""), trtheValues).length === 5;
  });

  return filterdData.filter((x) => distinct(x.split("")).length === x.length);
  //return mappedList;
};

console.log(
  part2(input, list()),
);
