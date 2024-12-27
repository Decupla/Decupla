export const entries = [];
// tells if we are editing a existing menu
export let menuExists;
// if we are editing a existing menu, the id of the menu will be stored here
export let menuID;

export const setMenuExists = (value) => menuExists = value;
export const setMenuID = (id) => menuID = id;

