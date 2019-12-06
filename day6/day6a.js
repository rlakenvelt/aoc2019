const utils = require('../utils');

const orbits = utils.getInput();
let answer = 0;

function countOrbits(object) {
    const item = objects.find(item => item.object === object);
    if (item) {
        return 1 + countOrbits(item.orbits);
    }
    return 0;
}

utils.start("day 6A");

let objects = orbits.reduce((list, orbit) => {
    object = orbit.split(")");
    if (!list.some(item => item.object === object[1])) {
        list.push({object: object[1], orbits: object[0]});
    }
    return list;
}, []);

answer = objects.reduce((total, object) => {
    const count = countOrbits(object.object);
    total += count;
    return total;
}, 0);

utils.end(answer);

