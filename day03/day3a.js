const shared = require('../shared');

const wires = shared.getInput();
const wire1 = wires[0].split(",").map(x => x);
const wire2 = wires[1].split(",").map(x => x);

function getCoordinatesForWire (wire) {
    let x = 1;
    let y = 1;
    let locations = [];
    wire.forEach(path => {
        const direction = path.substring(0, 1);
        const distance  = parseInt(path.substring(1));
        for (i = 1; i <= distance; i++) { 
            switch(direction) {
                case "R": 
                    x++;
                    break;
                case "L": 
                    x--;
                    break;
                case "U": 
                    y++;
                    break;
                case "D": 
                    y--;
                    break;
            } 
            locations.push(x.toString() + "," + y.toString());
        }    
    });
    return locations;
}

shared.start("day 3A");
const wire1Coordinates = getCoordinatesForWire(wire1);
const wire2Coordinates = getCoordinatesForWire(wire2);
const sortedWire1Coordinates = [...wire1Coordinates].sort();
const sortedWire2Coordinates = [...wire2Coordinates].sort();

let firstIndex = 0;
let intersections = [];
for(i=0; i < sortedWire1Coordinates.length; i++) {
    for(j=firstIndex; j < sortedWire2Coordinates.length; j++) {
        if (sortedWire1Coordinates[i] < sortedWire2Coordinates[j]) {
            firstIndex = j;
            break;
        }
        if (sortedWire1Coordinates[i] === sortedWire2Coordinates[j]) {
            firstIndex = j + 1;
            intersections.push(sortedWire1Coordinates[i]);
            break;
        }
    }
    
}

distances = intersections.map((coordinate) => {
    const values = coordinate.split(",");
    return Math.abs(parseInt(values[0]) - 1) + Math.abs(parseInt(values[1]) - 1);
});
shared.end(distances.sort((a, b) => a-b)[0]);

