const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");

const GRIDHEIGHT = 50;
const GRIDWIDTH = 50;

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
            row.push(' ');
        }
        grid.push(row);
    }
    return grid;
}

shared.start("day 15A");

const grid = emptyGrid();
let computer = Object.create(shared.intcodeComputer);
let currentX = GRIDWIDTH/2;
let currentY = GRIDHEIGHT/2;
let lastX = currentX;
let lastY = currentY;
let direction = 1;
let movements = [];
movements[1] = {x: 0, y: -1, right: 4, left: 3};
movements[2] = {x: 0, y: 1, right: 3, left: 4};
movements[3] = {x: -1, y: 0, right: 1, left: 2};
movements[4] = {x: 1, y: 0, right:2, left: 1};
grid[currentY][currentX] = 'S';


computer.reset(baseProgram);
computer.setInputValue(direction);

let iteration = 0;
let steps = 0;
while (!computer.halted && computer.getOutputValue() != 2) {
    computer.run();
    iteration++;
    lastX = currentX;
    lastY = currentY;
    switch(computer.getOutputValue()) {
        case 0: 
            grid[currentY + movements[direction].y][currentX + movements[direction].x] = '#';
            direction = movements[direction].left;
            break;
        case 1: 
            currentX += movements[direction].x;
            currentY += movements[direction].y;
            if (grid[currentY][currentX] === ' ') {
                grid[currentY][currentX] = '.';
                steps++;
            } else {
                grid[lastY][lastX] = '-';
                steps--;
            }
            direction = movements[direction].right;
            break;
        case 2: 
            currentX += movements[direction].x;
            currentY += movements[direction].y;
            grid[currentY][currentX] = 'O';
            steps++;
        break;
    } 
    computer.setInputValue(direction);
}
// showGrid(grid);

shared.end(steps);


