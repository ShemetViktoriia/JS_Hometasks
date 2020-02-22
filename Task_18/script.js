'use strict';

const SERVER_URL = 'http://5e4ed6e26272aa001423102a.mockapi.io/todos';

const $list = $('.js-todo-list'); 

let todoItems = [];

$('.js-form').on('submit', onToDoFormSubmit);
$list.on('click', '.js-tick', onTodoClickClick);
$list.on('click', '.js-delete-todo', onDeleteBtnClick);

init();

function onToDoFormSubmit(e) {
    e.preventDefault();
    
    const $input = $('.js-todo-input');
    const inputText = $input.val();

    if (isValid(inputText)) {
        const todo = { title: inputText, completed: false };

        fetch(SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(resp => resp.json())
            .then(addTodo);

        resetForm($input);
    }
}

function resetForm($input) {
    $input.val('');
    $input.focus();
}

function onTodoClickClick(e) {
    updateTodo($(this).parent().data('key'));
}


function onDeleteBtnClick(e) {
    e.stopPropagation();
    deleteTodo($(this).parent().data('key'));
}

function init() {
    getTodos();
}

function getTodos() {
    return fetch(SERVER_URL)
        .then(resp => resp.json())
        .then(setTodos)
        .then(renderTodos);
}

function setTodos(data) {
    return (todoItems = data);
}

function renderTodos(data) {
    const listToDoHtml = data.map(generateToDoHtml).join('\n');
    $list.html(listToDoHtml);
}

function generateToDoHtml(todo) {
    return $('#toDoItemTemplate')
        .html()
        .replaceAll('{{id}}', todo.id)
        .replace('{{completed}}', todo.completed ? 'done' : '')
        .replace('{{title}}', todo.title);
}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find, 'g'), replace);
}

function addTodo(todo) {
    todoItems.push(todo);

    $list.append(generateToDoHtml(todo));
}

function deleteTodo(id) {

    fetch(`${SERVER_URL}/${id}`, {
        method: 'DELETE'
    });

    todoItems = todoItems.filter(item => Number(item.id) !== id);
    $(`[data-key='${id}']`).remove();

    // select the list element and trim all whitespace once there are no todo items left
    if (todoItems.length === 0) {
        $list.html('');
    }
}

function updateTodo(id) {
    toggleDone(id);

    fetch(`${SERVER_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(todoItems[id - 1])
    });
}

function isValid(text) {
    return text.trim() !== '';
}

function toggleDone(id) {
    const index = todoItems.findIndex(item => Number(item.id) === id);
    todoItems[index].completed = !todoItems[index].completed;

    const $item = $(`[data-key='${id}']`);
    if (todoItems[index].completed) {
        $item.addClass('done');
    } else {
        $item.removeClass('done');
    }
}