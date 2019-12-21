const shared = require('../shared');
const STEPS=1000;

function getMoons() {
    return shared.getInput().reduce((list, item) => {
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
}


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

function gcd  (i1, i2) {

    if (i2 === 0) return i1;
    return gcd(i2, i1 % i2);
}

function lcm  (i1, i2) {
    return ((i1 * i2) / gcd(i1, i2));
}


shared.start("day 12B");

let moons = getMoons();

const basex = [moons[0].x, moons[1].x, moons[2].x, moons[3].x];
let xcount = 0;
for (i=1; true; i++) {
    calculateStep();
    if (moons[0].x === basex[0] && moons[1].x === basex[1] && moons[2].x === basex[2] && moons[3].x === basex[3] && moons[0].vx === 0 && moons[1].vx === 0 && moons[2].vx === 0 && moons[3].vx === 0) {
        xcount = i;
        break;
    }
}

moons = getMoons();
const basey = [moons[0].y, moons[1].y, moons[2].y, moons[3].y];
let ycount = 0;
for (i=1; true; i++) {
    calculateStep();
    if (moons[0].y === basey[0] && moons[1].y === basey[1] && moons[2].y === basey[2] && moons[3].y === basey[3] && moons[0].vy === 0 && moons[1].vy === 0 && moons[2].vy === 0 && moons[3].vy === 0) {
        ycount = i;
        break;
    }
}

moons = getMoons();
const basez = [moons[0].z, moons[1].z, moons[2].z, moons[3].z];
let zcount = 0;
for (i=1; true; i++) {
    calculateStep();
    if (moons[0].z === basez[0] && moons[1].z === basez[1] && moons[2].z === basez[2] && moons[3].z === basez[3] && moons[0].vz === 0 && moons[1].vz === 0 && moons[2].vz === 0 && moons[3].vz === 0 ) {
        zcount = i;
        break;
    }
}

shared.end(lcm(xcount, lcm(ycount, zcount)));


