import { nextPriority } from './data';
import DOM from './dom';
import { handleTypeChange, handleInputSubmit } from './eventHandler';
import { createInput, closeInputCreation } from './input';

export const setupBlockForm = (container,addToStart=false) => {
    // sets all event listeners needed to interact with the block creation
    const addInputButton = container.querySelector('button.add-input');
    const inputForm = container.querySelector('.add-input-form');
    const typeField = inputForm.querySelector('select.type');
    const closeButton = container.querySelector('.input-creation-close');

    addInputButton.addEventListener('click', () => createInput(container));
    inputForm.addEventListener('submit', (event) => {
        let priority = nextPriority;
        if(addToStart){
            priority = 1;
        }

        handleInputSubmit(event,priority)
    });
    closeButton.addEventListener('click',closeInputCreation);

    typeField.addEventListener('change', (event) => {
        handleTypeChange(event.target.value,inputForm);
    });
};