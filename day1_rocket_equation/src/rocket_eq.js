export const requiredFuelOf = (mass) => Math.floor(+mass / 3) - 2;

export const fuelRequirment = (data) => {
  const modulesMass = data.split("\n");
  return modulesMass.reduce(
    (total, moduleMass) => total + requiredFuelOf(moduleMass),
    0,
  );
};
