'use strict';

const operator = prompt('Enter one of the operators +, -, *, /, %');
const leftOperand = +prompt('Enter left operand');
const rightOperand = +prompt('Enter right operand');
const result = calculateResult(operator, leftOperand, rightOperand);

showResult(result);

function showResult(result) {
    if (!isNaN(result)){
        alert(`Result = ${result}`);
    }
    else{
        alert('Try again.\nSomething went wrong.');
    }
}

function calculateResult(operator, leftOperand, rightOperand) {
    let result = NaN;
    switch (operator) {
        case '+':
            result = calculateSum(leftOperand, rightOperand);
            break;
        case '-':
            result = calculateDif(leftOperand, rightOperand);
            break;
        case '*':
            result = calculateMult(leftOperand, rightOperand);
            break;
        case '/':
            result = calculateDiv(leftOperand, rightOperand);
            break;
        case '%':
            result = calculateRemOfDiv(leftOperand, rightOperand);
            break;
    }
    return result;
}

function calculateSum(leftOperand, rightOperand) {
    return leftOperand + rightOperand;
}

function calculateDif(leftOperand, rightOperand) {
    return leftOperand - rightOperand;
}

function calculateMult(leftOperand, rightOperand) {
    return leftOperand * rightOperand;
}

function calculateDiv(leftOperand, rightOperand) {
    return leftOperand / rightOperand;
}

function calculateRemOfDiv(leftOperand, rightOperand) {
    return leftOperand % rightOperand;
}