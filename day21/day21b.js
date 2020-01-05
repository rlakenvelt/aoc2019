const shared = require('../shared');
const baseProgram = shared.getNumericInput(',');
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

shared.start('day 21B');

let computer = Object.create(shared.intcodeComputer);

computer.reset(baseProgram);
computer.run();

pushASCII('NOT E T');
pushASCII('NOT T J');
pushASCII('AND F J');
pushASCII('AND G J');
pushASCII('NOT I T');
pushASCII('AND T J');
pushASCII('OR H J');
pushASCII('NOT C T');
pushASCII('AND T J');
pushASCII('NOT B T');
pushASCII('OR T J');
pushASCII('NOT A T');
pushASCII('OR T J');
pushASCII('AND D J');
pushASCII('RUN');

computer.run();
// showMemory(computer.outputValues);    
answer=computer.getOutputValue();                          

shared.end(answer);


