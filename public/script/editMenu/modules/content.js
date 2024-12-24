import { entries } from "./data";
import DOM from './dom';
import { createEntryVisualization } from "./visualization";

//sets up the popup for adding new menu entries
export const setupcontentSelection = () => {
    DOM.selectEntryButton.addEventListener('click',toggleContentSelection);

    DOM.contentListEntries.forEach((content)=>{
        content.addEventListener('click',()=>{
            addEntry(content);
        });
    })
}

// toggles the entry selection popup
export const toggleContentSelection = () => {
    DOM.contentSelection.classList.toggle('visible');
}

// adds a new entry to the entries array and creates a visualization
export const addEntry = (content) => {
    const title = content.querySelector('.contentTitle').innerText;

    entries.push(content.dataset.id)
    createEntryVisualization(content.dataset.id,title);
}