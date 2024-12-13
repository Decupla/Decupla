import DOM from './dom';
import { contentExists, contentID, deletedBlocks, setContentExists, setContentID, blocksData, blockMethod, currentBlock } from './data';
import { saveContentData, saveBlockData, deleteBlockInstance } from './api';
import { saveNewBlock, updateBlock, reloadBlocks } from './blocks';

export const handleContentSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    // the data from the form. No blocks jet.
    const data = Object.fromEntries(formData.entries());

    if (!data.title) {
        DOM.titleMessage.classList.add('visible');
        return;
    }

    try {
        let method = "POST";
        let contentUrl = "/content/";

        // if we are editing existing content, we need a different method and url
        if (contentExists) {
            method = "PUT";
            contentUrl = `/content/${contentID}`;
        }

        const response = await saveContentData(contentUrl, method, data);

        // check if saving the basic data was successfull
        if (!response.success) {
            console.error(response.message);
            return;
        }

        // if we are creating new content, we need the id of the new saved content 
        let newID;
        if (!contentExists) {
            if ('newID' in response) {
                newID = response.newID;
            }
        }

        for (const instance of blocksData) {
            const instanceData = {
                blockID: instance.blockID,
                output: JSON.stringify(instance.output)
            };

            // if we are creating new content use the id of the new saved content, otherwise use the global contentID
            if (!contentExists) {
                instanceData.contentID = newID;
            } else {
                instanceData.contentID = contentID;
            }

            method = "POST"
            let blockUrl = "/blocks/instances/"
            //if the instance has the property 'databaseID' we need to update it in the database
            if ('databaseID' in instance) {
                method = "PUT";
                blockUrl = `/blocks/instances/${instance.databaseID}`;
            }

            const blockResponse = await saveBlockData(blockUrl, method, instanceData);

            // check if saving the block data was successfull
            if (!blockResponse.success) {
                console.error(blockResponse.message);
                return;
            }
        }

        if (contentExists && deletedBlocks.length > 0) {
            for (const id of deletedBlocks) {
                const deletedResponse = await deleteBlockInstance(id);

                // check if deleting the block data was successfull
                if (!deletedResponse.success) {
                    console.error(deletedResponse.message);
                    return;
                }
            }
        }

        DOM.savedMessage.classList.add('visible');

        // if we created new content we are now editing it after the first save
        if (!contentExists) {
            setContentExists(true);
            setContentID(newID);
            reloadBlocks(newID);
        } else {
            reloadBlocks(contentID);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export const handleBlockSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    // the data of the block form. Only the output, no more informations about the block
    const output = Object.fromEntries(formData.entries());

    // the data we want to be saved in the blocksData Array
    const data = {
        title: currentBlock.title,
        blockID: currentBlock.id,
        output
    }

    if (blockMethod === "create") {
        saveNewBlock(data);
    } else if (blockMethod === "update") {
        updateBlock(data);
    } else {
        console.log('No block method was given.');
    }
}