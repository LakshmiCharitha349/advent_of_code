const sum = (num1, num2) => num1 + num2;
const product = (num1, num2) => num1 * num2;
const readData = () => prompt("Ener num");
const displayData = (data) => console.log("num", data);
const isLessThan = (num1, num2) => num1 < num2;
const isEquals = (num1, num2) => num1 === num2;

const executeModes = (position, program, mode) => {
  const modeValues = {
    "0": program[position],
    "1": position,
  };
  return modeValues[mode];
};

const instructionPointer = (modes, posOfOpcode, program) => {
  const opCodes = {
    1: {
      posOfInput1: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      posOfInput2: executeModes(posOfOpcode + 2, program, modes.modeOf2),
      posOfOutput: executeModes(posOfOpcode + 3, program, modes.modeOf3),
      inc: 4,
    },
    2: {
      posOfInput1: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      posOfInput2: executeModes(posOfOpcode + 2, program, modes.modeOf2),
      posOfOutput: executeModes(posOfOpcode + 3, program, modes.modeOf3),
      inc: 4,
    },
    3: {
      posOfOutput: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      inc: 2,
    },
    4: {
      posOfInput: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      inc: 2,
    },
    5: {
      posOfInput1: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      posOfInput2: executeModes(posOfOpcode + 2, program, modes.modeOf2),
      inc: 0,
    },
    6: {
      posOfInput1: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      posOfInput2: executeModes(posOfOpcode + 2, program, modes.modeOf2),
      inc: 0,
    },
    7: {
      posOfInput1: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      posOfInput2: executeModes(posOfOpcode + 2, program, modes.modeOf2),
      posOfInput3: executeModes(posOfOpcode + 3, program, modes.modeOf3),
      inc: 4,
    },
    8: {
      posOfInput1: executeModes(posOfOpcode + 1, program, modes.modeOf1),
      posOfInput2: executeModes(posOfOpcode + 2, program, modes.modeOf2),
      posOfInput3: executeModes(posOfOpcode + 3, program, modes.modeOf3),
      inc: 4,
    },
  };

  return opCodes[modes.opCode];
};

const splitInstructions = (instruction) => {
  const opCode = instruction % 100;
  //console.log("ins", instruction);
  const paddedInstruction = instruction.toString().padStart(5, 0);
  const modeOf1 = paddedInstruction[2];
  const modeOf2 = paddedInstruction[1];
  const modeOf3 = paddedInstruction[0];

  return { opCode, modeOf1, modeOf2, modeOf3 };
};

const executeOpCode = ({ prgmCounter, program, isHalt, size }) => {
  // console.log("prgm", program, "size", size);
  prgmCounter = program[size];
  const positionOfOpcode = size;
  //console.log("prgm", prgmCounter);
  const modes = splitInstructions(prgmCounter);
  const instr = instructionPointer(modes, positionOfOpcode, program);

  switch (modes.opCode) {
    case 99:
      isHalt = true;
      return { prgmCounter, program, isHalt, size };
    case 1:
      program[instr.posOfOutput] = sum(
        program[instr.posOfInput1],
        program[instr.posOfInput2],
      );
      break;
    case 2:
      program[instr.posOfOutput] = product(
        program[instr.posOfInput1],
        program[instr.posOfInput2],
      );
      break;
    case 3:
      program[instr.posOfOutput] = +readData();
      break;
    case 4:
      displayData(program[instr.posOfInput]);
      break;
    case 5:
      //console.log("i2,", program[instr.posOfInput2]);
      if (program[instr.posOfInput1] !== 0) {
        size = program[instr.posOfInput2];
      } else {
        instr.inc = 3;
      }
      break;
    case 6:
      if (program[instr.posOfInput1] === 0) {
        size = program[instr.posOfInput2];
      } else {
        instr.inc = 3;
      }
      break;
    case 7:
      program[instr.posOfInput3] =
        isLessThan(program[instr.posOfInput1], program[instr.posOfInput2])
          ? 1
          : 0;
      break;
    case 8:
      program[instr.posOfInput3] =
        program[instr.posOfInput1] === program[instr.posOfInput2] ? 1 : 0;
      break;
  }
  //console.log("before size", size, "inc", instr.inc);
  size += instr.inc;
  //console.log("size", size);
  return { prgmCounter, program, isHalt, size };
};

export const intCode = (data) => {
  let prgmDetails = {
    program: data,
    isHalt: false,
    size: 0,
  };

  while (!prgmDetails.isHalt) {
    prgmDetails = executeOpCode(prgmDetails);
  }
  return prgmDetails;
};

const data = Deno.readTextFileSync("../data/input.txt").split(",").map((x) =>
  +x
);
console.log(data);

console.log(
  intCode(data),
);
