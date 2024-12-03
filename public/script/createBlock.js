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

    console.log(DOM.inputFormFields);

    const inputData = [];
    let inputMethod = "create";
    let inputID = 0;
    // let id;

    // === INIT =========

    const init = () => {
        // id = getId();
        setupBlockForm();
        // getInputData(id);
    }

    // === EVENTS =======
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

    const handleBlockSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.input = JSON.stringify(inputData);

        try {
            const response = await fetch(`/blocks/`, {
                method: 'POST',
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
                window.location.replace(`/blocks/edit/${responseData.newID}`);
            } else {
                console.error('Something went wrong while trying to save the block');
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };

    // === FUNCTIONS ====
    const saveNewInput = (data) => {
        if (nameExists(data.name)) {
            DOM.nameError.innerText = `Input with name "${data.name}" already exists.`;
            DOM.nameError.classList = 'visible';
        } else {
            data.id = inputData.length + 1;
            inputData.push(data);
            addInputVisualization(data);
            toggleInputPopup();
            DOM.inputForm.reset();
            DOM.nameError.classList = '';
        }
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

    // const getId = () => {
    //     const url = window.location.pathname;
    //     const parts = url.split("/");
    //     return parts[parts.length - 1];
    // }

    // const getInputData = async (id) => {
    //     try {
    //         const response = await fetch(`/blocks/${id}`);
    //         const blockData = await response.json();
    //         if(blockData.success===true){
    //             const input = JSON.parse(blockData.block.input);
    //             inputData.push(...input);

    //             inputData.forEach((data)=>{
    //                 addInputVisualization(data);
    //             });

    //         } else {
    //             // to do: fehlermeldung auf der Seite ausgebe
    //             console.log('Something went wrong while trying to update the block. Please check the console for more information.');
    //         }
    //     } catch (error) {
    //         console.error('Something went wrong:', error);
    //     }
    // };    

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
            if (key !== 'label' && key !== 'id') {
                const param = `<strong>${key}</strong>: ${value}<br>`;
                inputParams.innerHTML += param;
            }
        });
    }

    const setVisible = (fields) => {
        for (const [name, element] of Object.entries(DOM.inputFormFields)) {
            const parent = element.parentElement;
            if (fields.includes(name)&&!parent.classList.contains('visible')) {
                    parent.classList.add('visible');
            } else if (!fields.includes(name)&&parent.classList.contains('visible')) {
                parent.classList.remove('visible');
            }
        }
    }

    setVisible(['name', 'label', 'type']);

    init();

})();