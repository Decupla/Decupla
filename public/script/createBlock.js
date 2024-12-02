'use strict';

(() => {

// === DOM & VARS ===
const DOM = {};
DOM.blockForm = document.querySelector('form#createBlock');
DOM.addInputButton = document.querySelector('button#addInput');
DOM.inputPopupWrapper = document.querySelector('#inputPopupWrapper');
DOM.inputForm = document.querySelector('#addInputForm');
DOM.fieldsArea = document.querySelector('#inputFields');
DOM.errorMessage = document.querySelector('#message-error');
const inputData = [];

// === INIT =========

const init = () => {
    if(DOM.blockForm){
        setupBlockForm();
    }
}

// === EVENTS & XHR =======
const handleInputSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    inputData.push(data);
    event.target.reset();
    console.log(inputData);
    addInputVisualization(data);
    toggleInputPopup();
}

const handleBlockSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data['input'] = JSON.stringify(inputData);

    try {
        const response = await fetch('/blocks', {
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
        console.log(responseData);

        if (responseData.success) {
            window.location.replace(`/blocks/edit/${responseData.newID}?message=success`);
        } else {
            console.error('Something went wrong while trying to save the block');
            DOM.errorMessage.classList.add('visible');
        }
    } catch (error) {
        console.error('Something went wrong:', error);
        DOM.errorMessage.classList.add('visible');
    }
};


// === FUNCTIONS ====
const setupBlockForm = () => {
    DOM.addInputButton.addEventListener('click',toggleInputPopup);
    DOM.inputForm.addEventListener('submit',handleInputSubmit);
    DOM.blockForm.addEventListener('submit',handleBlockSubmit);
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