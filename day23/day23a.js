const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");

shared.start("day 23A");

let answer = 0;
let answerfound = false;
let computers=[];
for (let i=0; i<50; i++) {
  computers.push(Object.create(shared.intcodeComputer));
  computers[i].reset(baseProgram);
  computers[i].setInputValue(i);
  computers[i].setInputValue(-1);
  computers[i].run();
}

while (true) {
    computers.forEach(computer=> {
        if (computer.outputValues.length>0&&!answerfound) {
            for (let index=0; index<computer.outputValues.length; index+=3) {
                const receivingComputer=computer.outputValues[index];
                if (!computers[receivingComputer]) {
                    answer=computer.outputValues[index+2];
                    answerfound=true;
                    break;
                }
                computers[receivingComputer].setInputValue(computer.outputValues[index+1]);
                computers[receivingComputer].setInputValue(computer.outputValues[index+2]);
                computers[receivingComputer].setInputValue(-1);
            }
        }
    })
    if (!answerfound) {
        computers.forEach(computer=> {
            computer.run();
        });
    } else break;
}

shared.end(answer);

