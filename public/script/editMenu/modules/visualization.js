import DOM from './dom';
import { removeEntry } from './entries';
import {priorityUp, priorityDown} from './priority';

// creates a new visualization of a menu entry
export const createEntryVisualization = (data) => {
    const entry = document.createElement('div');
    const entryTitle = document.createElement('div');
    const buttonsContainer = document.createElement('div');
    const removeButton = document.createElement('button');
    const removeIcon = document.createElement('img');
    const priorityButtons = document.createElement('div');
    const upButton = document.createElement('button');
    const upIcon = document.createElement('img');
    const downButton = document.createElement('button');
    const downIcon = document.createElement('img');
    
    entryTitle.innerText = data.title;
    removeIcon.src = "/images/icons/delete_red.png";
    upIcon.src = "/images/icons/up.png";
    downIcon.src = "/images/icons/down.png";

    removeButton.classList.add('remove');
    buttonsContainer.classList.add('buttons');
    priorityButtons.classList.add('priority');

    removeButton.type = "button";
    upButton.type = "button";
    downButton.type = "button";

    entry.dataset.id = data.entryID;
    entry.classList.add('entryVis')
    entry.style.order = data.priority;

    removeButton.appendChild(removeIcon);
    upButton.appendChild(upIcon);
    downButton.appendChild(downIcon);

    priorityButtons.appendChild(upButton);
    priorityButtons.appendChild(downButton);

    buttonsContainer.appendChild(priorityButtons);
    buttonsContainer.appendChild(removeButton);

    entry.appendChild(entryTitle);
    entry.appendChild(buttonsContainer);
    DOM.entriesArea.appendChild(entry);

    upButton.addEventListener('click',()=>{
        priorityUp(data.entryID);
    })

    downButton.addEventListener('click',()=>{
        priorityDown(data.entryID);
    })
    
    removeButton.addEventListener('click',()=>{
        removeEntry(data.entryID);
    })
}

export const deleteInputVisualization = (id) => {
    const vis = document.querySelector(`.entryVis[data-id="${id}"]`);
    vis.remove();
}

export const updateVisualizationPriority = (id,priority) => {
    const vis = document.querySelector(`.entryVis[data-id="${id}"]`);
    vis.style.order = priority
}