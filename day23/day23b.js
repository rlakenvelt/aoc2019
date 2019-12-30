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
const nat = {x: -1, y: -1, lasty:-1};

while (true) {
    let computersWithOutput=0;
    computers.forEach(computer=> {
        if (computer.outputValues.length>0&&!answerfound) {
            computersWithOutput++;
            for (let index=0; index<computer.outputValues.length; index+=3) {
                const receivingComputer=computer.outputValues[index];
                if (receivingComputer===255) {
                    nat.x=computer.outputValues[index+1];
                    nat.y=computer.outputValues[index+2];
                } else {
                    computers[receivingComputer].setInputValue(computer.outputValues[index+1]);
                    computers[receivingComputer].setInputValue(computer.outputValues[index+2]);
                    computers[receivingComputer].setInputValue(-1);
                }
            }
        }
    })
    if (computersWithOutput===0) {
        if (nat.y===nat.lasty) {
            answer=nat.y;
            break;
        }
        computers[0].setInputValue(nat.x);
        computers[0].setInputValue(nat.y);
        computers[0].setInputValue(-1);
        nat.lasty=nat.y;
    }
    computers.forEach(computer=> {
        computer.run();
    });
}

shared.end(answer);

