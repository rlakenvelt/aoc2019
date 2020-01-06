let bigintCryptoUtils = require('bigint-crypto-utils');

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
                       }, [])
                       .reverse();
                       
const DECKSIZE=BigInt(119315717514047);
const SHUFFLES=BigInt(101741582076661);
let SEARCHPOSITION = BigInt(2020);

function reverseDealIntoNewStack (position) {
    return DECKSIZE-BigInt(position)-BigInt(1);
}        

function reverseDealWithIncrement (position, increment) {
    return bigintCryptoUtils.modInv(increment, DECKSIZE) * BigInt(position) % BigInt(DECKSIZE);
}        

function reverseCutNCards (position, cut) {
    return (BigInt(cut) + DECKSIZE + BigInt(position)) % DECKSIZE
}        

function applyShuffle (position, shuffle) {
    switch(shuffle.type) {
        case 0: 
            return reverseCutNCards(position, shuffle.cut);
        case 1: 
            return reverseDealWithIncrement(position, shuffle.increment);
        case 2: 
            return reverseDealIntoNewStack(position);
    }    
}

shared.start("day 22B");
let answer=0;
const y = shuffles.reduce(applyShuffle, SEARCHPOSITION);
const z = shuffles.reduce(applyShuffle, y);
const a = (y - z) * bigintCryptoUtils.modInv(SEARCHPOSITION - y + DECKSIZE, DECKSIZE) % DECKSIZE
const b = (y - a * SEARCHPOSITION) % DECKSIZE;

answer = (bigintCryptoUtils.modPow(a, SHUFFLES, DECKSIZE) * SEARCHPOSITION + (bigintCryptoUtils.modPow(a, SHUFFLES, DECKSIZE) - BigInt(1)) * bigintCryptoUtils.modInv(a - BigInt(1), DECKSIZE) * b) % DECKSIZE;

shared.end(answer);


