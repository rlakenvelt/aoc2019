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

function decodeImage(imageLayers) {
    return imageLayers.reduce((image, layer, layerIndex) => {
        if (layerIndex === 0) return layer;
        layer.forEach((pixel, pixelIndex) => {
            if (image[pixelIndex] === 2) image[pixelIndex] = layer[pixelIndex];
        })
        return image;
    }, []);
    
}

function showImage (map) {
    let imagemap = [...map];
    do {
        let row = imagemap.splice(0, 25).join('');
        row = row.replace(/0/g, ' ');
        console.log(row);
    } while (imagemap.length > 0);
}


utils.start("day 8B");
showImage(decodeImage(getLayers(input)));
utils.end('See image above');


