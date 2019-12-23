'use strict';

const userInput = getUserInput();

// split string by commas and delete empties
const arrayOfNumbers = userInput.split(',') // split string by commas
    .filter((item) => item.trim() !== '')   // trim split parts and select not empties
    .map((item) => +item)                   // try to convert to Number
    .filter((item) => item === +item);      // select only numbers

if (arrayOfNumbers.length != 0) {
    alert(`Max = ${getMax(arrayOfNumbers)}`);
    alert(`Sum = ${getSum(arrayOfNumbers)}`);
    alert(`Even numbers ={${getEvenNumbers(arrayOfNumbers)}}`);
}
else {
    alert(`You didn't enter number(s) `);
}

function getMax(array) {
    return Math.max.apply(null, array);
}

function getSum(array) {
    const result = array.reduce((sum, current) => sum + current);
    return result;
}

function getEvenNumbers(array) {
    const arrayEvenNumbers = array.filter((item) => item % 2 === 0);
    return arrayEvenNumbers;
}

function getUserInput() {
    let input;
    do {
        input = prompt('Enter numbers separated by commas', '');
    } while (input === '');
    return input;
}