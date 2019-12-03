const utils = require('../utils');

const masses = utils.getNumericInput();

function fuelForMass (mass) {
    return Math.floor(mass / 3) - 2;
};

utils.start("day 1A");
const totalFuel = masses.map(mass => fuelForMass(mass)).reduce((total, mass) => total + mass, 0);
utils.end(totalFuel);

