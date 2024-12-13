import DOM from './dom';
import { editBlock, deleteBlock } from './blocks';

export const addBlockVisualization = (data) => {
    const block = document.createElement('div');
    const blockTitle = document.createElement('h3');
    const blockOutput = document.createElement('div');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    block.classList.add('blockVis');
    blockTitle.classList.add('title');
    blockOutput.classList.add('output');
    editButton.classList.add('edit');
    deleteButton.classList.add('delete');

    blockTitle.innerText = data.title;
    editButton.innerText = "edit";
    deleteButton.innerText = "delete";

    block.dataset.instance = data.instanceID;

    Object.entries(data.output).forEach(([key, value]) => {
        const output = `<strong>${key}</strong>: ${value}<br>`;
        blockOutput.innerHTML += output;
    });

    block.appendChild(blockTitle);
    block.appendChild(blockOutput);
    block.appendChild(editButton);
    block.appendChild(deleteButton);
    DOM.blocksArea.appendChild(block);

    editButton.addEventListener('click', () => editBlock(data.instanceID, data.blockID));
    deleteButton.addEventListener('click', () => deleteBlock(data.instanceID));
};

// updates a existing visualization
export const updateBlockVisualization = (instanceID, data) => {
    const vis = document.querySelector(`.blockVis[data-instance="${instanceID}"]`);
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
    const vis = document.querySelector(`.blockVis[data-instance="${instanceID}"]`);
    vis.remove();
}