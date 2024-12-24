import DOM from './dom';

// creates a new visualization of a menu entry
export const createEntryVisualization = (id,title) => {
    const entry = document.createElement('div');
    const entryTitle = document.createElement('div');
    
    entryTitle.innerText = title;

    entry.appendChild(entryTitle);
    DOM.entriesArea.appendChild(entry);
}
