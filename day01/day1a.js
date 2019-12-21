const shared = require('../shared');

const masses = shared.getNumericInput();

function fuelForMass (mass) {
    return Math.floor(mass / 3) - 2;
};

shared.start("day 1A");
const totalFuel = masses.map(mass => fuelForMass(mass)).reduce((total, mass) => total + mass, 0);
shared.end(totalFuel);

