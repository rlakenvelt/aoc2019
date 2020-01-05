const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");
const GRIDWIDTH=50;
const GRIDHEIGHT=50;

function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}
shared.start("day 19A");

let computer = Object.create(shared.intcodeComputer);
let answer = 0;
let grid=[];

for (let y=0; y<GRIDHEIGHT; y++) {
    const row=[];
    for (let x=0; x<GRIDWIDTH; x++) {
        computer.reset(baseProgram);
        computer.setInputValue(x);
        computer.setInputValue(y);
        computer.run();
        if (computer.getOutputValue()===1) {
            answer++;
            row.push('#')
        } else {
            row.push('.');
        }
    }
    grid.push(row);
}
// showGrid(grid);

shared.end(answer);


