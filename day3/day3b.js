const input = require('../input');


const wires = input.getInput();
const wire1 = wires[0].split(",").map(x => x);
const wire2 = wires[1].split(",").map(x => x);

const coordinate = (x, y) => {
    return x.toString() + "," + y.toString();
}

const markGrid = (wire) => {
    let x = 1;
    let y = 1;
    let locations = [];
    let locationIndex = 0;
    wire.forEach(path => {
        const direction = path.substring(0, 1);
        const distance  = parseInt(path.substring(1));
        switch(direction) {
            case "R": 
                for (i = 1; i <= distance; i++) { 
                    x++;
                    locations[locationIndex] = coordinate(x, y);
                    locationIndex++;       
                }    
                break;
            case "L": 
                for (i = 1; i <= distance; i++) { 
                    x--;
                    locations[locationIndex] = coordinate(x, y);
                    locationIndex++;       
                }                
                break;
            case "U": 
                for (i = 1; i <= distance; i++) { 
                    y++;
                    locations[locationIndex] = coordinate(x, y);
                    locationIndex++;       
                }                
                break;
            case "D": 
                for (i = 1; i <= distance; i++) { 
                    y--;
                    locations[locationIndex] = coordinate(x, y);
                    locationIndex++;       
                }                
                break;
        } 
    });
    return locations;
}

const wire1Coordinates = markGrid(wire1);
const wire2Coordinates = markGrid(wire2);
intersections = wire1Coordinates.filter(coordinate1 => { return wire2Coordinates.find(coordinate2 => coordinate1 === coordinate2)});
distances = intersections.map((coordinate) => {
    const distance1 = wire1Coordinates.indexOf(coordinate);
    const distance2 = wire2Coordinates.indexOf(coordinate);
    return distance1 + distance2 + 2;
});
console.log(distances.sort((a, b) => a-b)[0]);

