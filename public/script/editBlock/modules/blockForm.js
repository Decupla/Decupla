import { nextPriority } from './data';
import DOM from './dom';
import { handleTypeChange, handleInputSubmit } from './eventHandler';
import { createInput, closeInputCreation } from './input';

export const setupInputContainer = (container,priority=0) => {
    const addInputButton = container.querySelector('button.add-input');
    const inputCreation = container.querySelector('.input-creation');;
    
    addInputButton.addEventListener('click', () => createInput(container));

    setupInputCreation(inputCreation,priority);
}

export const setupInputCreation = (creation,priority=0) => {
    const closeButton = creation.querySelector('.input-creation-close');
    const inputForm = creation.querySelector('.add-input-form');
    const typeField = inputForm.querySelector('select.type');

    inputForm.addEventListener('submit', (event) => {
        if(priority === 0){
            priority = nextPriority;
        }

        handleInputSubmit(event,priority)
    });

    closeButton.addEventListener('click',closeInputCreation);

    typeField.addEventListener('change', (event) => {
        handleTypeChange(event.target.value,inputForm);
    });
}

// export const setupBlockForm = (container,addToStart=false) => {
//     // sets all event listeners needed to interact with the block creation
//     alert('Deprecated: setupBlockForm should not be used anymore')

//     const addInputButton = container.querySelector('button.add-input');
//     const inputForm = container.querySelector('.add-input-form');
//     const typeField = inputForm.querySelector('select.type');
//     const closeButton = container.querySelector('.input-creation-close');

//     addInputButton.addEventListener('click', () => createInput(container));
//     inputForm.addEventListener('submit', (event) => {
//         let priority = nextPriority;
//         if(addToStart){
//             priority = 1;
//         }

//         handleInputSubmit(event,priority)
//     });
//     closeButton.addEventListener('click',closeInputCreation);

//     typeField.addEventListener('change', (event) => {
//         handleTypeChange(event.target.value,inputForm);
//     });
// };