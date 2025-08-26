import DOM from './modules/dom';
import { handleCollectionSubmit } from './modules/eventHandler';

const init = async () => {
    DOM.collectionForm.addEventListener('submit', handleCollectionSubmit);
}

init();