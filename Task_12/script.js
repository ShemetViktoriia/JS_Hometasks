'use srtrict';

class Hamburger {

    static SIZE_SMALL = { money: 50, calories: 20 };
    static SIZE_MEDIUM = { money: 75, calories: 30 };
    static SIZE_LARGE = { money: 100, calories: 40 };
    static STUFFING_CHEESE = { money: 10, calories: 20 };
    static STUFFING_SALAD = { money: 20, calories: 5 };
    static STUFFING_POTATO = { money: 15, calories: 10 };
    static TOPPING_SPICE = { money: 15, calories: 0 }; // optional
    static TOPPING_MAYO = { money: 20, calories: 5 }; // optional

    constructor(size, stuffing) { // required parameters
        this._size = size;
        this._stuffing = stuffing;
    }

    // optional parameter, there may be several options at once
    _toppings = [];

    get size() {
        return this._size;
    }

    get stuffing() {
        return this._stuffing;
    }

    get toppings() {
        return this._toppings;
    }

    addTopping(addTopping) {
        this._toppings.push(addTopping);
    }

    _getOptionsAll() {
        const optionSize = this.size;
        const optionStuffing = this.stuffing;
        const optionToppings = this.toppings;
        const optionsAll = [optionSize, optionStuffing].concat(optionToppings);
        return optionsAll;
    }

    calculatePrice() {
        let price = 0;
        const hamOptionsAll = this._getOptionsAll();
        return hamOptionsAll.reduce((sum, curr) => (sum + curr.money), 0);
    }

    calculateCalories() {
        let calories = 0;
        const hamOptionsAll = this._getOptionsAll();
        return hamOptionsAll.reduce((sum, curr) => (sum + curr.calories), 0);
    }
}

// маленький гамбургер с начинкой из сыра
const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// спросим сколько там калорий
console.log('Calories: ' + hamburger.calculateCalories());
// сколько стоит
console.log('Price: ' + hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит?
console.log('Price with sauce: ' + hamburger.calculatePrice());