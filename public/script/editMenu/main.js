import DOM from './modules/dom';
import { setupcontentSelection } from './modules/content';
import { handleFormSubmit } from './modules/eventHandler';

const init = () => {
    if(DOM.contentSelection){
        setupcontentSelection();
    }

    if(DOM.menuForm){
        DOM.menuForm.addEventListener('submit',async (event)=>{
            await handleFormSubmit(event);
        })
    }
}

init();