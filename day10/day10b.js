const shared = require('../shared');

function getAsteroids(list) {
    const rows = shared.getInput();
    const asteroids = rows.reduce((asteroidlist, row, rowindex) => {
        const asteroidrow = row.split('');
        asteroidrow.forEach((item, colindex) => {
            if (item === '#') {
                asteroidlist.push({x: colindex, y: rowindex, detects: 0});
            }
        });
        return asteroidlist;
    }, []);
    return asteroids;
}


shared.start("day 10B");

let asteroids = getAsteroids();

function calculategrid(ims) {
    console.log("IMS", ims);
    asteroids.forEach(asteroid => {
        asteroid.detects=0;
        if (!ims || (asteroid.x === ims.x && asteroid.y === ims.y)) {
            asteroid.blocked = true;
            let asteroidscopy = [...asteroids];
            asteroidscopy.forEach(item => {
                item.distance = Math.sqrt(Math.pow(Math.abs(asteroid.x - item.x), 2) + Math.pow(Math.abs(asteroid.y - item.y), 2));
                item.angle = Math.atan2(item.x - asteroid.x, item.y - asteroid.y);
                item.angle = item.angle * (180 / Math.PI);
            })
            asteroidscopy = asteroidscopy.filter(item => item.distance > 0);
            asteroidscopy.forEach(item => {
                item.blocked = false;
                if (item.x!=asteroid.x || item.y!=asteroid.y) {
                    const closer = asteroidscopy.some(closerAsteroid => closerAsteroid.angle === item.angle && closerAsteroid.distance < item.distance);
                    if (!closer) {
                        asteroid.detects++;
                    } else {
                        item.blocked = true;
                    }
                }
            })
        }
    })
}

calculategrid();
asteroids.sort((a, b) => b.detects-a.detects);
const ims = {x: asteroids[0].x, y: asteroids[0].y};
let todo = 200;
let found;
while (true) {
    calculategrid(ims);
    asteroids.sort((a, b) => b.angle-a.angle);
    const filteredAsteroids = asteroids.filter(item => item.blocked === false);
    if (filteredAsteroids.length >= todo) {
        found = filteredAsteroids[todo - 1];
        break;
    }
    todo -= filteredAsteroids.length;
    asteroids = asteroids.filter(item => item.blocked === true);
}


shared.end(found.x * 100 + found.y);


