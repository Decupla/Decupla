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

export const resetMessages = () => {
    for (const [name, element] of Object.entries(DOM.fieldMessages)) {
        if(element.classList.contains('visible')){
            element.classList.remove('visible');
        }
      }
}