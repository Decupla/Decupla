import DOM from "./dom";

export const setFieldMessage = (field, message, blockForm = false) => {
    let fieldMessageElement;
    if (blockForm) {
        fieldMessageElement = document.querySelector(`#message-${field}`);
    } else {
        fieldMessageElement = submittedForm.querySelector(`.message-${field}`);
    }

    if (fieldMessageElement) {
        fieldMessageElement.innerText = message;
        fieldMessageElement.classList.add('visible');
    } else {
        console.log(`Field "${field}" does not exist.`);
    }
};

export const resetMessages = () => {
    const messages = document.querySelectorAll('.error-message');

    messages.forEach((message) => {
        message.innerText = "";
        if (message.classList.contains('visible')) {
            message.classList.remove('visible');
        }
    })
}

export const showSuccessMessage = () => {
    DOM.messageSuccess.classList.remove('visible');
    void DOM.messageSuccess.offsetWidth;
    DOM.messageSuccess.classList.add('visible');
}