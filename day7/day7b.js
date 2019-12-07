const utils = require('../utils');

const baseProgram = utils.getNumericInput(",");

const amplifier = {
    inputValues: [],
    outputValue: 0,
    program: [],
    instructionPointer: 0,
    wait: false,
    halted: false,
    reset(phase, program) {
        this.inputValues = [phase];
        this.instructionPointer = 0;
        this.outputValue = 0;
        this.program = [...program];
        this.wait = false;
        this.halted = false;
    },
    setInputSignal(inputSignal) {
        this.inputValues.push(inputSignal);
    },
    parameterValue(parameter, mode) {
        return (mode ? this.program[this.instructionPointer + parameter] : this.program[this.program[this.instructionPointer + parameter]]);
    },
    handleOpCode() {
        const instruction = this.program[this.instructionPointer].toString();
        const opCode = parseInt(instruction.substring(instruction.length - 2));
        let mode  = [...instruction.substring(0, instruction.length - 2).split('').map(x => parseInt(x)).reverse(), 0, 0, 0];
        switch (opCode) {
            case 1:
                this.program[this.program[this.instructionPointer + 3]] = this.parameterValue(1, mode[0]) + 
                                                                          this.parameterValue(2, mode[1]);
                this.instructionPointer += 4;
                break;``
            case 2:
                this.program[this.program[this.instructionPointer + 3]] = this.parameterValue(1, mode[0]) * 
                                                                          this.parameterValue(2, mode[1]);
                this.instructionPointer += 4;
                break;``
            case 3:
                if (this.inputValues.length > 0) {
                    this.program[this.program[this.instructionPointer + 1]] = this.inputValues[0]; 
                    this.inputValues.shift();
                    this.instructionPointer += 2;
                    break;``
                }
                this.wait = true;
                break;``
            case 4:
                this.outputValue = this.parameterValue(1, mode[0]);
                this.instructionPointer += 2;
                break;
            case 5:
                if (this.parameterValue(1, mode[0])) {
                    this.instructionPointer = this.parameterValue(2, mode[1]);
                } else {
                    this.instructionPointer += 3;
                }
                break;
            case 6:
                if (!this.parameterValue(1, mode[0])) {
                    this.instructionPointer = this.parameterValue(2, mode[1]);
                } else {
                    this.instructionPointer += 3;
                }
                break;
            case 7:
                if (this.parameterValue(1, mode[0]) < this.parameterValue(2, mode[1])) {
                    this.program[this.program[this.instructionPointer + 3]] = 1;
                } else {
                    this.program[this.program[this.instructionPointer + 3]] = 0;
                }
                this.instructionPointer += 4;
                break;
            case 8:
                if (this.parameterValue(1, mode[0]) === this.parameterValue(2, mode[1])) {
                    this.program[this.program[this.instructionPointer + 3]] = 1;
                } else {
                    this.program[this.program[this.instructionPointer + 3]] = 0;
                }
                this.instructionPointer += 4;
                break;
            case 99: 
                this.wait = false;
                this.halted = true;
                break;
        }
        return;
    },
    run() {
        this.halted = false;
        this.wait   = false;
        while (!this.wait && !this.halted) {
            this.handleOpCode();
        }
    }    
};

function phaseSequencesFor(phases) {
    if (phases.length === 2) return [[phases[0], phases[1]], [phases[1], phases[0]]];
    return phases.reduce((list, item) => {
        return list.concat(phaseSequencesFor(phases.filter(filteritem => filteritem !== item)).reduce((listsub, itemsub) => {
            listsub.push([item, ...itemsub]);
            return listsub;
        }, []));
    }, []);
}

function resetAmplifiersForPhaseSequence (phaseSequence) {
    amplifiers.forEach((amplifier, index) => {
        amplifier.reset(phaseSequence[index], baseProgram);
    });
}

function outputForPhaseSequence(phaseSequence) {
    let lastOutput = 0;
    let currentAmplifier = -1;
    let stop = false;
    resetAmplifiersForPhaseSequence(phaseSequence);
    do {
        currentAmplifier++;
        if (currentAmplifier === 5) currentAmplifier = 0;
        amplifiers[currentAmplifier].setInputSignal(lastOutput);
        amplifiers[currentAmplifier].run();
        lastOutput = amplifiers[currentAmplifier].outputValue;
        if (amplifiers[currentAmplifier].halted) stop = true;
    }
    while (!stop || currentAmplifier !== 4);

    return lastOutput;
}


utils.start("day 7B");

let amplifiers = [];
let maxOutput = 0;
let answer = 0;

for(i=0; i<5; i++) {
    amplifiers[i] = Object.create(amplifier);
}

phaseSequencesFor([5, 6, 7, 8, 9]).forEach((phaseSequence) => {
    const output = outputForPhaseSequence(phaseSequence);
    maxOutput = Math.max(output, maxOutput);

});
answer = maxOutput;
utils.end(answer);


