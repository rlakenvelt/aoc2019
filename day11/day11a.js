const shared = require('../shared');
const baseProgram = shared.getNumericInput(",");
const GRIDSIZE = 150;

function createGrid(size) {
    let tempgrid = [[]];
    for (i=0; i<size; i++) {
        const row = [];    
        for (j=0; j<size; j++) {
            row.push('.');
        };
        tempgrid.push(row);
    };
    return tempgrid;
}

shared.start("day 11A");

let answer = 0;
let computer = Object.create(shared.intcodeComputer);
computer.reset(baseProgram);

let position = {x: GRIDSIZE / 2, y: GRIDSIZE / 2};
let direction = [0, 1];
let grid = createGrid(GRIDSIZE);
let paintedPanels = [];

while (!computer.halted) {
    if (grid[position.y][position.x] === '.') {
        computer.setInputValue(0);
    } else {
        computer.setInputValue(1);
    }
    computer.run();
    const color = computer.outputValues[0];
    const turn = computer.outputValues[1];
    if (color === 0) {
        grid[position.y][position.x] = '.';
    } else {
        grid[position.y][position.x] = '#';
    }
    let panel = paintedPanels.find(panel => {
        return panel.x === position.x && panel.y === position.y;
    })
    if (!panel) {
        panel = {x: position.x, y: position.y, count: 0};
        paintedPanels.push(panel);
    }
    panel.count++;
    if (turn === 0) {
        if (direction[0] === 0) {
            direction[0] = -direction[1];
            direction[1] = 0;
        } else {
            direction[1] = direction[0];
            direction[0] = 0;
        }
    } else {
        if (direction[0] === 0) {
            direction[0] = direction[1];
            direction[1] = 0;
        } else {
            direction[1] = -direction[0];
            direction[0] = 0;
        }
    }
    position.x += direction[0];
    position.y += direction[1];
}
answer = paintedPanels.length;

shared.end(answer);


