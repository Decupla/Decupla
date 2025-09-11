import DOM from './modules/dom';
import { handleCollectionSubmit } from './modules/eventHandler';
import { checkIfExists, getId } from './modules/collection';
import { setCollectionExists, collectionExists, setCollectionID, collectionID } from './modules/data';

const init = async () => {
    const path = window.location.pathname;
    setCollectionExists(checkIfExists(path));

    if (collectionExists) {
        setCollectionID((getId(path)));
        //await getEntriesData(collectionID);
    }

    DOM.collectionForm.addEventListener('submit', handleCollectionSubmit);
}

init();