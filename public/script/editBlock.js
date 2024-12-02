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
    const inputData = [];
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
        inputData.push(data);
        event.target.reset();
        addInputVisualization(data);
        toggleInputPopup();
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
                // to do: fehlermeldung auf der Seite ausgeben?
                console.log('Something went wrong while trying to update the block. Please check the console for more information.');
            }
        } catch (error) {
            console.error('Something went wrong:', error);
        }
    };    

    const setupBlockForm = () => {
        DOM.addInputButton.addEventListener('click', toggleInputPopup);
        DOM.inputForm.addEventListener('submit', handleInputSubmit);
        DOM.blockForm.addEventListener('submit', handleBlockSubmit);
    };

    const toggleInputPopup = () => {
        DOM.inputPopupWrapper.classList.toggle('visible');
    }

    const addInputVisualization = (data) => {
        const input = document.createElement('div');
        const inputTitle = document.createElement('h3');
        const inputParams = document.createElement('div');

        input.classList.add('input');
        inputTitle.classList.add('label');
        inputParams.classList.add('params');

        inputTitle.innerText = data.label;

        Object.entries(data).forEach(([key, value]) => {
            if (key !== 'label') {
                const param = `<strong>${key}</strong>: ${value}<br>`;
                inputParams.innerHTML += param;
            }
        });

        input.appendChild(inputTitle);
        input.appendChild(inputParams);
        DOM.fieldsArea.appendChild(input);

    }

    init();

})();