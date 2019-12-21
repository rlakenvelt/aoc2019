const shared = require('../shared');

const range = shared.getNumericInput("-");

function checkPassword(password) {
    let double   = false;
    let increase = true;
    const char = password.split('');
    for (i=0; i < 6; i++) {
        if (char[i] === char[i + 1]) double = true;
        if (char[i] > char[i + 1]) increase = false;
    }
    return increase && double;
}
shared.start("day 4A");

let answer = 0;
for(password=range[0]; password<=range[1]; password++) {
    if (checkPassword(password.toString())) {
        answer++;
    }
}

shared.end(answer);

