const shared = require('../shared');
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
function isLabel(cell) {
    return /[A-Z]/.test( cell);    
}
function isPath(cell) {
    return (cell==='.');    
}
function isPortal(cell) {
    return (cell==='*');    
}
function getLabels(grid) {
    const labels = [];
    const gridwidth=grid[0].length;
    const gridheight=grid.length;
    for (let row=1; row<gridheight-1; row++) {
        for (let col=0; col<gridwidth; col++) {
            const cell = grid[row][col];
            if (isLabel(cell))  {
                let label;
                if (isPath(grid[row+1][col])) {
                    label=grid[row-1][col]+cell;
                    // grid[row][col] = '#';
                    labels.push({label: label, x: col, y: row+1, direction: 'D'});
                } else
                if (isPath(grid[row-1][col])) {
                    label=cell+grid[row+1][col];
                    // grid[row][col] = '#';
                    labels.push({label: label, x: col, y: row-1, direction: 'U'});
                } else
                if (isPath(grid[row][col+1])) {
                    label=grid[row][col-1]+cell;
                    // grid[row][col] = '#';
                    labels.push({label: label, x: col+1, y: row, direction: 'R'});
                } else
                if (isPath(grid[row][col-1])) {
                    label=cell+grid[row][col+1];
                    // grid[row][col] = '#';
                    labels.push({label: label, x: col-1, y: row, direction: 'L'});
                }
            }
        }
    }
    labels.forEach(label => {
        if (label.label!=='AA'&&label.label!=='ZZ') {
            grid[label.y][label.x] = '*';
        }

    });
    return labels;
}
function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}

function analyseNode(x, y, lastX, lastY) {
    const directions = [];
    Object.keys(movements).forEach((key) => {
        const move = movements[key];
        if (x+move.x!=lastX||y+move.y!=lastY) {
            const cell = grid[y+move.y][x+move.x];
            if (isPath(cell)) {
                directions.push({x: x+move.x, y: y+move.y});
            } else
            if (isPortal(cell)) {
                const labelfrom = labels.find(label=>label.x===x+move.x&&label.y===y+move.y);
                const labelto = labels.find(label=>label.label===labelfrom.label&&label!=labelfrom);
                directions.push({x: labelto.x, y: labelto.y});
            } 
        }
    });
    return {x:x, y:y, name: x.toString()+'_'+y.toString(), directions:directions, todo: directions};
}

function scanGrid(grid) {
    const entrance=labels.find(label=>label.label==='AA');
    const exit=labels.find(label=>label.label==='ZZ');
    console.log('EXIT', exit);
    let iteration = 0;
    let currentX = entrance.x;
    let currentY = entrance.y;
    let lastX = -1;
    let lastY = -1;
    let steps = 0;
    const stack=[];

    while (iteration<30) {
        iteration++;
        if (grid[currentY][currentX]==='.') {
            grid[currentY][currentX]=' ';
        }
        const node = analyseNode(currentX, currentY, lastX, lastY);
        console.log(iteration, node);
        lastX=currentX;
        lastY=currentY;
        if (node.directions.length>1&&!stack[node.name]) {
            stack.push(node);
        }
        if (node.todo.length>0) {
            const next=node.todo.shift();
            currentX = next.x;
            currentY = next.y;
        }
        if (currentX===exit.x&&currentY===exit.y) {
            const backToNode = stack.pop();
            console.log('BACK!', backToNode);
            currentX = backToNode.x;
            currentY = backToNode.y;
        }
    }
}

shared.start("day 20A");

const grid = getGrid();
const labels = getLabels(grid);
// console.log(labels);
scanGrid(grid);
showGrid(grid);


shared.end(0);


