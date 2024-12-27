export const entries = [];
// tells if we are editing a existing menu
export let menuExists;
// if we are editing a existing menu, the id of the menu will be stored here
export let menuID;
// used for the entries array. Basically the better index. Not used for the database!
export let nextEntryId = 1;

export const getEntryId = () => {
    return nextEntryId++;
}

export const setMenuExists = (value) => menuExists = value;
export const setMenuID = (id) => menuID = id;
export const setNextEntryId = (id) => nextEntryId = id;