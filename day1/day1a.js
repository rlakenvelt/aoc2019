const input = require('../input');

const masses = input.getNumericInput();

const fuelForMass = (mass) => {
    return Math.floor(mass / 3) - 2;
};

const totalFuel = masses.map(mass => fuelForMass(mass)).reduce((total, mass) => total + mass, 0);

console.log('ANSWER 1A:', totalFuel);

