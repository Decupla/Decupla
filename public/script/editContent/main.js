import DOM from './modules/dom';
import { contentExists,setContentExists,contentID,setContentID, getPriority, nextPriority } from './modules/data';
import { handleContentSubmit,handleBlockSubmit } from './modules/eventHandler';
import { getBlocks } from './modules/blocks';
import { setupBlockSelection } from './modules/blockForm';
import { checkIfExists,getId } from './modules/content';


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

    DOM.contentForm.addEventListener('submit', (event) => {
        handleContentSubmit(event)
    }
    );

    DOM.blockForm.addEventListener('submit', (event) => {
        handleBlockSubmit(event,1);
    });

    DOM.blockFormEnd.addEventListener('submit', (event) => {
        handleBlockSubmit(event,nextPriority);
    })


}

init();

