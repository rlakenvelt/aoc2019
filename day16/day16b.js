// Assumtion is that the message offset is more than half of the length op the total input string
// In that case all of the pattern values before the offset are 0 and all of the pattern values
// after the offset are 1. So we can sik the calculation of the ppart before the offset and we don't
// have to determine the pattern value of the rest because it is always 1.
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
    let lasttotal = 0;
    for (let element=0; element<inputElementsLength; element++) {
        total = 0;
        if (element > 0) {
            total=lasttotal-inputSignal[element-1];
        } else {
            for (let index=element; index <inputElementsLength; index++) {
                total+=inputSignal[index];
            }
        }
        lasttotal = total;
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

