const shared = require('../shared');

const masses = shared.getNumericInput();

function fuelForMass (mass, total) {
    const fuel = Math.floor(mass / 3) - 2;
    if (fuel <= 0) return total;
    return fuelForMass(fuel, total + fuel);
};

shared.start("day 1B");
const totalFuel = masses.map(mass => fuelForMass(mass, 0)).reduce((total, mass) => total + mass, 0);
shared.end(totalFuel);


