const input = "12345678";
const parseSignal = (signal) => {
  return signal.split("").map(Number);
};
const createPattern = (pattern, row, length) => {
  const finalPattern = [];
  let patternIndex = 0;

  for (let index = 0; index <= length; index += row + 1) {
    const nextElement = `${pattern[patternIndex++ % 4]} `.repeat(row + 1);
    finalPattern.push(nextElement);
  }
  //console.log("final", finalPattern);
  const filterd = finalPattern.flatMap((element) => element.split(" "));
  //console.log("filter", filterd);

  return filterd.filter((element) => element).slice(1, length + 1);
};

const performMul = (signal, pattern) => {
  // console.log("signal", signal, "pattern", pattern);
  return signal.map((s, index) => parseInt(s) * parseInt(pattern[index]));
};

const sumOf = (elements) => {
  return elements.reduce((sum, n) => sum + n, 0);
};

const findUnitDigits = (array) => {
  return array.map((num) => num.toString().slice(-1));
};

const fft = (signal) => {
  const pattern = ["0", "1", "0", "-1"];
  const result = [];
  const parsedSignal = parseSignal(signal);

  for (let index = 0; index < parsedSignal.length; index++) {
    const repeatedPattern = createPattern(pattern, index, parsedSignal.length);
    const phaseOutput = performMul(parsedSignal, repeatedPattern);
    // console.log("unit", unitDigits);
    // console.log(sumOf(phaseOutput));
    result.push(sumOf(phaseOutput));
  }

  return findUnitDigits(result).join("");
};

const part1 = (input, phase) => {
  let signal = input;
  for (let index = 0; index < phase; index++) {
    signal = fft(signal);
  }

  return signal;
};

const repeatInput = (input) => {
  return input.repeat(50);
};
const data = Deno.readTextFileSync("input.txt");
console.log("fft", part1(input, 100));
