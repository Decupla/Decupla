import DOM from "./dom";
import { inputData } from "./data";

export const validate = (data, newName = false) => {
    let isValid = true;

    for (const [name, element] of Object.entries(DOM.fieldMessages)) {
        element.innerText = "";
    }

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

// sets a message for a specific field in the block or input form
export const setFieldMessage = (field, message) => {
    const fieldMessageElement = DOM.fieldMessages[field];
    if (fieldMessageElement) {
        fieldMessageElement.innerText = message;
    } else {
        console.log(`Field "${field}" does not exist.`);
    }
};

//check if the name of a input already exists
const nameExists = (name) => {
    return inputData.some(obj => obj.name === name);
}