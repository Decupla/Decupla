import DOM from "./dom";
import { inputData } from "./data";

export const validateInput = (data, newName = false) => {
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

export const resetMessages = () => {
    const messages = document.querySelectorAll('.error-message');

    messages.forEach((message)=>{
        message.innerText = "";
        if(message.classList.contains('visible')){
            message.classList.remove('visible');
        }
    })
}