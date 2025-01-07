import DOM from './dom';
import { handleTypeChange, handleInputSubmit } from './eventHandler';
import { createInput } from './input';

export const setupBlockForm = (container) => {
    // sets all event listeners needed to interact with the block creation
    const addInputButton = container.querySelector('button.add-input');
    const inputForm = container.querySelector('.add-input-form');
    const typeField = inputForm.querySelector('select.type');

    addInputButton.addEventListener('click', () => createInput(container));
    inputForm.addEventListener('submit', handleInputSubmit);

    typeField.addEventListener('change', (event) => {
        handleTypeChange(event.target.value,inputForm);
    });
};