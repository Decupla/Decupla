export let blocksData = [];
export let selectedMedia = [];
export let activeTextEditors = [];

// if we are deleting existing block instances, the database ids of the blocks will be saved here 
export let deletedBlocks = [];
// saves the data of the current block which is used to create or edit a instance 
export let currentBlock = {};
// the ID of the block instance currently being edited. Used for updating the instance. Not used for the database!
export let currentInstanceID = 0;
// used for the blocksData array. Basically the better index. Not used for the database!
export let nextInstanceId = 1;
// the priority to order the block instances
export let nextPriority = 1;

export let selectMultipleMedia = false;

export let blockMethod = "create";

export let contentExists = false;
// if content already exist the id will be stored here
export let contentID;

export const setBlockMethod = (value) => blockMethod = value;
export const setContentExists = (value) => contentExists = value;
export const setContentID = (id) => contentID = id;
export const setCurrentInstanceID = (id) => currentInstanceID = id;
export const setCurrentBlock = (data) => currentBlock = data;
export const setNextPriority = (priority) => nextPriority = priority;
export const setSelectMultipleMedia = (value) => selectMultipleMedia = value;
// export const setSelectedMedia = (data) => selectedMedia = data;

export const clearBlocksData = () => {
    blocksData = [];
}

export const clearDeletedBlocks = () => {
    deletedBlocks = [];
}

export const clearSelectedMedia = () => {
    selectedMedia = [];
}

export const clearActiveTextEditors = () => {
    activeTextEditors = [];
}

export const getInstanceId = () => {
    return nextInstanceId++
};

export const getPriority = () => {
    return nextPriority++;
}