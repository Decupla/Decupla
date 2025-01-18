import DOM from "./dom";

export const setFieldMessage = (field,message) => {
    const element = document.querySelector(`#message-${field}`);
    element.innerText = message;
    element.classList.add('visible');
}

export const resetMessages = () => {
    const activeMessages = document.querySelectorAll('.error-message.visible');
    activeMessages.forEach((element)=>{
        element.classList.remove('visible');
    })

    if(DOM.savedMessage.classList.contains('visible')){
        DOM.savedMessage.classList.remove('visible');
    }
}