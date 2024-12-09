'use strict';

(() => {

    // === DOM & VARS ===
    const DOM = {};
    DOM.contentForm = document.querySelector('form#contentForm');
    DOM.blocksArea = document.querySelector('#blocks');
    DOM.titleMessage = document.querySelector('#message-title');
    DOM.savedMessage = document.querySelector('#message-saved');
    DOM.addBlockButtonContainers = document.querySelectorAll('.addBlockContainer');
    DOM.blockFormWrapper = document.querySelector('#blockFormWrapper');
    DOM.blockFormTitle = DOM.blockFormWrapper.querySelector('#blockFormTitle');
    DOM.blockForm = DOM.blockFormWrapper.querySelector('form#blockForm');
    DOM.blockFormInput = DOM.blockForm.querySelector('#blockFormInput');

    let blocksData = [];

    // if we are deleting existing block instances, the database ids of the blocks will be saved here 
    let deletedBlocks = [];

    // saves the data of the current block which is used to create or edit a instance 
    let currentBlock = {};

    // the ID of the block instance currently being edited. Used for updating the instance. Not used for the database!
    let currentInstanceID = 0;

    // used for the blocksData array. Basically the better index. Not used for the database!
    let nextInstanceId = 1;

    let blockMethod = "create";

    let contentExists;
    // if content already exist the id will be stored here
    let contentID;

    // === INIT =========

    const init = () => {
        const path = window.location.pathname;
        contentExists = checkIfExists(path);

        if (contentExists) {
            contentID = getId(path);
            getBlocks(contentID);
        }

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
    //handles the event when the main form (content) is submitted
    const handleContentSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        // the data from the form. No blocks jet.
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        // show a error message if no title is set
        if (!data.title) {
            DOM.titleMessage.classList.add('visible');
            return;
        }

        try {
            let method = "POST";
            let contentUrl = "/content/";

            // if we are editing existing content, we need a different method and url
            if (contentExists) {
                method = "PUT";
                contentUrl = `/content/${contentID}`;
            }

            // we will save the basic data of the content first (title and status)
            const response = await fetch(contentUrl, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            // check if saving the basic data was successfull
            if (!responseData.success) {
                console.error(responseData.message);
                return;
            } else if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            // if we are creating new content, we need the id of the new saved content 
            let newID;
            if (!contentExists) {
                if ('newID' in responseData) {
                    newID = responseData.newID;
                }
            }

            // now we need to go through our block instances and save each one to the database
            for (const instance of blocksData) {
                const instanceData = {
                    blockID: instance.blockID,
                    output: JSON.stringify(instance.output)
                };

                // if we are creating new content use the id of the new saved content, otherwise use the global contentID
                if (!contentExists) {
                    instanceData.contentID = newID;
                } else {
                    instanceData.contentID = contentID;
                }

                let blockMethod = "POST"
                let blockUrl = "/blocks/instances/"
                //if the instance has the property 'databaseID' we need to update it in the database
                if ('databaseID' in instance) {
                    blockMethod = "PUT";
                    blockUrl = `/blocks/instances/${instance.databaseID}`;
                }

                // fetch and await response
                const blockResponse = await fetch(blockUrl, {
                    method: blockMethod,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(instanceData)
                });

                const blockResponseData = await blockResponse.json();

                // check if saving the block data was successfull
                if (!blockResponseData.success) {
                    console.error(blockResponseData.message);
                    return;
                } else if (!blockResponse.ok) {
                    throw new Error(`HTTP Error: ${blockResponse.status}`);
                }

            }

            if (contentExists && deletedBlocks.length > 0) {
                for (const id of deletedBlocks) {
                    const deletedResponse = await fetch(`/blocks/instances/${id}`, {
                        method: 'delete'
                    })

                    const deletedResponseData = await deletedResponse.json();

                    // check if deleting the block data was successfull
                    if (!deletedResponseData.success) {
                        console.error(deletedResponseData.message);
                        return;
                    } else if (!deletedResponse.ok) {
                        throw new Error(`HTTP Error: ${deletedResponse.status}`);
                    }
                }
            }

            DOM.savedMessage.classList.add('visible');
            // if we created new content we are now editing it after the first save
            if (!contentExists) {
                contentExists = true;
                contentID = newID;
                // reload the blocks after saving so we get the database id for each new instance
                reloadBlocks(newID);
            } else {
                reloadBlocks(contentID);
            }

        } catch (error) {
            console.error('An error occurred:', error);
        }

    }

    //handles the event when a block instance is submitted 
    const handleBlockSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        // the data of the block form. Only the output, no more informations about the block
        const output = Object.fromEntries(formData.entries());

        // the data we want to be saved in the blocksData Array
        const data = {
            title: currentBlock.title,
            blockID: currentBlock.id,
            output
        }

        if (blockMethod === "create") {
            saveNewBlock(data);
        } else if (blockMethod === "update") {
            updateBlock(data);
        } else {
            console.log('No block method was given.');
        }
    }


    // === FUNCTIONS ====
    // saves a new block to the blockData array and creates new visualization
    const saveNewBlock = (data) => {
        // adds the id of the instance for the blockData Array. NOT the id for the database
        data.instanceID = nextInstanceId++;

        blocksData.push(data);
        addBlockVisualization(data);

        closeBlockForm();
    }


    // updating a existing block instance in the blockData array and update the visualization
    const updateBlock = (data) => {

        // get the index of the block instance in the blockData array
        const index = blocksData.findIndex(block => block.instanceID === currentInstanceID);

        if (index !== -1 && currentInstanceID !== 0) {
            // the only thing that can change in a existing instance is the output. That way we can keep database id etc.
            blocksData[index].output = data.output;

            // we also need to update the visualization
            updateBlockVisualization(currentInstanceID, data);

            closeBlockForm();
        }

    }


    // checks if we are creating new content or editing existing content
    const checkIfExists = (path) => {
        const regex = /^\/content\/edit\/(\d+)$/;
        return path.match(regex);
    }

    const getId = (path) => {
        const parts = path.split("/");
        const id = parts[parts.length - 1];
        return parseInt(id);
    }

    // if content already exists and has blocks this will load in the block instances
    const getBlocks = async (id) => {
        try {
            const response = await fetch(`/content/${id}/blocks`);
            const data = await response.json();

            if (data.success === true) {
                const blocks = data.blocks;

                const blocksParsed = blocks.map(({ id, ...block }) => ({
                    // this is the id the block instances has in the blocksData Array, used for frontend purposes
                    instanceID: nextInstanceId++,
                    // this is the id the block instance has in the database
                    databaseID: id,
                    ...block,
                    output: JSON.parse(block.output),
                }));

                blocksData.push(...blocksParsed);

                blocksData.forEach((data) => {
                    addBlockVisualization(data);
                });


            } else {
                // to do: fehlermeldung auf der Seite ausgebe
                console.log(data.message);
            }

        } catch (error) {
            console.error('Something went wrong:', error);
        }
    }

    // reloads the blockData array and also reloads the block visualizations
    const reloadBlocks = async (id) => {
        blocksData = [];
        deletedBlocks = [];
        DOM.blocksArea.innerHTML = "";
        getBlocks(id);
    }


    // sets up the block selection dropdown
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
                dropdown.classList.remove('visible');
                setupBlockForm(block.dataset.id);
            })
        })
    }


    // loads the Form / Popup for creating or editing a block instance
    const setupBlockForm = async (blockID, setOutput = {}) => {
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

            currentBlock = block;
        }
    }

    const closeBlockForm = () => {
        DOM.blockFormWrapper.classList.remove('visible');
        DOM.blockFormInput.innerHTML = "";
    }

    //loads the block form for editing a existing block instance
    const editBlock = (instanceID, blockID) => {
        blockMethod = "update";

        // selects the block from the blockData Array. ID is passed as a parameter when setting up the event listener for the edit button
        const data = blocksData.find(block => block.instanceID === instanceID) || null;
        // note: if we are working on a existing content, property databaseID whill exist at this point. If we are working on new content it wont

        // returns if for some reason the data could not be found inside the array
        if (data === null) {
            console.log('Input to edit could not be found.');
            return;
        }

        // the output set for this instance
        const setOutput = data.output;

        // set global currentInstanceID, so we now which instance form the array we want to update
        currentInstanceID = instanceID;

        // sets up the block Form with the existing output
        setupBlockForm(blockID, setOutput);
    }

    // adds a block instance to the deletedBlocks array and removes the visualization
    const deleteBlock = (instanceID) => {

        // get the index of the block instance in the blocksData array
        const index = blocksData.findIndex(block => block.instanceID === instanceID);

        if (index !== -1) {

            // if we are editing existing content, we need to save the database id of the block instance, so we can delete it from the database later
            if (contentExists) {
                deletedBlocks.push(blocksData[index].databaseID);
            }

            // remove instance from the array
            blocksData.splice(index, 1);

            console.log(blocksData);
            console.log(deletedBlocks);

            // we also need to remove the visualization
            deleteBlockVisualization(instanceID);

        }
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

    // adds the visualization of a block to the page
    const addBlockVisualization = (data) => {
        const block = document.createElement('div');
        const blockTitle = document.createElement('h3');
        const blockOutput = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        block.classList.add('blockVis');
        blockTitle.classList.add('title');
        blockOutput.classList.add('output');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        blockTitle.innerText = data.title;
        editButton.innerText = "edit";
        deleteButton.innerText = "delete";

        block.dataset.instance = data.instanceID;

        Object.entries(data.output).forEach(([key, value]) => {
            const output = `<strong>${key}</strong>: ${value}<br>`;
            blockOutput.innerHTML += output;
        });

        block.appendChild(blockTitle);
        block.appendChild(blockOutput);
        block.appendChild(editButton);
        block.appendChild(deleteButton);
        DOM.blocksArea.appendChild(block);

        editButton.addEventListener('click', () => {
            editBlock(data.instanceID, data.blockID);
        });

        deleteButton.addEventListener('click', () => {
            deleteBlock(data.instanceID);
        })
    }

    // updates a existing visualization
    const updateBlockVisualization = (instanceID, data) => {
        const vis = document.querySelector(`.blockVis[data-instance="${instanceID}"]`);
        const blockTitle = vis.querySelector('h3');
        const blockOutput = vis.querySelector('.output');

        blockTitle.innerText = data.title;

        blockOutput.innerHTML = "";

        Object.entries(data.output).forEach(([key, value]) => {
            const output = `<strong>${key}</strong>: ${value}<br>`;
            blockOutput.innerHTML += output;
        });
    }

    // deletes a existing visualization
    const deleteBlockVisualization = (instanceID) => {
        const vis = document.querySelector(`.blockVis[data-instance="${instanceID}"]`);
        vis.remove();
    }


    init();

})();