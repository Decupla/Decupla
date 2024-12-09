'use strict';

(() => {

    // === DOM & VARS ===
    const DOM = {};
    DOM.blockForm = document.querySelector('form#createBlock');
    DOM.addInputButton = document.querySelector('button#addInput');
    DOM.inputPopupWrapper = document.querySelector('#inputPopupWrapper');
    DOM.inputForm = document.querySelector('#addInputForm');
    DOM.fieldsArea = document.querySelector('#inputFields');
    DOM.messageSuccess = document.querySelector('#message-success');

    DOM.inputFormFields = {};
    DOM.inputFormFields.type = DOM.inputForm.querySelector('select#type');
    DOM.inputFormFields.name = DOM.inputForm.querySelector('input#name');
    DOM.inputFormFields.label = DOM.inputForm.querySelector('input#label');
    DOM.inputFormFields.maxLength = DOM.inputForm.querySelector('input#maxLength');

    DOM.fieldMessages = {};
    DOM.fieldMessages.title = DOM.blockForm.querySelector('#message-title');
    DOM.fieldMessages.type = DOM.inputForm.querySelector('#message-type');
    DOM.fieldMessages.name = DOM.inputForm.querySelector('#message-name');
    DOM.fieldMessages.label = DOM.inputForm.querySelector('#message-label');
    DOM.fieldMessages.maxLength = DOM.inputForm.querySelector('#message-maxLength');

    const inputData = [];

    let inputMethod = "create";
    // the id of the input in the inputData array we are editing at the moment
    let inputID;
    // used for the inputData array. Basically the better index. Not used for the database!
    let nextInputId = 1;
    // tells if we are editing a existing block
    let blocksExists;
    // if we are editing a existing block, the id of the block will be stored here
    let blockID;

    // === INIT =========

    const init = async () => {
        const path = window.location.pathname;
        blocksExists = checkIfExists(path);
    
        if (blocksExists) {
            blockID = getId(path);
            await getInputData(blockID);
    
            if (inputData.length > 0) {
                nextInputId = inputData[inputData.length - 1].id + 1;
            }
        }
    
        setupBlockForm();
    };
    

    // === EVENTS & XHR =======
    //handles the event when the main form (block) is submitted
    const handleBlockSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if(data.title===""){
            setFieldMessage('title','"Title" is required');
            return;
        }

        data.input = JSON.stringify(inputData);

        let method = "POST"
        let url = "/blocks";

        // if we are editing a existing block, we need a different method and url
        if(blocksExists){
            method = "PUT";
            url = `/blocks/${blockID}`;
        }

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const responseData = await response.json(); // Antwort als JSON parsen

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            if (responseData.success) {
                DOM.messageSuccess.classList.add('visible');
            } else {
                console.error('Something went wrong while trying to save the block');
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    }

    // called when the input form is submitted
    const handleInputSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if (inputMethod === "create") {
            saveNewInput(data);
        } else if (inputMethod === "update") {
            updateInput(data);
        } else {
            console.log('No input method was given.');
        }
    }

    // called when the type of a input is changed while creating / editing input
    const handleTypeChange = (type) => {
        switch (type) {
            case 'shortText':
                setVisible(['name', 'label', 'type', 'maxLength']);
                break;
            case 'LongText':
                setVisible(['name', 'label', 'type']);
                break;
            default:
                setVisible(['name', 'label', 'type']);
        }
    }

    // === FUNCTIONS ====
    // saves new input to the inputData array
    const saveNewInput = (data) => {
        if (!validate(data, true)) return;
        data.id = nextInputId++;
        inputData.push(data);
        addInputVisualization(data);
        toggleInputPopup();
        DOM.inputForm.reset();
    };

    const updateInput = (data) => {
        const index = inputData.findIndex(input => input.id === inputID);
        if (index === -1 || inputID === 0) {
            console.error('The data of the input field could not be found.');
            return;
        }
    
        if (inputData[index].name !== data.name) {
            if (!validate(data, true)) return;
        } else if (!validate(data)) {
            return;
        }
    
        data.id = inputID;
        inputData[index] = data;
        updateInputVisualization(inputID, data);
        toggleInputPopup();
        DOM.inputForm.reset();
    };

    const setupBlockForm = () => {
        // sets all event listeners needed to interact with the block creation
        DOM.addInputButton.addEventListener('click', createInput);
        DOM.inputForm.addEventListener('submit', handleInputSubmit);
        DOM.blockForm.addEventListener('submit', handleBlockSubmit);
        DOM.inputFormFields.type.addEventListener('change', (event) => {
            handleTypeChange(event.target.value);
        });
    };


    // get the existing input fields of the block
    const getInputData = async (id) => {
        try {
            const response = await fetch(`/blocks/${id}`);
            const blockData = await response.json();
            if(blockData.success===true){
                const input = JSON.parse(blockData.block.input);
                inputData.push(...input);

                inputData.forEach((data)=>{
                    addInputVisualization(data);
                });

            } else {
                // to do: fehlermeldung auf der Seite ausgebe
                console.log(blockData.message);
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };    

    // opens the input form to create a new input
    const createInput = () => {
        inputMethod = "create";
        handleTypeChange(DOM.inputForm.type.value);
        toggleInputPopup();
    }

    // opens the input form to edit a existing input form the inputData array
    const editInput = (id) => {
        inputMethod = "update";

        const data = inputData.find(input => input.id === id) || null;
        if (data === null) {
            console.log('Input to edit could not be found.');
            return;
        }
        DOM.inputFormFields.type.value = data.type;
        DOM.inputFormFields.name.value = data.name;
        DOM.inputFormFields.label.value = data.label;

        if ('maxLength' in data) {
            DOM.inputFormFields.maxLength.value = data.maxLength;
        }

        inputID = id;
        handleTypeChange(data.type);
        toggleInputPopup();
    }

    // sets which settings should be visible in the input creation, hides all other settings
    const setVisible = (fields) => {
        for (const [name, element] of Object.entries(DOM.inputFormFields)) {
            const parent = element.parentElement;
            if (fields.includes(name) && !parent.classList.contains('visible')) {
                parent.classList.add('visible');
            } else if (!fields.includes(name) && parent.classList.contains('visible')) {
                parent.classList.remove('visible');
            }
        }
    }

    // adds the visualization of a input to the page
    const addInputVisualization = (data) => {
        const input = document.createElement('div');
        const inputTitle = document.createElement('h3');
        const inputParams = document.createElement('div');
        const editButton = document.createElement('button');

        input.classList.add('inputVis');
        inputTitle.classList.add('label');
        inputParams.classList.add('params');
        editButton.classList.add('edit');

        inputTitle.innerText = data.label;
        editButton.innerText = "edit";

        input.dataset.id = data.id;

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'label' && key !== 'id' && value !== "") {
                const param = `<strong>${key}</strong>: ${value}<br>`;
                inputParams.innerHTML += param;
            }
        });

        input.appendChild(inputTitle);
        input.appendChild(inputParams);
        input.appendChild(editButton);
        DOM.fieldsArea.appendChild(input);

        editButton.addEventListener('click', () => {
            editInput(data.id);
        });
    }

    // updates a exisiting visualization of a input
    const updateInputVisualization = (id, data) => {
        const vis = document.querySelector(`.inputVis[data-id="${id}"]`);
        const inputTitle = vis.querySelector('h3');
        const inputParams = vis.querySelector('.params');

        inputTitle.innerText = data.label;


        inputParams.innerHTML = "";

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'label' && key !== 'id' && value !== "") {
                const param = `<strong>${key}</strong>: ${value}<br>`;
                inputParams.innerHTML += param;
            }
        });
    }

    const toggleInputPopup = () => {
        DOM.inputPopupWrapper.classList.toggle('visible');
    }

    // sets a message for a specific field in the block or input form
    const setFieldMessage = (field, message) => {
        const fieldMessageElement = DOM.fieldMessages[field];
        if (fieldMessageElement) {
            fieldMessageElement.innerText = message;
        } else {
            console.log(`Field "${field}" does not exist.`);
        }
    };

    //check if the name of a input already exists
    const nameExists = (name) => {
        return inputData.some(obj => obj.name === name);
    }

    //validate input data
    const validate = (data, newName = false) => {
        let isValid = true;
    
        for (const [name, element] of Object.entries(DOM.fieldMessages)) {
            element.innerText = "";
        }
    
        if (!data.name) {
            setFieldMessage('name', '"name" is required.');
            isValid = false;
        }
        if (!data.label) {
            setFieldMessage('label', '"label" is required.');
            isValid = false;
        }
        if (newName && nameExists(data.name)) {
            setFieldMessage('name', `Input with name "${data.name}" already exists`);
            isValid = false;
        }
    
        return isValid;
    };


    // checks if we are creating a new block or editing a existing block
    const checkIfExists = (path) => {
        const regex = /^\/blocks\/edit\/(\d+)$/;
        return path.match(regex);
    }

    const getId = (path) => {
        const parts = path.split("/");
        const id = parts[parts.length - 1];
        return parseInt(id);
    }

    init();

})();