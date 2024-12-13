import DOM from './modules/dom';
import { blockExists, setBlockExists, setBlockID } from './modules/data';
import { checkIfExists, getId } from './modules/block';

const init = () => {
    const path = window.location.pathname;
    setBlockExists(checkIfExists(path));

    if(blockExists){
        setBlockID((getId(path)));
        await getInputData();
    }
}

init();