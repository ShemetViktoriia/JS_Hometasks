'use srtrict';

const calculator = createCalculator(10);

function createCalculator(number) {
    this.baseValue = number;

    return {
        add: function(value){
            return baseValue + value;
        },
        
        sub: function(value){
            return baseValue - value;
        },   
        
        divide: function(value){
            return baseValue / value;
        },  

        mult: function(value){
            return baseValue * value;
        }, 

        set: function(value){
            baseValue = value;
        }, 

        // add: (value) => baseValue + value,  
        //sub: (value) => baseValue - value,
        //divide: (value) => baseValue / value,
        //mult: (value) => baseValue * value,
        //set: (value) => baseValue = value
    };
}

console.log(calculator.add(45));
console.log(calculator.sub(45));
console.log(calculator.divide(5));
console.log(calculator.mult(5));
calculator.set(100);
console.log(calculator.mult(5));
