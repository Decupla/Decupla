import DOM from "./dom";
import { handleInputSubmit, handleTypeChange } from "./eventHandler";
import { editInput, deleteInput } from "./input";

// adds the visualization of a input to the page
export const addInputVisualization = (data) => {
    const container = document.createElement('div');
    const input = document.createElement('div');
    const titleContainer = document.createElement('div');
    const inputTitle = document.createElement('h3');
    const inputParams = document.createElement('div');
    const buttons = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const editIcon = document.createElement('img');
    const deleteIcon = document.createElement('img');

    editIcon.src = "/images/icons/edit.png";
    editIcon.alt = "edit";
    deleteIcon.src = "/images/icons/delete_red.png";
    deleteIcon.alt = "delete";

    container.classList.add('input-vis-container')
    input.classList.add('input-vis');
    input.classList.add('visualization');
    titleContainer.classList.add('title-container');
    inputTitle.classList.add('label');
    inputParams.classList.add('params');
    buttons.classList.add('buttons');
    editButton.classList.add('edit');
    deleteButton.classList.add('delete');

    inputTitle.innerText = data.params.label;

    container.dataset.id = data.id;
    container.dataset.priority = data.priority;
    container.style.order = data.priority;

    Object.entries(data.params).forEach(([key, value]) => {
        if (key !== 'label' && key !== 'id' && value !== "") {
            const param = `<strong>${key}</strong>: ${value}<br>`;
            inputParams.innerHTML += param;
        }
    });

    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton)

    titleContainer.appendChild(inputTitle);
    titleContainer.appendChild(buttons);

    input.appendChild(titleContainer);
    input.appendChild(inputParams);

    const inputCreationClone = DOM.inputCreation.cloneNode(true);
    const inputForm = inputCreationClone.querySelector('form');
    const typeSelect = inputForm.querySelector('select[name="type"]');

    container.appendChild(input);
    container.appendChild(inputCreationClone);

    DOM.fieldsArea.appendChild(container);

    editButton.addEventListener('click', () => {
        editInput(data.id,container);
    });
    deleteButton.addEventListener('click', () => {
        deleteInput(data.id);
    })
    typeSelect.addEventListener('change', (event) => {
        handleTypeChange(event.target.value,container);
    })
    inputForm.addEventListener('submit', (event) => {
        handleInputSubmit(event);
    })
}

// deletes a exisiting visualization of a input
export const deleteInputVisualization = (id) => {
    const vis = document.querySelector(`.input-vis-container[data-id="${id}"]`);
    vis.remove();
}

// updates a exisiting visualization of a input
export const updateInputVisualization = (id, data) => {
    const vis = document.querySelector(`.input-vis-container[data-id="${id}"]`);
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