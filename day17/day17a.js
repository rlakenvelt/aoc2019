const shared = require('../shared');
const baseProgram = shared.getNumericInput(",");

function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}
function isScaffold(x, y) {
    if (x<0 || y < 0) return false;
    if (y > grid.length-1) return false;
    if (x > grid[y].length-1) return false;
    const value = grid[y][x];
    return (value==='#'||value==='^'||value==='>'||value==='v'||value==='<');
}

shared.start("day 17A");

let computer = Object.create(shared.intcodeComputer);

computer.reset(baseProgram);
computer.run();
const grid = computer.outputValues.map(x => String.fromCharCode(x))
                                  .join('')
                                  .split('\n')
                                  .reduce((list, value) => {
                                      list.push(value.split(''));
                                      return list;  
                                  },[]); 

const intersections = [];
for (let row=0; row<grid.length; row++) {
    for (let col=0; col<grid[row].length; col++) { 
        if (grid[row][col]==='.') continue; 
        let neighbours = 0;
        if (isScaffold(col, row-1)) neighbours++;
        if (isScaffold(col+1, row)) neighbours++;
        if (isScaffold(col, row+1)) neighbours++;
        if (isScaffold(col-1, row)) neighbours++;
        if (neighbours>2) {
            intersections.push({x: col, y:row});
        }
    }
}
// showGrid(grid);

const answer = intersections.reduce((total, intersection) => {
    total += intersection.x * intersection.y;
    return total;
}, 0);

shared.end(answer);


