const DOM = {
    contentForm: document.querySelector('form#contentForm'),
    blocksArea: document.querySelector('#blocks'),
    titleInput: document.querySelector('input#title'),
    urlInput: document.querySelector('input#url'),
    // titleMessage: document.querySelector('#message-title'),
    savedMessage: document.querySelector('#message-saved'),
    addBlockButtonContainers: document.querySelectorAll('.add-block-container'),
    addBlockContainerEnd: document.querySelector('.add-block-container.end'),
    blockFormContainer: document.querySelector('.block-form-container'),
    // blockFormTitle: document.querySelector('#blockFormTitle'),
    blockForm: document.querySelector('form#blockForm'),
    blockFormEnd: document.querySelector('form#blockFormEnd'),
    mediaPopupWrapper: document.querySelector('#media-popup-wrapper'),
    mediaRow: document.querySelector('#media-row'),
    mediaSubmit: document.querySelector('#media-popup-wrapper button#select'),
    mediaCancel: document.querySelector('#media-popup-wrapper button#cancel'),
    mediaAddNew: document.querySelector('#media-popup-wrapper button#add-new'),
    mediaRefreshContainer: document.querySelector('#media-popup-wrapper #refresh-container'),
    mediaRefreshButton: document.querySelector('#media-popup-wrapper button#refresh-button')
    // blockFormInput: document.querySelector('#blockFormInput')
};

export default DOM;
