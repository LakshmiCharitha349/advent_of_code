import { chunk } from "@std/collections/chunk";

const performAdd = (computer) => {
  let { program, currentIndex, isHalt } = computer;

  const [input1, input2, output] = program.slice(
    currentIndex + 1,
    currentIndex + 4,
  );

  program[output] = program[input1] + program[input2];
  currentIndex += 4;

  return { program, currentIndex, isHalt };
};
const performMul = (computer) => {
  let { program, currentIndex, isHalt } = computer;

  const [input1, input2, output] = program.slice(
    currentIndex + 1,
    currentIndex + 4,
  );

  program[output] = program[input1] * program[input2];
  currentIndex += 4;

  return { program, currentIndex, isHalt };
};

const performHalt = (computer) => {
  computer.isHalt = true;
  return computer;
};

const stepForward = (computer) => {
  const executeOpcode = {
    1: performAdd,
    2: performMul,
    99: performHalt,
  };

  const opCode = computer.program[computer.currentIndex];

  return executeOpcode[opCode](computer);
};

const displayGrid = (computer) => {
  console.clear();
  const { program, currentIndex } = computer;
  const paddedData = program.map((num) => num.toString().padStart(5, " "));
  //paddedData[currentIndex] = eval(`"%c${program[currentIndex]}", "color:blue"`);
  const chunks = chunk(paddedData, 8);
  const result = chunks.map((chunk) => chunk.join(" ")).join("\n");
  console.log(result);
  //console.log(`%c${result}`, "color:blue");
};

const debugge = (computer) => {
  displayGrid(computer);

  console.log("\n\ncurrentIndex", computer.currentIndex);
  console.log("isHalt", computer.isHalt);
  prompt();
};

const createComputer = (program) => {
  return {
    program,
    isHalt: false,
    currentIndex: 0,
  };
};

export const intCode = (data) => {
  let computer = createComputer(data);
  while (!computer.isHalt) {
    debugge(computer);
    computer = stepForward(computer);
  }
};
// export const intCode = (data) => {
//   let computer = createComputer(data);

//   while (computer.isHalt !== true) {
//     computer = stepForward(computer);
//   }

//   debugge(computer);
// };

export const findFirstElement = (data) => {
  let copyOfData = [...data];

  for (let i = 0; i <= 99; i++) {
    for (let j = 0; j <= 99; j++) {
      copyOfData[1] = i;
      copyOfData[2] = j;
      const result = intCode(copyOfData, i, j);

      if (result[0] === 19690720) return [i, j];
      copyOfData = [...data];
    }
  }

  return 0;
};

//const data = [2, 3, 0, 3, 99];
const input = Deno.readTextFileSync("../data/input.txt");

const parseData = (data) => data.split(",").map((num) => parseInt(num));
intCode(parseData(input));
