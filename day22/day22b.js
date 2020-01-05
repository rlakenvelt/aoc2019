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
                            };
                            return list;
                       }, []);
const DECKSIZE=119315717514047;
const SHUFFLES=101741582076661;
let lastPosition = 2019;

function dealIntoNewStack () {
    lastPosition=DECKSIZE-lastPosition-1;
}        

function dealWithIncrement (increment) {
    lastPosition=(lastPosition*increment)%DECKSIZE;
}        

function cutNCards (cut) {
    const index = (cut > 0 ? cut: DECKSIZE + cut);
    if (lastPosition<index) {
        lastPosition=DECKSIZE+lastPosition-index;
    } else {
        lastPosition=lastPosition-index;
    }
}        

shared.start("day 22B");
for (let i = 0; i<1; i++) {
    shuffles.forEach((shuffle, index) => {
        switch(shuffle.type) {
            case 0: 
                deck = cutNCards(shuffle.cut);
                break;
            case 1: 
                deck = dealWithIncrement(shuffle.increment);
                break;
            case 2: 
                deck = dealIntoNewStack();
                break;
        }    
    });
}

shared.end(lastPosition);


