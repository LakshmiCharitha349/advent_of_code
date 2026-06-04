const inputs = {
  simple: `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`,
  puzzleInput: Deno.readTextFileSync("input.txt"),
};

const expToGetNumber = /\d+/g;
const expToGetString = /[A-Z]+/g;

const parseInput = (input) => {
  const reactions = input.split("\n");
  const parsedReactions = {};

  reactions.forEach((reaction) => {
    const inputChemicals = reaction.slice(0, reaction.indexOf("=")).split(",");
    const mappedInputs = inputChemicals.map((chemical) =>
      chemical.trim().split(" ")
    );
    const outPutChemical = reaction.slice(reaction.indexOf(">") + 1);
    //console.log("output", outPutChemical);
    const outPutQuantity = +outPutChemical.match(expToGetNumber).join("");

    parsedReactions[outPutChemical.match(expToGetString)] = {
      inputs: mappedInputs,
      quantity: outPutQuantity,
    };
  });
  return parsedReactions;
};

const splitInputs = (input) => {
  const chemicals = {};
  for (let index = 0; index < input.length; index++) {
    const [amount, chemical] = input[index].trim().split(" ");
    chemicals[chemical] = +amount;
  }

  return chemicals;
};

// const findOres = (reactions, require, leftAmount) => {
//   for (const key in require) {
//     if (require.length === 1 && key === "ORE") {
//       return require[key];
//     }

//     const inputChemicals = splitInputs(
//       reactions[key]
//         .inputs,
//     );
//     const amountNeeded = findOres(reactions, inputChemicals, leftAmount);
//     const reactionsNeeded = Math.ceil(require[key] / amountNeeded);
//     leftAmount[key] = require[key] - amountNeeded;
//   }
// };

const part1 = (data) => {
  const reactions = parseInput(data);
  //return (1000000000000 / findOres("FUEL", 1, reactions, {}));
  return findOres("FUEL", 1, reactions, {});
};

const findOres = (chemical, amount, reactions, leftOver) => {
  if (chemical === "ORE") {
    return amount;
  }

  leftOver[chemical] = leftOver[chemical] || 0;

  if (leftOver[chemical] >= amount) {
    leftOver[chemical] = leftOver[chemical] - amount;
    return 0;
  }

  amount = amount - leftOver[chemical];
  leftOver[chemical] = 0;
  //console.log("chemical", chemical);
  let ores = 0;
  for (const [quantity, input] of reactions[chemical].inputs) {
    const reactionsNeeded = Math.ceil(amount / reactions[chemical].quantity);
    ores += findOres(input, +quantity * reactionsNeeded, reactions, leftOver);
    leftOver[chemical] = (reactionsNeeded * reactions[chemical].quantity) -
      amount;
  }
  //console.log("ores", ores);

  return ores;
};

const part1 = (data) => {
  const leftOver = {};
  const reactions = parseInput(data);
  return [findOres("FUEL", 1, reactions, leftOver), leftOver];
};

const part2 = (data) => {
  const reactions = parseInput(data);
  let leftOver = {};
  let ores = 0;
  let fuels = 0;
  while (ores <= 1000000000000) {
    fuels++;
    ores += findOres("FUEL", 1, reactions, leftOver);
    console.log("fuel", fuels);
    //prompt();
    // console.log("ores", oresFor1Fuel, "rema", remain);
    // prompt();
  }
  console.log("ores", ores);
  return fuels;
};

const copy_part2 = (input) => {
  let ores = 0;
  let fuels = 0;

  while (ores <= 1000000000000) {
    fuels++;
    ores += findOres("FUEL", 1, reactions, leftOver);
    console.log("fuel", fuels);
  }
};

console.log(part2(inputs.puzzleInput));
