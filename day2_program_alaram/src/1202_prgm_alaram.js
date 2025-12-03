const sum = (num1, num2) => num1 + num2;

const product = (num1, num2) => num1 * num2;

const executeOpCode = ({ opCode, program, isHalt }, index) => {
  opCode = program[index];
  const positionOfOpcode = index;
  console.log("prgm", program);
  console.log("inex", index);
  const posOfInput1 = program[positionOfOpcode + 1];
  const posOfInput2 = program[positionOfOpcode + 2];
  const posOfOutput = program[positionOfOpcode + 3];

  switch (opCode) {
    case 99:
      isHalt = true;
      break;
    case 1:
      program[posOfOutput] = sum(program[posOfInput1], program[posOfInput2]);
      console.log(
        "out",
        program[posOfOutput],
        program[posOfInput1],
        program[posOfInput2],
      );

      break;
    case 2:
      program[posOfOutput] = product(
        program[posOfInput1],
        program[posOfInput2],
      );
      // console.log(
      //   "out",
      //   program[posOfOutput],
      //   program[posOfInput1],
      //   program[posOfInput2],
      // );

      break;
  }
  //console.log(opCode, program, isHalt);
  return { opCode, program, isHalt };
};

export const intCode = (data) => {
  let prgmDetails = {
    program: data,
    isHalt: false,
  };

  //prgmDetails.opCode = prgmDetails.program[0];
  prgmDetails.program[1] = 12;
  prgmDetails.program[2] = 2;
  //console.log("prgm", prgmDetails.program);

  for (let index = 0; prgmDetails.isHalt !== true; index = index + 4) {
    prgmDetails = executeOpCode(prgmDetails, index);

    //console.log("opcode", prgmDetails.program[index]);
  }
  console.log(prgmDetails.program);
  return prgmDetails.program;
};
