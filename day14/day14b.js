const shared = require('../shared');

const input = shared.getInput();

let materials = [];


function getMaterials() {
    const materials = input.reduce((list, value) => {
        const parts = value.split(' => ');
        const consume = parts[0].split(', ').reduce((list, value) => {
            const result = value.split(' ');
            list.push({material: result[1], amount: parseInt(result[0])});
            return list;
        }, []);
        const result = parts[1].split(' ');
        reaction = {amount: parseInt(result[0]), stock: 0, consume: consume};
        list[result[1]] = reaction;
        return list;
    }, []);
    return materials;
}

function produce(materialname, neededamount) {
    const material = materials[materialname];
    let produceamount = neededamount;
    if (material.stock > 0) {
        produceamount -= Math.min(material.stock, neededamount);
        material.stock -= neededamount - produceamount;
    }
    if (produceamount % material.amount !=0) {
        const leftover = material.amount - (produceamount % material.amount);
        produceamount += leftover;
        material.stock += leftover;
        }
    if (produceamount === 0) return 0;
    return material.consume.reduce((total, value) => {
        if (value.material === 'ORE') {
            total += (value.amount * produceamount) / material.amount;
        } else {
            total += produce(value.material, (value.amount * produceamount) / material.amount);
        }
        return total;
    }, 0);

}
shared.start("day 14B");
materials = getMaterials();
const onefuel = produce('FUEL', 1);
let start = Math.floor(1000000000000/onefuel);
let answer = 0;
// Brute force
// First step: raw check with steps of 1000 
for (fuel=start; true; fuel+=1000) {
    materials = getMaterials();
    const ore = produce('FUEL', fuel);
    if (ore > 1000000000000 ) {
        start = fuel-1000;
        break;
    }
}
// Second step: fine checking 
for (fuel=start; true; fuel++) {
    materials = getMaterials();
    const ore = produce('FUEL', fuel);
    if (ore > 1000000000000 ) {
        answer = fuel-1;
        break;
    }
}
shared.end(answer);

