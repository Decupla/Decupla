'use strict';

(() => {

    // === DOM & VARS ===
    const DOM = {};
    DOM.blockForm = document.querySelector('form#createBlock');
    DOM.addInputButton = document.querySelector('button#addInput');
    DOM.inputPopupWrapper = document.querySelector('#inputPopupWrapper');
    DOM.inputForm = document.querySelector('#addInputForm');
    DOM.fieldsArea = document.querySelector('#inputFields');
    DOM.message = document.querySelector('#message');
    DOM.nameError = document.querySelector('#name-error');

    DOM.inputFormFields = {};
    DOM.inputFormFields.type = DOM.inputForm.querySelector('select#type');
    DOM.inputFormFields.name = DOM.inputForm.querySelector('input#name');
    DOM.inputFormFields.label = DOM.inputForm.querySelector('input#label');
    DOM.inputFormFields.maxLength = DOM.inputForm.querySelector('input#maxLength');
    
    const inputData = [];
    let inputMethod = "create";
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

        if(inputMethod === "create"){
            saveNewInput(data);
        } else if (inputMethod === "update") {
            updateInput(data.name,data);
        } else {
            console.log('No input method was given.');
        }
    }

    const handleBlockSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data['input'] = JSON.stringify(inputData);

        try {
            const response = await fetch(`/blocks/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            const responseData = await response.json(); // Antwort als JSON parsen

            if (responseData.success) {
                showMessage('success','Block was successfully saved!')
            } else {
                console.error('Something went wrong while trying to save the block');
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };

    // === FUNCTIONS ====
    const saveNewInput = (data) => {
        if(nameExists(data.name)){
            DOM.nameError.innerText = `Input with name "${data.name}" already exists.`;
            DOM.nameError.classList = 'visible';
        } else {
            inputData.push(data);
            event.target.reset();
            addInputVisualization(data);
            toggleInputPopup();
            DOM.nameError.classList = '';
        }
    }

    const updateInput = (name,data) => {
        const index = inputData.findIndex(input => input.name === name);
        if (index !== -1) {
            inputData[index] = data;
        } else {
            console.log('The data of the input field could not be found.');
        }
    }

    const nameExists = (name) => {
        return inputData.some(obj => obj.name === name);
    }
    
    const showMessage= (type,message) => {
        DOM.message.classList = `alert alert-${type} visible`;
        DOM.message.innerText = message;
    }

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
    };

    const toggleInputPopup = () => {
        DOM.inputPopupWrapper.classList.toggle('visible');
    }

    const createInput = () => {
        inputMethod = "create";
        toggleInputPopup();
    }

    const editInput = (name) => {
        inputMethod = "update";

        const data = inputData.find(input => input.name === name) || null;
        console.log(data);
        if(data === null){
            console.log('Input to edit could not be found.');
            return;
        }
        console.log(data);
        console.log(data.maxLength);
        DOM.inputFormFields.name.value =  data.name;
        DOM.inputFormFields.label.value = data.label;
        if('maxLength' in data){
            DOM.inputFormFields.maxLength.value = data.maxLength;
        }

        toggleInputPopup();
    }

    const addInputVisualization = (data) => {
        const input = document.createElement('div');
        const inputTitle = document.createElement('h3');
        const inputParams = document.createElement('div');
        const editButton = document.createElement('button');

        input.classList.add('input');
        inputTitle.classList.add('label');
        inputParams.classList.add('params');
        editButton.classList.add('edit');

        inputTitle.innerText = data.label;
        editButton.innerText = "edit";

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'label') {
                const param = `<strong>${key}</strong>: ${value}<br>`;
                inputParams.innerHTML += param;
            }
        });

        input.appendChild(inputTitle);
        input.appendChild(inputParams);
        input.appendChild(editButton);
        DOM.fieldsArea.appendChild(input);
        
        editButton.addEventListener('click',()=>{
            editInput(data.name);
        });

    }

    init();

})();