'use strict';

(() => {

// === DOM & VARS ===
const DOM = {};
DOM.entriesArea = document.querySelector('#entries');
DOM.selectEntryButton = document.querySelector('button#selectEntry');
DOM.contentSelection = document.querySelector('#contentSelection');
DOM.contentListEntries = document.querySelectorAll('ul#contentList li.content');
DOM.menuForm = document.querySelector('form#menuForm');

//IDs of the menu entries will be saved here
const entries = [];
// === INIT =========

const init = () => {
    if(DOM.contentSelection){
        setupcontentSelection();
    }

    if(DOM.menuForm){
        DOM.menuForm.addEventListener('click',(event)=>{
            handleFormSubmit(event);
        })
    }

}

// === EVENTS =======
// handles the event when the main form is submitted
const handleFormSubmit = (event) => {
    event.preventDefault();
}

// === FUNCTIONS ====
//sets up the popup for adding new menu entries
const setupcontentSelection = () => {
    DOM.selectEntryButton.addEventListener('click',toggleContentSelection);

    DOM.contentListEntries.forEach((content)=>{
        content.addEventListener('click',()=>{
            addEntry(content);
        });
    })
}

// toggles the entry selection popup
const toggleContentSelection = () => {
    DOM.contentSelection.classList.toggle('visible');
}

// adds a new entry to the entries array and creates a visualization
const addEntry = (content) => {
    const title = content.querySelector('.contentTitle').innerText;

    entries.push(content.dataset.id)
    createEntryVisualization(content.dataset.id,title);
}

// creates a new visualization of a menu entry
const createEntryVisualization = (id,title) => {
    const entry = document.createElement('div');
    const entryTitle = document.createElement('div');
    
    entryTitle.innerText = title;

    entry.appendChild(entryTitle);
    DOM.entriesArea.appendChild(entry);
}



init();

})();