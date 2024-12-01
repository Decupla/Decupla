'use strict';

(() => {

// === DOM & VARS ===
const DOM = {};
DOM.blockForm = document.querySelector('form#createBlock');
DOM.addInputButton = document.querySelector('button#addInput');
DOM.inputPopupWrapper = document.querySelector('#inputPopupWrapper');
DOM.inputForm = document.querySelector('#addInputForm');
DOM.fieldsArea = document.querySelector('#inputFields');
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

const handleBlockSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data['input'] = JSON.stringify(inputData);
    console.log(data);
    console.log(JSON.stringify(data));
    fetch('/blocks',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(()=>{console.log('erfolg')})
    .catch((error)=>{console.log('error: ' + error)});
}

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