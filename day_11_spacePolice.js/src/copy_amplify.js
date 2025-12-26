import { equal } from "jsr:@std/assert/equal";
import { chunk } from "@std/collections";
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

const createPanel = (robot, panel, paint) => {
  robot[panel] = robot[panel] || 0;
  robot[panel] = paint;
};

const ispanelPresent = (robot, current) => {
  const panels = Object.keys(robot);
  //console.log("keys", panels);
  for (let index = 0; index < panels.length; index++) {
    if (equal(current, panels[index])) {
      return robot[panels[index]];
    }
  }
  return 0;
};

const read = (computer, modes, robot) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  if (computer.outPut.length === 2) {
    const paint = computer.outPut[0];
    const direction = computer.outPut[1];
    createPanel(robot, currentState, paint);
    changeDirection(direction, robot);
    computer.outPut = [];
    computer.program[posOfArg1] = ispanelPresent(
      robot,
      currentState.toString(),
    );
    return;
  }

  computer.program[posOfArg1] = +readData();
};

// const read = (computer, modes, robot) => {
//   console.log("oooo", robot);
//   if (computer.outPut.length === 2) {
//     //console.log("before output", computer.outPut);
//     robot = changeDirection(computer.outPut.pop(), robot);
//     //console.log("diection", robot.panel);
//     const paint = computer.outPut.pop();
//     for (let index = 0; index < robot.panel.length; index++) {
//       if (equal(robot.panel[index].direction, robot.currentState)) {
//         // console.log("in if roboooo", robot);
//         // prompt();
//         robot.panel[index].paint = paint;
//         return;
//       }
//     }
//     //prompt();
//     robot.panel.push({ paint, direction: robot.currentState });
//     // console.log("out if roboooo", robot);
//     // prompt();
//   }

//   //console.log("after output", computer.outPut, "\n", "compu", robot);
//   const posOfArg1 = findPositions(computer, "modeOf1", modes);
//   computer.program[posOfArg1] = 0;
//   console.log("first time", robot);
// };

const display = (computer, modes, robot) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
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
const executeIntructions = (computer, robot) => {
  const posOfPC = computer.index;
  //console.log("computer", computer, posOfPC);
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
  const opCodeDetails = selectOpcode[modes.opCode];
  //console.log("opcode", opCodeDetails);
  opCodeDetails.operation(computer, modes, robot);

  computer.index += opCodeDetails.inc;
};

const deltas = {
  N: { deltaX: 0, deltaY: 1 },
  S: { deltaX: 0, deltaY: -1 },
  E: { deltaX: 1, deltaY: 0 },
  W: { deltaX: -1, deltaY: 0 },
};

const add = (x, deltaX) => parseInt(x) + deltaX;

const roverpath = (robot, instruction) => {
  const dfa = {
    N: { R: "E", L: "W" },
    S: { R: "W", L: "E" },
    W: { R: "N", L: "S" },
    E: { R: "S", L: "N" },
  };

  robot.heading = dfa[robot.heading][instruction];
  robot.currentState = [
    add(robot.currentState[0], deltas[robot.heading].deltaX),
    add(robot.currentState[1], deltas[robot.heading].deltaY),
  ];
  return robot;
};

const changeDirection = (cmd, robot) => {
  const movements = {
    1: "R",
    0: "L",
  };
  return roverpath(robot, movements[cmd]);
};

const robot = {
  currentState: [0, 0],
  panel: [],
  heading: "N",
};

export const intCode = (data) => {
  const computer = {
    program: data,
    isHalt: false,
    index: 0,
    outPut: [],
  };

  while (!computer.isHalt) {
    executeIntructions(computer, robot);
    //console.log("robot", robot);
    //prompt();
  }
  robot.currentState = changeDirection(computer.outPut.pop(), robot);
  const paint = computer.outPut.pop();
  robot.panel.push({
    paint,
    direction: robot.currentState,
  });
  console.log(robot.panel.length);
  return robot;
};

const data = Deno.readTextFileSync("../data/input.txt").split(",").map((x) =>
  +x
);

//console.log(data);
const input = [
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  3,
  0,
  104,
  1,
  104,
  1,
  99,
];
console.log("final", intCode(data));
