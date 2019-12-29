const shared = require('../shared');
const shuffles = shared.getInput()
                       .reduce((list, line) => {
                            const values = line.split(' ');
                            if (values[0]==='cut') {
                                list.push({type: 0, cut: parseInt(values[1])});
                            } else
                            if (values[2]==='increment') {
                                list.push({type: 1, increment: parseInt(values[3])});
                            } else 
                            if (values[3]==='stack') {
                                list.push({type: 2});
                            }
                            return list;
                       }, []);

let deck =[];
for (let index=0; index<10007; index++) {
    deck.push(index);
}                       

function dealIntoNewStack (deck) {
    return deck.reverse();
}        

function dealWithIncrement (deck, increment) {
    const size = deck.length;
    const newDeck = new Array(size).fill(-1);;
    let position = 0;
    for (let index=0; index<size; index++) {
        newDeck[position]=deck[index];
        position+=increment;
        if (position>size-1) {
            position=position-size;
        }
    }
    return newDeck;
}        

function cutNCards (deck, cut) {
    const index = (cut > 0 ? cut: deck.length + cut);
    const part1 = deck.slice(0, index);
    const part2 = deck.slice(index);
    return [...part2,...part1];
}        

let answer=0;

shared.start("day 22B");

shuffles.forEach((shuffle, index) => {
    switch(shuffle.type) {
        case 0: 
            deck = cutNCards(deck, shuffle.cut);
            break;
        case 1: 
            deck = dealWithIncrement(deck, shuffle.increment);
            break;
        case 2: 
            deck = dealIntoNewStack(deck);
            break;
    }    
});
answer=deck.indexOf(2019);
                         
shared.end(answer);


