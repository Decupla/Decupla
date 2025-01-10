const DOM = {};
DOM.blockForm = document.querySelector('form#create-block');
DOM.addInputContainers = document.querySelectorAll('.add-input-container'); // -
DOM.addInputButton = document.querySelector('button.add-input'); //-
DOM.inputCreation = document.querySelector('.input-creation'); // used for clone
DOM.addInputContainer = document.querySelector('.add-input-container');
DOM.addInputContainerEnd = document.querySelector('.add-input-container#add-input-end');
DOM.inputForm = document.querySelector('.add-input-form'); //-
DOM.titleInput = document.querySelector('input#title');
DOM.keyInput = document.querySelector('input#key');
DOM.fieldsArea = document.querySelector('#input-fields');
DOM.messageSuccess = document.querySelector('#message-saved');

DOM.inputFormFields = {}; //-
DOM.inputFormFields.type = DOM.inputForm.querySelector('select#type'); //-
DOM.inputFormFields.name = DOM.inputForm.querySelector('input#name'); //-
DOM.inputFormFields.label = DOM.inputForm.querySelector('input#label'); //-
DOM.inputFormFields.maxLength = DOM.inputForm.querySelector('input#max-length'); //-

DOM.fieldMessages = {};
DOM.fieldMessages.title = document.querySelector('#message-title');
DOM.fieldMessages.key = document.querySelector('#message-key');
DOM.fieldMessages.type = document.querySelector('.message-type'); //-
DOM.fieldMessages.name = document.querySelector('.message-name'); //-
DOM.fieldMessages.label = document.querySelector('.message-label'); //-
DOM.fieldMessages.maxLength = document.querySelector('.message-max-length'); //-

export default DOM;