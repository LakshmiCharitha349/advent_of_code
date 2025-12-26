// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).

import { distinct } from "jsr:@std/collections";

const isEqual = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let index = 0; index < arr1.length; index++) {
    if (arr1[index] !== arr2[index]) return false;
  }

  return true;
};

const isAdjacentSame = (i) => {
  const numbers = i.toString().split("").map((x) => +x);
  // const distinctElements = distinct(numbers);
  console.log("number", numbers);
  //let isSame = false;
  const ob = {};
  for (let index = 0; index < numbers.length; index++) {
    ob[numbers[index]] = ob[numbers[index]] || 0;
    ob[numbers[index]]++;

    // if (str[index] === str[index + 1] && str[index + 1] !== str[index + 2]) {
    //   return true;
    // }
  }
  console.log(ob);
  for (let i = 0; i < numbers.length; i++) {
    if (ob[numbers[i]] === 2) return true;
  }
  return false;
};

const sortedArr = (num) => num.toString().split("").toSorted();

const countOfDifferentpasswords = (range) => {
  const [start, end] = range.split("-");
  let count = 0;
  for (let i = +start; i < +end; i++) {
    if (isEqual(i.toString().split(""), sortedArr(i)) && isAdjacentSame(i)) {
      console.log("num", i);
      count++;
    }
  }
  return count;
};

console.log(countOfDifferentpasswords("273025-767253"));
