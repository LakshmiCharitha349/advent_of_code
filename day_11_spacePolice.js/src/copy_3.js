import { equal } from "@std/assert";
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

const robot = {};
let currentState = [0, 0];
let heading = "U";

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

const changeDirection1 = (cmd) => {
  //console.log("cmd", cmd);
  //prompt();
  if (cmd === 1) {
    switch (heading) {
      case "U":
        heading = "R";
        break;
      case "R":
        heading = "D";
        break;
      case "D":
        heading = "L";
        break;
      case "L":
        heading = "U";
        break;
    }
  }

  if (cmd === 0) {
    switch (heading) {
      case "U":
        heading = "L";
        break;
      case "R":
        heading = "U";
        break;
      case "D":
        heading = "R";
        break;
      case "L":
        heading = "D";
        break;
    }
  }
  //console.log("heading3", heading);
  //prompt();
  if (heading === "U") {
    // currentState[0] -= 0;
    // currentState[1] += 1;
    currentState = [currentState[0] + 0, currentState[1] - 1];
    return;
  }

  if (heading === "D") {
    currentState = [currentState[0] + 0, currentState[1] + 1];
    // currentState[0] -= 0;
    // currentState[1] -= 1;
    return;
  }

  if (heading === "L") {
    currentState = [currentState[0] - 1, currentState[1]];
    // currentState[0] += -1;
    // currentState[1] -= 0;
    return;
  }

  if (heading === "R") {
    currentState = [currentState[0] + 1, currentState[1]];
    // currentState[0] += 1;
    // currentState[1] -= 0;
    return;
  }
};

const read = (computer, modes) => {
  const posOfArg1 = findPositions(computer, "modeOf1", modes);
  if (computer.outPut.length === 2) {
    const paint = computer.outPut[0];
    const direction = computer.outPut[1];
    createPanel(robot, currentState, paint);
    changeDirection(direction);
    computer.outPut = [];
    computer.program[posOfArg1] = ispanelPresent(
      robot,
      currentState.toString(),
    );
    return;
  }

  computer.program[posOfArg1] = +readData();
};

const display = (computer, modes) => {
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
    outPut: [],
    index: 0,
    relativeBase: 0,
  };

  while (!computer.isHalt) {
    executeIntructions(computer);
  }

  const paints = Object.values(robot);

  const result = [];
  for (let x = 0; x < 6; x++) {
    result[x] = [];
    for (let y = 0; y < 43; y++) {
      const currPanel = [y, x];
      const isPresent = ispanel(robot, currPanel.toString());
      if (isPresent === 1 || isPresent === 0) {
        //console.log("pre",isPresent)
        const symbol = isPresent === 1 ? "#" : ".";
        result[x].push(symbol);
        // console.log("sym", symbol);
      } else {
        result[x].push(" ");
      }
    }
  }
  console.log(robot);
  //return finalPixels.length;
  return result.map((x) => x.join("")).join("\n");
  //return finalPixels.map((chunk) => chunk.join("")).join("");

  //return robot;
};

const ispanel = (robot, current) => {
  const panels = Object.keys(robot);
  //console.log("keys", panels);
  for (let index = 0; index < panels.length; index++) {
    if (equal(current, panels[index])) {
      //console.log(robot[panels[index]]);
      return robot[panels[index]];
    }
  }
  return false;
};

const data = Deno.readTextFileSync("../data/input.txt").split(",").map((x) =>
  +x
);

//console.log(data);

console.log(
  intCode(data),
);

// .###..####..##..#..#.###...##..####.#.....
//  #..#.#....#..#.#.#..#..#.#..#....#.#......
//  #..#.###..#....##...#..#.#......#..#......
// .###..#....#....#.#..###..#.##..#...#.....
// .#....#....#..#.#.#..#.#..#..#.#....#...
//  #....####..##..#..#.#..#..###.####.####.
