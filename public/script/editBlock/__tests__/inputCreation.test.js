import { setupInputContainer, setupInputCreation } from '../modules/inputCreation';
import { createInput, closeInputCreation } from '../modules/input';
import { handleInputSubmit, handleTypeChange } from '../modules/eventHandler';
import { nextPriority } from '../modules/data';

jest.mock('../modules/input', () => ({
    createInput: jest.fn(),
    closeInputCreation: jest.fn(),
}));

jest.mock('../modules/eventHandler', () => ({
    handleInputSubmit: jest.fn(),
    handleTypeChange: jest.fn()
}))


describe('setupInputContainer', () => {
    let container;
    let mockSetupInputCreation;

    beforeEach(() => {
        container = document.createElement('div');
        container.innerHTML = `
            <button class="add-input"></button>
            <div class="input-creation">
                <form class="add-input-form">
                    <select class="type"></select>
                </form>
                <button class="input-creation-close"></button>
            </div>
        `;
        mockSetupInputCreation = jest.spyOn(require('../modules/inputCreation'), 'setupInputCreation');
    });

    it('should add event listener to add-input button and call setupInputCreation', () => {

        jest.mock('../modules/inputCreation', () => ({
            setupInputCreation: jest.fn(),
        }));

        setupInputContainer(container);

        const addInputButton = container.querySelector('button.add-input');
        addInputButton.click();

        expect(createInput).toHaveBeenCalledWith(container);
    });
});

describe('setupInputCreation', () => {
    let creation;
    let inputForm;
    let typeField;
    let closeButton;

    beforeEach(() => {
        creation = document.createElement('div');
        creation.innerHTML = `
            <button class="input-creation-close"></button>
            <form class="add-input-form">
                <select class="type"></select>
            </form>
        `;
        inputForm = creation.querySelector('.add-input-form');
        typeField = inputForm.querySelector('.type');
        closeButton = creation.querySelector('.input-creation-close');
    });

    it('should add event listeners to elements', () => {
        setupInputCreation(creation);

        closeButton.click();
        expect(closeInputCreation).toHaveBeenCalled();

        const submitEvent = new Event('submit');
        inputForm.dispatchEvent(submitEvent);
        expect(handleInputSubmit).toHaveBeenCalledWith(submitEvent, nextPriority);

        typeField.value = 'newType';
        
        setTimeout(() => {
            const changeEvent = new Event('change', {
                bubbles: true,
                cancelable: true
            });
            typeField.dispatchEvent(changeEvent);
            expect(handleTypeChange).toHaveBeenCalledWith('newType', inputForm);
        }, 0);
    });

    it('should call nextPriority if priority is 0', () => {
        setupInputCreation(creation, 0);

        const submitEvent = new Event('submit');
        inputForm.dispatchEvent(submitEvent);
        expect(handleInputSubmit).toHaveBeenCalledWith(submitEvent, nextPriority);
    });
});
