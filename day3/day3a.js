const input = require('../input');


const wires = input.getInput();
const wire1 = wires[0].split(",").map(x => x);
const wire2 = wires[1].split(",").map(x => x);

const getCoordinatesForWire = (wire) => {
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

const wire1Coordinates = getCoordinatesForWire(wire1);
const wire2Coordinates = getCoordinatesForWire(wire2);
intersections = wire1Coordinates.filter(coordinate1 => { return wire2Coordinates.find(coordinate2 => coordinate1 === coordinate2)});
distances = intersections.map((coordinate) => {
    const values = coordinate.split(",");
    return Math.abs(parseInt(values[0]) - 1) + Math.abs(parseInt(values[1]) - 1);
});
console.log(distances.sort((a, b) => a-b)[0]);

