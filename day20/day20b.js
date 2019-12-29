const shared = require('../shared');
let movements = [];
movements['U'] = {x: 0, y: -1};
movements['D'] = {x: 0, y: 1};
movements['L'] = {x: -1, y: 0};
movements['R'] = {x: 1, y: 0};

function getGrid () {
    const rows = shared.getInput();
    const gridLayer=rows.reduce((list, row) => {
        list.push(row.split('')
                     .reduce((list, value) => {
                        list.push(value)
                        return list;
                     }, []));
        return list;
    }, []);
    const layers=[];
    for (let i = 0; i<30;i++) {
        layers.push([...gridLayer]);
    }
    return layers;
}
function isLabel(cell) {
    return /[A-Z]/.test( cell);    
}
function isPath(x, y, z=0) {
    const cell = grid[z][y][x];
    return (cell==='.');    
}
function isPortal(x, y, z=0) {
    const portal = portals.find(portal=>portal.x===x&&portal.y===y&&portal.z===z&&!portal.closed);
    return (portal!==undefined);    
}
function isNode(x, y, z=0) {
    const node = nodes.find(node=>node.x===x&&node.y===y&&node.z===z);
    return (node!==undefined);    
}
function getPortals() {
    let portals = [];
    const gridwidth=grid[0][0].length;
    const gridheight=grid[0].length;
    for (let layer=0; layer<grid.length; layer++) {
        for (let row=1; row<gridheight-1; row++) {
            for (let col=0; col<gridwidth; col++) {
                const cell = grid[layer][row][col];
                if (isLabel(cell))  {
                    Object.keys(movements).forEach((key) => {
                        const move = movements[key];
                        if (isPath(col+move.x, row+move.y, layer)) {
                            let portal=grid[layer][row-move.y][col-move.x]+cell;
                            if (key==='U'||key==='L') portal=portal.split('').reverse().join('');
                            const newPortal = {label: portal, x: col+move.x, y: row+move.y, z: layer, direction: key, outer: false};
                            portals.push(newPortal);
                            if (newPortal.x===2||newPortal.x===gridwidth-3||newPortal.y===2||newPortal.y===gridheight-3) {
                                newPortal.outer=true;
                            }
                        } 
                    });
                }
            }
        }
    }
    portals=portals.filter(portal => {
        if ((portal.label==='AA'||portal.label==='ZZ')&&portal.z>0) return false;
        if (portal.label!=='AA'&&portal.label!=='ZZ'&&portal.z===0&&portal.outer) return false;
        return true;
    });
    portals.forEach(portal => {
        if (portal.label==='AA'||portal.label==='ZZ') {
            portal.next=0;
        } else
        if (!portal.outer) {
            portal.next=portal.z+1;
        } else {
            portal.next=portal.z-1;
        }
    });
    return portals;
}
function getNodes() {
    const nodes = [];
    const gridwidth=grid[0][0].length;
    const gridheight=grid[0].length;
    let nodeID=0;
    for (let layer=0; layer<grid.length; layer++) {
        for (let row=2; row<gridheight-1; row++) {
            for (let col=2; col<gridwidth; col++) {
                if (isPath(col, row, layer)) {
                    const node = analyseCell(col, row, layer);
                    if (node.directions.length>2||node.endpoint) {
                        node.ID=nodeID++;
                        node.costs=Number.MAX_VALUE;
                        nodes.push(node);
                    }
                }
            }
        }
    }

    return nodes;
}
function showGrid (grid) {
    grid.forEach((layer) => {
        const rows = [...grid];
        layer.forEach((row) => {
            const showrow = row.join('');
            console.log(showrow);
        })
    })
}
function analyseCell(x, y, z=0) {
    const directions = [];
    let endpoint = false;
    if (isPortal(x, y, z)) {
        const portalfrom = portals.find(portal=>portal.x===x&&portal.y===y&&portal.z===z);        
        const portalto = portals.find(portal=>portal.label===portalfrom.label&&portal.z===portalfrom.next&&(portal.x!==x||portal.y!=y));
        if (portalto) {
            directions.push({x: portalto.x, y: portalto.y, z: portalto.z, visited: false});
        } else {
            if (portalfrom.label==='AA'||portalfrom.label==='ZZ') endpoint=true;
        }
    } 
    Object.keys(movements).forEach((key) => {
        const move = movements[key];
        if (isPath(x+move.x, y+move.y, z)) {
            directions.push({x: x+move.x, y: y+move.y, z: z, visited:false});
        } 
    });
    return {x:x, y:y, z, z, endpoint: endpoint, directions:directions};
}
function analyseNodes() {
    nodes.forEach(node=> {
        let currentX=node.x;
        let currentY=node.y;
        let currentZ=node.z;
        node.directions.filter(direction=>direction.visited===false).forEach(direction=> {
            currentX = direction.x;
            currentY = direction.y;
            currentZ = direction.z;
            let lastX=node.x;
            let lastY=node.y;
            let lastZ=node.z;
            direction.distance=1;
            while (true) {
                if (isNode(currentX, currentY, currentZ)) {
                    const nodeTo=nodes.find(nodeTo=>nodeTo.x===currentX&&nodeTo.y===currentY&&nodeTo.z===currentZ);
                    const nodeToDirection = nodeTo.directions.find(nodeToDirection=>nodeToDirection.x===lastX&&nodeToDirection.y===lastY&&nodeToDirection.z===lastZ); 
                    direction.visited=true;
                    direction.ID=nodeTo.ID;
                    nodeToDirection.visited=true;
                    nodeToDirection.ID=node.ID;
                    nodeToDirection.distance=direction.distance;
                    break;
                } else {
                    const cell= analyseCell(currentX, currentY, currentZ);
                    const next = cell.directions.find(nextdir=>nextdir.x!=lastX||nextdir.y!=lastY||nextdir.z!=lastZ); 
                    lastX=currentX;
                    lastY=currentY;
                    lastZ=currentZ;
                    if (!next) {
                        direction.visited=true;
                        direction.ID=-1;
                        break;
                    }
                    currentX=next.x;
                    currentY=next.y;
                    currentZ=next.z;
                    direction.distance++;
                }
            }
        })
        node.directions=node.directions.filter(direction=> direction.ID>=0);
    });
}


function dijkstra(start, finish) { 
    const queue=[]; 
    nodes[start].costs = 0; 
    queue.push(nodes[start]);
    let loops=0;
    while (queue.length > 0) {
        loops++;
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


shared.start("day 20B");

let level=0;
let answer=0;

const grid = getGrid();
const portals = getPortals();
const nodes = getNodes();

analyseNodes();

const entrance = portals.find(portal=>portal.label==='AA');
const entranceNode = nodes.find(node=>node.x===entrance.x&&node.y===entrance.y);
const exit = portals.find(portal=>portal.label==='ZZ');

const exitNode = nodes.find(node=>node.x===exit.x&&node.y===exit.y);

answer = dijkstra(nodes.indexOf(entranceNode), nodes.indexOf(exitNode));
// showGrid(grid);


shared.end(answer);


