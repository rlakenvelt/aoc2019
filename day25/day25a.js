const shared = require('../shared');
var readlineSync = require('readline-sync');

const baseProgram = shared.getNumericInput(",");

let answer=0;

let computer = Object.create(shared.intcodeComputer);

function setInput(inputstring) {
    const arr=inputstring.split('');
    arr.forEach(item => {
        computer.setInputValue(item.charCodeAt(0));
    });
    computer.setInputValue(10);
}

function showMemory (stack) {
    console.log(getMemoryAsText(stack));
}
function getMemoryAsText (stack) {
    return stack.map(x => String.fromCharCode(x))
                     .join('');                
}

function getCombinations(array) {
    const combinations = []; 
    const numberOfCombinations = 2**array.length;
    let combination= [];
    
    for (let i=0; i<numberOfCombinations; i++){
        combination= [];
        for (let j=0;j<array.length;j++) {
            if ((i & Math.pow(2,j))){ 
                combination.push(array[j]);
            }
        }
        if (combination !== "") {
            combinations.push(combination);
        }
    }
    return combinations;
}

shared.start('day 25A');
computer.reset(baseProgram);

const automated = readlineSync.question('Automated run (y/n)?');
if (automated==='y') {
    const inventory=['monolith', 'bowl of rice', 'ornament', 'shell', 'astrolabe','planetoid','fuel cell','cake'];
    const inventoryCombinations = getCombinations(inventory);
    setInput('east');
    setInput('east');
    setInput('south');
    setInput('take monolith');
    setInput('north');
    setInput('east');
    setInput('take shell');
    setInput('west');
    setInput('west');
    setInput('north');
    setInput('west');
    setInput('take bowl of rice');
    setInput('east');
    setInput('north');
    setInput('take planetoid');
    setInput('west');
    setInput('take ornament');
    setInput('south');
    setInput('south');
    setInput('take fuel cell');
    setInput('north');
    setInput('north');
    setInput('east');
    setInput('east');
    setInput('take cake');
    setInput('south');
    setInput('west');
    setInput('north');
    setInput('take astrolabe');
    setInput('west');
    inventory.forEach(item=> {setInput('drop ' + item)});
    computer.run();
    
    let stop = false;
    inventoryCombinations.forEach(combination=> {
        if (!stop) {
            combination.forEach(item=> {setInput('take ' + item)});
            computer.run();
            setInput('north');
            computer.outputValues=[];
            computer.run();
            const output = getMemoryAsText(computer.outputValues);
            if (output.includes("Alert")) {
                combination.forEach(item=> {setInput('drop ' + item)});
            } else {
                stop = true;
                showMemory(computer.outputValues);
                console.log('Used combination of inventory items to get the right weight:', combination);
            }
        }
    });
} else {
    while (true) {
        computer.run();
        showMemory(computer.outputValues);
        const command = readlineSync.question('');
        setInput(command);
    }
}

shared.end('See game output above');


