const input = require('../input');

const masses = input.getNumericInput();

const fuelForMass = (mass, total) => {
    const fuel = Math.floor(mass / 3) - 2;
    if (fuel <= 0) return total;
    return fuelForMass(fuel, total + fuel);
};

const totalFuel = masses.map(mass => fuelForMass(mass, 0)).reduce((total, mass) => total + mass, 0);

console.log('ANSWER 1B:', totalFuel);

