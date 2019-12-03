const utils = require('../utils');

const integers = utils.getNumericInput(",");

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

utils.start("day 2A");

integers[1] = 12;
integers[2] = 2;

let stop = false;
for (i = 0; i < integers.length && !stop; i+=4) { 
    stop = !handleOpCode(i);
}
utils.end(integers[0]);


