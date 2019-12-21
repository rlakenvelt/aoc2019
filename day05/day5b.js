const shared = require('../shared');

const integers = shared.getNumericInput(",");

let answer = 0;

function parameterValue(parameter, mode, instructionPointer) {
    return (mode ? integers[instructionPointer + parameter] : integers[integers[instructionPointer + parameter]]);
}

function handleOpCode(instructionPointer) {
    const instruction = integers[instructionPointer].toString();
    const opCode = parseInt(instruction.substring(instruction.length - 2));
    let mode  = [...instruction.substring(0, instruction.length - 2).split('').map(x => parseInt(x)).reverse(), 0, 0, 0];
    switch (opCode) {
        case 1:
            integers[integers[instructionPointer + 3]] = parameterValue(1, mode[0], instructionPointer) + 
                                                         parameterValue(2, mode[1], instructionPointer);
            return instructionPointer + 4;
        case 2:
            integers[integers[instructionPointer + 3]] = parameterValue(1, mode[0], instructionPointer) * 
                                                         parameterValue(2, mode[1], instructionPointer);
            return instructionPointer + 4;
        case 3:
            integers[integers[instructionPointer + 1]] = 5; // User input: 5
            return instructionPointer + 2;
        case 4:
            answer = parameterValue(1, mode[0], instructionPointer);
            return instructionPointer + 2;
        case 5:
            if (parameterValue(1, mode[0], instructionPointer)) {
                return parameterValue(2, mode[1], instructionPointer);
            } else {
                return instructionPointer + 3;
            }
        case 6:
            if (!parameterValue(1, mode[0], instructionPointer)) {
                return parameterValue(2, mode[1], instructionPointer);
            } else {
                return instructionPointer + 3;
            }
        case 7:
            if (parameterValue(1, mode[0], instructionPointer) < parameterValue(2, mode[1], instructionPointer)) {
                integers[integers[instructionPointer + 3]] = 1;
            } else {
                integers[integers[instructionPointer + 3]] = 0;
            }
            return instructionPointer + 4;
        case 8:
            if (parameterValue(1, mode[0], instructionPointer) === parameterValue(2, mode[1], instructionPointer)) {
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

shared.start("day 5B");

let instruction = 0
while (instruction >= 0) {
   instruction = handleOpCode(instruction);
}

shared.end(answer);

