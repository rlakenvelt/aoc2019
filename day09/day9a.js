const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");

shared.start("day 9A");

let answer = 0;
let computer = Object.create(shared.intcodeComputer);
computer.reset(baseProgram);
computer.setInputValue(1);
computer.run();
answer = computer.getOutputValue();

shared.end(answer);


