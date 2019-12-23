const shared = require('../shared');
const BASEPATTERN = [0, 1, 0, -1];

const input = shared.getInput()[0];

shared.start("day 16A");

function patternForElement(element, length) {
    let pattern = BASEPATTERN.reduce((list, value) => {
        for (let i=0; i<=element; i++) {
            list.push(value);
        }
        return list;
    }, []);
    while (pattern.length < length + 1) {
        pattern = [...pattern, ...pattern];
    }
    pattern.shift();
    return pattern;
}
function fft(inputSignal) {
    let outputElements = [];
    const inputElements = inputSignal.split('');
    const inputLength = inputElements.length;
    for (let i=0; i<inputLength; i++) {
        const pattern = patternForElement(i, inputLength);
        const newElement = inputElements.reduce((total, value, index) => {
            total += value * pattern[index];
            return total;
        }, 0);
        outputElements.push(Math.abs(newElement) % 10);
    }
    return outputElements.join('');
}
let inputValue = input;
for (let i=0; i<100; i++) {
    inputValue = fft(inputValue);
}
const answer = inputValue.substring(0, 8);

shared.end(answer);

