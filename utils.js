const fs = require("fs");

let starttime;
let endtime;
let puzzletitle;

const start = (puzzle) => {
  starttime = new Date();
  puzzletitle = puzzle;
};

const end = (answer) => {
  endtime = new Date();
  console.log("---------------------");
  console.log("Puzzle   :", puzzletitle);
  console.log("Answer   :", answer);
  console.log("Duration :", endtime - starttime, "ms");
  console.log("---------------------");
};

const getInput = (separator = "\n") => {
  const file = fs.readFileSync('./input.txt', "utf-8");
  return file.split(separator).map(x =>x);
};

const getNumericInput = (separator = "\n") => {
  return getInput(separator).map(x => parseInt(x));
};
module.exports = { start, end, getInput, getNumericInput };