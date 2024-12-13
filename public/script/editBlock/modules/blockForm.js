import DOM from './dom';
import { handleTypeChange, handleInputSubmit, handleBlockSubmit } from './eventHandler';
import { createInput } from './input';

export const setupBlockForm = () => {
    // sets all event listeners needed to interact with the block creation
    DOM.addInputButton.addEventListener('click', createInput);
    DOM.inputForm.addEventListener('submit', handleInputSubmit);
    DOM.blockForm.addEventListener('submit', handleBlockSubmit);
    DOM.inputFormFields.type.addEventListener('change', (event) => {
        handleTypeChange(event.target.value);
    });
};