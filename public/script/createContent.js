'use strict';

(() => {

// === DOM & VARS ===
const DOM = {};
DOM.contentForm = document.querySelector('form#contentForm');
DOM.blocksArea = document.querySelector('#blocks');
DOM.addBlockButtonContainers = document.querySelectorAll('.addBlockContainer');
DOM.blockFormWrapper = document.querySelector('#blockFormWrapper');
DOM.blockFormTitle = DOM.blockFormWrapper.querySelector('#blockFormTitle');
DOM.blockForm = DOM.blockFormWrapper.querySelector('form#blockForm');
DOM.blockFormInput = DOM.blockForm.querySelector('#blockFormInput');

const blockData = [];
let currentBlock = {};
let nextBlockId = 1;
// === INIT =========

const init = () => {
    DOM.addBlockButtonContainers.forEach((container)=>{
        setupBlockSelection(container);
    })
    DOM.blockForm.addEventListener('submit',(event)=>{
        handleBlockSubmit(event);
    })
    DOM.contentForm.addEventListener('submit',(event)=>{
        handleContentSubmit(event)
    })
}

// === EVENTS & XHR =======
const handleContentSubmit = (event) => {
    event.preventDefault();

    const blockInstances = blockData.map(({ id, title, ...data }) => {
        return {
            ...data,
            output: JSON.stringify(data.output)
        };
    });

    console.log(blockInstances);
}

const handleBlockSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const output = Object.fromEntries(formData.entries());

    const data = {
        id: nextBlockId++,
        title: currentBlock.title,
        blockID: currentBlock.id,
        output
    }

    //if (!validate(data)) return;
    saveNewBlock(data);
}

// === FUNCTIONS ====
const addBlockVisualization = (data) => {
    const block = document.createElement('div');
    const blockTitle = document.createElement('h3');
    const blockOutput = document.createElement('div');
    const editButton = document.createElement('button');

    block.classList.add('blockVis');
    blockTitle.classList.add('title');
    blockOutput.classList.add('input');
    editButton.classList.add('edit');

    blockTitle.innerText = data.title;
    editButton.innerText = "edit";

    Object.entries(data.output).forEach(([key, value]) => {
            const output = `<strong>${key}</strong>: ${value}<br>`;
            blockOutput.innerHTML += output;
    });

    block.appendChild(blockTitle);
    block.appendChild(blockOutput);
    block.appendChild(editButton);
    DOM.blocksArea.appendChild(block);

    // editButton.addEventListener('click', () => {
    //     editInput(data.id);
    // });
}

const saveNewBlock = (data) => {
    blockData.push(data);
    addBlockVisualization(data);
    closeBlockForm();
}

const setupBlockSelection = (container) => {
    const button = container.querySelector('.addBlockButton');
    const dropdown = container.querySelector('.addBlockDropdown');
    const blocks = container.querySelectorAll('ul li.block');

    button.addEventListener('click',()=>{
        dropdown.classList.toggle('visible');
    })

    blocks.forEach((block)=>{
        block.addEventListener('click',()=>{
            const blockID = block.dataset.id;
            dropdown.classList.remove('visible');
            setupBlockForm(blockID);
        })
    })
}

const setupBlockForm = async (blockID) => {
    const response = await fetch(`/blocks/${blockID}`);
    const blockData = await response.json();

    if(blockData.success){
        const block = blockData.block;
        const inputFields = JSON.parse(block.input);
        
        DOM.blockFormTitle.innerText = block.title;
        DOM.blockFormWrapper.classList.add('visible');

        inputFields.forEach((input)=>{
            createInput(input);
        })

        currentBlock = block;

    } else {
        console.log('Something went wrong while trying to get the block. Please check the console for more informations');
    }
}

const closeBlockForm = () => {
    DOM.blockFormWrapper.classList.remove('visible');
    DOM.blockFormInput.innerHTML = "";
}

const createInput = (inputData) => {
    let newInput;

    switch(inputData.type) {
        case 'shortText':
            newInput = createShortText();
            break;
        case 'longText':
            newInput = createLongText();
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

const createShortText = () => {
    const newInput = document.createElement('input');
    newInput.type = "text";

    return newInput;
}

const createLongText = () => {
    const newInput = document.createElement('textarea');
    return newInput;
}



init();

})();