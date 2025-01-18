import DOM from './dom';
import { contentExists, contentID, deletedBlocks, setContentExists, setContentID, blocksData, blockMethod, currentBlock } from './data';
import { saveContentData, saveBlockData, deleteBlockInstance } from './api';
import { addNewBlock, updateBlock, reloadBlocks, saveBlockInstances } from './blocks';
import { setFieldMessage, resetMessages } from './messages';

export const handleContentSubmit = async (event) => {
    event.preventDefault();
    resetMessages();

    const formData = new FormData(event.target);
    const data = {
        ...Object.fromEntries(formData.entries()),
        title: DOM.titleInput.value
    };


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
            if (!response.validation) {
                for (const [field, message] of Object.entries(response.messages)) {
                    setFieldMessage(field, message);
                }
                return;
            }
            console.error(response.messages);
            return;
        }

        const currentContentID = contentExists ? contentID : response.newID;

        const blocksSaved = await saveBlockInstances(currentContentID);
        if (!blocksSaved) {
            return;
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
            setContentID(currentContentID);
            reloadBlocks(currentContentID);
        } else {
            reloadBlocks(contentID);
        }

    } catch (error) {
        console.error('An error occurred:', error);
    }
}

export const handleBlockSubmit = (event, priority = 1) => {
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
        addNewBlock(data, priority);
    } else if (blockMethod === "update") {
        updateBlock(data);
    } else {
        console.log('No block method was given.');
    }
}

export const handleUrlBlur = (event) => {
    const input = event.target;
    if(input.value.trim()!==""){
        const newValue = `/${input.value.replace(/^\/+|\/+$/g, '')}/`;
        input.value = newValue;
    }
}