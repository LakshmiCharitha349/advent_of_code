const findInputChemicals_copy = (inputChemicals, quantity, reactions) => {
  for (let index = 0; index < inputChemicals.length; index++) {
    const [amount, name] = inputChemicals[index].trim().split(" ");
    findInputChemicals(
      reactions[name].inputs,
      reactions[name].quantity,
      reactions,
    );
  }
};
