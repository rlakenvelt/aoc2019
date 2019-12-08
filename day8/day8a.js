const utils = require('../utils');
const input = utils.getNumericInput("");
const imageSize = 25 * 6;

function getLayers(list) {
    let digits = [...list];
    let output = [];
    do {
        output.push(digits.splice(0, imageSize));
    } while (digits.length > 0);
    return output;
}


utils.start("day 8A");

const foundLayer = getLayers(input).reduce((min, layer, index) => {
    zerodigits = layer.filter(d => d === 0).length;
    if (min.zerodigits > zerodigits || min.zerodigits === -1) {
        min.layer = index;
        min.zerodigits = zerodigits;
        min.onedigits = layer.filter(d => d === 1).length;
        min.twodigits = layer.filter(d => d === 2).length;
    }
    return min;
}, {layer: -1, zerodigits: -1});

utils.end(foundLayer.onedigits * foundLayer.twodigits);


