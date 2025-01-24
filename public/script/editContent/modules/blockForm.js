import DOM from './dom';
import { setCurrentBlock, setBlockMethod, setSelectMultipleMedia } from './data';
import { toggleMediaSelection } from './mediaSelection';
import { fetchBlock } from './api';

// loads the Form / Popup for creating or editing a block instance
export const setupBlockForm = async (blockID, container, setOutput = {}) => {
    // param blockID is the id of the block used to create or edit the instance
    const blocksData = await fetchBlock(blockID);

    if (blocksData.success) {
        closeBlockForm();
        if(container.classList.contains('show-block-selection')){
            container.classList.remove('show-block-selection');
        }
        container.classList.add('show-form-container');

        const block = blocksData.block;
        const inputFields = JSON.parse(block.input);
        const inputFieldsSorted = inputFields.sort((a, b) => a.priority - b.priority);

        const blockFormTitle = container.querySelector('h3.block-form-title');
        const closeFormButton = container.querySelector('.block-form-close');

        blockFormTitle.innerText = block.title;

        inputFieldsSorted.forEach((inputData) => {
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
    let newFieldset;

    console.log("value",value);

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
        case 'media':
            newInput = document.createElement('input');
            newInput.type = "text";

            if (value !== "") {
                newInput.value = value;
            }

            newInput.classList.add('hidden');
            newInput.classList.add('media');
            break;
        default:
            console.log('Invalid input type given: ' + inputData.type);
            return;
    }

    const newLabel = document.createElement('label');
    newLabel.innerText = inputData.label;
    newLabel.for = inputData.name;
    newInput.name = inputData.name;

    newFieldset = document.createElement('div');
    newFieldset.classList.add('input-fieldset');

    newFieldset.appendChild(newLabel);
    newFieldset.appendChild(newInput);

    if(inputData.type==="media"){
        createMediaInput(inputData,newFieldset,value);
    }


    const blockFormInput = container.querySelector('.block-form-input');

    if(!blockFormInput){
        console.log('Element block-form-input could not be found');
        return;
    }

    blockFormInput.appendChild(newFieldset);
}

export const createMediaInput = (inputData,newFieldset,value) => {
    const selectMediaWrapper = document.createElement('div');
    const mediaSelectButton = document.createElement('button');
    const selectedMedia = document.createElement('span');

    selectMediaWrapper.classList.add('select-media-wrapper');
    mediaSelectButton.classList.add('select-media-button');
    selectedMedia.classList.add('selected-media');

    mediaSelectButton.type = "button";
    mediaSelectButton.innerText = 'select media';
    selectedMedia.innerText = value !== "" ? value : 'no media selected';

    selectMediaWrapper.appendChild(mediaSelectButton);
    selectMediaWrapper.appendChild(selectedMedia);

    newFieldset.appendChild(selectMediaWrapper);

    selectMediaWrapper.addEventListener('click',()=>{
        if(inputData.selection==="multiple"){
            setSelectMultipleMedia(true);
        } else {
            setSelectMultipleMedia(false);
        }
        toggleMediaSelection(newFieldset);
    })
}