const utils = require('../utils');

const range = utils.getNumericInput("-");

function checkPassword(password) {
    let double      = false;
    let doublecount = 0;
    let increase    = true;
    const char = password.split('');
    for (i=0; i < 6; i++) {
        if (char[i] === char[i + 1]) {
            doublecount++
        } else {
            if (doublecount === 1) double = true;
            doublecount = 0;
        }
        if (char[i] > char[i + 1]) increase = false;
    }
    if (doublecount === 1) double = true;
    return increase && double;
}
utils.start("day 4B");

let answer = 0;
for(password=range[0]; password<=range[1]; password++) {
    if (checkPassword(password.toString())) {
        answer++;
    }
}

utils.end(answer);

