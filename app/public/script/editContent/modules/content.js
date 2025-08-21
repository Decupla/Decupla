// checks if we are creating new content or editing existing content
export const checkIfExists = (path) => {
    const regex = /^\/content\/edit\/(\d+)$/;
    return path.match(regex);
}

export const getId = (path) => {
    const parts = path.split("/");
    const id = parts[parts.length - 1];
    return parseInt(id);
}