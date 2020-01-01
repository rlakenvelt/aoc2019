const shared = require('../shared');
const GRIDHEIGHT=5;
const GRIDWIDTH=5;
let movements = [];
movements.push({x: 0, y: -1});
movements.push({x: 0, y: 1});
movements.push({x: -1, y: 0});
movements.push({x: 1, y: 0});
let grids=[];
let newgrids=[];

function getTiles () {
    const rows = shared.getInput();
    const grid=rows.reduce((list, row) => {
        list.push(row.split('')
                     .map(x=>{return (x==='#'?1:0)})                    
                     .reduce((list, value) => {
                        list.push(value)
                        return list;
                     }, []));
        return list;
    }, []);
    return grid;
}
function showGrid (grid) {
    let rows = [...grid];
    rows.forEach((row) => {
        let showrow = row.join('')
                         .replace(/1/g, '#')
                         .replace(/0/g, '.');
        console.log(showrow);
    })
}


function emptyGrid(level) {
    return {level:level, new:true, tiles:newTiles()};
}
function newTiles(level) {
    return [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
}
function findGrid(level) {
    let grid=grids.find(grid=>{grid.level===level});
    if (!grid) {
        grid=emptyGrid(level);
        newgrids.push(grid);
        calculateGrid(grid, true);
    }
    return grid;
}
function calculateGrids () {
    newgrids=[];
    grids.forEach(grid=>{
        grid.new=false;
        newgrids.push(calculateGrid(grid, false));
    })

    return newgrids;
}


function calculateGrid (grid, empty) {
    let newtiles = newTiles();
    console.log('LEVEL', grid.level);
    let containingGrid;
    let recursiveGrid;
    if (!empty||grid.level>0) containingGrid=findGrid(grid.level-1);
    if (!empty||grid.level<0) recursiveGrid=findGrid(grid.level+1);
    for (let row=0; row<GRIDHEIGHT; row++) {
        for (let col=0; col<GRIDWIDTH; col++) {
            newtiles[row][col]=grid.tiles[row][col];
            const adjacent=movements.reduce((total, move) => {
                const checkX=col+move.x;
                const checkY=row+move.y;
                // console.log('CHECK', checkX, checkY);
                if (checkX===2&&checkY===2&&recursiveGrid) {
                    if (col===1) total+=recursiveGrid.tiles[1][0]+
                                        recursiveGrid.tiles[1][1]+
                                        recursiveGrid.tiles[1][2]+
                                        recursiveGrid.tiles[1][3]+
                                        recursiveGrid.tiles[1][4];
                    if (row===3) total+=recursiveGrid.tiles[3][0]+
                                        recursiveGrid.tiles[3][1]+
                                        recursiveGrid.tiles[3][2]+
                                        recursiveGrid.tiles[3][3]+
                                        recursiveGrid.tiles[3][4];
                    if (row===1) total+=recursiveGrid.tiles[0][1]+
                                        recursiveGrid.tiles[1][1]+
                                        recursiveGrid.tiles[2][1]+
                                        recursiveGrid.tiles[3][1]+
                                        recursiveGrid.tiles[4][1];
                    if (col===3) total+=recursiveGrid.tiles[0][3]+
                                        recursiveGrid.tiles[1][3]+
                                        recursiveGrid.tiles[2][3]+
                                        recursiveGrid.tiles[3][3]+
                                        recursiveGrid.tiles[4][3];
                } else
                if (checkY>=0&&checkX>=0&&checkY<GRIDHEIGHT&&checkX<GRIDWIDTH) {
                    if (grid.tiles[row+move.y][col+move.x]===1) {
                        total++;
                    }
                } else 
                if (containingGrid) {
                    if (checkY<0) total+=containingGrid.tiles[1][0]+
                                         containingGrid.tiles[1][1]+
                                         containingGrid.tiles[1][2]+
                                         containingGrid.tiles[1][3]+
                                         containingGrid.tiles[1][4];
                    if (checkY<GRIDHEIGHT) total+=containingGrid.tiles[3][0]+
                                         containingGrid.tiles[3][1]+
                                         containingGrid.tiles[3][2]+
                                         containingGrid.tiles[3][3]+
                                         containingGrid.tiles[3][4];
                    if (checkX<0) total+=containingGrid.tiles[0][1]+
                                         containingGrid.tiles[1][1]+
                                         containingGrid.tiles[2][1]+
                                         containingGrid.tiles[3][1]+
                                         containingGrid.tiles[4][1];
                    if (checkX<GRIDWIDTH) total+=containingGrid.tiles[0][3]+
                                         containingGrid.tiles[1][3]+
                                         containingGrid.tiles[2][3]+
                                         containingGrid.tiles[3][3]+
                                         containingGrid.tiles[4][3];
                }
                                         
                return total;
            },0);
            if (grid.tiles[row][col]===1&&adjacent!==1) newtiles[row][col]=0;
            if (grid.tiles[row][col]===0&&adjacent>0&&adjacent<3) newtiles[row][col]=1;
            // console.log('RC', col, row, grid.tiles[row][col], adjacent, newtiles[row][col]);
        }
    }
    return {level:grid.level, tiles:newtiles};
}


shared.start("day 24B");
const starttiles = getTiles();
const startgrid=emptyGrid(0);
startgrid.tiles=starttiles;

grids.push(startgrid);


let answer=0;
grids=calculateGrids();
grids.forEach(grid=> {
    showGrid(grid.tiles);
    console.log('\n');
})
// showGrid(grid.grid);
shared.end(answer);


