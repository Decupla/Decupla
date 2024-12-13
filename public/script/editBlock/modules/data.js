export const inputData = [];

export let inputMethod = "create";
// the id of the input in the inputData array we are editing at the moment
export let inputID;
// used for the inputData array. Basically the better index. Not used for the database!
export let nextInputId = 1;
// tells if we are editing a existing block
export let blockExists;
// if we are editing a existing block, the id of the block will be stored here
export let blockID;

export const setInputMethod = (value) =>  inputMethod = value;
export const setInputID = (id) => inputID = id;
export const setBlockExists = (value) => blockExists = value;
export const setBlockID = (id) => blockID = id;

export const getInputId = () => {
    return nextInputId++;
}

export const setNextInputId = (id) => nextInputId = id;