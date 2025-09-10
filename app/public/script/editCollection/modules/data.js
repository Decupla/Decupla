// tells if we are editing a existing collection
export let collectionExists;
// if we are editing a existing collection,the id of the collection will be stored here
export let collectionID;

export const setCollectionExists = (value) => collectionExists = value;
export const setCollectionID = (id) => collectionID = id;