const shared = require('../shared');
const BASEPATTERN = [0, 1, 0, -1];

const singleinput = shared.getInput()[0];
const offset = parseInt(singleinput.substring(0,7));
const input = singleinput.repeat(10000).substring(offset);

const inputElements = input.split('');
const inputElementsLength = inputElements.length;

shared.start("day 16B");
//61706040
function patternForElement(element, index) {
    return BASEPATTERN[Math.floor(index % (element * 4) / element)];
}

function fft(inputSignal) {
    let starttime;
    let endtime;
    starttime = new Date();
    let outputElements = [];
    for (let i=1; i<=inputElementsLength; i++) {
        // if (i % 1000 === 0) {
        //     endtime = new Date();
        //     console.log(i, endtime - starttime);
        //     starttime = endtime;
        // }
        let total = 0;
        for (let index=i; index <=inputElementsLength; index++) {
            total += inputSignal[index-1] * patternForElement(i + offset, index + offset);
        }
        outputElements.push(Math.abs(total) % 10);
    }
    return outputElements;
}
let inputValue = [...inputElements];
for (let i=0; i<100; i++) {
    inputValue = fft(inputValue);
}
const answer = inputValue.join('').substring(0,8);

shared.end(answer);

