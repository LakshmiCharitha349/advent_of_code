import { equal } from "@std/assert";

const findX = (position = [1, 2, 3, 1, 2, 1, 2, 3, 1, 2, 1]) => {
  let index = 0;
  const startingElement = position[0];

  while (index < position.length) {
    let nextIndex = position.indexOf(startingElement, index + 1);
    nextIndex = nextIndex === -1 ? position.length : nextIndex;
    const chunk1 = position.slice(0, nextIndex);
    const chunk2 = position.slice(nextIndex, nextIndex + chunk1.length);

    if (equal(chunk1, chunk2)) {
      return chunk1.length;
    }
    index += nextIndex;
  }
  return -1;
};

console.log("result", findX());

const lcm = (num1, num2) => {
  let max = num1 > num2 ? num1 : num2;
  while (true) {
    if (max % num1 === 0 && max % num2 === 0) {
      return max;
    }
    max++;
  }
};

const findX = (position, velocity) => {
  let index = 0;
  const startingElement = position[0];

  while (index < position.length) {
    let nextIndex = position.indexOf(startingElement, index + 1);
    nextIndex = nextIndex === -1 ? position.length : nextIndex;
    const chunk1 = position.slice(0, nextIndex);
    const chunk2 = position.slice(nextIndex, nextIndex + chunk1.length);
    // console.log("chunk1", chunk1, "chunk2", chunk2);
    // prompt();
    if (equal(chunk1, chunk2)) {
      if (
        equal(
          velocity.slice(0, nextIndex),
          velocity.slice(nextIndex, nextIndex + chunk1.length),
        )
      ) {
        return chunk1.length;
      }
      console.log("velovity not amtch ....");
    }
    index = nextIndex;
  }
  return -1;
};
