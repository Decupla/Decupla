import DOM from './modules/dom';
import { contentExists,setContentExists,contentID,setContentID } from './modules/data';
import { handleContentSubmit,handleBlockSubmit } from './modules/eventHandler';
import { getBlocks } from './modules/blocks';
import { setupBlockSelection } from './modules/blockForm';
import { checkIfExists,getId } from './modules/content';


const init = () => {
    const path = window.location.pathname;
    
    setContentExists(checkIfExists(path));

    if (contentExists) {
        setContentID(getId(path));
        getBlocks(contentID);
    }

    DOM.addBlockButtonContainers.forEach((container) => {
        setupBlockSelection(container);
    })

    DOM.contentForm.addEventListener('submit', (event) => {
        handleContentSubmit(event)
    }
    );

    DOM.blockForm.addEventListener('submit', (event) => {
        handleBlockSubmit(event);
    });

}

init();

