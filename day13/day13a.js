const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");

shared.start("day 13A");

let computer = Object.create(shared.intcodeComputer);
computer.reset(baseProgram);
computer.run();

const answer = computer.outputValues.reduce((total, value, index) => {
    if ((index + 1) % 3 === 0 && value === 2) {
        total++;
    } 
    return total;
}, 0);
shared.end(answer);


