'use strict';

const USERS_URL = 'http://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users';
const USER_INPUT_CLASS = 'user-input';
const USER_ITEM_CLASS = '.user-item';
const DELETE_BTN_CLASS = 'btn-delete';
const UPDATE_BTN_CLASS = 'btn-update';

const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');
const userItemTemplate = document.getElementById('userItemTemplate').innerHTML;
const inputsAdd = document.querySelectorAll('.user-input');

let users = [];

userList.addEventListener('click', onUserListClick);
userForm.addEventListener('submit', onUserFormSubmit);
userForm.addEventListener('focus', onUserFormFocus, true);
userForm.addEventListener('blur', onUserFormBlur, true);

init();

function onUserListClick(e) {
    switch (true) {
        case e.target.classList.contains(UPDATE_BTN_CLASS):
            const userId = e.target.closest(USER_ITEM_CLASS).dataset.id;
            if (isInputsValid(getUserInputElements(userId))) {
            updateUser(userId);
            }
            break;
        case e.target.classList.contains(DELETE_BTN_CLASS):
            deleteUser(e.target.closest(USER_ITEM_CLASS).dataset.id);
            break;
        case e.target.classList.contains(USER_INPUT_CLASS):
            activateUserInputs(e.target.closest(USER_ITEM_CLASS).dataset.id);
            break;
    }
}

function onUserFormSubmit(event) {
    event.preventDefault();
    submitUserForm();
}

function onUserFormFocus(event) {
    setValidState(event.target);
}

function onUserFormBlur(event) {
    if (!isValid(event.target.value)) {
        setInvalidState(event.target);
    }
}

function init() {
    getUsers();
}

function getUsers() {
    return fetch(USERS_URL)
        .then(resp => resp.json())
        .then(setUsers)
        .then(renderUsers);
}

function setUsers(data) {
    return (users = data);
}

function renderUsers(data) {
    userList.innerHTML = data.map(generateUserHtml).join('\n');
}

function generateUserHtml(user) {
    return userItemTemplate
        .replace('{{id}}', user.id)
        .replace('{{firstName}}', user.name)
        .replace('{{lastName}}', user.surname)
        .replace('{{email}}', user.email);
}

function deleteUser(id) {
    fetch(`${USERS_URL}/${id}`, {
        method: 'DELETE'
    });

    users = users.filter(user => user.id !== id);
    renderUsers(users);
}

function updateUser(id) {
    const user = users.find(user => user.id === id);

    const changedUser = getUserFromInputs(id);
    // TODO Знаю что лучше вынести в отдельный метод. 
    user.name = changedUser.name;
    user.surname = changedUser.surname;
    user.email = changedUser.email;

    fetch(`${USERS_URL}/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    renderUsers(users);
}

function submitUserForm() {
    if (isInputsValid(inputsAdd)) {
        const user = getUserFromInputs();

        fetch(USERS_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(resp => resp.json())
            .then(addUser);
        userForm.reset();
    }
}

function addUser(user) {
    users.push(user);
    renderUsers(users);
}

function getUserFromInputs(userId) {
    const userInputArray = userId===undefined? inputsAdd: getUserInputElements(userId);
    return {
        name: userInputArray[0].value,
        surname: userInputArray[1].value,
        email: userInputArray[2].value,
    };
}

function isInputsValid(inputs) {
    let isVal = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!isValid(inputs[i].value)) {
            setInvalidState(inputs[i]);
            isVal = false;
        }
    }
    return isVal;
}

function activateUserInputs(userId) {
    const childrenInputsArray = getUserInputElements(userId);
    childrenInputsArray.forEach(setAbleState);
}

function getUserInputElements(userId) {
    const userInputsElement =  document.querySelectorAll('tr[data-id=' + '"' + userId +'"] td input');
    const childrenInputsArray = [].slice.call(userInputsElement);
    return childrenInputsArray;
}

function setAbleState(element) {
    element.removeAttribute('disabled');
}

function setValidState(element) {
    element.classList.remove('invalid');
}

function setInvalidState(element) {
    element.classList.add('invalid');
}

function isValid(value) {
    return value.trim() !== "";
}
