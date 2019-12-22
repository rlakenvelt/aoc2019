const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");
const GRIDHEIGHT = 25;
const GRIDWIDTH = 41;

function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}

function emptyGrid () {
    const grid = [[]];
    for (i=0; i<GRIDHEIGHT; i++) {
        const row = [];
        for (j=0; j<GRIDWIDTH; j++) {
            row.push('.');
        }
        grid.push(row);
    }
    return grid;
}
function fillGrid (computerOutput) {
    for (i=2; i<computerOutput.length; i+=3) {
        if (computerOutput[i-1] === 0 && computerOutput[i-2] === -1) {
            score = computerOutput[i];
            continue;
        }
        let char = ' ';
        switch(computerOutput[i]) {
            case 0: 
                char = ' ';
                break;
            case 1: 
                char = '*';
                break;
            case 2: 
                char = '#';
                break;
            case 3: 
                char = '_';
                currentPaddle = {x: computerOutput[i-2], y:computerOutput[i-1]};
                break;
            case 4: 
                char = 'O';
                currentBall = {x: computerOutput[i-2], y:computerOutput[i-1]};
                break;
        }
        grid[computerOutput[i-1]][computerOutput[i-2]] = char;
    }
}

shared.start("day 13B");

let computer = Object.create(shared.intcodeComputer);
let currentBall;
let currentPaddle;
let score=0;
const grid = emptyGrid();
baseProgram[0] = 2;
computer.reset(baseProgram);
let iteration = 0;
while (!computer.halted) {
    computer.run();
    fillGrid(computer.outputValues);
    // showGrid(grid);
    let paddleInput = 0
    if (currentBall.x > currentPaddle.x) {
        paddleInput = 1;
    } else
    if (currentBall.x < currentPaddle.x) {
        paddleInput = -1;
    }
    computer.setInputValue(paddleInput);
    iteration++;
}

shared.end(score);


