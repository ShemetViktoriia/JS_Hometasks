'use strict';

const SERVER_URL = 'https://jsonplaceholder.typicode.com/todos';

const taskFormElement = document.querySelector('#addTaskForm');
const taskListElement = document.querySelector('#taskList');
const taskDescElement = document.querySelector('#taskDesc');
const valMessageElement = document.querySelector('#valMessage');
const taskTemplate = document.querySelector('#taskTemplate').innerHTML;

document.querySelector('#addTaskForm').addEventListener('submit', onTaskAddFormSubmit);
taskListElement.addEventListener('click', onTaskListClick);

populateToDoList();

function onTaskAddFormSubmit(e) {
    e.preventDefault();
    const task = { title: getTaskDesc(), isCompleted: false };
    if (!isValid(task.title)) {
        showValMessage();
        return;
    }
    generateNewTask(task);
    clearElements();
}

function toggleTaskState(el) {
    el.classList.toggle('completed');
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function onTaskListClick(e) {
    const classList = e.target.classList;

    switch (true) {
        case classList.contains('task'):
            toggleTaskState(e.target);
            break;
    }
}

function generateNewTask(task) {
    const htmlTemplate = taskTemplate.replace('{{desc}}', task.title);
    const newTaskEl = htmlToElement(htmlTemplate);
    if(task.completed){
        toggleTaskState(newTaskEl);
    }
    taskList.appendChild(newTaskEl);
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

function populateToDoList() {
    fetch(SERVER_URL)
        .then(response => {
            if (response.status != 200) {
                return null;
            } else {
                return response.json();
            }
        }
        )
        .then(task => {
            task.forEach(task => {
                generateNewTask(task)
            });
        })
        .catch(error => console.error(error));
}

