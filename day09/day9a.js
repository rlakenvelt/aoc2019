const utils = require('../utils');

const baseProgram = utils.getNumericInput(",");

const intcodeComputer = {
    inputValues: [],
    outputValues: [],
    program: [],
    instructionPointer: 0,
    wait: false,
    halted: false,
    mode: [],
    reset(program) {
        this.inputValues = [];
        this.instructionPointer = 0;
        this.outputValues = [];
        this.program = [...program];
        this.wait = false;
        this.halted = false;
        this.relativeBase = 0;
    },
    setInputSignal(inputSignal) {
        this.inputValues.push(inputSignal);
    },
    parameterValue(parameter, address) {
        let pointer = 0;
        let usemode = this.mode[parameter - 1];
        if (address && usemode === 0) usemode = 1;
        switch (usemode) {
            case 0:
                pointer = this.program[this.instructionPointer + parameter];
                break;
            case 1:
                pointer = this.instructionPointer + parameter;
                break;
            case 2:
                if (address === true) {
                    return this.program[this.instructionPointer + parameter] + this.relativeBase;
                }
                pointer = this.program[this.instructionPointer + parameter] + this.relativeBase;
                break;
        }

        if (this.program[pointer] === undefined) {
            for (i=this.program.length; i<=pointer; i++) {
                this.program.push(0);
            }
        }
        return this.program[pointer];
    },
    handleOpCode() {
        const instruction = this.program[this.instructionPointer].toString();
        const opCode = parseInt(instruction.substring(instruction.length - 2));
        this.mode  = [...instruction.substring(0, instruction.length - 2).split('').map(x => parseInt(x)).reverse(), 0, 0, 0];
        switch (opCode) {
            case 0: 
                this.wait = false;
                this.halted = true;
                break;

            case 1:
                this.program[this.parameterValue(3, true)] = this.parameterValue(1) + 
                                                             this.parameterValue(2);
                this.instructionPointer += 4;
                break;``
            case 2:
                this.program[this.parameterValue(3, true)] = this.parameterValue(1) * 
                                                            this.parameterValue(2);
                this.instructionPointer += 4;
                break;``
            case 3:
                if (this.inputValues.length > 0) {
                    this.program[this.parameterValue(1, true)] = this.inputValues[0]; 
                    this.inputValues.shift();
                    this.instructionPointer += 2;
                    break;
                }
                this.wait = true;
                break;
            case 4:
                this.outputValues.push(this.parameterValue(1));
                this.instructionPointer += 2;
                break;
            case 5:
                if (this.parameterValue(1)) {
                    this.instructionPointer = this.parameterValue(2);
                } else {
                    this.instructionPointer += 3;
                }
                break;
            case 6:
                if (!this.parameterValue(1)) {
                    this.instructionPointer = this.parameterValue(2);
                } else {
                    this.instructionPointer += 3;
                }
                break;
            case 7:
                if (this.parameterValue(1) < this.parameterValue(2)) {
                    this.program[this.parameterValue(3, true)] = 1;
                } else {
                    this.program[this.parameterValue(3, true)] = 0;
                }
                this.instructionPointer += 4;
                break;
            case 8:
                if (this.parameterValue(1) === this.parameterValue(2)) {
                    this.program[this.parameterValue(3, true)] = 1;
                } else {
                    this.program[this.parameterValue(3, true)] = 0;
                }
                this.instructionPointer += 4;
                break;
            case 9:
                this.relativeBase += this.parameterValue(1);
                this.instructionPointer += 2;
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

utils.start("day 9A");

let answer = 0;
let computer = Object.create(intcodeComputer);
computer.reset(baseProgram);
computer.setInputSignal(1);
computer.run();
answer = computer.outputValues[computer.outputValues.length - 1];

utils.end(answer);


