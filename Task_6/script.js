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
<<<<<<< HEAD
    num = +prompt('Enter number of operands');
} while (isNaN(num) || (num % 1) || num < 2 || num > 4);
=======
    num = prompt('Enter number of operands');
} while (num === '' || !Number.isInteger(+num) || +num < 1 || +num > 4);

num = Number(num);
>>>>>>> 2d293af96dffdfed48a1504eab3dc62e0a2a68ba

for (let i = 0; i < num; i++) {
    do {
        operands[i] = +prompt(`Enter ${i + 1} operand`);
    } while (isNaN(operands[i]));
}

switch (operator) {
    case '+':
        result = operands.reduce((sum, curr) => sum + curr);
        break;
    case '-':
        result = operands.reduce((sub, curr) => sub - curr);
        break;
    case '*':
        result = operands.reduce((mult, curr) => mult * curr);
        break;
    case '/':
        result = operands.reduce((div, curr) => div / curr);
        break;
}

alert(`${operands.join(operator)} = ${result}`);
