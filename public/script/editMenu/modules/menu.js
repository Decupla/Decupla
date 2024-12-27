// checks if we are creating a new menu or editing a existing menu
export const checkIfExists = (path) => {
    const regex = /^\/menus\/edit\/(\d+)$/;
    return path.match(regex);
}

export const getId = (path) => {
    const parts = path.split("/");
    const id = parts[parts.length - 1];
    return parseInt(id);
}