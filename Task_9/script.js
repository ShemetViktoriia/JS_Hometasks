'use strict';

const areaContactsForm = document.getElementById('areaContactsForm');
const listContacts = document.getElementById('listContacts');
const itemTemplate = document.getElementById('itemTemplate').innerHTML;
const inputs = document.querySelectorAll('.contact-input');

listContacts.addEventListener('click', onListContactsClick);
areaContactsForm.addEventListener('submit', onAreaContactsFormSubmit);
areaContactsForm.addEventListener('focus', onAreaContactsFormFocus, true);
areaContactsForm.addEventListener('blur', onAreaContactsFormBlur, true);

function onAreaContactsFormSubmit(event) {
    event.preventDefault();
    submitContactForm();
}

function submitContactForm() {
    if (isInputsValid()) {
        const contactData = getContact();
        addContact(contactData);
        areaContactsForm.reset();
    }
}

function onAreaContactsFormBlur(event) {
    if (!isValidate(event.target.value)) {
        setInvalidState(event.target);
    }
}

function onAreaContactsFormFocus(event) {
    setValidState(event.target);
}

function getContact() {
    return {
        firstName: inputs[0].value,
        lastName: inputs[1].value,
        phoneNumber: inputs[2].value,
    };
}

function isInputsValid() {
    let isValid = true;
    for(let i=0; i<inputs.length; i++){
        if (!isValidate(inputs[i].value)) {
            setInvalidState(inputs[i]);
            isValid = false;
        }
    }
    return isValid;
}

function onListContactsClick(event) {
    if (event.target.classList.contains('btn-delete')) {
        event.target.closest('.contact-row').remove();
    }
}

function setValidState(element) {
    element.classList.remove('invalid');
}

function setInvalidState(element) {
    element.classList.add('invalid');
}

function isValidate(value) {
    return value.trim()!=="";
}

function addContact(contact) {
    const contactItemRow = document.createElement('tr');
    contactItemRow.className = 'contact-row';

    contactItemRow.innerHTML = itemTemplate
        .replace('{{firstName}}', contact.firstName)
        .replace('{{lastName}}', contact.lastName)
        .replace('{{phoneNumber}}', contact.phoneNumber);

        listContacts.appendChild(contactItemRow);
}
