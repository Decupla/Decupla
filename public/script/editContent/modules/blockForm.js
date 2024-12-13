import DOM from './dom';
import { setCurrentBlock, setBlockMethod } from './data';

// loads the Form / Popup for creating or editing a block instance
export const setupBlockForm = async (blockID, setOutput = {}) => {
    // param blockID is the id of the block used to create or edit the instance
    const response = await fetch(`/blocks/${blockID}`);
    const blocksData = await response.json();

    if (blocksData.success) {
        const block = blocksData.block;
        const inputFields = JSON.parse(block.input);

        DOM.blockFormTitle.innerText = block.title;
        DOM.blockFormWrapper.classList.add('visible');

        inputFields.forEach((input) => {
            if (setOutput[input.name]) {
                createInput(input, setOutput[input.name]);
            } else {
                createInput(input);
            }
        })

        setCurrentBlock(block);
    }
}

export const closeBlockForm = () => {
    DOM.blockFormWrapper.classList.remove('visible');
    DOM.blockFormInput.innerHTML = "";
}

// sets up the block selection dropdown
export const setupBlockSelection = (container) => {
    const button = container.querySelector('.addBlockButton');
    const dropdown = container.querySelector('.addBlockDropdown');
    const blocks = container.querySelectorAll('ul li.block');

    button.addEventListener('click', () => {
        dropdown.classList.toggle('visible');
    })

    blocks.forEach((block) => {
        block.addEventListener('click', () => {
            setBlockMethod("create");
            dropdown.classList.remove('visible');
            setupBlockForm(block.dataset.id);
        })
    })
}

// loads the input fields to the block form. Param "value" is used while editing a existing instance
const createInput = (inputData, value = "") => {
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

    newFieldset.appendChild(newLabel);
    newFieldset.appendChild(newInput);

    DOM.blockFormInput.appendChild(newFieldset);
}