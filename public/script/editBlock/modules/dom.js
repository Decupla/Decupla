const DOM = {};
DOM.blockForm = document.querySelector('form#createBlock');
DOM.addInputButton = document.querySelector('button#addInput');
DOM.inputPopupWrapper = document.querySelector('#inputPopupWrapper');
DOM.inputForm = document.querySelector('#addInputForm');
DOM.fieldsArea = document.querySelector('#inputFields');
DOM.messageSuccess = document.querySelector('#message-success');

DOM.inputFormFields = {};
DOM.inputFormFields.type = DOM.inputForm.querySelector('select#type');
DOM.inputFormFields.name = DOM.inputForm.querySelector('input#name');
DOM.inputFormFields.label = DOM.inputForm.querySelector('input#label');
DOM.inputFormFields.maxLength = DOM.inputForm.querySelector('input#maxLength');

DOM.fieldMessages = {};
DOM.fieldMessages.title = DOM.blockForm.querySelector('#message-title');
DOM.fieldMessages.type = DOM.inputForm.querySelector('#message-type');
DOM.fieldMessages.name = DOM.inputForm.querySelector('#message-name');
DOM.fieldMessages.label = DOM.inputForm.querySelector('#message-label');
DOM.fieldMessages.maxLength = DOM.inputForm.querySelector('#message-maxLength');

export default DOM;