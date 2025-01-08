import DOM from "./dom";
import { handleInputSubmit, handleTypeChange } from "./eventHandler";
import { editInput, deleteInput, closeInputCreation } from "./input";
import { priorityUp, priorityDown } from "./priority";

// adds the visualization of a input to the page
export const addInputVisualization = (data) => {
    const container = document.createElement('div');
    const input = document.createElement('div');
    const titleContainer = document.createElement('div');
    const inputTitle = document.createElement('h3');
    const inputParams = document.createElement('div');
    const buttons = document.createElement('div');
    const priority = document.createElement('div');
    const upButton = document.createElement('button');
    const downButton = document.createElement('button');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const upIcon = document.createElement('img');
    const downIcon = document.createElement('img');
    const editIcon = document.createElement('img');
    const deleteIcon = document.createElement('img');

    editIcon.src = "/images/icons/edit.png";
    editIcon.alt = "edit";
    deleteIcon.src = "/images/icons/delete_red.png";
    deleteIcon.alt = "delete";


    upButton.type = "button";
    downButton.type = "button";
    editButton.type = "button";
    deleteButton.type = "button";

    container.classList.add('input-vis-container')
    input.classList.add('input-vis');
    input.classList.add('visualization');
    titleContainer.classList.add('title-container');
    inputTitle.classList.add('label');
    inputParams.classList.add('params');
    buttons.classList.add('buttons');
    priority.classList.add('priority');
    upButton.classList.add('up');
    downButton.classList.add('down');
    editButton.classList.add('edit');
    deleteButton.classList.add('delete');

    inputTitle.innerText = data.params.label;

    upButton.type = "button";
    downButton.type = "button";
    editButton.type = "button";
    deleteButton.type = "button";

    upIcon.src = "/images/icons/up.png";
    upIcon.alt = "Priority up";
    downIcon.src = "/images/icons/down.png";
    downIcon.alt = "Priority down";
    editIcon.src = "/images/icons/edit.png";
    editIcon.alt = "edit";
    deleteIcon.src = "/images/icons/delete_red.png";
    deleteIcon.alt = "delete";


    container.dataset.id = data.id;
    container.dataset.priority = data.priority;
    container.style.order = data.priority;

    Object.entries(data.params).forEach(([key, value]) => {
        if (key !== 'label' && key !== 'id' && value !== "") {
            const param = `<strong>${key}</strong>: ${value}<br>`;
            inputParams.innerHTML += param;
        }
    });

    upButton.appendChild(upIcon);
    downButton.appendChild(downIcon);
    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);

    priority.appendChild(upButton);
    priority.appendChild(downButton);

    buttons.appendChild(priority);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton)

    titleContainer.appendChild(inputTitle);
    titleContainer.appendChild(buttons);

    input.appendChild(titleContainer);
    input.appendChild(inputParams);

    const inputCreationClone = DOM.inputCreation.cloneNode(true);
    const inputForm = inputCreationClone.querySelector('form');
    const typeSelect = inputForm.querySelector('select[name="type"]');
    const close = inputCreationClone.querySelector('.input-creation-close');

    container.appendChild(input);
    container.appendChild(inputCreationClone);

    DOM.fieldsArea.appendChild(container);

    close.addEventListener('click', () => closeInputCreation());
    upButton.addEventListener('click', () => priorityUp(data.id));
    downButton.addEventListener('click', () => priorityDown(data.id));
    editButton.addEventListener('click', () =>  editInput(data.id, container));
    deleteButton.addEventListener('click', () => deleteInput(data.id));
    typeSelect.addEventListener('change', (event) => {
        handleTypeChange(event.target.value, container);
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

export const updateVisualizationPriority = (id, priority) => {
    const vis = document.querySelector(`.input-vis-container[data-id="${id}"]`);
    if (vis) {
        vis.style.order = priority;
        vis.dataset.priority = priority;
    }

}