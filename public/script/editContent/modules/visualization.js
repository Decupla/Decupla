import DOM from './dom';
import { blocksData, nextPriority } from './data';
import { editBlock, deleteBlock } from './blocks';
import { priorityUp, priorityDown } from './priority';
import { handleBlockSubmit } from './eventHandler';
import { setupBlockSelection } from './blockForm';

export const addBlockVisualization = (data) => {
    const container = document.createElement('div');
    const block = document.createElement('div');
    const titleContainer = document.createElement('div');
    const blockTitle = document.createElement('h3');
    const blockOutput = document.createElement('div');
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

    container.classList.add('block-vis-container');
    block.classList.add('block-vis');
    block.classList.add('visualization');
    titleContainer.classList.add('title-container');
    blockTitle.classList.add('title');
    blockOutput.classList.add('output');
    buttons.classList.add('buttons');
    priority.classList.add('priority');
    upButton.classList.add('up');
    downButton.classList.add('down');
    editButton.classList.add('edit');
    deleteButton.classList.add('delete');

    blockTitle.innerText = data.title;

    upButton.type="button";
    downButton.type="button";
    editButton.type = "button";
    deleteButton.type = "button";

    upIcon.src = "/images/icons/up.png";
    downIcon.src = "/images/icons/down.png";
    editIcon.src = "/images/icons/edit.png";
    editIcon.alt = "edit";
    deleteIcon.src = "/images/icons/delete_red.png";
    deleteIcon.alt = "delete";

    container.dataset.instance = data.instanceID;
    container.dataset.priority = data.priority;
    container.style.order = data.priority;

    Object.entries(data.output).forEach(([key, value]) => {
        const output = `<strong>${key}</strong>: ${value}<br>`;
        blockOutput.innerHTML += output;
    });

    upButton.appendChild(upIcon);
    downButton.appendChild(downIcon);
    editButton.appendChild(editIcon);
    deleteButton.appendChild(deleteIcon);

    priority.appendChild(upButton);
    priority.appendChild(downButton);

    buttons.appendChild(priority);
    buttons.appendChild(editButton);
    buttons.appendChild(deleteButton);

    titleContainer.appendChild(blockTitle);
    titleContainer.appendChild(buttons);

    block.appendChild(titleContainer);
    block.appendChild(blockOutput);

    const formContainerClone = DOM.blockFormContainer.cloneNode(true);
    const form = formContainerClone.querySelector('form');
    form.id = "";

    const addBlockContainerClone = DOM.addBlockButtonContainers[0].cloneNode(true);
    addBlockContainerClone.classList.add('add-in-between');
    const addBlockForm = addBlockContainerClone.querySelector('form');
    
    container.appendChild(block);
    container.appendChild(formContainerClone);
    container.appendChild(addBlockContainerClone);
    DOM.blocksArea.appendChild(container);


    upButton.addEventListener('click', () => priorityUp(data.instanceID));
    downButton.addEventListener('click', () => priorityDown(data.instanceID));
    editButton.addEventListener('click', () => editBlock(data.instanceID, data.blockID, container));
    deleteButton.addEventListener('click', () => deleteBlock(data.instanceID));
    form.addEventListener('submit', (event) => {
        handleBlockSubmit(event);
    });
    addBlockForm.addEventListener('submit', (event) => {
        const block = blocksData.find(block => block.instanceID === data.instanceID);
        const priority = block.priority + 1;
        handleBlockSubmit(event, priority)
    })

    setupBlockSelection(addBlockContainerClone);

    console.log('Priority: ',data.priority);
    console.log('Next Priority: ',nextPriority);
};

// updates a existing visualization
export const updateBlockVisualization = (instanceID, data) => {
    const vis = document.querySelector(`.block-vis-container[data-instance="${instanceID}"]`);
    const blockTitle = vis.querySelector('h3');
    const blockOutput = vis.querySelector('.output');

    blockTitle.innerText = data.title;

    blockOutput.innerHTML = "";

    Object.entries(data.output).forEach(([key, value]) => {
        const output = `<strong>${key}</strong>: ${value}<br>`;
        blockOutput.innerHTML += output;
    });
}

// deletes a existing visualization
export const deleteBlockVisualization = (instanceID) => {
    const vis = document.querySelector(`.block-vis-container[data-instance="${instanceID}"]`);
    vis.remove();
}

export const updateVisualizationPriority = (instanceID,priority) => {
    const vis = document.querySelector(`.block-vis-container[data-instance="${instanceID}"]`);
    vis.style.order = priority;
    vis.dataset.priority = priority;
}

export const setLastVisualisation = () => {
    const currentLastVis = document.querySelector(`.block-vis-container.last-vis`);
    if(currentLastVis){
        if(currentLastVis.dataset.priority===nextPriority-1){
            return;
        } else {
            currentLastVis.classList.remove('last-vis');
        }
    }

    const targetPriority = nextPriority - 1;
    const lastVis = document.querySelector(`.block-vis-container[data-priority="${targetPriority}"]`);

    if(lastVis){
        lastVis.classList.add('last-vis');
    }
}