import DOM from './dom';
import { addEntry } from './entries';

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