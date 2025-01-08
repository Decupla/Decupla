import DOM from './modules/dom';
import { blockExists, setBlockExists, setBlockID, setNextInputId, setNextPriority ,inputData, blockID } from './modules/data';
import { checkIfExists, getId } from './modules/block';
import { setupBlockForm } from './modules/blockForm';
import { getInputData } from './modules/input';
import { handleBlockSubmit } from './modules/eventHandler';

const init = async () => {
    const path = window.location.pathname;
    setBlockExists(checkIfExists(path));

    if(blockExists){
        setBlockID((getId(path)));
        await getInputData(blockID);

        if (inputData.length > 0) {
            const highestId = Math.max(...inputData.map(input => input.id));
            setNextInputId(highestId+1);

            const highestPriority = Math.max(...inputData.map(input => input.priority));
            setNextPriority(highestPriority + 1);
        }

        console.log(inputData);
    }

    console.log(DOM.addInputContainers);
    DOM.addInputContainers.forEach((container)=>{
        setupBlockForm(container);
    })

    DOM.blockForm.addEventListener('submit', handleBlockSubmit);
}

init();