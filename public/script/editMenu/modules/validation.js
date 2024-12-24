import DOM from "./dom";

export const setFieldMessage = (field, message) => {

    const fieldMessageElement = DOM.fieldMessages[field];
    if (fieldMessageElement) {
        fieldMessageElement.innerText = message;
        fieldMessageElement.classList.add('visible');
    } else {
        console.log(`Field "${field}" does not exist.`);
    }
};