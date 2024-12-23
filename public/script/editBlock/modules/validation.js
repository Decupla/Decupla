import DOM from "./dom";
import { inputData } from "./data";

export const validateInput = (data, newName = false) => {
    resetMessages();

    let isValid = true;

    if (!data.name) {
        setFieldMessage('name', '"name" is required.');
        isValid = false;
    }
    if (data.name.includes(" ")) {
        setFieldMessage('name', '"name" cannot contain spaces.')
        isValid = false;
    }
    if (!data.label) {
        setFieldMessage('label', '"label" is required.');
        isValid = false;
    }
    if (newName && nameExists(data.name)) {
        setFieldMessage('name', `Input with name "${data.name}" already exists`);
        isValid = false;
    }

    return isValid;
};

export const setFieldMessage = (field, message) => {

    const fieldMessageElement = DOM.fieldMessages[field];
    if (fieldMessageElement) {
        fieldMessageElement.innerText = message;
        fieldMessageElement.classList.add('visible');
    } else {
        console.log(`Field "${field}" does not exist.`);
    }
};

//check if the name of a input already exists
const nameExists = (name) => {
    return inputData.some(obj => obj.name === name);
}

const resetMessages = () => {
    for (const [name, element] of Object.entries(DOM.fieldMessages)) {
        if(element.classList.contains('visible')){
            element.classList.remove('visible');
        }
      }
}