const shared = require('../shared');

const baseProgram = shared.getNumericInput(",");
const SHIPSIZE=100;

shared.start("day 19B");

let computer = Object.create(shared.intcodeComputer);
let answer = 0;
let rowinfo = [];
let lastMinX = 0;
let lastMaxX = 0;
for (let y=0; true; y++) {
    const row=[];
    let minx = -1;
    let maxx = -1;
    for (let x=lastMinX; x<lastMaxX+10; x++) {
        if (x>=lastMinX) {
            computer.reset(baseProgram);
            computer.setInputValue(x);
            computer.setInputValue(y);
            computer.run();
            if (computer.getOutputValue()===1) {
                if (minx===-1) {
                    minx = x;
                    lastMinX = x;
                }
            } else {
                if (minx>=0) {
                    maxx = x-1; 
                    lastMaxX = maxx;
                    break;
                }
            }
        }
    }
    rowinfo.push({min: minx, max: maxx});
    if (y>SHIPSIZE) {
        const firstrow = rowinfo[y-SHIPSIZE+1];
        if ((firstrow.max - minx + 1) >= SHIPSIZE) {
            answer=(minx*10000)+y-SHIPSIZE+1;
            break;
        }
    }
}

shared.end(answer);


