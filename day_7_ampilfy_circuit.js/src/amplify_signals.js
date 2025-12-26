import { distinct, intersect } from "jsr:@std/collections";

const findPositions = (computer, arg, modes) => {
  const posOfArgs = {
    modeOf1: computer.index + 1,
    modeOf2: computer.index + 2,
    modeOf3: computer.index + 3,
  };
  //console.log("modesarg", modes[arg]);
  return executeModes(posOfArgs[arg], computer.program, modes[arg]);
};

const executeModes = (position, program, mode) => {
  const modeValues = {
    "0": program[position],
    "1": position,
  };
  // console.log("mode of 3", mode);
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
  computer.program[posOfArg1] = +readData(computer);
};

const display = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  computer.outPut.push(computer.program[posOfArg1]);
  displayData(computer.program[posOfArg1]);
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

const isTerminate = (computer, modes) => {
  computer.isHalt = true;
};

const readData = (computer) => {
  if (!computer.isPhase) {
    computer.isPhase = true;
    return computer.input;
  }
  const value = computer.outPut.pop();
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

const executeIntructions = (computer) => {
  const posOfPC = computer.index;
  //console.log("prgmdetails", computer, posOfPC);
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
  };
  //console.log("computer", computer);
  //console.log("opcode", modes);
  const opCodeDetails = selectOpcode[modes.opCode];
  opCodeDetails.operation(computer, modes);
  // console.log("modes", opCodeDetails);
  // console.log("computer", computer);
  computer.index += opCodeDetails.inc;
};

const createComputer = (program, phase, outPut) => {
  return {
    program,
    isHalt: false,
    index: 0,
    outPut,
    isPhase: false,
    input: phase,
    phaseIndex: 0,
  };
};

export const intCode = (computer) => {
  let opCode = computer.program[computer.index];
  //console.log("code", opCode);
  while (!computer.isHalt) {
    opCode = computer.program[computer.index];
    executeIntructions(computer);
    // console.log("oppppp", opCode);
    if (opCode === 4) break;
  }

  return computer;
};

export const createAmplifiers = (program, phase) => {
  const amplifiers = [];

  for (let index = 0; index < phase.length; index++) {
    const copyOfProgram = [...program];
    amplifiers.push(createComputer(copyOfProgram, +phase[index], [0]));
  }

  return amplifiers;
};

export const executeAmplifier = (program, phase = "98765") => {
  const amplifiers = createAmplifiers(program, phase);
  let index = 0;

  for (let i = 0; !amplifiers[index % 5].isHalt; i++) {
    amplifiers[index % 5] = intCode(amplifiers[index % 5]);
    if (amplifiers[index % 5].isHalt === true) {
      console.log("halted....");

      return amplifiers[index % 5].outPut;
    }
    amplifiers[(index + 1) % 5].outPut = amplifiers[index % 5].outPut;
    index++;
  }
};

export const part2 = (data, phases) => {
  const outPutSignal = [];

  for (let index = 0; index < phases.length; index++) {
    const result = executeAmplifier(data, phases[index]);
    outPutSignal.push({ phase: phases[index], signal: result });
  }
  // console.log("op signal", outPutSignal);
  return outPutSignal.reduce((max, currSignal) => {
    return currSignal.signal[0] > max.signal[0] ? currSignal : max;
  });
  //return outPutSignal;
};

const list = () => {
  const result = [];
  for (let start = 56789; start <= 98765; start++) {
    result.push(start);
  }
  const mappedList = result.map((x) => x.toString().padStart(5, 0));
  const trtheValues = ["5", "6", "7", "8", "9"];
  const filterdData = mappedList.filter((x) => {
    // console.log(intersect(x.split(""), trtheValues).length);
    return intersect(x.split(""), trtheValues).length === 5;
  });

  return filterdData.filter((x) => distinct(x.split("")).length === x.length);
  //return mappedList;
};

const input2 = Deno.readTextFileSync("../data/input.txt").split(",").map(
  Number,
);

console.log(
  part2(input2, list()),
);

//139629729
//98765
