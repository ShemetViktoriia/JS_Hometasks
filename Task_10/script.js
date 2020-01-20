'use srtrict';

const calculator = createCalculator(10);

function createCalculator(number) {
    return {
        add: function(value){
            return number + value;
        },
        
        sub: function(value){
            return number - value;
        },   
        
        divide: function(value){
            return number / value;
        },  

        mult: function(value){
            return number * value;
        }, 

        set: function(value){
            number = value;
        }

        // add: (value) => number + value,  
        // sub: (value) => number - value,
        // divide: (value) => number / value,
        // mult: (value) => number * value,
        // set: (value) => number = value
    };
}

console.log(calculator.add(45));
console.log(calculator.sub(45));
console.log(calculator.divide(5));
console.log(calculator.mult(5));
calculator.set(100);
console.log(calculator.mult(5));
