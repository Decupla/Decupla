const DOM = {};
DOM.entriesArea = document.querySelector('#entries');
DOM.selectEntryButton = document.querySelector('button#select-entry');
DOM.contentSelection = document.querySelector('#content-selection');
DOM.contentListEntries = document.querySelectorAll('table#content-list tr.content');
DOM.menuForm = document.querySelector('form#menuForm');

DOM.fieldMessages = {}
DOM.fieldMessages.title = DOM.menuForm.querySelector('#message-title');
DOM.fieldMessages.key = DOM.menuForm.querySelector('#message-key');
DOM.fieldMessages.saved = DOM.menuForm.querySelector('#message-saved');

export default DOM;