const shared = require('../shared');
const baseProgram = shared.getNumericInput(",");

let movements = [];
movements['^'] = {x: 0, y: -1, right: '>', left: '<'};
movements['v'] = {x: 0, y: 1, right: '<', left: '>'};
movements['<'] = {x: -1, y: 0, right: '^', left: 'v'};
movements['>'] = {x: 1, y: 0, right: 'v', left: '^'};

baseProgram[0] = '2';

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
    return (value==='#'||isRobot(x,y));
}
function isRobot(x, y) {
    const value = grid[y][x];
    return (value==='^'||value==='>'||value==='v'||value==='<');
}
function findRobot() {
    let robot;
    for (let row=0; row<grid.length; row++) {
        for (let col=0; col<grid[row].length; col++) { 
            if (isRobot(col, row)) {
                robot = {x: col, y: row, direction: grid[row][col]};
                break;
            }
        }
        if (robot) break;
    }
    return robot;
}

shared.start("day 17B");

let computer = Object.create(shared.intcodeComputer);

computer.reset(baseProgram);
computer.run();
let grid = computer.outputValues.map(x => String.fromCharCode(x))
                                  .join('')
                                  .split('\n')
                                  .reduce((list, value) => {
                                      list.push(value.split(''));
                                      return list;  
                                  },[]); 
const robot = findRobot();
let movementFuntions = [];
let forward = 0;
let iterations=0;
let stop = false;
while (!stop) {
    iterations++;
    const move = movements[robot.direction];
    if (isScaffold(robot.x+move.x, robot.y+move.y)) {
        robot.x+=move.x;
        robot.y+=move.y;
        forward++;
    } else {
        if (forward>0) {
            movementFuntions.push(forward.toString());
            forward=0;
        } 
        let checkmove=movements[move.right];
        if (isScaffold(robot.x+checkmove.x, robot.y+checkmove.y)) {
            robot.direction=move.right;
            movementFuntions.push('R');
            continue;
        } 
        checkmove=movements[move.left];
        if (isScaffold(robot.x+checkmove.x, robot.y+checkmove.y)) {
            robot.direction=move.left;
            movementFuntions.push('L');
            continue;
        } 
        stop=true;
    }
}       


let functions=[];
let checklength = 10;
while (movementFuntions.length && checklength > 0) {
    let checkpos = 0;
    while (checkpos <= movementFuntions.length  - checklength) {
        const basetring = movementFuntions.slice(checkpos, checkpos+checklength).join(',');
        if (!functions.find(item=> item.base===basetring)) {
            let positions = [];
            for(let index=checkpos+1; index<movementFuntions.length; index++) {
                const checkstring = movementFuntions.slice(index, index+checklength).join(',');
                if (basetring===checkstring) {
                    positions.unshift(index);
                }
            }
            if (positions.length>0) {
                positions.push(checkpos);
                const temp = basetring.split(',');
                functions.push({base: basetring, length: temp.length, positions: positions, weight: positions.length * temp.length});
            }
        }
        checkpos+=2;
    } 
    checklength-=2;
}

let movement = '';
const foundFunctions = [];
stop=false;
for (let a = 0; a<functions.length; a++) {
    movement = movementFuntions.join(',') + ','
    replaceInMovement(functions[a].base, '#');
    let saveA = movement;
    for (let b = 0; b<functions.length; b++) {
        movement = saveA;
        if (a===b) continue;
        replaceInMovement(functions[b].base, '#');
        let saveB = movement;
        for (let c = 0; c<functions.length; c++) {
            movement = saveB;
            if (a===c||b===c) continue;
            replaceInMovement(functions[c].base, '#');
            const temp = movement.replace(/#/g, '');
            if (temp.length===0) {
                foundFunctions.push({key:'A', move: functions[a].base});
                foundFunctions.push({key:'B', move: functions[b].base});
                foundFunctions.push({key:'C', move: functions[c].base});
                stop=true;
            }
            if (stop) break;
        }
        if (stop) break;
    }
    if (stop) break;
}
movement = movementFuntions.join(',') + ',';

foundFunctions.forEach(f => {
    replaceInMovement(f.move, f.key);
});


let inputValue = movement.split('').join(',');

pushASCII(inputValue);
foundFunctions.forEach(f => {
    pushASCII(f.move);
});
pushASCII('n');

computer.run();
const answer = computer.getOutputValue();

function replaceInMovement(toremove, by) {
    const regex = new RegExp(toremove + ',', "g");
    movement = movement.replace(regex, by);
}
function pushASCII(inputstring) {
    const arr=inputstring.split('');
    arr.forEach(item => {
        computer.setInputValue(item.charCodeAt(0));
    });
    computer.setInputValue(10);
}

shared.end(answer);


