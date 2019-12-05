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
            integers[integers[instructionPointer + 1]] = 5; // User input: 5
            return instructionPointer + 2;
        case 4:
            answer = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]);
            return instructionPointer + 2;
        case 5:
            const jump5 = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]);
            if (jump5) {
                return (mode[1] ? integers[instructionPointer + 2] : integers[integers[instructionPointer + 2]]);
            } else {
                return instructionPointer + 3;
            }
        case 6:
            const jump6 = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]);
            if (!jump6) {
                return (mode[1] ? integers[instructionPointer + 2] : integers[integers[instructionPointer + 2]]);
            } else {
                return instructionPointer + 3;
            }
        case 7:
            const param7_1 = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]);
            const param7_2 = (mode[1] ? integers[instructionPointer + 2] : integers[integers[instructionPointer + 2]]);
            if (param7_1 < param7_2) {
                integers[integers[instructionPointer + 3]] = 1;
            } else {
                integers[integers[instructionPointer + 3]] = 0;
            }
            return instructionPointer + 4;
        case 8:
            const param8_1 = (mode[0] ? integers[instructionPointer + 1] : integers[integers[instructionPointer + 1]]);
            const param8_2 = (mode[1] ? integers[instructionPointer + 2] : integers[integers[instructionPointer + 2]]);
            if (param8_1 === param8_2) {
                integers[integers[instructionPointer + 3]] = 1;
            } else {
                integers[integers[instructionPointer + 3]] = 0;
            }
            return instructionPointer + 4;
        case 99: 
            return -1;
    }
    return -1;
};

utils.start("day 5B");

let instruction = 0
while (instruction >= 0) {
   instruction = handleOpCode(instruction);
}

utils.end(answer);

