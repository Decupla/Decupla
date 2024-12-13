import DOM from "./dom";
import { editInput, deleteInput } from "./input";

// adds the visualization of a input to the page
export const addInputVisualization = (data) => {
    const input = document.createElement('div');
    const inputTitle = document.createElement('h3');
    const inputParams = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    input.classList.add('inputVis');
    inputTitle.classList.add('label');
    inputParams.classList.add('params');
    editButton.classList.add('edit');
    deleteButton.classList.add('delete');

    inputTitle.innerText = data.label;
    editButton.innerText = "edit";
    deleteButton.innerText = "delete";

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
    input.appendChild(deleteButton);
    DOM.fieldsArea.appendChild(input);

    editButton.addEventListener('click', () => {
        editInput(data.id);
    });
    deleteButton.addEventListener('click', () => {
        deleteInput(data.id);
    })
}

// deletes a exisiting visualization of a input
export const deleteInputVisualization = (id) => {
    const vis = document.querySelector(`.inputVis[data-id="${id}"]`);
    vis.remove();
}

// updates a exisiting visualization of a input
export const updateInputVisualization = (id, data) => {
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