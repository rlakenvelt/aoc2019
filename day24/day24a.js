const shared = require('../shared');
let gridwidth=0;
let gridheight=0;
let movements = [];
movements.push({x: 0, y: -1});
movements.push({x: 0, y: 1});
movements.push({x: -1, y: 0});
movements.push({x: 1, y: 0});

function getGrid () {
    const rows = shared.getInput();
    gridheight=rows.length;
    gridwidth=rows[0].length;
    return rows.reduce((list, row) => {
        list.push(row.split('')
                     .map(x=>{return (x==='#'?1:0)})                    
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
        let showrow = row.join('')
                         .replace(/1/g, '#')
                         .replace(/0/g, '.');
        console.log(showrow);
    })
}
function biodiversityOfGrid (grid) {
    const bugs=grid.reduce((list, row) => {
        list=[...list,...row];
        return list;
    }, []);
    return bugs.reduce((total, bug, index) => {
            if (bug) total+=2**index;        
            return total;
        }, 0);
}
function calculateGrid (grid) {
    let newGrid = grid.map(row=>[...row]);
    for (let row=0; row<gridheight; row++) {
        for (let col=0; col<gridwidth; col++) {
            const adjacent=movements.reduce((total, move) => {
                if (row+move.y>=0&&col+move.x>=0&&row+move.y<gridheight&&col+move.x<gridwidth) {
                    if (grid[row+move.y][col+move.x]===1) {
                        total++;
                    }
                }
                return total;
            },0);
            if (grid[row][col]===1&&adjacent!==1) newGrid[row][col]=0;
            if (grid[row][col]===0&&adjacent>0&&adjacent<3) newGrid[row][col]=1;
        }
    }
    return newGrid;
}


shared.start("day 24A");

let grid = getGrid();
let allBiodiversities=[];
let answer=0;
while (true) {
    const bio=biodiversityOfGrid(grid);
    if (allBiodiversities.indexOf(bio)>=0) {
        answer=bio;
        break;
    }
    allBiodiversities.push(bio);
    grid=calculateGrid(grid);
}
shared.end(answer);


