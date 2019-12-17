'use strict';

const user = getPersonData();
alert(user);

function getPersonData() {
    const person = {
        firstName: prompt('What is your first name?'),
        lastName: prompt('What is your last name?'),
        age: +prompt('What is your age?'),

        toString() {
            return `${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}, age: ${this.age}`;
        }
    };
    return person;
}
