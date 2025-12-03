const sum = (num1, num2) => num1 + num2;

const product = (num1, num2) => num1 * num2;

const executeOpCode = ({ opCode, program, isHalt }, index) => {
  opCode = program[index];
  const positionOfOpcode = index;

  const posOfInput1 = program[positionOfOpcode + 1];
  const posOfInput2 = program[positionOfOpcode + 2];
  const posOfOutput = program[positionOfOpcode + 3];

  switch (opCode) {
    case 99:
      isHalt = true;
      break;
    case 1:
      program[posOfOutput] = sum(program[posOfInput1], program[posOfInput2]);
      break;
    case 2:
      program[posOfOutput] = product(
        program[posOfInput1],
        program[posOfInput2],
      );

      break;
  }
  return { opCode, program, isHalt };
};

export const intCode = (data) => {
  let prgmDetails = {
    program: data,
    isHalt: false,
  };

  for (let index = 0; prgmDetails.isHalt !== true; index = index + 4) {
    prgmDetails = executeOpCode(prgmDetails, index);
  }
  return prgmDetails.program;
};

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
