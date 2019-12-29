'use strict';

const arrayOperators = ['+', '-', '*', '/'];
let operator;
let num;
let operands = [];
let result;

do {
    operator = prompt('Enter operator (+,-,*,/)');
} while (arrayOperators.indexOf(operator) == -1);

do {
    num = prompt('Enter number of operands');
} while (num.trim() === '' || !Number.isInteger(+num) || +num < 1 || +num > 4);

num = Number(num);

for (let i = 0; i < num; i++) {
    let operand;
    do {
        operand = prompt(`Enter ${i + 1} operand`);
    } while (isNaN(operand) || operand.trim() === '');
    operands[i] = Number(operand);
}

switch (operator) {
    case '+':
        result = operands.reduce((sum, curr) => sum + curr, 0);
        break;
    case '-':
        result = operands.reduce((sub, curr) => sub - curr, 2*operands[0]);
        break;
    case '*':
        result = operands.reduce((mult, curr) => mult * curr, 1);
        break;
    case '/':
        result = operands.reduce((div, curr) => div / curr, operands[0]*operands[0]);
        break;
}

alert(`${operands.join(operator)} = ${result}`);
