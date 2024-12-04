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
    let inputID = 0;
    let nextInputId = 1;
    let id;

    // === INIT =========

    const init = () => {
        id = getId();
        setupBlockForm();
        getInputData(id);
    }

    // === EVENTS =======
    const handleInputSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        if (!validate(data)) return;

        if (inputMethod === "create") {
            saveNewInput(data);
        } else if (inputMethod === "update") {
            updateInput(data);
        } else {
            console.log('No input method was given.');
        }
    }

    const handleBlockSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if(data.title===""){
            setFieldMessage('title','"Title" is required');
            return;
        }

        data.input = JSON.stringify(inputData);

        try {
            const response = await fetch(`/blocks/${id}`, {
                method: 'PUT',
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
    };

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
    const saveNewInput = (data) => {
        data.id = nextInputId++;
        inputData.push(data);
        addInputVisualization(data);
        toggleInputPopup();
        DOM.inputForm.reset();
    }

    const updateInput = (data) => {
        const index = inputData.findIndex(input => input.id === inputID);
        if (index !== -1 && inputID !== 0) {
            data.id = inputID;
            inputData[index] = data;
            updateInputVisualization(inputID, data);
            toggleInputPopup();
            DOM.inputForm.reset();
        } else {
            console.log('The data of the input field could not be found.');
        }
    }

    const nameExists = (name) => {
        return inputData.some(obj => obj.name === name);
    }

    const setFieldMessage = (field, message) => {
        const fieldMessageElement = DOM.fieldMessages[field];
        if (fieldMessageElement) {
            fieldMessageElement.innerText = message;
        } else {
            console.log(`Field "${field}" does not exist.`);
        }
    };


    const getId = () => {
        const url = window.location.pathname;
        const parts = url.split("/");
        return parts[parts.length - 1];
    }

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
                console.log('Something went wrong while trying to update the block. Please check the console for more information.');
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };    

    const setupBlockForm = () => {
        DOM.addInputButton.addEventListener('click', createInput);
        DOM.inputForm.addEventListener('submit', handleInputSubmit);
        DOM.blockForm.addEventListener('submit', handleBlockSubmit);
        DOM.inputFormFields.type.addEventListener('change', (event) => {
            handleTypeChange(event.target.value);
        });
    };

    const toggleInputPopup = () => {
        DOM.inputPopupWrapper.classList.toggle('visible');
    }

    const createInput = () => {
        inputMethod = "create";
        handleTypeChange(DOM.inputForm.type.value);
        toggleInputPopup();
    }

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

    const validate = (data, newName = false) => {
        let isValid = true;


        console.log(DOM.fieldMessages);
        for (const [name, element] of Object.entries(DOM.fieldMessages)) {
            console.log(element);
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
        if (inputMethod==="create" && nameExists(data.name)) {
            setFieldMessage('name',`Input with name "${data.name}" already exists`);
            isValid = false;
        }

        return isValid;
    }

    init();

})();