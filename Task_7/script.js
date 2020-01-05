'use strict';

const countElement = document.querySelector('#count');
const listElement = document.querySelector('#result');
const valMessageElement = document.querySelector('#valMessage');

document.getElementById('listBtn').addEventListener('click', onListBtnClick);

function onListBtnClick() {
    clearElements();
    const count = getCount();
    if(!isValid(count)){
        showValMessage();
        return;
    }
    fillList(count);
}

function getCount() {
    return +countElement.value;
}

function isValid(count) {
    return !isNaN(count) && (count>0) && !(count%1);
}

function showValMessage(){
    valMessageElement.textContent = 'Not valid number. Try again!';
}

function clearElements() {
    listElement.innerHTML = '';
    valMessageElement.innerHTML = '';
}

function fillList(count) {
    for (let i = 1; i <= count; i++) {
        let li = document.createElement('li');
        li.textContent = i;
        listElement.append(li);
    }
}