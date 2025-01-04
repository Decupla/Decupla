import { setLastVisualisation, updateVisualizationPriority } from "./visualization";
import { blocksData, nextPriority, setNextPriority } from "./data";

export const priorityUp = (instanceID) => {
    const index = blocksData.findIndex(block => block.instanceID === instanceID);

    if (index !== -1) {
        const priority = blocksData[index].priority;
        const newPriority = priority - 1;

        if (priority > 1) {
            const prevBlock = blocksData.find(block => block.priority === newPriority);

            if (prevBlock) {
                prevBlock.priority++;
                blocksData[index].priority = newPriority;

                updateVisualizationPriority(instanceID, newPriority);
                updateVisualizationPriority(prevBlock.instanceID, prevBlock.priority);

                setLastVisualisation();
            }
        }
    }
};


export const priorityDown = (instanceID) => {
    const index = blocksData.findIndex(block => block.instanceID === instanceID);

    if (index !== -1) {
        const priority = blocksData[index].priority;
        const newPriority = priority + 1;

        if (priority !== blocksData.length) {
            const nextBlock = blocksData.find(block => block.priority === newPriority);

            if (nextBlock) {
                nextBlock.priority--;
                blocksData[index].priority = newPriority;

                updateVisualizationPriority(instanceID, newPriority);
                updateVisualizationPriority(nextBlock.instanceID, nextBlock.priority);

                setLastVisualisation();
            }
        }
    }
}

export const updateBlocksPriority = (changedPriority,changedInstanceID=0) => {
    blocksData.forEach(block => {

        if (block.priority > changedPriority) {
            block.priority -= 1;
            updateVisualizationPriority(block.instanceID, block.priority);
        }
    });

    const currentMaxPriority = Math.max(0, ...blocksData.map(block => block.priority));
    setNextPriority(currentMaxPriority + 1);
}