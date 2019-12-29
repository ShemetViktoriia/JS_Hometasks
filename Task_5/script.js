'use strict';

const userInput = getUserInput();

// split string by commas and delete empties
const arrayOfNumbers = userInput
    .split(',') // split string by commas
    .filter((item) => !isNaN(item) && item.trim() !== '')   // trim split parts and select not empties
    .map(Number)                   // try to convert to Number

if (arrayOfNumbers.length != 0) {
    alert(`Max = ${calculateMax(arrayOfNumbers)}`);
    alert(`Sum = ${calculateSum(arrayOfNumbers)}`);
    alert(`Even numbers ={${calculateEvenNumbers(arrayOfNumbers)}}`);
}
else {
    alert(`You didn't enter number(s) `);
}

function calculateMax(array) {
    return Math.max.apply(null, array);
}

function calculateSum(array) {
    return array.reduce((sum, current) => sum + current);
}

function calculateEvenNumbers(array) {
    return array.filter((item) => item % 2 === 0);
}

function getUserInput() {
    let input;
    do {
        input = prompt('Enter numbers separated by commas', '');
    } while (input === '');
    return input;
}