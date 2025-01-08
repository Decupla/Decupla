import DOM from './dom';
import { setCurrentBlock, setBlockMethod } from './data';

// loads the Form / Popup for creating or editing a block instance
export const setupBlockForm = async (blockID, container, setOutput = {}) => {
    // param blockID is the id of the block used to create or edit the instance
    const response = await fetch(`/blocks/${blockID}`);
    const blocksData = await response.json();

    if (blocksData.success) {
        closeBlockForm();
        if(container.classList.contains('show-block-selection')){
            container.classList.remove('show-block-selection');
        }
        container.classList.add('show-form-container');

        const block = blocksData.block;
        const inputFields = JSON.parse(block.input);

        const blockFormTitle = container.querySelector('h3.block-form-title');
        const closeFormButton = container.querySelector('.block-form-close');

        blockFormTitle.innerText = block.title;

        inputFields.forEach((inputData) => {
            const input = inputData.params;

            if (setOutput[input.name]) {
                createInput(input, setOutput[input.name], container);
            } else {
                createInput(input, "", container);
            }
        })

        closeFormButton.addEventListener('click',closeBlockForm);

        setCurrentBlock(block);
    }
}

export const closeBlockForm = () => {
    const activeForms = document.querySelectorAll('.show-form-container');

    activeForms.forEach((element)=>{
        element.classList.remove('show-form-container');

        const input = element.querySelector('.block-form-input');
        input.innerHTML = "";
    })
}

// sets up the block selection dropdown
export const setupBlockSelection = (container) => {
    const button = container.querySelector('.add-block-button');
    const closeButton = container.querySelector('.dropdown-close');
    const dropdown = container.querySelector('.add-block-dropdown');
    const blocks = container.querySelectorAll('ul li.block');

    button.addEventListener('click', () => {
        container.classList.add('show-block-selection');
    })

    closeButton.addEventListener('click',()=>{
        container.classList.remove('show-block-selection');
    })

    blocks.forEach((block) => {
        block.addEventListener('click', () => {
            setBlockMethod("create");
            setupBlockForm(block.dataset.id,container);
        })
    })
}

// loads the input fields to the block form. Param "value" is used while editing a existing instance
const createInput = (inputData, value, container) => {
    let newInput;

    switch (inputData.type) {
        case 'shortText':
            newInput = document.createElement('input');
            newInput.type = "text";
            if (value !== "") {
                newInput.value = value;
            }
            break;
        case 'longText':
            newInput = document.createElement('textarea');

            if (value !== "") {
                newInput.innerText = value;
            }
            break;
        default:
            console.log('Invalid input type given: ' + inputData.type);
            return;
    }

    const newLabel = document.createElement('label');
    newLabel.for = inputData.name;
    newLabel.innerText = inputData.label;

    newInput.id = inputData.name;
    newInput.name = inputData.name;

    const newFieldset = document.createElement('div');
    newFieldset.classList.add('input-fieldset');

    newFieldset.appendChild(newLabel);
    newFieldset.appendChild(newInput);

    const blockFormInput = container.querySelector('.block-form-input');

    if(!blockFormInput){
        console.log('Element block-form-input could not be found');
        return;
    }

    blockFormInput.appendChild(newFieldset);
}