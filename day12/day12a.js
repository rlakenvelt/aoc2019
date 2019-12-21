const shared = require('../shared');
const STEPS=1000;
const moons = shared.getInput().reduce((list, item) => {
    item = item.replace('<', '{');
    item = item.replace('>', '}');
    item = item.replace(/=/g, ':');
    item = item.replace('x', '"x"');
    item = item.replace('y', '"y"');
    item = item.replace('z', '"z"');
    const coordinates = JSON.parse(item);
    coordinates.vx=0;
    coordinates.vy=0;
    coordinates.vz=0;
    list.push(coordinates);
    return list;
}, []);


function calculateStep() {
    moons.forEach((calcmoon, calcindex) => {
        moons.forEach((pairmoon, pairindex) => {
            if (calcindex != pairindex) {
                if (calcmoon.x < pairmoon.x) {
                    calcmoon.vx++;
                }
                if (calcmoon.x > pairmoon.x) {
                    calcmoon.vx--;
                }
                if (calcmoon.y < pairmoon.y) {
                    calcmoon.vy++;
                }
                if (calcmoon.y > pairmoon.y) {
                    calcmoon.vy--;
                }
                if (calcmoon.z < pairmoon.z) {
                    calcmoon.vz++;
                }
                if (calcmoon.z > pairmoon.z) {
                    calcmoon.vz--;
                }
            }
        })
    })
    moons.forEach((calcmoon) => {
        calcmoon.x+=calcmoon.vx;
        calcmoon.y+=calcmoon.vy;
        calcmoon.z+=calcmoon.vz;
    });
}

function  calculateEnergy(moon) {
    pe = Math.abs(moon.x) + Math.abs(moon.y) + Math.abs(moon.z);
    pk = Math.abs(moon.vx) + Math.abs(moon.vy) + Math.abs(moon.vz);
    return pe * pk;
}

shared.start("day 12A");

for (i=0; i<STEPS; i++) {
    calculateStep();
}

const answer = moons.reduce((total, moon) => {
    total += calculateEnergy(moon);
    return total;
}, 0);
console.log(moons);

shared.end(answer);


