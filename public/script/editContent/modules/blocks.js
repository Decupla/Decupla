import DOM from './dom';
import { contentExists, contentID, setBlockMethod, blocksData, currentInstanceID, setCurrentInstanceID, deletedBlocks, getInstanceId, clearBlocksData, clearDeletedBlocks, setNextPriority } from "./data";
import { addBlockVisualization, deleteBlockVisualization, updateBlockVisualization, updateVisualizationPriority, setLastVisualisation } from "./visualization";
import { setupBlockForm, closeBlockForm } from './blockForm';
import { saveBlockData } from './api';

// if content already exists and has blocks this will load in the block instances
export const getBlocks = async (id) => {
    try {
        const response = await fetch(`/content/${id}/blocks`);
        const data = await response.json();

        if (data.success === true) {
            const blocks = data.blocks;

            const blocksParsed = blocks.map(({ id, ...block }) => ({
                // this is the id the block instances has in the blocksData Array, used for frontend purposes
                instanceID: getInstanceId(),
                // this is the id the block instance has in the database
                databaseID: id,
                ...block,
                output: JSON.parse(block.output),
            }));

            blocksData.push(...blocksParsed);

            if (blocksData.length > 0) {
                DOM.addBlockContainerEnd.classList.add('visible');
                const currentMaxPriority = Math.max(0, ...blocksData.map(block => block.priority));
                setNextPriority(currentMaxPriority + 1);
            }

            blocksData.forEach((data) => {
                addBlockVisualization(data);
            });

            setLastVisualisation();
        } else {
            // to do: fehlermeldung auf der Seite ausgebe
            console.log(data.message);
        }

    } catch (error) {
        console.error('Something went wrong:', error);
    }
}

//loads the block form for editing a existing block instance
export const editBlock = (instanceID, blockID, container) => {
    setBlockMethod("update");

    // selects the block from the blockData Array. ID is passed as a parameter when setting up the event listener for the edit button
    const data = blocksData.find(block => block.instanceID === instanceID) || null;
    // note: if we are working on a existing content, property databaseID whill exist at this point. If we are working on new content it wont

    // returns if for some reason the data could not be found inside the array
    if (data === null) {
        console.log('Input to edit could not be found.');
        return;
    }

    // the output set for this instance
    const setOutput = data.output;

    // set global currentInstanceID, so we now which instance form the array we want to update
    setCurrentInstanceID(instanceID);

    // sets up the block Form with the existing output
    setupBlockForm(blockID, container, setOutput);
}

// adds a block instance to the deletedBlocks array and removes the visualization
export const deleteBlock = (instanceID) => {

    // get the index of the block instance in the blocksData array
    const index = blocksData.findIndex(block => block.instanceID === instanceID);

    if (index !== -1) {

        // if we are editing existing content, we need to save the database id of the block instance, so we can delete it from the database later
        if (contentExists) {
            deletedBlocks.push(blocksData[index].databaseID);
        }

        const removedPriority = blocksData[index].priority;

        // remove instance from the array
        blocksData.splice(index, 1);

        //update block priorities
        blocksData.forEach(block => {
            if (block.priority > removedPriority) {
                block.priority -= 1;
                updateVisualizationPriority(block.instanceID, block.priority);
            }
        });

        const currentMaxPriority = Math.max(0, ...blocksData.map(block => block.priority));
        setNextPriority(currentMaxPriority + 1);

        // we also need to remove the visualization
        deleteBlockVisualization(instanceID);

        setLastVisualisation();

        if(blocksData.length===0){
            DOM.addBlockContainerEnd.classList.remove('visible');
        }
    }
}

// reloads the blockData array and also reloads the block visualizations
export const reloadBlocks = async (id) => {
    clearBlocksData();
    clearDeletedBlocks();
    DOM.blocksArea.innerHTML = "";
    getBlocks(id);
}

// updating a existing block instance in the blockData array and update the visualization
export const updateBlock = (data) => {

    // get the index of the block instance in the blockData array
    const index = blocksData.findIndex(block => block.instanceID === currentInstanceID);

    if (index !== -1 && currentInstanceID !== 0) {
        // the only thing that can change in a existing instance is the output. That way we can keep database id etc.
        blocksData[index].output = data.output;

        // we also need to update the visualization
        updateBlockVisualization(currentInstanceID, data);

        closeBlockForm();
    }
}

// saves a new block to the blockData array and creates new visualization
export const addNewBlock = (data, priority) => {
    // adds the id of the instance for the blockData Array. NOT the id for the database
    data.instanceID = getInstanceId();
    data.priority = priority;

    //update existing block priorities
    blocksData.forEach(block => {
        if (block.priority >= priority) {
            block.priority += 1;
            updateVisualizationPriority(block.instanceID, block.priority);
        }
    });

    blocksData.push(data);
    closeBlockForm();

    console.group(data);


    addBlockVisualization(data);

    if(!DOM.addBlockContainerEnd.classList.contains('visible')){
        DOM.addBlockContainerEnd.classList.add('visible');
    }

    const currentMaxPriority = Math.max(0, ...blocksData.map(block => block.priority));
    setNextPriority(currentMaxPriority + 1);

    setLastVisualisation();
}

export const saveBlockInstances = async (newID) => {
    for (const instance of blocksData) {
        console.log(instance);
        const instanceData = {
            blockID: instance.blockID,
            output: JSON.stringify(instance.output),
            priority: instance.priority,
            contentID: contentExists ? contentID : newID
        };

        let method = "POST";
        let blockUrl = "/blocks/instances/";

        if ('databaseID' in instance) {
            method = "PUT";
            blockUrl = `/blocks/instances/${instance.databaseID}`;
        }

        const blockResponse = await saveBlockData(blockUrl, method, instanceData);

        if (!blockResponse.success) {
            console.error(blockResponse.message);
            return false;
        }
    }
    return true;
};
