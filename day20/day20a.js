const shared = require('../shared');
let movements = [];
movements['U'] = {x: 0, y: -1};
movements['D'] = {x: 0, y: 1};
movements['L'] = {x: -1, y: 0};
movements['R'] = {x: 1, y: 0};

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
function isPath(x, y) {
    const cell = grid[y][x];
    return (cell==='.'||cell=='+'||cell==='-');    
}
function isPortal(x, y) {
    const portal = portals.find(portal=>portal.x===x&&portal.y===y);
    return (portal!==undefined);    
}
function isNode(x, y) {
    const node = nodes.find(node=>node.x===x&&node.y===y);
    return (node!==undefined);    
}

function getPortals() {
    const portals = [];
    const gridwidth=grid[0].length;
    const gridheight=grid.length;
    for (let row=1; row<gridheight-1; row++) {
        for (let col=0; col<gridwidth; col++) {
            const cell = grid[row][col];
            if (isLabel(cell))  {
                Object.keys(movements).forEach((key) => {
                    const move = movements[key];
                    if (isPath(col+move.x, row+move.y)) {
                        let portal=grid[row-move.y][col-move.x]+cell;
                        if (key==='U'||key==='L') portal=portal.split('').reverse().join('');
                        portals.push({label: portal, x: col+move.x, y: row+move.y, direction: key});
                    } 
                });
            }
        }
    }
    portals.forEach(portal => {
        if (portal.label==='AA'||portal.label==='ZZ') {
            portal.portal=false;
        } else {
            portal.portal=true;
        }
    });
    return portals;
}
function getNodes(grid) {
    const nodes = [];
    const gridwidth=grid[0].length;
    const gridheight=grid.length;
    let nodeID=0;
    for (let row=2; row<gridheight-1; row++) {
        for (let col=2; col<gridwidth; col++) {
            if (isPath(col, row)) {
                const node = analyseCell(col, row);
                if (node.directions.length>2||node.endpoint) {
                    node.ID=nodeID++;
                    node.costs=Number.MAX_VALUE;
                    nodes.push(node);
                }
            }
        }
    }
    return nodes;
}
function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('');
        console.log(showrow);
    })
}
function analyseCell(x, y) {
    const directions = [];
    let jumpFound = false;
    let endpoint = false;
    if (isPortal(x, y)) {
        const portalfrom = portals.find(portal=>portal.x===x&&portal.y===y);
        const portalto = portals.find(portal=>portal.label===portalfrom.label&&portal!=portalfrom);
        if (portalto) {
            directions.push({x: portalto.x, y: portalto.y, visited: false});
            jumpFound=true;
        } else {
            endpoint=true;
        }
    } 
    if (true) {
        Object.keys(movements).forEach((key) => {
            const move = movements[key];
            if (isPath(x+move.x, y+move.y)) {
                directions.push({x: x+move.x, y: y+move.y, visited:false});
            } 
        });
    }
    return {x:x, y:y, endpoint: endpoint, directions:directions};
}
function analyseNodes() {
    nodes.forEach(node=> {
        let currentX=node.x;
        let currentY=node.y;

        node.directions.filter(direction=>direction.visited===false).forEach(direction=> {
            currentX = direction.x;
            currentY = direction.y;
            let lastX=node.x;
            let lastY=node.y;
            direction.distance=1;
            while (true) {
                if (isNode(currentX, currentY)) {
                    const nodeTo=nodes.find(nodeTo=>nodeTo.x===currentX&&nodeTo.y===currentY);
                    const nodeToDirection = nodeTo.directions.find(nodeToDirection=>nodeToDirection.x===lastX&&nodeToDirection.y==lastY); 
                    direction.visited=true;
                    direction.ID=nodeTo.ID;
                    nodeToDirection.visited=true;
                    nodeToDirection.ID=node.ID;
                    nodeToDirection.distance=direction.distance;
                    break;
                } else {
                    const cell= analyseCell(currentX, currentY);
                    const next = cell.directions.find(nextdir=>nextdir.x!=lastX||nextdir.y!=lastY); 
                    lastX=currentX;
                    lastY=currentY;
                    if (!next) {
                        direction.ID=-1;
                        break;
                    }
                    currentX=next.x;
                    currentY=next.y;
                    direction.distance++;
                }
            }
        })
        node.directions=node.directions.filter(direction=> direction.ID>=0);
    });
}


function bfs(start, finish) { 
    const queue=[]; 
    nodes[start].costs = 0; 
    queue.push(nodes[start]);
    while (queue.length > 0) {
        const node = queue.shift();
        if (node.ID == finish) {
            return node.costs; 
        }
        node.directions.forEach(vertex=> {
            const childNode = nodes[vertex.ID];
            const newCosts = node.costs+vertex.distance;
            if (childNode.costs > newCosts) {
                childNode.costs=newCosts;
                const nodeOnQueue=queue.find(foundNode=>foundNode.ID===childNode.ID);
                if (nodeOnQueue) {
                    nodeOnQueue.costs=childNode.costs;
                } else {
                    queue.push(childNode);
                }
                queue.sort((a, b) => a.costs-b.costs);
            }
        });
    } 
} 


shared.start("day 20A");

const grid = getGrid();
const portals = getPortals();
const nodes = getNodes(grid);

analyseNodes();

const entrance = portals.find(portal=>portal.label==='AA');
const entranceNode = nodes.find(node=>node.x===entrance.x&&node.y===entrance.y);
const exit = portals.find(portal=>portal.label==='ZZ');

const exitNode = nodes.find(node=>node.x===exit.x&&node.y===exit.y);
let answer=0;
answer = bfs(nodes.indexOf(entranceNode), nodes.indexOf(exitNode));


// showGrid(grid);


shared.end(answer);


