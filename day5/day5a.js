const utils = require('../utils');

const integers = utils.getNumericInput(",");

let answer = 0;
function handleOpCode(instructionPointer) {
    const instruction = integers[instructionPointer].toString();
    const opCode = parseInt(instruction.substring(instruction.length - 2));
    let mode  = [...instruction.substring(0, instruction.length - 2).split('').map(x => parseInt(x)).reverse(), 0, 0, 0];
    switch (opCode) {
        case 1:
            integers[integers[instructionPointer + 3]] = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]) + 
                                                         (mode[1] ? integers[instructionPointer + 2] : integers[integers[instructionPointer + 2]]);
            return instructionPointer + 4;
        case 2:
            integers[integers[instructionPointer + 3]] = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]) * 
                                                         (mode[1] ? integers[instructionPointer + 2] : integers[integers[instructionPointer + 2]]);
            return instructionPointer + 4;
        case 3:
            integers[integers[instructionPointer + 1]] = 1; // User input: 1
            return instructionPointer + 2;
        case 4:
            answer = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]);
            return instructionPointer + 2;
        case 99: 
            return -1;
    }
    return -1;
};

utils.start("day 5A");

let instruction = 0
while (instruction >= 0) {
   instruction = handleOpCode(instruction);
}

utils.end(answer);

