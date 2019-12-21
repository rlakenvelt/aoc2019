const fs = require("fs");

let starttime;
let endtime;
let puzzletitle;

const start = (puzzle) => {
  starttime = new Date();
  puzzletitle = puzzle;
};

const end = (answer) => {
  endtime = new Date();
  console.log("---------------------");
  console.log("Puzzle   :", puzzletitle);
  console.log("Answer   :", answer);
  console.log("Duration :", endtime - starttime, "ms");
  console.log("---------------------");
};

const getInput = (separator = "\n") => {
  const file = fs.readFileSync('./input.txt', "utf-8");
  return file.split(separator).map(x =>x);
};

const getNumericInput = (separator = "\n") => {
  return getInput(separator).map(x => parseInt(x));
};

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
  getOutputValue(inputSignal) {
      return this.outputValues[this.outputValues.length - 1]
  },
  setInputValue(inputSignal) {
    this.inputValues.push(inputSignal);
  },
  address(position) {
      let pointer = 0;
      if (this.mode[position - 1] === 2) {
        return this.program[this.instructionPointer + position] + this.relativeBase;
      } else {
        return this.program[this.instructionPointer + position];
      }
  },
  parameterValue(parameter) {
    let pointer = 0;
    switch (this.mode[parameter - 1]) {
        case 0:
            pointer = this.program[this.instructionPointer + parameter];
            break;
        case 1:
            pointer = this.instructionPointer + parameter;
            break;
        case 2:
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
              this.program[this.address(3)] = this.parameterValue(1) + this.parameterValue(2);
              this.instructionPointer += 4;
              break;``
          case 2:
              this.program[this.address(3)] = this.parameterValue(1) * this.parameterValue(2);
              this.instructionPointer += 4;
              break;``
          case 3:
              if (this.inputValues.length > 0) {
                  this.program[this.address(1)] = this.inputValues[0]; 
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
                  this.program[this.address(3)] = 1;
              } else {
                  this.program[this.address(3)] = 0;
              }
              this.instructionPointer += 4;
              break;
          case 8:
              if (this.parameterValue(1) === this.parameterValue(2)) {
                  this.program[this.address(3)] = 1;
              } else {
                  this.program[this.address(3)] = 0;
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
      this.outputValues = [];
      while (!this.wait && !this.halted) {
          this.handleOpCode();
      }
  }    
}
module.exports = { start, end, getInput, getNumericInput, intcodeComputer };

