const shared = require('../shared');

const orbits = shared.getInput();
let answer = 0;

function getOrbitPath(object) {
    const item = objects.find(item => item.object === object);
    if (item) {
        return [item.orbits, ...getOrbitPath(item.orbits)];
    }
    return [];
}

shared.start("day 6B");

let objects = orbits.reduce((list, orbit) => {
    object = orbit.split(")");
    if (!list.some(item => item.object === object[1])) {
        list.push({object: object[1], orbits: object[0]});
    }
    return list;
}, []);

const sanPath = getOrbitPath('SAN');

getOrbitPath('YOU').every((youElement, index) => {
    if (sanPath.indexOf(youElement) >= 0) {
        answer = index + sanPath.indexOf(youElement);
        return false;
    }
    return true;
});

shared.end(answer);

