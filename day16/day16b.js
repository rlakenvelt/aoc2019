const shared = require('../shared');
const BASEPATTERN = [0, 1, 0, -1];

const singleinput = shared.getInput()[0];
const offset = parseInt(singleinput.substring(0,7));
const input = singleinput.repeat(10000).substring(offset);

const inputElements = input.split('').map(x => parseInt(x));
const inputElementsLength = inputElements.length;

shared.start("day 16B");

function fft(inputSignal) {
    let outputElements = '';
    let total = 0;
    for (let element=0; element<inputElementsLength; element++) {
        total = 0;
        for (let index=element; index <inputElementsLength; index++) {
            total += inputSignal[index];
        }
        outputElements = outputElements.concat((total%10).toString());
    }
    return outputElements.split('').map(x => parseInt(x));
}
let inputValue = [...inputElements];
for (let i=0; i<100; i++) {
    inputValue = fft(inputValue);
}
const answer = inputValue.join('').substring(0,8);

shared.end(answer);

