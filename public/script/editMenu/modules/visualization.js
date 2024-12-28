import DOM from './dom';
import { removeEntry } from './entries';

// creates a new visualization of a menu entry
export const createEntryVisualization = (data) => {
    const entry = document.createElement('div');
    const entryTitle = document.createElement('div');
    const removeButton = document.createElement('button');
    
    entryTitle.innerText = data.title;
    removeButton.innerText = 'remove';

    entry.dataset.id = data.entryID;
    entry.classList.add('entryVis')
    entry.style.order = data.priority;

    entry.appendChild(entryTitle);
    entry.appendChild(removeButton);
    DOM.entriesArea.appendChild(entry);

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