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
    let blockID = 0;
    let nextBlockId = 1;
    let blockMethod = "create";
    // === INIT =========

    const init = () => {
        DOM.addBlockButtonContainers.forEach((container) => {
            setupBlockSelection(container);
        })
        DOM.blockForm.addEventListener('submit', (event) => {
            handleBlockSubmit(event);
        })
        DOM.contentForm.addEventListener('submit', (event) => {
            handleContentSubmit(event)
        })
    }

    // === EVENTS & XHR =======
    const handleContentSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        let newID;

        // TODO: Fehlermeldung implementieren, falls kein Titel gesetzt ist
        if (!data.title) {
            alert('Title is required!');
            return;
        }

        try {
            const response = await fetch(`/content/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const responseData = await response.json();

            if (!responseData.success) {
                console.error('Error saving content');
                return;
            }

            newID = responseData.newID;

            const blockInstances = blockData.map(({ output, blockID }) => ({
                block_id: blockID,
                output: JSON.stringify(output),
                content_id: newID,
            }));

            for (const instance of blockInstances) {
                try {
                    const instanceResponse = await fetch(`/blocks/instances/`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(instance)
                    });

                    if (!instanceResponse.ok) {
                        throw new Error(`HTTP Error: ${instanceResponse.status}`);
                    }
                } catch (blockError) {
                    console.error('Error saving block instance:', blockError);
                }
            }

            window.location.replace(`/content/edit/${responseData.newID}`);

        } catch (error) {
            console.error('An error occurred:', error);
        }
    };


    const handleBlockSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const output = Object.fromEntries(formData.entries());

        const data = {
            title: currentBlock.title,
            blockID: currentBlock.id,
            output
        }

        //if (!validate(data)) return;
        if (blockMethod === "create") {
            saveNewBlock(data);
        } else if (blockMethod === "update") {
            updateBlock(data);
        } else {
            console.log('No block method was given.');
        }
    }

    // === FUNCTIONS ====
    const addBlockVisualization = (data) => {
        const block = document.createElement('div');
        const blockTitle = document.createElement('h3');
        const blockOutput = document.createElement('div');
        const editButton = document.createElement('button');

        block.classList.add('blockVis');
        blockTitle.classList.add('title');
        blockOutput.classList.add('output');
        editButton.classList.add('edit');

        blockTitle.innerText = data.title;
        editButton.innerText = "edit";

        block.dataset.id = data.id;

        Object.entries(data.output).forEach(([key, value]) => {
            const output = `<strong>${key}</strong>: ${value}<br>`;
            blockOutput.innerHTML += output;
        });

        block.appendChild(blockTitle);
        block.appendChild(blockOutput);
        block.appendChild(editButton);
        DOM.blocksArea.appendChild(block);

        editButton.addEventListener('click', () => {
            editBlock(data.id);
        });
    }

    const updateBlockVisualization = (id, data) => {
        const vis = document.querySelector(`.blockVis[data-id="${id}"]`);
        const blockTitle = vis.querySelector('h3');
        const blockOutput = vis.querySelector('.output');

        blockTitle.innerText = data.title;

        blockOutput.innerHTML = "";

        Object.entries(data.output).forEach(([key, value]) => {
            const output = `<strong>${key}</strong>: ${value}<br>`;
            blockOutput.innerHTML += output;
        });
    }

    const saveNewBlock = (data) => {
        data.id = nextBlockId++,
            blockData.push(data);
        addBlockVisualization(data);
        closeBlockForm();
    }

    const updateBlock = (data) => {
        const index = blockData.findIndex(block => block.id === blockID);
        if (index !== -1 && blockID !== 0) {
            data.id = blockID;
            blockData[index] = data;
            updateBlockVisualization(blockID, data);
            closeBlockForm();
        } else {
            console.log('The data of the input field could not be found.');
        }

    }

    const editBlock = (id) => {
        blockMethod = "update";
        blockID = id;

        const data = blockData.find(block => block.id === id) || null;
        if (data === null) {
            console.log('Input to edit could not be found.');
            return;
        }
        const setOutput = data.output;

        setupBlockForm(setOutput);
    }

    const setupBlockSelection = (container) => {
        const button = container.querySelector('.addBlockButton');
        const dropdown = container.querySelector('.addBlockDropdown');
        const blocks = container.querySelectorAll('ul li.block');

        button.addEventListener('click', () => {
            dropdown.classList.toggle('visible');
        })

        blocks.forEach((block) => {
            block.addEventListener('click', () => {
                blockMethod = "create";
                blockID = block.dataset.id;
                dropdown.classList.remove('visible');
                setupBlockForm();
            })
        })
    }

    const setupBlockForm = async (setOutput = {}) => {
        const response = await fetch(`/blocks/${blockID}`);
        const blockData = await response.json();

        if (blockData.success) {
            const block = blockData.block;
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

            currentBlock = block;

        } else {
            console.log('Something went wrong while trying to get the block. Please check the console for more informations');
        }
    }

    const closeBlockForm = () => {
        DOM.blockFormWrapper.classList.remove('visible');
        DOM.blockFormInput.innerHTML = "";
    }

    const createInput = (inputData, value = "") => {
        let newInput;

        switch (inputData.type) {
            case 'shortText':
                newInput = createShortText(value);
                break;
            case 'longText':
                newInput = createLongText(value);
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

    const createShortText = (value = null) => {
        const newInput = document.createElement('input');
        newInput.type = "text";
        if (value !== "") {
            newInput.value = value;
        }

        return newInput;
    }

    const createLongText = (value = null) => {
        const newInput = document.createElement('textarea');

        if (value !== "") {
            newInput.innerText = value;
        }

        return newInput;
    }



    init();

})();