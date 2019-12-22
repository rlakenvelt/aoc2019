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

shared.start("day 15B");

const grid = emptyGrid();
let computer = Object.create(shared.intcodeComputer);
let currentX = GRIDWIDTH/2;
let currentY = GRIDHEIGHT/2;
let OX = currentX;
let OY = currentY;
let lastX = currentX;
let lastY = currentY;
let direction = 1;
let movements = [];
let count = 0;
movements[1] = {x: 0, y: -1, right: 4, left: 3};
movements[2] = {x: 0, y: 1, right: 3, left: 4};
movements[3] = {x: -1, y: 0, right: 1, left: 2};
movements[4] = {x: 1, y: 0, right:2, left: 1};
grid[currentY][currentX] = '.';


computer.reset(baseProgram);
computer.setInputValue(direction);

let iteration = 0;
while (!computer.halted) {
    computer.run();
    iteration++;
    if (iteration > 15000) break;
    switch(computer.getOutputValue()) {
        case 0: 
            grid[currentY + movements[direction].y][currentX + movements[direction].x] = '#';
            direction = movements[direction].left;
            break;
        case 1: 
        case 2: 
            currentX += movements[direction].x;
            currentY += movements[direction].y;
            if (grid[currentY][currentX] === ' ') {
                grid[currentY][currentX] = '.';
                count++;
            }
            if (computer.getOutputValue() === 2) {
                OX = currentX;
                OY = currentY;
            }
            direction = movements[direction].right;
            break;
    } 
    computer.setInputValue(direction);
}

currentX = OX;
currentY = OY;
grid[currentY][currentX] = 'O';
count--;
let maxpath = 0;
let steps = 0;

while (count > 0) {
    lastX = currentX;
    lastY = currentY;
    pathValue = grid[currentY + movements[direction].y][currentX + movements[direction].x];
    if (pathValue === '#') {
        direction = movements[direction].left;
    } else {
        currentX += movements[direction].x;
        currentY += movements[direction].y;

        if (grid[currentY][currentX] === '.') {
            grid[currentY][currentX] = 'O';
            steps++;
            count--;
            maxpath = Math.max(maxpath, steps);
        } else {
            grid[lastY][lastX] = '-';
            steps--;
        }

        direction = movements[direction].right;
    } 
    iteration++;
}
// showGrid(grid);

shared.end(maxpath);



