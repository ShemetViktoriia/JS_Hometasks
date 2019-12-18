'use strict';

const expression = {
    operator: getOperator(),
    leftOperand: getOperand('Enter left operand'),
    rightOperand: getOperand('Enter right operand'),

    showResult: function () {
        alert(`${this.leftOperand} ${this.operator}  ${this.rightOperand >= 0 ? this.rightOperand : `(` + this.rightOperand + `)`} =  ${calculateResult(this.operator, this.leftOperand, this.rightOperand)}`);
    }
};

expression.showResult();

function getOperator() {
    const operators = ['+', '-', '*', '/', '%'];
    let userOperator;
    do {
        userOperator = prompt('Enter one of the operators +, -, *, /, %');
    } while (operators.indexOf(userOperator) == -1);
    return userOperator;
}

function getOperand(promptText) {
    let userInput;
    do {
        userInput = prompt(promptText);
    } while (isNaN(userInput) || userInput === '');
    return Number(userInput);
}

function calculateResult(operator, leftOperand, rightOperand) {
    let result;
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