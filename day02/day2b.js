const shared = require('../shared');

let integers = [];

function handleOpCode (instructionPointer) {
    const opCode       = integers[instructionPointer];
    const parameter1   = integers[instructionPointer + 1];
    const parameter2   = integers[instructionPointer + 2];
    const parameter3   = integers[instructionPointer + 3];
    let result = 0;
    switch(opCode) {
        case 1: 
            result = integers[parameter1] + integers[parameter2];
            break;
        case 2: 
            result = integers[parameter1] * integers[parameter2];
            break;
        case 99: return false;
    }
    integers[parameter3] = result;
    return true;
};

function runProgram (noun, verb) {
    integers = shared.getNumericInput(",");
    integers[1] = noun;
    integers[2] = verb;    
    let stop = false;
    for (i = 0; i < integers.length && !stop; i+=4) { 
        stop = (handleOpCode(i) === 0);
    } 
    return integers[0];
}

shared.start("day 2B");
let stop = false;
for (noun = 0; noun <=99 && !stop; noun++) { 
    for (verb = 0; verb <=99 && !stop; verb++) { 
        if (runProgram(noun, verb) === 19690720) {
            shared.end(noun * 100 + verb);
            stop = true;
        };    
    }     
} 
