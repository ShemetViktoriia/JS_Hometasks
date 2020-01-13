'use strict';

const ENTER_KEY_CODE = 13;
const DEFAULT_CARD_CLASS = 'bg-warning';
const CHANGE_CARD_CLASS = 'bg-success';

const taskDescElement = document.querySelector('#taskDesc');
const taskListElement = document.querySelector('#taskTemplate');
const taskTemplate = document.querySelector('#taskTemplate').innerHTML;
const valMessageElement = document.querySelector('#valMessage');

document.querySelector('#taskAdd').addEventListener('click', onTaskAddBtnClick);

taskDescElement.addEventListener('keydown', e => {
    if (e.keyCode === ENTER_KEY_CODE) {
        onTaskAddBtnClick(e);
    }
});

function onTaskAddBtnClick(e) {
    e.preventDefault();
    const description = getTaskDesc();
    if (description === '') {
        showValMessage();
        return;
    }
    generateNewTaskList(description);
    clearElements();
}

document.querySelector('#taskTemplate').addEventListener(
    'click',
    (e) => {
        if (e.target.classList.length===0) return;

        switchTaskCardColor(e.target.parentNode);
    },
    false
);

function switchTaskDivColor(element) {
    let elemClassList = element.classList;

    if(elemClassList.contains(DEFAULT_CARD_CLASS)){
        elemClassList.toggle(DEFAULT_CARD_CLASS);
        elemClassList.toggle(CHANGE_CARD_CLASS, true);
    }
    else if(elemClassList.contains(CHANGE_CARD_CLASS)){
    elemClassList.toggle(CHANGE_CARD_CLASS);
    elemClassList.toggle(DEFAULT_CARD_CLASS, true);
    }
}

function clearElements() {
    taskDescElement.value = '';
    valMessageElement.innerHTML = '';
}

function getTaskDesc() {
    return taskDescElement.value;
}

function showValMessage() {
    valMessageElement.textContent = 'Description is required!';
}

function generateNewTaskList(description) {
    const template = generateTaskDiv(description);
    taskListElement.innerHTML += template;
}

function generateTaskDiv(description) {
    return taskTemplate
        .replace('{{desc}}', description)
        .replace(' hidden=""','');
}