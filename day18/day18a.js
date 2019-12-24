const shared = require('../shared');
let direction = 'U';
let movements = [];
movements['U'] = {x: 0, y: -1, right: 'R', left: 'L', back: 'D'};
movements['D'] = {x: 0, y: 1, right: 'L', left: 'R', back: 'U'};
movements['L'] = {x: -1, y: 0, right: 'U', left: 'D', back: 'R'};
movements['R'] = {x: 1, y: 0, right: 'D', left: 'U', back: 'L'};

function getGrid () {
    const rows = shared.getInput();
    return rows.reduce((list, row) => {
        list.push(row.split('')
                     .reduce((list, value) => {
                        list.push(value)
                        return list;
                     }, []));
        return list;
    }, []);
}
function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}
function findEntrance(grid) {
    let entrance;
    for (let row=0; row<grid.length; row++) {
        for (let col=0; col<grid[row].length; col++) { 
            if (grid[row][col] === '@') {
                entrance = {x: col, y: row};
                break;
            }
        }
        if (entrance) break;
    }
    return entrance;
}
function findKeysAndDoors(grid, entrance) {
    let iteration = 0;
    let currentX = entrance.x;
    let currentY = entrance.y;

    const keys=[];
    const doors = [];
    while (iteration<100000) {
        iteration++;
        const move = movements[direction];
        const cell = grid[currentY+move.y][currentX+move.x];
        switch(cell) {
            case '#': 
                direction = move.left;
                break;
            case '@': 
                direction = move.back;
                break;
            case '.': 
            case ' ': 
            case '!': 
                currentX += move.x;
                currentY += move.y;
                grid[currentY][currentX] = ' ';
                direction = move.right;
                break;
            default: 
                currentX += move.x;
                currentY += move.y;
                if (cell === cell.toLowerCase()) {
                    keys[cell] = {x: currentX, y:currentY};
                } else {
                    doors[cell] = {x: currentX, y:currentY};
                }
                direction = move.right;
                break;
        } 
    }
    return {keys: keys, doors: doors};
}

shared.start("day 18A");

const grid = getGrid();
const entrance = findEntrance(grid);
const keysAndDoors = findKeysAndDoors(grid, entrance);

// console.log(entrance);
// console.log(keysAndDoors);
// showGrid(grid);


shared.end(0);


