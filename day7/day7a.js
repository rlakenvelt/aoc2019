const utils = require('../utils');

const integers = utils.getNumericInput(",");

let answer = 0;
let output = 0;
let inputValues = [];

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
            integers[integers[instructionPointer + 1]] = inputValues[0]; 
            inputValues.shift();
            return instructionPointer + 2;
        case 4:
            output = parameterValue(1, mode[0], instructionPointer);
            return -1;
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

function handleAmplifier(sequence, inputSignal) {
    let instruction = 0
    output = 0;
    inputValues = [sequence, inputSignal];
    while (instruction >= 0) {
       instruction = handleOpCode(instruction);
    }
    console.log("OUTPUT", output);
    return output;
}

function outputForPhaseSequence(sequence) {
    answer = 4228125;
    sequence.forEach(amplifier => {
        answer = handleAmplifier(amplifier, answer);
    });    
}

function phaseSequencesFor(phases) {
    return [[9,7,8,6,5]];
    if (phases.length === 2) return [[phases[0], phases[1]], [phases[1], phases[0]]];
    return phases.reduce((list, item) => {
        return list.concat(phaseSequencesFor(phases.filter(filteritem => filteritem !== item)).reduce((listsub, itemsub) => {
            listsub.push([item, ...itemsub]);
            return listsub;
        }, []));
    }, []);
}

utils.start("day 7A");

let maxOutput = 0;
phaseSequencesFor([0, 1, 2, 3, 4]).forEach((sequence) => {
    outputForPhaseSequence(sequence);
    maxOutput = Math.max(answer, maxOutput);
});
answer = maxOutput;
utils.end(answer);


