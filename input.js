const fs = require("fs");

const getInput = (separator = "\n") => {
  const file = fs.readFileSync('./input.txt', "utf-8");
  return file.split(separator).map(x =>x);
};

const getNumericInput = (separator = "\n") => {
  return getInput(separator).map(x => parseInt(x));
};
module.exports = { getInput, getNumericInput };