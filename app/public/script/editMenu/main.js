import DOM from './modules/dom';
import { checkIfExists, getId } from './modules/menu';
import { menuExists, setMenuExists, menuID, setMenuID } from './modules/data';
import { setupcontentSelection } from './modules/content';
import { handleFormSubmit } from './modules/eventHandler';
import { getEntriesData } from './modules/entries';

const init = async () => {
    const path = window.location.pathname;
    setMenuExists(checkIfExists(path));

    if(menuExists){
        setMenuID((getId(path)));
        await getEntriesData(menuID);
    }

    setupcontentSelection();

    DOM.menuForm.addEventListener('submit', async (event) => {
        await handleFormSubmit(event);
    })
}

init();