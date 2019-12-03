const utils = require('../utils');

const masses = utils.getNumericInput();

function fuelForMass (mass, total) {
    const fuel = Math.floor(mass / 3) - 2;
    if (fuel <= 0) return total;
    return fuelForMass(fuel, total + fuel);
};

utils.start("day 1B");
const totalFuel = masses.map(mass => fuelForMass(mass, 0)).reduce((total, mass) => total + mass, 0);
utils.end(totalFuel);


