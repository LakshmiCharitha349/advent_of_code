const inputs = {
  simple: `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`,
};

const expToGetNumber = /\d+/g;
const expToGetString = /[A-Z]+/g;

const splitChemicalDetails = (chemical) => {
  const quantity = chemical.match(expToGetNumber);
  const name = chemical.match(expToGetString);
  return { quantity, name };
};

const splitReactions = (reaction) => {
  const splittedReaction = reaction.split("=");
  const inputChemicals = splittedReaction[0].split(",");
  const outPutChemical = [splittedReaction[1].slice(1)];

  return {
    inputChemicals: inputChemicals.map((chemical) =>
      splitChemicalDetails(chemical)
    ),
    outPutChemical: outPutChemical.map((chemical) =>
      splitChemicalDetails(chemical)
    ),
  };
};

const parseInput = (input) => {
  const reactions = input.split("\n");
  return reactions.map((reaction) => splitReactions(reaction));
};

console.log(parseInput(inputs.simple));
