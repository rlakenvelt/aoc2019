const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");

shared.start("day 9B");

let answer = 0;
let computer = Object.create(shared.intcodeComputer);
computer.reset(baseProgram);
computer.setInputValue(2);
computer.run();
answer = computer.getOutputValue();

shared.end(answer);


