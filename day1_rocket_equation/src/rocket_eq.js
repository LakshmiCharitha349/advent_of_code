export const requiredFuelOf = (mass) => Math.floor(+mass / 3) - 2;

export const requiredFuelOfModuleOf = (mass) => {
  const fuel = requiredFuelOf(mass);
  if (fuel <= 0) return 0;

  return fuel + requiredFuelOfModuleOf(fuel);
};

export const fuelRequirment = (data) => {
  const modulesMass = data.split("\n");
  return modulesMass.reduce(
    (total, moduleMass) => total + requiredFuelOfModuleOf(moduleMass),
    0,
  );
};
