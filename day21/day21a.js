const shared = require('../shared');
const baseProgram = shared.getNumericInput(",");
let answer=0;

function showMemory (stack) {
    let lines = stack.map(x => String.fromCharCode(x))
                     .join('')
                     .split('\n')
                     .reduce((list, value) => {
                         list.push(value.split(''));
                         return list;  
                     },[]); 

    lines.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}

function pushASCII(inputstring) {
    const arr=inputstring.split('');
    arr.forEach(item => {
        computer.setInputValue(item.charCodeAt(0));
    });
    computer.setInputValue(10);
}

shared.start("day 21A");

let computer = Object.create(shared.intcodeComputer);

computer.reset(baseProgram);
computer.run();

pushASCII('OR A J');
pushASCII('AND B J');
pushASCII('AND C J');
pushASCII('NOT T J');
pushASCII('AND D J');
pushASCII('WALK');

computer.run();
showMemory(computer.outputValues);    
answer=computer.getOutputValue();                          

shared.end(answer);


