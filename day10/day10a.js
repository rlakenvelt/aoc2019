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


shared.start("day 10A");

const asteroids = getAsteroids();

asteroids.forEach(asteroid => {
    let asteroidscopy = [...asteroids];
    asteroidscopy.forEach(item => {
        item.distance = Math.sqrt(Math.pow(Math.abs(asteroid.x - item.x), 2) + Math.pow(Math.abs(asteroid.y - item.y), 2));
        item.angle = Math.PI + Math.atan2(asteroid.y - item.y, asteroid.x - item.x);
    })
    asteroidscopy = asteroidscopy.filter(item => item.distance > 0);
    asteroidscopy.forEach(item => {
        if (item.x!=asteroid.x || item.y!=asteroid.y) {
            const closer = asteroidscopy.some(closerAsteroid => closerAsteroid.angle === item.angle && closerAsteroid.distance < item.distance);
            if (!closer) {
                asteroid.detects++;
            }
        }
    })
})
asteroids.sort((a, b) => b.detects-a.detects);

shared.end(asteroids[0].detects);


