'use strict';

const taskFormElement = document.querySelector('#addTaskForm');
const taskListElement = document.querySelector('#taskList');
const taskDescElement = document.querySelector('#taskDesc');
const valMessageElement = document.querySelector('#valMessage');
const taskTemplate = document.querySelector('#taskTemplate').innerHTML;

document.querySelector('#addTaskForm').addEventListener('submit', onTaskAddFormSubmit);
taskListElement.addEventListener('click', onTaskListClick);

function onTaskAddFormSubmit(e) {
    e.preventDefault();
    const description = getTaskDesc();
    if (!isValid(description)) {
        showValMessage();
        return;
    }
    generateNewTask(description);
    clearElements();
}

function onTaskListClick(e) {
    if (e.target.classList.contains('card-body')) {
        switchTaskCardColor(e.target);
    }
}

function switchTaskCardColor(element) {
    element.classList.toggle('marked');
}

function generateNewTask(description) {
    const htmlTemplate = taskTemplate.replace('{{desc}}', description);
    taskListElement.innerHTML += htmlTemplate;
}

function getTaskDesc() {
    return taskDescElement.value;
}

function isValid(description) {
    return description !== '';
}

function showValMessage() {
    valMessageElement.textContent = 'Description is required!';
}

function clearElements() {
    taskFormElement.reset();
    valMessageElement.innerHTML = '';
}