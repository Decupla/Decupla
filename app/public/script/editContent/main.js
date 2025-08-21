import DOM from './modules/dom';
import { contentExists,setContentExists,contentID,setContentID, getPriority, nextPriority } from './modules/data';
import { handleContentSubmit,handleBlockSubmit, handleUrlBlur } from './modules/eventHandler';
import { getBlocks } from './modules/blocks';
import { setupBlockSelection } from './modules/blockForm';
import { checkIfExists,getId } from './modules/content';
import { setupMediaSelection } from './modules/mediaSelection';


const init = async () => {
    const path = window.location.pathname;
    
    setContentExists(checkIfExists(path));

    if (contentExists) {
        setContentID(getId(path));
        await getBlocks(contentID);
    }

    DOM.addBlockButtonContainers.forEach((container) => {
        setupBlockSelection(container);
    })

    DOM.blockForm.addEventListener('submit', (event) => {
        handleBlockSubmit(event,1);
    });

    DOM.blockFormEnd.addEventListener('submit', (event) => {
        handleBlockSubmit(event,nextPriority);
    })

    DOM.contentForm.addEventListener('submit', (event) => {
        handleContentSubmit(event)
    });

    DOM.urlInput.addEventListener('blur', (event) => {
        handleUrlBlur(event);
    })

    setupMediaSelection();
}

init();

