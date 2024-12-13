import { blockExists, setBlockExists, setBlockID, setNextInputId, inputData, blockID } from './modules/data';
import { checkIfExists, getId } from './modules/block';
import { setupBlockForm } from './modules/blockForm';
import { getInputData } from './modules/input';

const init = async () => {
    const path = window.location.pathname;
    setBlockExists(checkIfExists(path));

    if(blockExists){
        setBlockID((getId(path)));
        await getInputData(blockID);


        if (inputData.length > 0) {
            setNextInputId([inputData.length - 1].id + 1);
        }
    }

    setupBlockForm();
}

init();