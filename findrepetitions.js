import { chunk } from "@std/collections";
import { equal } from "@std/assert";

// const temp = [];
// const findRepetitions = (array, num) => {
//   // temp.push(num);
//   if (num === array[0]) {
//     temp.push(num);

//     if (temp[-1] !== array[-1]) {
//       temp = [];
//       return "false Value";
//     }
//   }
//   temp = [];
//   return "false";
// };

// const isRepeat = findRepetitions([1, 2], 2, []);

const find = (array) => {
  if (array[array.length - 1] === array[0]) {
    return array.length;
  }
  return 0;
};

const fn = (check) => {
  const array = [];
  array.push(check[0]);
  let count = 0;
  let length = 0;

  for (let index = 1; index < check.length; index++) {
    array.push(check[index]);

    if (array[length - 1] !== array[0]) continue;
    if (array[length - 1] === array[0]) {
      count = array.length - 1;
      continue;
    }
    if (count === 0) {
      if (index !== 1) {
        console.log("array", array);
        const chunks = chunk(array, length - 1);
        if (equal(chunks[0], chunks[1])) {
          return "find";
        }
      }

      count = find(array);
      console.log("c", count);
      length = count;
    }

    count = count === 0 ? 0 : count - 1;
    console.log("at end", count);
  }
  return count;
};

const f = fn([1, 2, 3, 4, 5, 6, 1, 2, 1, 2, 3, 4, 5, 6, 7, 8]);

console.log("f", f);
